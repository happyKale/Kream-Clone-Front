import produce from "immer";
import {createAction, handleActions} from "redux-actions";

const initialState = {
    is_login: true //사용자의 로그인 상태값
}

const CHECK_LOGIN = "CHECK_LOGIN";

export const checkLogin = createAction(CHECK_LOGIN, (boolean) => ({boolean}));

export default handleActions({

    [CHECK_LOGIN]: (state, action) => produce(state, (draft) => {
        draft.is_login = action.payload.boolean;
    })
}, initialState);