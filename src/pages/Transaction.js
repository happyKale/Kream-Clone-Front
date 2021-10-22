import React from "react";
import {useSelector, useDispatch} from "react-redux";
import _ from "lodash";
import {actionCreators as transectionAction} from "../redux/modules/transaction";
import Header from "../components/Header";
import styled from "styled-components";
import { Button } from "../elements";
import { history } from "../redux/store";
import { useParams } from "react-router";

const Transection = () => {
    
    const dispatch = useDispatch();

    //입찰 true / 즉시 false
    const [is_bidding, setBidding] = React.useState(false);

    //입찰시 input 에 입력된 후 출력되는 총 정산금액
    const [inputValue, setInputValue] = React.useState('_');

    //경고문
    const [warning, setWarning] = React.useState({className:"", text:" "});

    //최근 거래내역이 없을 시 즉시구매 클릭 막기
    const [disabled, setdisabled] = React.useState(false);

    //상세보기에서 선택한 버튼 sell or buy
    const componentType = useSelector(state => state.transaction.componentType);

    //상품 정보
    const product = useSelector(state => state.product.product);
    const size = useSelector(state => state.size.size);
    const priceBySize = useSelector(state => state.size.priceBySize);
    const param = useParams();

    React.useEffect(()=>{
        console.log('[componentType :::]',componentType);
        console.log('[priceBySize :::]',priceBySize);
        console.log('[product :::]',product);
    
        if (product === null ){
            history.push('/detail/'+param.productID)
        }
       
            const is_disabled = 
            ((componentType === "sell")&&(priceBySize?.priceSell === "판매 입찰")) || ((componentType === "buy")&&(priceBySize?.priceBuy === "구매 입찰"))? true :false;
            setdisabled(is_disabled);
            setBidding(is_disabled);
     
            
        
        
    },[priceBySize])


    const TextList = componentType === "buy"
        ? "구매"
        : "판매";

    const onChangeValue = React.useCallback(_.debounce((e) => {
        const value = e.target.value;
            if(Number(value)>=30000){
                setInputValue(value);
                setWarning({className:"", text:""})
            }else{
                setWarning({className:"warn", text:"3만원 이상 입력해주세요."})
                setInputValue("_");

            }
    }, 1000), [])

    const SetList = {
        
        modelImage:product?.image,
        modelNum: product?.modelNumber,
        modelNameEN: product?.modelName.split(';')[0],
        modelNameKO: product?.modelName.split(';')[1],
        size:size,
        buyPrice:priceBySize?.priceBuy === "구매 입찰"?"-":priceBySize?.priceBuy,
        sellPrice:priceBySize?.priceSell === "판매 입찰"?"-":priceBySize?.priceSell,
    }


    const keepGoingButton = () => {
        const priceExPrompt = componentType === "sell"? SetList.sellPrice: SetList.buyPrice

        const list = {
            requestType: String(componentType), //sell or buy
            purchaseType: String(is_bidding
                ? "bidding"
                : "prompt"), //bidding: 입찰, prompt:즉시거래
            priceExpected: String(is_bidding
                ? inputValue
                : priceExPrompt.indexOf(',')? priceExPrompt.split(',')[0] + priceExPrompt.split(',')[1] :priceExPrompt), // 구매/판매 입찰가
            size: String(size),
        }
        console.log('[Tracsaction] POST list:::',list);
        dispatch(transectionAction.productInfoMW(list))
        
    }



    return (
        <React.Fragment>
            <Header/>
            <BackgroundBox>
                <ContainerBox>
                    <StyledProductInfo>
                        <img src={SetList.modelImage} width="100px" height="100px" alt="product"/>
                        <div>
                            <p className="modelNum">{"모델 넘버"}</p>
                            <p className="modelNameEN">{
                                    SetList.modelNameEN
                                }</p>
                            <p className="modelNameKO">{
                                    SetList.modelNameKO
                                }모델 이름 한글</p>
                            <p className="modelSize">{SetList.size}</p>
                        </div>
                    </StyledProductInfo>
                    <span/>
                    <StyledOption>
                        <section>
                            <div className="textBox">
                                <p>즉시 구매가</p>
                                <p>{SetList.buyPrice}</p>
                            </div>
                            <span/>
                            <div className="textBox">
                                <p>즉시 판매가</p>
                                <p>{SetList.sellPrice}</p>
                            </div>
                        </section>
                        <StyleTypeButton componentType={componentType}>
                            <button
                                className={is_bidding
                                    ? "on"
                                    : ""}
                                onClick={() => {
                                    setBidding(true);
                                    dispatch(transectionAction.headerTitle("즉시 " + TextList + "하기"))
                                }}>{
                                    componentType === "buy"
                                        ? "구매 입찰"
                                        : "판매 입찰"
                                }</button>
                            <button
                                className={is_bidding
                                    ? ""
                                    : "on"}
                                disabled={disabled}
                                onClick={() => {
                                    setBidding(false);
                                    dispatch(transectionAction.headerTitle(TextList + " 입찰하기"))
                                }}>{
                                    componentType === "buy"
                                        ? "즉시 구매"
                                        : "즉시 판매"
                                }</button>
                            <span></span>
                        </StyleTypeButton>
                    </StyledOption>
                    <StyledPrice>
                        <div>
                            <p className="title">{
                                    is_bidding
                                        ? TextList + ' 희망가'
                                        : '즉시 ' + TextList + '가'
                                }</p>
                            {
                                is_bidding
                                    ? <label>
                                        <p className={warning.className+" warnText"}>{warning.text}</p>
                                        <input className="price"
                                            placeholder="희망가 입력"
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                  event.preventDefault();
                                                }
                                            }}
                                            onChange={(e) => {
                                                onChangeValue(e)
                                            }}

                                            /><span>원</span></label>
                                    : <p className="price">
                                            <span>{componentType === "buy"? SetList.buyPrice : SetList.sellPrice}</span>원</p>
                            }
                        </div>
                        <span className={warning.className}/>
                        <StyledExtra>
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
                        </StyledExtra>
                    </StyledPrice>
                    <span className="end"/>
                    <StyledResult>
                        <div>
                        <p>{
                                componentType === "buy"
                                    ? "총 결제금액"
                                    : "총 정산금액"
                            }</p>
                        <p>{
                                is_bidding
                                    ? inputValue
                                    : componentType === "buy"? SetList.buyPrice : SetList.sellPrice
                            }<span>원</span></p>
                    </div>
                    <Button 
                    onClick={keepGoingButton}
                    backgroundColor="#222"
                    disabled={false}
                    >{
                            is_bidding
                                ? TextList + " 입찰"
                                : "즉시 " + TextList
                        }
                        계속</Button>
                        </StyledResult>
                </ContainerBox>
            </BackgroundBox>
        </React.Fragment>
    )
    
}


