import React from "react";
import {history} from "../redux/store";
import {apis} from "../lib/axios";
import _ from "lodash";
import {Cookies} from "react-cookie";
import styled from "styled-components";
import {Button, Input, Text} from "../elements/index";
import Header from "../components/Header";

const Login = () => {
    const [userEmail, setEmail] = React.useState();
    const [userPW, setPW] = React.useState();
    const [warnEmail, setWarnEmail] = React.useState("");
    const [warnPw, setWarnPw] = React.useState("");
    const [passEmail, setPassEmail] = React.useState("set");
    const [passPW, setPassPW] = React.useState("set");

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
                console.log("[Login now] response", response.data.token)
                cookies.set("X-AUTH-TOKEN", response.data.token);
            })
            .catch((error) => {
                console.log("[Login error] createAccountAX :::", error)
            });
    }

    return (
        <React.Fragment>
            <StyledArticle>
                <Header/>
                <StyledSection>
                    <div>
                        <StyledLoginLogo src="https://kream.co.kr/_nuxt/img/login_title.9f9ccc8.png"/>
                        <label>
                            <Text
                                color={passEmail === "set" || passEmail
                                    ? "#000"
                                    : "#f15746"}>이메일 주소</Text>
                            <Input
                                onChange={(e) => {
                                    onChangeEmail(e)
                                }}
                                placeholder="예) kream@kream.co.kr"
                                warn={passEmail
                                    ? false
                                    : true}/>
                            <div>
                                <Text fontSize="11px" color="#f15746">{warnEmail}</Text>
                            </div>
                        </label>
                        <label>
                            <Text
                                color={passPW === "set" || passPW
                                    ? "#000"
                                    : "#f15746"}>비밀번호</Text>
                            <Input
                                onChange={(e) => {
                                    onChangePW(e)
                                }}
                                type="password"
                                warn={passPW
                                    ? false
                                    : true}/>
                            <div>
                                <Text fontSize="11px" color="#f15746">{warnPw}</Text>
                            </div>
                        </label>
                        <StyledButtonBox>
                            <Button
                                backgroundColor="#222"
                                onClick={loginButton}
                                disabled={!(passEmail && passPW) || (passEmail === "set" || passPW === "set")
                                    ? true
                                    : false}>로그인</Button>
                        </StyledButtonBox>
                        <StyledP
                            onClick={() => {
                                history.push('/signup');
                            }}>이메일가입</StyledP>
                    </div>
                </StyledSection>
            </StyledArticle>
        </React.Fragment>
    )
}

const StyledArticle = styled.article `
width:100%;
height:100%;
display: flex;
flex-direction: column;

`

const StyledSection = styled.section `
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;

& > div {
    width: 400px;
    display:flex;
    flex-direction: column;
    align-items: center;
    label{
        width:100%;
    }
}

label{
    padding:10px 0 14px;

    div{
        position: absolute;
    }
}


`

const StyledLoginLogo = styled.img `
width:250px;
padding-bottom: 50px;
`

const StyledP = styled.p `
width: fit-content;
margin-top: 18px;
font-weight: 400;
font-size: 13px;
cursor: pointer;
`

const StyledButtonBox = styled.div `
padding-top: 45px;
width: 100%;

`

export default Login;