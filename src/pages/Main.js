import React from "react";
import Header from "../components/Header";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";

const Main = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.list);
  const is_login = useSelector(state => state.user.is_login)

  React.useEffect(() => {
    dispatch(productActions.getProductsMW());
  }, []);

  console.log("메인페이지 product 리덕스: ", productList);

  const productStyle = {
    border: "1px solid black",
    width: "300px",
    height: "300px",
  };

  const productImgStyle = {
    border: "1px solid black",
    width: "160px",
    height: "160px",
    margin: "auto",
  };

  return (
    <React.Fragment>
      
      <Header/>
      {/* 헤더 */}
      <div></div>
      {/* 슬라이드 베너 */}
      <div></div>
      {/* 상품 리스트 */}
      <div>
        {/* 상품 리스트를 감싸는 컨테이너 */}
        {productList &&
          productList.map((product) => {
            return (
              <div key={product.productId} style={productStyle} onClick={()=>{history.push(`/detail/${product.productId}`)}}>
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
                    {product.modelName}
                  </p>
                  <p>
                    {/* 상품가격 */}
                    {product.price}원
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Main;
