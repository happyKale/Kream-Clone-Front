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
    console.log("여기가 getDataMW");
    apis
      .getDataAX()
      .then((res) => {
        console.log("getDatasMW에서 받아온 데이터: ", res.data[0]);
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
