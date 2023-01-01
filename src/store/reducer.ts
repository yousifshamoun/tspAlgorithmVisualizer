import { Action } from "./action";
import { initialData } from "../utils/getData";
export type Path = {
    start: number[];
    end: number[];
};
export interface globalState {
    render_primary: Path[];
    current_path: number;
    best_path: number;
    paused: boolean;
    running: boolean;
    data: number[][];
    delay: number;
}
const initialState = {
    render_primary: [],
    current_path: 0,
    best_path: 0,
    paused: false,
    running: false,
    data: initialData,
    delay: 100,
};
function globalReducer(state: globalState = initialState, action: Action) {
    switch (action.type) {
        case "SET_RENDER_PRIMARY":
            return {
                ...state,
                render_primary: action.payload,
            };
        case "RESET_RENDER_PRIMARY":
            return {
                ...state,
                render_primary: [],
            };
        case "SET_CURRENT_PATH":
            return { ...state, current_path: action.payload };
        case "SET_BEST_PATH":
            return { ...state, best_path: action.payload };
        case "TOGGLE_PAUSE":
            return {
                ...state,
                paused: !state.paused,
            };
        case "SET_DATA":
            return { ...state, data: action.payload };
        case "TOGGLE_RUNNING":
            return { ...state, running: !state.running };
        case "SET_DELAY":
            return { ...state, delay: action.payload };
        default:
            return state;
    }
}
export default globalReducer;
