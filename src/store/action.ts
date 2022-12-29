import { Path } from "./reducer";
export type Action = {
    type: string;
    payload: Path[];
};
export const add_to_render_primary = (args: Path[]) => {
    return {
        type: "SET_RENDER_PRIMARY",
        payload: args,
    };
};
