import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";


// STATES
const initialState = {
    priceBuyPromptList: null,
    size: null,
    priceBySize: null,
}


// ACTIONS
const GET_PRICE_BUY_PROMPT = "GET_PRICE_BUY_PROMPT";
const GET_PRICE_BY_SIZE = "GET_PRICE_BY_SIZE";
const SET_SIZE = "SET_SIZE";


// ACTION CREATORS
const getPriceBuyPrompt = createAction(GET_PRICE_BUY_PROMPT, (priceBuyPromptList) => ({ priceBuyPromptList }));
const getPriceBySize = createAction(GET_PRICE_BY_SIZE, (priceBySize) => ({ priceBySize }));
const setSize = createAction(SET_SIZE, (size) => ({ size }));


// MIDDLEWARES
const getPriceBuyPromptMW = (productId) => {
    return function (dispatch, getState, { history }) {
        apis
            .getPricePromptBuyAX(productId)
            .then((response) => {
                const priceBuyPromptList = response.data.priceBuy;
                // console.log(priceBuyPromptList);
                dispatch(getPriceBuyPrompt(priceBuyPromptList));
            })
    }
}

const getPriceBySizeMW = (productId, size) => {
    return function (dispatch, getState, { history }) {
        apis
            .getPriceBySizeAX(productId, size)
            .then((response) => {
                const priceBySize = response.data;
                dispatch(getPriceBySize(priceBySize));
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
                draft.priceBySize = action.payload.priceBySize;
            }),
        [GET_PRICE_BUY_PROMPT]: (state, action) =>
            produce(state, (draft) => {
                draft.priceBuyPromptList = action.payload.priceBuyPromptList;
            }),
    },
    initialState
);

export const actionCreators = {
    setSize,
    getPriceBySizeMW,
    getPriceBuyPromptMW,
};