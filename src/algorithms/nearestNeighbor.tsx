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
const nearestNeighbor = async (points: number[][]) => {
    const path: number[][] = [points.shift()!];

    while (points.length > 0) {
        points.sort(
            (a, b) =>
                distance(path[path.length - 1], b) -
                distance(path[path.length - 1], a)
        );

        path.push(points.pop()!);
        store.dispatch(add_to_render_primary(getRoutes(path)));
        store.dispatch(set_current_path(pathCost(path)));
        await delay(100);
    }

    path.push(path[0]);
    store.dispatch(set_current_path(pathCost(path)));
    const cost = pathCost(path);

    if (store.getState().best_path === 0 || cost < store.getState().best_path) {
        store.dispatch(set_best_path(cost));
    }
};
export default nearestNeighbor;
