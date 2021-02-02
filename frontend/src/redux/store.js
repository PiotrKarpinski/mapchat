import {createStore} from "redux";
import reducer from "./reducers/index";

export const store = createStore(
    reducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch({
    type: 'SET_FILTER',
    payload: 'filtr'
})