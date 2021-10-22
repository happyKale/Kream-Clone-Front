import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// 액션
const GET_MYPAGEDATA = "GET_MYPAGEDATA";

// 액션 생성 함수
const getMyPage = createAction(GET_MYPAGEDATA, (data) => ({ data }));

// initialState
const initialState = {
  list: [],
};

// 미들웨어 액션
const getDataMW = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getMyPageDataAX()
      .then((res) => {
        console.log("[mypage MW] get user data::: ", res);
        const dataList = res.data;
        dispatch(getMyPage(dataList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [GET_MYPAGEDATA]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.data;
      }),
  },
  initialState
);

const actionCreators = {
  getMyPage,
  getDataMW,
};

export { actionCreators };
