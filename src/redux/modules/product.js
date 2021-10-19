import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// 액션
const GET_PRODUCT = "GET_PRODUCT"; // 제품 리스트 가져오기
const SET_BOOKMARK = "SET_BOOKMARK"; // 제품 북마크하기
const DELETE_BOOKMARK = "DELETE_BOOKMARK"; //제품 북마크취소하기
const LOAD_PRODUCT_BY_ID = "LOAD_PRODUCT_BY_ID";

// 액션 생성 함수
const getProducts = createAction(GET_PRODUCT, (product) => ({ product }));
const setBookMark = createAction(SET_BOOKMARK, (product) => ({ product }));
const loadProductById = createAction(LOAD_PRODUCT_BY_ID, (product) => ({
  product,
}));

// initialState
const initialState = {
  list: [],
  product: null,
};

// 미들웨어 액션
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
      });
    // catch문 추가 필요
  };
};

const getProductsMW = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getProductsAX()
      .then((res) => {
        const productList = res.data;
        dispatch(getProducts(productList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const setBookMarkMW = (productId) => {
  return function (dispatch, getState, { history }) {
    const list = getState().product.list;
    console.log("setBookMarkMW의 리덕스데이터: ", list);
    const idx = list.find((item) => item.productId === productId);
    // bookmark인지 bookMark인지 api문서에 다시 정해야할듯!
    // 지금은 bookmark로 되어있어서..
    // list[idx].bookMark = ;

    apis
      .setBookMarkAX(productId)
      .then((res) => {
        // if (res.data.statusCode == 200) {
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [GET_PRODUCT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.product;
      }),
    [SET_BOOKMARK]: (state, action) => produce(state, (draft) => {}),
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

const actionCreators = {
  getProducts,
  setBookMark,
  getProductsMW,
  setBookMarkMW,
  loadProductByIdMW,
};

export { actionCreators };
