import { Path } from "./reducer";
export type Action = {
    type: string;
    payload?: any;
};
const initialData = [
    [-122.4194, 37.7749],
    [-74.006, 40.7128],
    [-77.0369, 38.9072],
    [-78.8784, 42.8864],
    [-71.0589, 42.3601],
    [-80.1918, 25.7617],
    [-84.388, 33.749],
    [-82.4572, 27.9506],
    [-84.2807, 30.4383],
    [-90.0715, 29.9511],
    [-96.797, 32.7767],
    [-95.3698, 29.7604],
    [-97.7431, 30.2672],
    [-106.6504, 35.0844],
    [-112.074, 33.4484],
    [-111.6513, 35.1983],
    [-115.1391, 36.1716],
    [-118.2437, 34.0522],
    [-117.1611, 32.7157],
    [-124.1637, 40.8021],
    [-119.8143, 39.5299],
    [-111.891, 40.7608],
    [-104.9903, 39.7392],
    [-87.6298, 41.8781],
    [-93.265, 44.9778],
    [-90.1994, 38.627],
    [-117.426, 47.6588],
    [-122.6784, 45.5152],
    [-122.3321, 47.6062],]
export const add_to_render_primary = (args: Path[]) => {
    return {
        type: "SET_RENDER_PRIMARY",
        payload: args,
    };
};
export const reset_render_primary = () => {
    return {
        type: "RESET_RENDER_PRIMARY",
        payload: [],
    };
};
export const set_current_path = (args: number) => {
    return {
        type: "SET_CURRENT_PATH",
        payload: args,
    };
};
export const set_best_path = (args: number) => {
    return {
        type: "SET_BEST_PATH",
        payload: args,
    };
};
export const toggle_pause = () => {
    return {
        type: "TOGGLE_PAUSE",
    };
};
export const toggle_running = () => {
    return {
        type: "TOGGLE_RUNNING",
    };
};
export const set_data = (args: number[][]) => {
    return {
        type: "SET_DATA",
        payload: args,
    };
};
export const set_delay = (args: number) => {
    return {
        type: "SET_DELAY",
        payload: args,
    };
};
export const change_viewport_on_random = () => {
    return {
        type: "SET_VIEWPORT",
        payload: {
            latitude: 0,
            longitude: 70,
            zoom: 1,
        },
    };
};
export const set_point_count = (args: number) => {
    return {
        type: "SET_POINT_COUNT",
        payload: args,
    };
};
export const reset_viewport = () => {
    return {
        type: "SET_VIEWPORT",
        payload: {
            latitude: 40,
            longitude: -80,
            zoom: 3,
        }
    }
}
export const reset_points = () => {
    return {
        type: "SET_DATA",
        payload: initialData,
    }
}
