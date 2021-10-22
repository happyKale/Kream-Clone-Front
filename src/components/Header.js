import React from "react";
import styled, {keyframes} from "styled-components";
import { Cookies } from "react-cookie";

import {history} from "../redux/store";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as userCheckAction} from "../redux/modules/user";



const Header = () => {

    const dispatch = useDispatch();
    const is_login = useSelector(state => state.user.is_login);
    const title = useSelector(state => state.transaction.headerTitle);

    const [mobileMenu, setMobileMenu] = React.useState(false);

    const cookies =  new Cookies();

    return (
        <React.Fragment>
            <StyledArticle>

                {
                    is_login
                        ? <HeaderTop
                                className={mobileMenu
                                    ? "on"
                                    : "off"}>
                                <div className="innerBox">
                                    <div>
                                        <a href="/mypage" className="myPage" onClick={()=>{
                                            dispatch(userCheckAction.checkLoginMW('/mypage'));
                                        }}>마이페이지</a>
                                        <a
                                            href="/login"
                                            className="logout"
                                            onClick={() => {
                                                dispatch(userCheckAction.checkLogin(false))
                                                cookies.remove('X-AUTH-TOKEN');
                                            }}>로그아웃</a>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setMobileMenu(false)
                                        }}><img
                                        src={process.env.PUBLIC_URL + "/img/closeButton.png"}
                                        alt="close button"
                                        width="16.71px"/></button>
                                </div>
                            </HeaderTop>
                        : <HeaderTop
                                className={mobileMenu
                                    ? "on"
                                    : "off"}>
                                <div className="innerBox">
                                    <div>
                                        <a href="/login">로그인</a>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setMobileMenu(false)
                                        }}><img
                                        src={process.env.PUBLIC_URL + "/img/closeButton.png"}
                                        alt="close button"
                                        width="16.71px"/></button>
                                </div>
                            </HeaderTop>
                }
                <HeaderBottom>

                    <a href="/">
                        <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="로고" width="115.38px"/>
                    </a>
                    {
                        title !== null
                            ? <h1>{title}</h1>
                            : null
                    }

                    <button
                        onClick={() => {
                            setMobileMenu(true)
                        }}><img
                        src={process.env.PUBLIC_URL + "/img/menuButton.png"}
                        alt="menu button"
                        width="18px"/></button>

                </HeaderBottom>
            </StyledArticle>
        </React.Fragment>
    )
}

const StyledArticle = styled.article `
width: 100%;
`
const mobileMenu = keyframes `

0%{background-color:clear;}
100%{background-color:rgba(34,34,34,.5)}
`
const mobileMenuInner = keyframes `

0%{transform: translateX(100%);}
100%{transform: translateX(0%);}
`

const HeaderTop = styled.section `
width: 100%;
text-align: right;
padding: 8px 40px;
border-bottom: 1px solid rgba(0,0,0,.1);

.innerBox{
    display: flex;
    justify-content: right;
}

.innerBox > div {
    display: flex;
    width:fit-content;
    height: 16px;
    align-items: center;
    a {
        font-size: 12px;
        color: rgba(34,34,34,.8);
        line-height: 0;
    }
    a.myPage {margin-right:24px;}
}

button {
        display: none;
}


@media only screen and (max-width:768px){

    display: none;
    position: absolute;
    height: 100%;

    .innerBox{
        display: block;
        position: absolute;
        z-index: -1;
        top: 0;
        right: 0;
        width: 79.4%;
        height: 100%;
        background-color: #fff;
        
    }
    .innerBox > div {
        flex-direction: column;
        width: 100%;
        height: fit-content;
        position: relative;
        top:60px;
        a{
            position: absolute;
            width: 100%;
            text-align: left;
            font-size: 15px;
            line-height: 15px;
            letter-spacing: -.15px;
            font-weight: 700;
            border-bottom: 1px solid #ebebeb;
            padding:19px 20px 18px;
            box-sizing: border-box;
            cursor: pointer;
            z-index: 200;
            background-color: #fff;
        }
        a.myPage {margin-right:0;}
        a.logout {top:53px;}
    }

    .innerBox button {
        width: 24px;
        height: 24px;
        border: none;
        background: none;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 11px;
        top: 18px;
        z-index: 20;
    }

    a{pointer-events:none;}

    &.on{
        display: block;
        animation: ${mobileMenu} .3s ease-in-out forwards;
        z-index: 10;
    }
    &.on a{ pointer-events:auto; }
    &.on .innerBox{
        animation: ${mobileMenuInner} .3s ease-in-out forwards;
        z-index: 20;
    }
}


`
const HeaderBottom = styled.section `
width: 100%;
padding: 0 40px;
background: white;
position: relative;
a{
    display: block;
    width:120px;
    height: 68px;
    display: flex;
    align-items: center;
    width: fit-content;
}

h1 {
    display: flex;
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    font-size: 1.5em;
    font-weight: 700;
    color: #222;
    margin: 0;
}


button{display:none;}

@media only screen and (max-width:768px){

    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
        border: none;
        width:24px;
        height:24px;
        display: flex;
        justify-content: center;
        align-items: center;
        background:none;
    }

}


`

export default Header;