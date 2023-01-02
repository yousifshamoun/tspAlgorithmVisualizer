import { Path } from "./reducer";
export type Action = {
    type: string;
    payload?: any;
};
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
