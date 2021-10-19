import React from "react";
import { history } from "../redux/store";
import { apis } from "../lib/axios";
import _ from "lodash";
import {Cookies} from "react-cookie";
import styled from "styled-components";

const Login = () => {
    const [userEmail, setEmail] = React.useState();
    const [userPW, setPW] = React.useState();
    const [warnEmail, setWarnEmail] = React.useState("");
    const [warnPw, setWarnPw] = React.useState("");
    const [passEmail, setPassEmail] = React.useState(false);
    const [passPW, setPassPW] = React.useState(false);

    const onChangeEmail = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
        var email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (!email.test(value)) {
            setWarnEmail("이메일 주소를 정확히 입력해주세요.");
            setEmail("");
            setPassEmail(false);
        } else {
            setWarnEmail("");
            setEmail(value);
            setPassEmail(true);
        }
    }, 1000), [])

    const onChangePW = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
        var check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
        if (!check.test(value)) {
            setWarnPw("영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)")
            setPW("");
            setPassPW(false);
        } else {
            setWarnPw("");
            setPW(value);
            setPassPW(true);
        }
    }, 1000), [])

    const loginButton = () => {
        const cookies = new Cookies();
        const user = {
            username: userEmail,
            password: userPW
        }
        apis
            .loginAX(user)
            .then((response) => {
                console.log("[Login now] response",response.data.token)
                cookies.set("X-AUTH-TOKEN",response.data.token);
            })
            .catch((error) => {
                console.log("[Login error] createAccountAX :::", error)
            });
    }

    return (
    <React.Fragment>
        <StyledLoginLogo src="https://kream.co.kr/_nuxt/img/login_title.9f9ccc8.png"/>
        <label>
            <p>이메일 주소</p>
            <input onChange={(e)=>{onChangeEmail(e)}}/>
            <p>{warnEmail}</p>
        </label>
        <label>
            <p>비밀번호</p>
            <input onChange={(e)=>{onChangePW(e)}}/>
            <p>{warnPw}</p>
        </label>
        <button onClick={loginButton} disabled={passEmail&&passPW?false:true}>로그인</button>
        <button onClick={()=>{history.push('/signup');}}>이메일가입</button>
    </React.Fragment>
    )
}

const StyledLoginLogo = styled.img`
width:250px;
`

export default Login;