import produce from "immer";
import {createAction, handleActions} from "redux-actions";
import { apis } from "../../lib/axios";


const initialState = {
    list : [
        //product id 에 맞는 상품의 정보를 개시
    {productInfo : {
        image:"https://cdn.pixabay.com/photo/2021/10/02/08/31/apples-6674608_1280.jpg",
        brand:"brand",
        modelName:"model name;모델명칭",
        size:"270"
    }},
    {productPrice : {
        priceBuy:"1111원(즉시 구매가)",
        priceSell:"1111원(즉시 판매가)"
    }},
    
    //서버로 보내야 하는 값 및 러덕스에서 사용하는 값
    {productPost:{
        requestType: "buy", //sell or buy
        purchaseType:"bidding", //bidding: 입찰, prompt:즉시거래
        priceExpected:"10000" // 구매/판매 입찰가
    }}
    ],
    componentType:'buy', //sell or buy
    productID:"",
    headerTitle:"" //즉시 구매하기, 즉시 판매하기
    
}

const COMPONENT_TYPE = "COMPONENT_TYPE";
const PRODUCT_ID = "PRODUCT_ID";
const HEADER_TITLE = "HEADER_TITLE";

const componentType = createAction(COMPONENT_TYPE, (type)=>({type}))
const productId = createAction(PRODUCT_ID, (id)=>({id}))
const headerTitle = createAction(HEADER_TITLE, (title)=>({title}))

const productInfoMW = (list,id) => {
    return function (dispatch, getState, {history}){
        
        console.log('product id :::',id)
        if (id !== ""){
            apis.transectionAX(id,list).then((response)=>{
                console.log(response)
                dispatch(headerTitle(null))
                alert('완료되었습니다.');
                history.goBack();
            }).catch((error)=>{
                console.log("[Transection] Error :::",error);
            })
        } 
    }
}

export default handleActions({

    [COMPONENT_TYPE]: (state, action) => produce(state, (draft) => {
        draft.componentType = action.payload.type;
        draft.headerTitle = action.payload.type === "buy"? "즉시 구매하기" : "즉시 판매하기";
    }),
    [PRODUCT_ID]: (state, action) => produce(state, (draft) => {
        draft.productID = action.payload.id;
    }),
    [HEADER_TITLE]: (state, action) => produce(state, (draft) => {
        draft.headerTitle = action.payload.title;
    }),

}, initialState)

export const actionCreators = {
    componentType,
    productId,
    productInfoMW,
    headerTitle
}