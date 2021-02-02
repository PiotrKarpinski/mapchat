import {SELECT_TASK} from "../actionTypes";

const initialState = []

export default function(state = initialState, action) {
    switch (action.type) {
        case SELECT_TASK: {
            const { task } = action.payload;
            state.push(task)
            return {
                ...state,
            };
        }
        default:
            return state;
    }
}