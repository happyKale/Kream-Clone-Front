import React from "react";
import Header from "../components/Header";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";

const Main = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.list);
  const is_login = useSelector((state) => state.user.is_login);

  React.useEffect(() => {
    dispatch(productActions.getProductsMW());
  }, []);

  console.log("메인페이지 product 리덕스: ", productList);

  const productStyle = {
    border: "1px solid black",
    width: "300px",
    height: "400px",
  };

  const productImgStyle = {
    border: "1px solid black",
    width: "160px",
    height: "160px",
    margin: "auto",
  };

  const bookmarkStyle = {
    border: "1px solid black",
    width: "50px",
    height: "30px",
    margin: "5px",
  };

  const bookmarkChecked = {
    border: "1px solid black",
    width: "50px",
    height: "30px",
    margin: "5px",
    backgroundColor: "red",
  };

  return (
    <React.Fragment>
      <button
        onClick={() => {
          history.push("/detail");
        }}
      >
        테스트버튼-디테일 이동
      </button>

      {/* 헤더 */}
      <div></div>
      {/* 슬라이드 베너 */}
      <div></div>
      {/* 상품 리스트 */}
      <p>로그인 여부: {is_login ? "true" : "false"}</p>
      <div>
        {/* 상품 리스트를 감싸는 컨테이너 */}
        {productList &&
          productList.map((product) => {
            const productId = product.productId;
            const bookmark = product.bookmark;
            // 북마크가 되어있으면 스타일이 bookmarkChecked로 바뀜
            const style = bookmark ? bookmarkChecked : bookmarkStyle;
            return (
              <div key={product.productId}>
                <div
                  onClick={(e) => {
                    if (!is_login) {
                      window.alert("로그인 후 사용해주시길 바랍니다.");
                      history.push("/login");
                    }
                    if (e.target.style.backgroundColor === "") {
                      e.target.style.backgroundColor = "red";
                    } else {
                      e.target.style.backgroundColor = "";
                    }
                    dispatch(
                      productActions.setBookmarkMW(productId, bookmark, "main")
                    );
                  }}
                  style={style}
                >
                  북마크
                </div>
                <div
                  style={productStyle}
                  onClick={() => {
                    history.push(`/detail/${productId}`);
                  }}
                >
                  {/* 상품 하나 */}
                  <div style={productImgStyle}>{/* 상품 이미지 */}</div>
                  <div>
                    {/* 상품 정보 */}
                    <p>
                      {/* 상품 브랜드 */}
                      {product.brand}
                    </p>
                    <p>
                      {/* 상품명 */}
                      {/* 말줄임 */}
                      {product.modelName.split(";")[0]}
                    </p>
                    <p>
                      {/* 상품가격 */}
                      {product.priceBuyNow}원
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Main;
