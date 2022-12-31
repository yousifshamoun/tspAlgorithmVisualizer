import { Action } from './action';
export type Path = {
    start: number[];
    end: number[];
};
export interface globalState {
    render_primary: Path[];
    current_path: number;
    best_path: number;
    paused: boolean;
}
const initialState = {
    render_primary: [],
    current_path: 0,
    best_path: 0,
    paused: false,
};
function globalReducer(state: globalState = initialState, action: Action) {
    switch (action.type) {
        case 'SET_RENDER_PRIMARY':
            return {
                ...state,
                render_primary: action.payload,
            };
        case 'RESET_RENDER_PRIMARY':
            return {
                ...state,
                render_primary: [],
            };
        case 'SET_CURRENT_PATH':
            return { ...state, current_path: action.payload };
        case 'SET_BEST_PATH':
            return { ...state, best_path: action.payload };
        case 'TOGGLE_PAUSE':
            return {
                ...state,
                paused: !state.paused,
            };
        default:
            return state;
    }
}
export default globalReducer;
