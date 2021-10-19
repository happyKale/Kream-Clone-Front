import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// 액션
const GET_PRODUCT = "GET_PRODUCT"; // 제품 리스트 가져오기
const SET_BOOKMARK = "SET_BOOKMARK"; // 제품 북마크하기
const DELETE_BOOKMARK = "DELETE_BOOKMARK"; //제품 북마크취소하기

// 액션 생성 함수
const getProducts = createAction(GET_PRODUCT, (product) => ({ product }));
const setBookMark = createAction(SET_BOOKMARK, (product) => ({ product }));

// initialState
const initialState = {
  list: [],
};

// 미들웨어 액션
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

// 리덕스
export default handleActions(
  {
    [GET_PRODUCT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.product;
      }),
    [SET_BOOKMARK]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  getProducts,
  setBookMark,
  getProductsMW,
  setBookMarkMW,
};

export { actionCreators };
