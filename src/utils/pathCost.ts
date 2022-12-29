import distance from "./distance";
const pathCost = (path: number[][]) => {
    return path
        .slice(0, -1)
        .map((point, idx) => distance(point, path[idx + 1]))
        .reduce((a, b) => a + b, 0);
};
export default pathCost;
