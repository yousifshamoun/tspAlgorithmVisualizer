import React from "react";
import distance from "../utils/distance";
import pathCost from "../utils/pathCost";
import store from "../store";
import { getRoutes } from "../utils/getData";
import delay from "../utils/handleDelay";
import { add_to_render_primary } from "../store/action";

const arbitraryInsertion = async (points: number[][]) => {
    // from the starting point
    const path: number[][] = [points.shift()!];
    //
    // INITIALIZATION - go to the nearest point first
    //
    points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
    path.push(points.pop()!);

    store.dispatch(add_to_render_primary(getRoutes(path)));
    // await delay(300);

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
        let [bestCost, bestIdx] = [Infinity, 0];
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
export default arbitraryInsertion;
