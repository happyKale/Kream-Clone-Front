import React from "react";
import {history} from "../redux/store";
import {useSelector, useDispatch} from "react-redux";
import {checkLogin} from "../redux/modules/user";

const Header = () => {

    const dispatch = useDispatch();
    const is_login = useSelector(state => state.user.is_login)
    const title = useSelector(state => state.transaction.headerTitle)
    

    return (
        <React.Fragment>
            <article>
            <div>로고</div>
            {title !== null?<h1>{title}</h1>:null}
            {
                is_login
                    ? <section>
                            <button
                                onClick={() => {
                                    history.push('/mypage')
                                }}>마이페이지</button>
                            <button
                                onClick={() => {
                                    dispatch(checkLogin(false))
                                }}>로그아웃</button>
                        </section>
                    : <section>
                            <button
                                onClick={() => {
                                    history.push('/login')
                                }}>로그인</button>
                        </section>
            }
            </article>
        </React.Fragment>
    )
}

export default Header;