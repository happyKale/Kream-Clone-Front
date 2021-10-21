import React from "react";
import Header from "../components/Header";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as productActions } from "../redux/modules/product";
import { Grid, Text } from "../elements";
import Card from "../components/Card";
import styled from "styled-components";
import Footer from "../components/Footer";

const Main = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.list.productList);
  const is_login = useSelector((state) => state.user.is_login);

  React.useEffect(() => {
    dispatch(productActions.getProductsMW());
  }, []);

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
    margin: "0px",
    backgroundColor: "red",
  };

  const StyledButton = styled.button`
    margin: 20px auto 0px;
    height: 40px;
    font-size: 14px;
    padding: 0px 30px;
    background-color: #fff;
    color: rgba(34, 34, 34, 0.8);
    border: 1px solid rgb(211, 211, 211);
    border-radius: 12px;
    cursor: pointer;
    text-align: center;
  `;

  return (
    <React.Fragment>
      <Header />
      {/* 슬라이드 베너 */}
      <Grid border="1px solid black" height="480px">
        베너
      </Grid>
      {/* Just Dropped */}
      <Grid margin="40px 0px 0px 0px" padding="0px 40px" height="41px">
        <Grid margin="0px auto" maxWidth="1280px" padding="0px 40px">
          <Text fontSize="20px" lineHeight="22px" margin="0px" padding="0px">
            Just Dropped
          </Text>
          <Text
            fontSize="14px"
            lineHeight="16px"
            color="rgba(34,34,34,.5)"
            fontWeight="400"
            margin="0px"
            padding="0px"
          >
            발매 상품
          </Text>
        </Grid>
      </Grid>
      {/* 상품 리스트 */}
      <Grid
        margin="0px"
        backgroundColor="#fff"
        padding="0px 28px"
        height="100%"
      >
        <Grid
          maxWidth="1280px"
          padding="0px 28px"
          margin="0px auto"
          display="Grid"
          gridColumns="repeat(4, 1fr)"
          gridRows="repeat(1, minmax(auto,auto))"
        >
          {/* 상품 리스트를 감싸는 컨테이너 */}
          {productList &&
            productList.map((product) => {
              const productId = product.productId;
              const bookmark = product.bookmark;
              // 북마크가 되어있으면 스타일이 bookmarkChecked로 바뀜
              const style = bookmark ? bookmarkChecked : bookmarkStyle;
              return <Card product={product}></Card>;
            })}
        </Grid>
      </Grid>
      {/* 상품 리스트 끝 */}
      {/* 버튼 */}
      <Grid
        margin="0px"
        padding="0px 32px"
        height="62px"
        display="flex"
        justifyContent="center"
      >
        <StyledButton>더보기</StyledButton>
      </Grid>
      {/* 푸터 */}
      <Footer></Footer>
    </React.Fragment>
  );
};

export default Main;
