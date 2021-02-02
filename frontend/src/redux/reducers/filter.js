import { SET_FILTER } from "../actionTypes";
import { VISIBILITY_FILTERS } from "../../common/constants";

const initialState = VISIBILITY_FILTERS.ALL;

const filter = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.payload
        default:
            return state
    }
}

export default filter;
