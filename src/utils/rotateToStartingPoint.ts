const rotateToStartingPoint = (path: number[][], startingPoint: number[]) => {
    const startIdx = path.findIndex((p) => p === startingPoint);
    path.unshift(...path.splice(startIdx, path.length));
};
export default rotateToStartingPoint;
