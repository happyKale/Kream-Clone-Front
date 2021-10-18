import React from "react";
import {apis} from "../lib/axios";
import _ from "lodash";

const Signup = () => {

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

    const signupButton = () => {
        const user = {
            username: userEmail,
            password: userPW
        }
        apis
            .createAccountAX(user)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log("[Signup error] createAccountAX :::", error)
            });
    }

    return (
        <React.Fragment>
            <h1>회원가입</h1>
            <label>
                <p>이메일 주소</p>
                <input
                    onChange={(e) => {
                        onChangeEmail(e)
                    }}/>
                <p>{warnEmail}</p>
            </label>
            <label>
                <p>비밀번호</p>
                <input
                    onChange={(e) => {
                        onChangePW(e)
                    }}/>
                <p>{warnPw}</p>
            </label>
            <button
                onClick={signupButton}
                disabled={passEmail && passPW
                    ? false
                    : true}>가입하기</button>
        </React.Fragment>
    )
}

export default Signup;