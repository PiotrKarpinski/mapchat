import { combineReducers } from "redux";
import filter from "./filter";
import selector from "./selector";

export default combineReducers({ selector, filter });