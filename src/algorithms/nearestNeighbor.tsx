import React from "react";
import distance from "../utils/distance";
import pathCost from "../utils/pathCost";
const nearestNeighbor = (points: number[][]) => {
    const path: number[][] = [points.shift()!];

    while (points.length > 0) {
        points.sort(
            (a, b) =>
                distance(path[path.length - 1], b) -
                distance(path[path.length - 1], a)
        );

        path.push(points.pop()!);
    }

    path.push(path[0]);
    // const cost = pathCost(path);

    return path;
};
export default nearestNeighbor;
