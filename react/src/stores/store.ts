import { combineReducers, createStore } from "redux";
import roleReducer from "./reducers/roleReducer";

// const rootReducer = combineReducers({
//   roleReducer,
// });

const store = createStore(roleReducer);

export default store;
