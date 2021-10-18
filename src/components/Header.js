import React from "react";
import { apis } from "../lib/axios";

const Header = () => {

    const [is_login, setIsLogin] = React.useState(false);

    React.useEffect(()=>{
    apis.loginCheckAX().then((response)=>{
        setIsLogin(response.statusCode === 200? true:false)
        console.log("[Header.js] login check statusCode:::",response.statusCode);
    })
    },[]);

    return (
        <React.Fragment>
            {
                is_login?
                <section>
                    <button>마이페이지</button>
                    <button>로그아웃</button>
                </section>
                :
                <section>
                    <button>로그인</button>
                </section>
            }
        </React.Fragment>
    )
}