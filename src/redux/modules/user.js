import { apis } from "../../lib/axios";
import { Cookies } from "react-cookie";
import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { actionCreators as productActions } from "./product";

const cookies = new Cookies();
const token = cookies.get("X-AUTH-TOKEN");

const initialState = {
  is_login: false, //사용자의 로그인 상태값
  beforeLogin: "", //로그인 버튼을 누르지 않고 로그인 창으로 넘어갔을 때
};

const CHECK_LOGIN = "CHECK_LOGIN";
const CHECK_PAGE = "CHECK_PAGE";

const checkLogin = createAction(CHECK_LOGIN, (boolean) => ({ boolean }));
const checkPage = createAction(CHECK_PAGE, (url) => ({ url }));

//로그인
const loginMW = (userEmail, userPW) => {
  return async function (dispatch, getState, { history }) {
    const user = {
      username: userEmail,
      password: userPW,
    };
     apis
      .loginAX(user)
      .then(async(response) => {
        console.log("[Login now] response", response);
        if (response.data.statusCode === "200") {
          const getUrl = getState().user.beforeLogin;
          cookies.set("X-AUTH-TOKEN", response.data.token);
          dispatch(checkLogin(true));
          const url = getUrl === "" ? "/" : getUrl;
          const afterSaveToken = () => {
            history.push(url);
            dispatch(checkPage(""));
            window.location.reload();
            // dispatch(checkLogin("/"));
            // dispatch(productActions.getProductsMW());
          }
          window.setTimeout(afterSaveToken,1000);
        } else {
          alert("이메일 또는 비밀번호를 확인해주세요.");
        }
      })
      .catch((error) => {
        console.log("[Login error] createAccountAX :::", error);
      });
  };
};



//로그인 확인 미들웨어
const checkLoginMW = (url) => {
  return async function (dispatch, getState, { history }) {
    const token = await cookies.get("X-AUTH-TOKEN");
    console.log("token? :::", token);
    if (token === undefined) {
      dispatch(checkLogin(false));
      dispatch(checkPage(url));
      history.push("/login");
      console.log("token is undefined");
    } else if (token !== undefined) {
      apis
        .loginCheckAX()
        .then((res) => {
          console.log("[Login] response:::", res);
          console.log("path:::", window.location.pathname);
          if (res.data.statusCode === "500") {
            dispatch(checkLogin(false));
            dispatch(checkPage(url));
            history.push("/login");
          } else if (res.data.statusCode === "200") {
            dispatch(checkLogin(true));
            dispatch(checkPage(""));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};

export default handleActions(
  {
    [CHECK_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.is_login = action.payload.boolean;
      }),
    [CHECK_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.beforeLogin = action.payload.url;
      }),
  },
  initialState
);

export const actionCreators = {
  checkLogin,
  checkLoginMW,
  loginMW,
  checkPage,
};
