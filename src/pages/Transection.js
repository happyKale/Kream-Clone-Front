import React from "react";
import {useSelector, useDispatch} from "react-redux";
import _ from "lodash";
import { apis } from "../lib/axios";
import { actionCreators as transectionAction } from "../redux/modules/transection";
import Header from "../components/Header";

const Transection = () => {

    const dispatch = useDispatch();

    const [is_bidding, setBidding] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('_');

    const productInfoList = useSelector(state => state.transection.list);
    const componentType = useSelector(state => state.transection.componentType);

    const TextList = componentType === "buy"
        ? "구매"
        : "판매";
    const productInfo = productInfoList[0].productInfo;
    const productPrice = productInfoList[1].productPrice;
    const productPost = productInfoList[2].productPost;

    const button = () => {
        console.log("[Transection] product info:::", productInfo);
        console.log("[Transection] productPrice:::", productPrice);
        console.log("[Transection] productPost:::", productPost);
    }

    const onChangeValue = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
        var check = /[0-9]/
        if (!check.test(value)) {
            alert('숫자만 입력해주세요!')
        } else {
            setInputValue(value);
        }
    }, 1000), [])

    const keepGoingButton = () => {

        const list = {
            requestType: componentType, //sell or buy
            purchaseType:is_bidding?"bidding":"prompt", //bidding: 입찰, prompt:즉시거래
            priceExpected:is_bidding
            ? inputValue
            : productPrice.priceBuy // 구매/판매 입찰가
        }
        dispatch(transectionAction.productInfoMW(list))
        
    }

    return (
        <React.Fragment>
            <Header/>
            <button onClick={button}>테스트버튼</button>
            <article>
                <section>
                    <img src={productInfo.image} width="100px" height="100px" alt=""/>
                    <div>
                        <h1>{productInfo.brand}</h1>
                        <p>{
                                productInfo
                                    .modelName
                                    .split(";")[0]
                            }</p>
                        <p>{
                                productInfo
                                    .modelName
                                    .split(";")[1]
                            }</p>
                        <p>270</p>
                    </div>
                </section>
                <section>
                    <div>
                        <p>즉시 구매가</p>
                        <p>{productPrice.priceBuy}</p>
                    </div>
                    <div>
                        <p>즉시 판매가</p>
                        <p>{productPrice.priceSell}</p>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setBidding(true);
                                dispatch(transectionAction.headerTitle("즉시 "+TextList+"하기"))
                            }}>{
                                componentType === "buy"
                                    ? "구매 입찰"
                                    : "판매 입찰"
                            }</button>
                        <button
                            onClick={() => {
                                setBidding(false);
                                dispatch(transectionAction.headerTitle(TextList+" 입찰하기"))
                            }}>{
                                componentType === "buy"
                                    ? "즉시 구매"
                                    : "즉시 판매"
                            }</button>
                        <span></span>
                    </div>
                </section>
                <section>
                    <div>
                        <p>{
                                is_bidding
                                    ? TextList + ' 희망가'
                                    : '즉시 ' + TextList + '가'
                            }</p>
                        {
                            is_bidding
                                ? <input
                                        placeholder="희망가 입력"
                                        onChange={(e) => {
                                            onChangeValue(e)
                                        }}/>
                                : <p>{productPrice.priceBuy}</p>
                        }
                    </div>
                    <div>
                        <div>
                            <p>검수비</p>
                            <p>
                                {
                                    componentType === "buy"
                                        ? "무료"
                                        : "_"
                                }</p>
                        </div>
                        {
                            componentType === "sell"
                                ? <div>
                                        <p>판매 수수료</p>
                                        <p>_</p>
                                    </div>
                                : null
                        }
                        <div>
                            <p>배송비</p>
                            <p>{
                                    componentType === "buy"
                                        ? "무료 이벤트"
                                        : "선불 · 판매자 부담"
                                }</p>
                        </div>
                    </div>
                </section>
                <section>
                    <p>{
                            componentType === "buy"
                                ? "총 결제금액"
                                : "총 정산금액"
                        }</p>
                    <h1>{
                            is_bidding
                                ? inputValue
                                : productPrice.priceBuy
                        }원</h1>
                </section>
                <button onClick={keepGoingButton}>{
                        is_bidding
                            ? TextList + " 입찰"
                            : "즉시 " + TextList
                    }
                    계속</button>
            </article>
        </React.Fragment>
    )
}

export default Transection;