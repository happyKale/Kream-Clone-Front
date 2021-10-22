import {apis} from "../../lib/axios";
import {Cookies} from "react-cookie";
import produce from "immer";
import {createAction, handleActions} from "redux-actions";

const cookies = new Cookies();
const token = cookies.get("X-AUTH-TOKEN");

const initialState = {
    is_login: false //사용자의 로그인 상태값
}

const CHECK_LOGIN = "CHECK_LOGIN";

const checkLogin = createAction(CHECK_LOGIN, (boolean) => ({boolean}));

//로그인
const loginMW = (userEmail,userPW) => {
    return function (dispatch, getState, {history}){
        const user = {
            username: userEmail,
            password: userPW
        }
        apis
            .loginAX(user)
            .then((response) => {
                console.log("[Login now] response", response)
                if(response.data.statusCode === "200"){
                    cookies.set("X-AUTH-TOKEN", response.data.token);
                    history.push('/');
                    dispatch(checkLogin(true));
                }else{
                    alert('이메일 또는 비밀번호를 확인해주세요.');
                }
            })
            .catch((error) => {
                console.log("[Login error] createAccountAX :::", error)
            });
    }
}

//로그인 확인 미들웨어
const checkLoginMW = () => {
    return function (dispatch, getState, {history}) {
        console.log("token? :::", token);
        if (token === undefined) {
            dispatch(checkLogin(false));
            history.push("/login");
            console.log("token is undefined");
        } else if (token !== undefined) {
            apis
                .loginCheckAX()
                .then((res) => {
                    console.log("[Login] response:::", res)
                    if (res.data.statusCode === "500") {
                        dispatch(checkLogin(false));
                        history.push('/login');
                    } else if (res.data.statusCode === "200") {
                        dispatch(checkLogin(true));
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
    }
}



export default handleActions({

    [CHECK_LOGIN]: (state, action) => produce(state, (draft) => {
        draft.is_login = action.payload.boolean;
    })
}, initialState);

export const actionCreators = {
    checkLogin,
    checkLoginMW,
    loginMW
}