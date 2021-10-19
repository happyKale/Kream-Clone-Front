import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const instance = axios.create({
  //기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://localhost:3001/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: `Bearer ${cookies.get("token")}`,
  },
  withCredentials: true,
});

export const apis = {
  getProductsAX: () => instance.get("/product"), //전체 post 조회
  getDataAX: () => instance.get("/mypage"), //마이페이지 데이터 가져오기
  setBookMarkAX: (productId) => instance.post("/user/bookmark", productId), //북마크하기
};
