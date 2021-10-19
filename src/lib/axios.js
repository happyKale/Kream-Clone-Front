import axios from "axios";
import {Cookies} from "react-cookie";

const cookies = new Cookies();

const instance = axios.create({
    // 기본적으로 우리가 바라볼 서버의 주소
    baseURL: "http://13.125.35.74:8080/",
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        Authorization: `Bearer ${cookies.get('token')}`
    },
    withCredentials: true
});

export const apis = {

    //회원가입
    createAccountAX: (user) => instance.post("/user/signup", user), 

    //로그인
    loginAX: (user) => instance.post("/user/login", user),

    //로그인 확인
    loginCheckAX: () => instance.get("/user/logincheck"),


    //거래 페이지
    transectionAX: (productid, list) => instance.post(`/order/transaction/${productid}`, list),
    
};
