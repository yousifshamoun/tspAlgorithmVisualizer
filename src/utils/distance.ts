const distance = (pt1: number[], pt2: number[]) => {
    const [lng1, lat1] = pt1;
    const [lng2, lat2] = pt2;
    if (lat1 === lat2 && lng1 === lng2) {
        return 0;
    }

    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;

    var theta = lng1 - lng2;
    var radtheta = (Math.PI * theta) / 180;

    var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    return dist * 60 * 1.1515 * 1.609344;
};
export default distance;
