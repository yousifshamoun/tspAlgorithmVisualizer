const counterClockWise = (p: number[], q: number[], r: number[]) => {
    return (q[0] - p[0]) * (r[1] - q[1]) < (q[1] - p[1]) * (r[0] - q[0]);
};
export default counterClockWise;