//배경
const BackgroundBox = styled.article `
background-color:#FAFAFA ;
width: 100%;
min-height: calc(100% - 101px);
padding-top: 20px;

`
//컨테이너
const ContainerBox = styled.section `
max-width: 700px;
margin: 0 auto;
background-color: white;

& > span{
    display: block;
    width:calc(100% - 64px);
    height: 1px;
    background-color: #EBEBEB;
    margin: 0 auto;
}

& > span.end{
    width: 100%;
}

`
//상품 기본 정보
const StyledProductInfo = styled.section `
display: flex;
align-items: center;
padding: 32px;
&>div{padding-left:16px;}

img{
    width: 80px;
    height:80px;
    border-radius: 10px;
    background-color: #E5E5E5;
}

.modelNum, .modelNameEN, .modelNameKO {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.modelNum{
    display: block;
    line-height: 17px;
    font-size: 14px;
    font-weight: 700;
}

.modelNameEN{
    line-height: 17px;
    margin-top: 1px;
    font-size: 14px;
}

.modelNameKO{
    line-height: 16px;
    margin-top: 2px;
    font-size: 13px;
    letter-spacing: -.07px;
    letter-spacing: -.05px;
    color: rgba(34,34,34,.5);
}

.modelSize{
    line-height: 17px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0;
    margin-top: 7px;
}

`
//옵션별 가격
const StyledOption = styled.section `

padding: 0 32px;

section{
    display: flex;
    padding: 28px 0 22px;
    justify-content: space-between;
    span{
        display: block;
        width: 1px;
        height: 38px;
        background-color: #EBEBEB;
    }
}

.textBox{
    width: 100%;
    text-align: center;
    p:first-child{
        line-height: 14px;
    font-size: 12px;
    letter-spacing: -.06px;
    color: rgba(34,34,34,.5);
    }
    p:last-child{
        display: inline-block;
    line-height: 24px;
    vertical-align: top;
    font-size: 16px;
    }
}

`
//구매 타입 버튼
const StyleTypeButton = styled.div `
display: flex;
width: 100%;
    border-radius: 80px;
    border: 1px solid #ebebeb;
    background-color: #F4F4F4;
    margin-bottom: 27px;

    button{
        width: 100%;
    background-color: #F4F4F4;
    border-radius: 80px;
    padding: 14px 0;
    font-size: 14px;
    letter-spacing: -.21px;
    color: rgba(34,34,34,.8);
    border: none;
    margin: 3px 3px 3px 0;
    }
    button:first-child{
    margin: 3px 0 3px 3px;
    }
    button:last-child{
    margin: 3px 3px 3px 0;
    }
    button.on {
        color: #fff;
        background-color:  ${(props)=>props.componentType === "sell"?"#42B979":"#ef6253"};
        letter-spacing: .15px;
        font-weight: 700;
    }
`
//가격 정보
const StyledPrice = styled.section `

padding:0 32px 32px 32px;

& > div {
    display: flex;
    justify-content: space-between;
    padding-bottom:10px;
}

& > span{
    display: block;
    width: 100%;
    height: 2px;
    background-color: #ebebeb;
}

& > span.warn {background-color:#f15746;}

.title{
    font-size: 14px;
    letter-spacing: -.21px;
    font-weight: 700;
    min-width: 63px;
}

p.price{
    line-height: 26px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: normal;
    margin-top: 15px;
    span{
    font-style: italic;
    }
}

label{margin-top: 15px;}

input.price, label span {
border: none;
text-align: right;
font-size: 20px;
    font-style: normal;
    line-height: 26px;
    font-weight: 600;
    letter-spacing: normal;
    max-width: 200px;
    box-sizing: border-box;
    border-width: 0;
    overflow: visible;
    &::placeholder{
        color:#bcbcbc;
    }
    &:focus{
        outline: none;
    }
}

label span{
padding-left: 2px;
}
.warnText{
    height: 19px;
    
}
.warn {
    font-size: 13px;
    color: #f15746;
    text-align: right;
}


`
//추가금 정보
const StyledExtra = styled.div`
display: flex;
flex-direction: column;
padding-top: 10px;
div {
    width: 100%;
    height: 26px;
display: flex;
justify-content: space-between;
align-items: center;
    p:first-child{
        color: rgba(34,34,34,.5);
        font-size: 13px;
    }
    p:last-child{
        color: #222;
        font-size: 14px;
    }
}


`
//총 결제금액 및 버튼
const StyledResult = styled.section`
padding: 0 32px 32px;

div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0 12px;
    p:first-child{
        font-size: 15px;
    font-weight: 700;
    letter-spacing: -.01px;
    }
    p:last-child{
        line-height: 26px;
    font-style: italic;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: normal;
    color: #f15746;
    }
    p span{
        font-style: normal;
    }
}
`
export default Transection;