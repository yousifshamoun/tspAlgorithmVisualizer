import React from "react";
import distance from "../utils/distance";
import pathCost from "../utils/pathCost";
import store from "../store";
import { getRoutes } from "../utils/getData";
import delay from "../utils/handleDelay";
import { add_to_render_primary } from "../store/action";

const nearestInsertion = async (points: number[][]) => {
    // from the starting point
    const path: number[][] = [points.shift()!];

    //
    // INITIALIZATION - go to the nearest point first
    //
    points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
    path.push(points.pop()!);

    store.dispatch(add_to_render_primary(getRoutes(path)));

    await delay(300);

    while (points.length > 0) {
        //
        // SELECTION - nearest point to the path
        //
        let [selectedDistance, selectedIdx] = [Infinity, -1];
        // for (const [freePointIdx, freePoint] of points.entries()) {
        //     for (const pathPoint of path) {
        //     const dist = distance(freePoint, pathPoint);
        //     if (dist < selectedDistance) {
        //         [selectedDistance, selectedIdx] = [dist, freePointIdx];
        //     }
        //     }
        // }
        points.forEach((freePoint, freePointIdx) => {
            for (const pathPoint of path) {
                const dist = distance(freePoint, pathPoint);
                if (dist < selectedDistance) {
                    [selectedDistance, selectedIdx] = [dist, freePointIdx];
                }
            }
        });

        // get the next point to add
        const [nextPoint] = points.splice(selectedIdx, 1);

        //
        // INSERTION - find the insertion spot that minimizes distance
        //
        let [bestCost, bestIdx] = [Infinity, -1];
        for (let i = 1; i < path.length; i++) {
            const insertionCost = pathCost([path[i - 1], nextPoint, path[i]]);
            if (insertionCost < bestCost) {
                [bestCost, bestIdx] = [insertionCost, i];
            }
        }
        path.splice(bestIdx, 0, nextPoint);

        store.dispatch(add_to_render_primary(getRoutes(path)));

        await delay(300);
    }

    // return to start after visiting all other points
    path.push(path[0]);
    const cost = pathCost(path);

    store.dispatch(add_to_render_primary(getRoutes(path)));
    await delay(300);

    // self.setBestPath(path, cost);
};
export default nearestInsertion;