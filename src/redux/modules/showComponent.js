//컴포넌트 노출제어 모듈
import produce from "immer";
import {createAction, handleActions} from "redux-actions";

const initialState = {
    login:true,
    signup:false
}

const LOGIN_SHOW = "LOGIN_SHOW";
const SIGNUP_SHOW = "SIGNUP_SHOW";

export const login_show = createAction(LOGIN_SHOW,(boolean)=>({boolean}));
export const signup_show = createAction(SIGNUP_SHOW,(boolean)=>({boolean}));

export default handleActions({

    [LOGIN_SHOW]: (state, action) => produce(state, (draft) => {
        draft.login = action.payload.boolean;
    }),
    [SIGNUP_SHOW]: (state, action) => produce(state, (draft) => {
        draft.signup = action.payload.boolean;
    }),

}, initialState)