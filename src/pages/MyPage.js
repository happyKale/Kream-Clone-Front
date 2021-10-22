import React from "react";
import {history} from "../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as mypageActions} from "../redux/modules/mypage";
import Header from "../components/Header";
import { style } from "dom-helpers";
import styled from "styled-components";
import { Card } from "react-bootstrap";

const MyPage = () => {
    const dispatch = useDispatch();
    const dataList = useSelector((state) => state.mypage.list);
    const buyList = dataList
        ?.buyList;
    const sellList = dataList
        ?.sellList;
    const bookMarkList = dataList
        ?.bookMarkList;
    const userName = dataList?.userName?.split("@")[0]

    let completedBuyNum = buyList?.filter((item) => item.transactionStatus === "completed").length;
    let completedSellNum = sellList?.filter((item) => item.transactionStatus === "completed").length;

    React.useEffect(() => {
        dispatch(mypageActions.getDataMW());
        console.log("mypage list :::",dataList);
    }, []);

    return (
        <React.Fragment>
          <Header/>
            <StyledMypageBox>
              <h1>마이페이지</h1>
              <StyledContainer>
                <UserProfile>
                    <img src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg" alt=""/>
                    <div>
                        <p>{userName}</p>
                        <p>{dataList?.userName}</p>
                    </div>
                </UserProfile>
                <History>
                    <h1>구매 내역</h1>
                    <Total>
                        <div>
                            <p>전체</p>
                            <p className="buy">{ buyList ?.length }</p>
                        </div>
                        <span/>
                        <div>
                            <p>종료</p>
                            <p >{completedBuyNum}</p>
                        </div>
                    </Total>
                    <Tabel>
                        {buyList?
                          <table>
                            <thead>
                                <tr>
                                    <th key={1}>상품명</th>
                                    <th key={2}>거래가</th>
                                    <th key={3}>입찰/즉시구매</th>
                                    <th key={4}>종료여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                     buyList.map((item) => {
                                        let status = item.transactionStatus;
                                        let type = item.purchaseType;
                                        status === "completed"
                                            ? (status = "종료")
                                            : (status = "진행중");
                                        type === "bidding"
                                            ? (type = "입찰")
                                            : (type = "즉시구매");

                                        return (
                                            <tr>
                                                <td>{
                                                        item
                                                            .modelName
                                                            .split(";")[0]
                                                    }</td>
                                                <td>{item.transactionPrice}원</td>
                                                <td>{type}</td>
                                                <td>{status}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table> : "거래내역이 없습니다."}
                    </Tabel>
                </History>
                <History>
                    <h1>판매 내역</h1>
                    <Total>
                        <div>
                          <p>전체</p> 
                          <p className="sell">{
                                sellList
                                    ?.length
                            }</p>
                            </div>
                            <span/>
                        <div><p>종료</p> <p >{completedSellNum}</p></div>
                    </Total>
                    <Tabel>
                        {sellList?
                          <table>
                            <thead>
                                <tr>
                                    <th key={1}>상품명</th>
                                    <th key={2}>거래가</th>
                                    <th key={3}>입찰/즉시구매</th>
                                    <th key={4}>종료여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                     sellList.map((item) => {
                                        let status = item.transactionStatus;
                                        let type = item.purchaseType;
                                        status === "completed"
                                            ? (status = "종료")
                                            : (status = "진행중");
                                        type === "bidding"
                                            ? (type = "입찰")
                                            : (type = "즉시구매");

                                        return (
                                            <tr>
                                                <td>{
                                                        item
                                                            .modelName
                                                            .split(";")[0]
                                                    }</td>
                                                <td>{item.transactionPrice}원</td>
                                                <td>{type}</td>
                                                <td>{status}</td>
                                            </tr>
                                        );
                                    }) 
                                }
                            </tbody>
                        </table>: "거래내역이 없습니다."}
                    </Tabel>
                </History>
                <BookmarkContainer>
                    <h1>관심 상품</h1>
                    {
                        bookMarkList ? bookMarkList.map((product) => {
                            return (
                                // <div key={product.modelName}>
                                //     <div>
                                //         <img
                                //             src={product.image}
                                //             alt={product
                                //                 .modelName
                                //                 .split(";")[0]}
                                //             width="200"
                                //             height="200"/>
                                //     </div>
                                //     <div>
                                //         <p>
                                //             {product.brand}
                                //         </p>
                                //         <p>
                                //             {
                                //                 product
                                //                     .modelName
                                //                     .split(";")[0]
                                //             }
                                //         </p>
                                //         <p>
                                //             {product.price}원
                                //         </p>
                                //     </div>
                                // </div>
                                <Card key={product.id} product={product}/>
                            );
                        }): <div className="emptyBookmark"><p>추가하신 관심 상품이 없습니다.</p></div>
                    }
                </BookmarkContainer>
                </StyledContainer>
            </StyledMypageBox>
        </React.Fragment>
    );
};

const StyledMypageBox = styled.article`
display: flex;
max-width: 1280px;
margin: 0 auto;
padding: 40px 40px 160px;
gap:20px;

& > h1 {
    line-height: 29px;
    padding-bottom: 30px;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -.15px;
    width: 180px;
}
`

const StyledContainer = styled.section`
  overflow: hidden;
  min-height: 380px;
  width: 100%;
`

const UserProfile = styled.section`
display: flex;
gap:12px;
padding: 30px 32px 22px;
border: 1px solid #ebebeb;
    border-radius: 10px;
    background-color: #fff;
img{
  width: 100px;
  height: 100px;
  border: 1px solid rgba(34,34,34,.05);
  border-radius: 50%;
}

div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  p:first-child{
    line-height: 21px;
    font-size: 18px;
    letter-spacing: -.27px;
    font-weight: 600;
    color: #000;
  }
  p:last-child{
    line-height: 18px;
    font-size: 14px;
    letter-spacing: -.05px;
    color: rgba(34,34,34,.5);
  }
}
`

const History = styled.section`
display: flex;
flex-direction: column;
margin-top:42px;

& > h1 {
  font-size: 18px;
    letter-spacing: -.27px;
    padding-bottom: 16px;
    font-weight: 700;
    margin: 0;
}

`

const Total = styled.section`
    display: flex;
    width: 100%;
    background-color: #fafafa;
    border-radius: 12px;
    align-items: center;
& > div {
  width:50%;
  text-align: center;
  height: 96px;
  padding-top: 18px;
  p:first-child{
    font-size: 13px;
    letter-spacing: -.07px;
    color: rgba(34,34,34,.8);
  }
  p:last-child{
    color: #000;
    margin-top: 2px;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: -.09px;
    font-weight: 700;
  }
  p.buy{
    color: #f15746;
  }
  p.sell{
    color:#31B46D;
  }
}
& > span {
    height: 78px;
    width: 1px;
    background-color: #ebebeb;
}
`

const Tabel = styled.section`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
min-height: 177px;
margin-top: 20px;

table{
  width: 100%;
  
}
thead tr{
  th{
    width: 25%;
    text-align: center;
    padding: 10px 0;
    color:rgba(0,0,0,.8);
    border-bottom:2px solid #ECF0F4 ;
    font-weight: 600;
  }
}

td{
  text-align: center;
  padding: 10px 0;
  color:rgba(0,0,0,.5);
}


`


const BookmarkContainer = styled.section`

margin-top: 42px;

& > h1 {
    font-size: 18px;
    letter-spacing: -.27px;
    padding-bottom: 16px;
    font-weight: 700;
    margin: 0;
    padding-bottom: 16px;
}

.emptyBookmark{
  width: 100%;
  padding: 80px 0;
  background-color: #fafafa;
  border-radius: 12px;

  p{
    font-size: 14px;
    letter-spacing: -.21px;
    color: rgba(34,34,34,.5);
    text-align: center;
  }
}
`

export default MyPage;
