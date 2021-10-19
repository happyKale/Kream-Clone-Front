import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";


// STATES
const initialState = {
    size: null,
    price: null,
}


// ACTIONS
const GET_PRICE_BY_SIZE = "GET_PRICE_BY_SIZE";
const SET_SIZE = "SET_SIZE";



// ACTION CREATORS
const getPriceBySize = createAction(GET_PRICE_BY_SIZE, (price) => ({ price }));
const setSize = createAction(SET_SIZE, (size) => ({ size }));



// MIDDLEWARES
const getPriceBySizeMW = (productId, size) => {
    return function (dispatch, getState, { history }) {
        apis
            .getPriceBySizeAX()
            .then((response) => {
                // console.log(response);
            })
    }
}


// REDUCER
export default handleActions(
    {
        [SET_SIZE]: (state, action) =>
            produce(state, (draft) => {
                draft.size = action.payload.size;
            }),

        [GET_PRICE_BY_SIZE]: (state, action) =>
            produce(state, (draft) => {
                console.log("getPriceBySizeMW 연결!")
            }),
    },
    initialState
);

export const actionCreators = {
    setSize,
    getPriceBySizeMW,
};