import React from "react";
import distance from "../utils/distance";
import pathCost from "../utils/pathCost";
import store from "../store";
import { getRoutes } from "../utils/getData";
import delay from "../utils/handleDelay";
import { add_to_render_primary } from "../store/action";
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
        await delay(300);
    }

    path.push(path[0]);
    // const cost = pathCost(path);

    return path;
};
export default nearestNeighbor;
