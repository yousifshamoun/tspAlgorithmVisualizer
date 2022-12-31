import React from 'react';
import distance from '../utils/distance';
import pathCost from '../utils/pathCost';
import store from '../store';
import { getRoutes } from '../utils/getData';
import delay from '../utils/handleDelay';
import {
    add_to_render_primary,
    set_current_path,
    set_best_path,
} from '../store/action';
import { globalState } from '../store/reducer';
const arbitraryInsertion = async (points: number[][]) => {
    // from the starting point
    const path: number[][] = [points.shift()!];
    //
    // INITIALIZATION - go to the nearest point first
    //
    points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
    path.push(points.pop()!);

    store.dispatch(add_to_render_primary(getRoutes(path)));
    store.dispatch(set_current_path(pathCost(path)));
    // await delay(100);

    // randomly sort points - this is the order they will be added
    // to the path
    points.sort(() => Math.random() - 0.5);
    while (points.length > 0) {
        //
        // SELECTION - choose a next point randomly
        //
        const nextPoint = points.pop()!;
        //
        // INSERTION - find the insertion spot that minimizes distance
        //
        let bestCost: number = Infinity;
        let bestIdx: any = null;
        // let [bestCost, bestIdx] = [Infinity, 0];
        for (let i = 1; i < path.length; i++) {
            const insertionCost = pathCost([path[i - 1], nextPoint, path[i]]);
            if (insertionCost < bestCost) {
                [bestCost, bestIdx] = [insertionCost, i];
            }
        }
        path.splice(bestIdx, 0, nextPoint);
        store.dispatch(add_to_render_primary(getRoutes(path)));
        store.dispatch(set_current_path(pathCost(path)));
        await delay(100);
    }
    // return to start after visiting all other points
    path.push(path[0]);
    store.dispatch(add_to_render_primary(getRoutes(path)));
    store.dispatch(set_current_path(pathCost(path)));
    await delay(100);
    const cost = pathCost(path);
    if (cost < store.getState().best_path) {
        store.dispatch(set_best_path(cost));
    }
    // self.setBestPath(path, cost);
};
export default arbitraryInsertion;
