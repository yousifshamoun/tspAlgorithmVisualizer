import { createStore } from "redux";
// import { devToolsEnhancer } from '@redux-devtools/extension';
import { composeWithDevTools } from 'redux-devtools-extension';
import globalReducer  from "./reducer";
const store = createStore(globalReducer, composeWithDevTools());
export default store