import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://13.125.223.180",
  // baseURL: "http://localhost:4000",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: `Bearer ${cookies.get("X-AUTH-TOKEN")}`,
    "X-AUTH-TOKEN": `${cookies.get("X-AUTH-TOKEN")}`,
  },
  withCredentials: true,
});

export const apis = {
  // 상품 아이디로 상품 정보 불러오기 loadProductByIdAX: (productId) =>
  // instance.get(`/product/${productId}`),
  loadProductByIdAX: (productId) => instance.get(`/product`),

  //회원가입
  createAccountAX: (user) => instance.post("/user/signup", user),

  //로그인
  loginAX: (user) => instance.post("/user/login", user),

  //로그인 확인
  loginCheckAX: () => instance.get("/user/logincheck"),

  //거래 페이지
  transectionAX: (productid, list) =>
    instance.post(`/order/transaction/${productid}`, list),
  // 사이즈별 가격 조회
  getPriceBySizeAX: (productId, size) => instance.get(`/priceBySize`),

  // 최저/최고가 조회
  getPriceBestAX: (productId, role) => instance.get(`/priceBest`),

  //전체 post 조회
  getProductsAX: () => instance.get("/"),

  //마이페이지 데이터 가져오기
  getMyPageDataAX: () => instance.get("/mypage"),

  //북마크하기
  setBookmarkAX: (productIdx) => instance.post("/user/bookmark", productIdx),
};
