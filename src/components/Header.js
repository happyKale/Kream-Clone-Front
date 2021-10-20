import React from "react";
import styled, {keyframes} from "styled-components";

import {history} from "../redux/store";
import {useSelector, useDispatch} from "react-redux";
import {checkLogin} from "../redux/modules/user";

const Header = () => {

    const dispatch = useDispatch();
    const is_login = useSelector(state => state.user.is_login);
    const title = useSelector(state => state.transaction.headerTitle);

    const [mobileMenu, setMobileMenu] = React.useState(false);

    return (
        <React.Fragment>
            <StyledArticle>

                {
                    is_login
                        ? <HeaderTop
                                className={mobileMenu
                                    ? "on"
                                    : "off"}>
                                <div  className="innerBox">
                                    <div>
                                        <a href="/mypage" className="myPage">마이페이지</a>
                                        <a
                                            href="/login"
                                            className="logout"
                                            onClick={() => {
                                                dispatch(checkLogin(false))
                                            }}>로그아웃</a>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setMobileMenu(false)
                                        }}><img src={process.env.PUBLIC_URL + "/img/closeButton.png"} alt="close button" width="16.71px"/></button>
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
                        <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="로고" width="115.38px"/> {
                            title !== null
                                ? <h1>{title}</h1>
                                : null
                        }
                    </a>

                    <button
                        onClick={() => {
                            setMobileMenu(true)
                        }}><img src={process.env.PUBLIC_URL + "/img/menuButton.png"} alt="menu button" width="18px"/></button>

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
    width:fit-content;
    height: 16px;
    display: flex;
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
    background-color: none;
    z-index: 10;

    
    div.innerBox{
        display: block;
        position: absolute;
        z-index: 20;
        top: 0;
        right: 0;
        bottom: 0;
        width: 79.4%;
        height: 100%;
        background-color: #fff;
        padding-top: 60px;
        overflow-y: auto;
        
    }

    a{pointer-events:none;}
    &.on{
        display: block;
        height: 100%;
        animation: ${mobileMenu} .3s ease-in-out forwards;
    }

    &.on div.innerBox{
        animation: ${mobileMenuInner} .3s ease-in-out forwards;
        
        div {
            padding-top:60px ;
            width: 100%;
            a{
                display: block;
                width: 100%;
                text-align: left;
                padding: 19px 20px 18px;
                font-size: 15px;
                letter-spacing: -.15px;
                font-weight: 700;
                border-bottom: 1px solid #ebebeb;
            }
        }

        button{
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
    }
}


`
const HeaderBottom = styled.section `
width: 100%;
padding: 0 40px;
background: white;
a{
    display: block;
    width:120px;
    height: 68px;
    display: flex;
    align-items: center;
    width: fit-content;
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