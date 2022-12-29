import { Action } from "./action";
export type Path = {
    start: number[];
    end: number[];
};
export interface globalState {
    render_primary: Path[];
}
const initialState = {
    render_primary: [],
};
export const globalReducer = (
    state: globalState = initialState,
    action: Action
) => {
    switch (action.type) {
        case "SET_RENDER_PRIMARY":
            return {
                ...state,
                render_primary: [...state.render_primary, ...action.payload],
            };
        default:
            return state;
    }
};
