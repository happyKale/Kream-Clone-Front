import React from "react";
import styled from "styled-components";
import {apis} from "../lib/axios";
import _ from "lodash";

import {Button, Text, Input} from "../elements";
import Header from "../components/Header";
import Footer from "../components/Footer";

import {history} from "../redux/store";

const Signup = () => {

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

    const signupButton = () => {
        const user = {
            username: String(userEmail),
            password: String(userPW)
        }
        console.log("[Signup] user :::", user)
        apis
            .createAccountAX(user)
            .then((response) => {
                console.log('[Signup] response:::',response)
                history.push('/login')
            })
            .catch((error) => {
                console.log("[Signup error] createAccountAX :::", error)
            });
        
    }

    return (
        <React.Fragment>
            <StyledArticle>
                <Header/>
                <StyledSection>
                    <div>
                        <StyledTitle>회원가입</StyledTitle>
                        <label>
                            <Text
                                color={passEmail === "set" || passEmail
                                    ? "#000"
                                    : "#f15746"}>이메일 주소*</Text>
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
                                    : "#f15746"}>비밀번호*</Text>
                            <Input
                                onChange={(e) => {
                                    onChangePW(e)
                                }}
                                type="password"
                                placeholder="영문, 숫자, 특수문자 조합 8-16자"
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
                                onClick={signupButton}
                                disabled={!(passEmail && passPW) || (passEmail === "set" || passPW === "set")
                                    ? true
                                    : false}>가입하기</Button>
                        </StyledButtonBox>
                    </div>
                </StyledSection>
            </StyledArticle>
            <Footer/>
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
    padding: 60px 0 160px;
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

const StyledTitle = styled.h1`
padding-bottom: 42px;
    text-align: center;
    font-size: 32px;
    letter-spacing: -.48px;
    color: #000;
    font-weight: 700;
    margin: 0;
`

const StyledButtonBox = styled.div `
padding-top: 45px;
width: 100%;

`

export default Signup;