import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// STATES
const initialState = {
    list: [],
    product: null,
};

// ACTIONS
const LOAD_PRODUCT_BY_ID = "LOAD_PRODUCT_BY_ID"

// ACTION CREATORS
const loadProductById = createAction(LOAD_PRODUCT_BY_ID, (product) => ({ product }));

// MIDDLEWARES
const loadProductByIdMW = (productId) => {
    return function (dispatch, getState, { history }) {
        apis
            // .loadProductByIdAX(productId)
            .loadProductByIdAX()
            .then((response) => {
                // console.log(response);
                console.log(response.data);
                // console.log(productId.productId);
                // 서버 연결되면 한 개의 product만 가져올 수 있도록 수정 필요
                const product = response.data[productId.productId];
                dispatch(loadProductById(product));
            })
            // catch문 추가 필요
    }
}

// REDUCER
export default handleActions(
    {
        [LOAD_PRODUCT_BY_ID]: (state, action) =>
            produce(state, (draft) => {
                // console.log("loadProductByIdMW 연결!")
                // draft.post = action.payload.post;
                draft.product = action.payload.product;
                // console.log(action.payload.product);
            }),
    },
    initialState
);

export const actionCreators = {
    loadProductByIdMW,
};

