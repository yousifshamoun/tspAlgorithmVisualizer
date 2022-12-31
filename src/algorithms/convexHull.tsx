import React from 'react';
import distance from '../utils/distance';
import pathCost from '../utils/pathCost';
import store from '../store';
import { getRoutes } from '../utils/getData';
import delay from '../utils/handleDelay';
import counterClockWise from '../utils/counterClockwise';
import rotateToStartingPoint from '../utils/rotateToStartingPoint';
import {
    add_to_render_primary,
    set_current_path,
    set_best_path,
} from '../store/action';

const convexHull = async (points: number[][]) => {
    const sp = points[0];

    // Find the "left most point"
    let leftmost = points[0];
    for (const p of points) {
        if (p[1] < leftmost[1]) {
            leftmost = p;
        }
    }

    const path = [leftmost];

    while (true) {
        const curPoint = path[path.length - 1];
        let selectedIdx: number = 0;
        let selectedPoint: any = null;
        // let [selectedIdx, selectedPoint] = [0, null];

        // find the "most counterclockwise" point
        for (let i = 0; i < points.length; i++) {
            // eslint-disable-next-line
            store.dispatch(
                add_to_render_primary(
                    getRoutes([...path, selectedPoint || curPoint])
                )
            );
            store.dispatch(
                add_to_render_primary(getRoutes([curPoint, points[i]]))
            );
            await delay(100);
            if (
                !selectedPoint ||
                counterClockWise(curPoint, points[i], selectedPoint)
            ) {
                // this point is counterclockwise with respect to the current hull
                // and selected point (e.g. more counterclockwise)
                [selectedIdx, selectedPoint] = [i, points[i]];
            }
        }
        // adding this to the hull so it's no longer available
        points.splice(selectedIdx, 1);

        // back to the furthest left point, formed a cycle, break
        if (selectedPoint === leftmost) {
            break;
        }

        // add to hull
        path.push(selectedPoint);
    }

    store.dispatch(add_to_render_primary(getRoutes(path)));
    store.dispatch(set_current_path(pathCost(path)));
    await delay(100);

    while (points.length > 0) {
        let bestRatio: number = Infinity;
        let bestPointIdx: any = null;
        let insertIdx: any = 0;
        // let [bestRatio, bestPointIdx, insertIdx] = [Infinity, 0, 0];

        for (let i = 0; i < points.length; i++) {
            // for every free point, find the point in the current path
            // that minimizes the cost of adding the path minus the cost of
            // the original segment
            let [bestCost, bestIdx] = [Infinity, 0];
            for (let j = 0; j < path.length; j++) {
                const nextPathPoint = path[(j + 1) % path.length];

                // the new cost minus the old cost
                const evalCost =
                    pathCost([path[j], points[i], nextPathPoint]) -
                    pathCost([points[i], nextPathPoint]);

                if (evalCost < bestCost) {
                    [bestCost, bestIdx] = [evalCost, j];
                }
            }

            // figure out how "much" more expensive this is with respect to the
            // overall length of the segment
            const nextPoint = path[(bestIdx + 1) % path.length];
            const prevCost = pathCost([path[bestIdx], nextPoint]);
            const newCost = pathCost([path[bestIdx], points[i], nextPoint]);
            const ratio = newCost / prevCost;

            if (ratio < bestRatio) {
                [bestRatio, bestPointIdx, insertIdx] = [ratio, i, bestIdx + 1];
            }
        }

        const [nextPoint] = points.splice(bestPointIdx, 1);
        path.splice(insertIdx, 0, nextPoint);

        store.dispatch(add_to_render_primary(getRoutes(path)));
        store.dispatch(set_current_path(pathCost(path)));
        await delay(100);
    }

    // rotate the array so that starting point is back first
    rotateToStartingPoint(path, sp);

    // go back home
    path.push(sp);

    store.dispatch(add_to_render_primary(getRoutes(path)));
    const cost = pathCost(path);
    if (cost < store.getState().best_path) {
        store.dispatch(set_best_path(cost));
    }
};
export default convexHull;
