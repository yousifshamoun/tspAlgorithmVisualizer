import { createStore } from "redux";
import { globalReducer } from "./reducer";
export const store = createStore(globalReducer);
