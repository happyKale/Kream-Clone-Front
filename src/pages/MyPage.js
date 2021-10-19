import React from "react";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mypageActions } from "../redux/modules/mypage";

const MyPage = () => {
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.mypage.list[0]);
  const buyList = dataList?.buyList;
  const sellList = dataList?.sellList;
  const bookMarkList = dataList?.bookMarkList;

  let completedBuyNum = buyList?.filter(
    (item) => item.transactionStatus === "completed"
  ).length;
  let completedSellNum = sellList?.filter(
    (item) => item.transactionStatus === "completed"
  ).length;

  React.useEffect(() => {
    dispatch(mypageActions.getDataMW());
  }, []);
  console.log("sellList: ", sellList);

  const containerStyle = {
    border: "1px solid black",
    width: "1000px",
    height: "500px",
    margin: "0px 0px 30px 0px",
  };

  const productStyle = {
    border: "1px solid black",
    width: "280px",
    height: "400px",
    float: "left",
  };

  const productImgStyle = {
    border: "1px solid black",
    width: "200px",
    height: "200px",
    margin: "auto",
  };

  const tableStyle = {
    border: "1px solid black",
    "border-collapse": "collapse",
  };

  return (
    <React.Fragment>
      <div>
        여기가 마이페이지
        {/* 사용자 정보 */}
        <div style={containerStyle}>
          {/* 이미지 */}
          <div>이미지</div>
          {/* 닉네임 & 아이디(이메일) */}
          <div>
            <p>닉네임</p>
            <p>아이디(이메일)</p>
          </div>
        </div>
        {/* 구매내역 */}
        <div style={containerStyle}>
          <p>구매 내역</p>
          {/* 구매 내역 카운트 표시 */}
          <div>
            {/* 전체 & 종료 */}
            <div>전체 {buyList?.length}</div>
            <div>종료 {completedBuyNum}</div>
          </div>
          {/* 구매 내역 리스트 */}
          <div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th key={1}>상품명</th>
                  <th key={2}>거래가</th>
                  <th key={3}>입찰/즉시구매</th>
                  <th key={4}>종료여부</th>
                </tr>
              </thead>
              <tbody>
                {buyList &&
                  buyList.map((item) => {
                    let status = item.transactionStatus;
                    let type = item.purchaseType;
                    status === "completed"
                      ? (status = "종료")
                      : (status = "진행중");
                    type === "bidding" ? (type = "입찰") : (type = "즉시구매");

                    return (
                      <tr>
                        <td>{item.modelName.split(";")[0]}</td>
                        <td>{item.transactionPrice}원</td>
                        <td>{type}</td>
                        <td>{status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* 판매내역 */}
        <div style={containerStyle}>
          <p>판매 내역</p>
          {/* 판매 내역 카운트 표시 */}
          <div>
            {/* 전체 & 종료 */}
            <div>전체 {sellList?.length}</div>
            <div>종료 {completedSellNum}</div>
          </div>
          {/* 판매 내역 리스트 */}
          <div>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th key={1}>상품명</th>
                  <th key={2}>거래가</th>
                  <th key={3}>입찰/즉시구매</th>
                  <th key={4}>종료여부</th>
                </tr>
              </thead>
              <tbody>
                {sellList &&
                  sellList.map((item) => {
                    let status = item.transactionStatus;
                    let type = item.purchaseType;
                    status === "completed"
                      ? (status = "종료")
                      : (status = "진행중");
                    type === "bidding" ? (type = "입찰") : (type = "즉시구매");

                    return (
                      <tr>
                        <td>{item.modelName.split(";")[0]}</td>
                        <td>{item.transactionPrice}원</td>
                        <td>{type}</td>
                        <td>{status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* 관심상품 */}
        <div style={containerStyle}>
          <p>관심 상품</p>
          {/* 신발카드 */}
          {/* 메인페이지에서 썼던 map을 고대로 가져오면 될 듯~! */}
          {bookMarkList &&
            bookMarkList.map((product) => {
              return (
                <div key={product.modelName} style={productStyle}>
                  {/* 상품 하나 */}
                  <div style={productImgStyle}>
                    {/* 상품 이미지 */}
                    <img
                      src={product.image}
                      alt={product.modelName.split(";")[0]}
                      width="200"
                      height="200"
                    />
                  </div>
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
                      {product.price}원
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPage;
