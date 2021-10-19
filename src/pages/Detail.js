import React from "react";
import { history } from "../redux/store";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { actionCreators as productActions } from "../redux/modules/product";
import { actionCreators as sizeActions } from "../redux/modules/size";
import { actionCreators as saveTypeActions } from "../redux/modules/transaction";

import MyVerticallyCenteredModal from "../components/MyVerticallyCenteredModal";


const Detail = () => {
    const dispatch = useDispatch();
    const productId = useParams();
    const product = useSelector((state) => state.product.product);
    const size = useSelector((state) => state.size.size);
    const price = useSelector((state) => state.size.price);

    console.log(price);

    const [modalShow, setModalShow] = React.useState(false);

    React.useEffect(() => {
        // 상세페이지 정보 불러오기 MW dispatch (가격 관련 정보 제외) 
        dispatch(productActions.loadProductByIdMW(productId));
        // 모든 사이즈 즉시 구매가 조회 MW dispatch 
        // 단일 사이즈 가격 조회 MW dispatch (size를 인풋으로 받는)
        dispatch(sizeActions.getPriceBySizeMW(productId, size));
    }, [productId, size]);

    return (
        <React.Fragment>
            <div>
                <div>
                    <h1>상세페이지</h1>
                </div>
                <div>
                    {/* 가능하면 이미지 슬라이더 추가할 것 */}
                    <div
                        style={{
                            width: "300px",
                            height: "300px",
                            backgroundImage: `url(${product?.image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    >
                    </div>
                    <div>
                        <b>브랜드:</b> {product?.brand}
                    </div>
                    <div>
                        <b>모델명(영어):</b>{` ${product?.modelName.split(";")[0]}`}
                    </div>
                    <div>
                        <b>모델명(한글):</b> {product?.modelName.split(";")[1]}
                    </div>
                    <div>
                        {/* 클릭시 사이즈 선택 모달 팝업 실행 */}
                        {/* 사이즈 선택 버튼을 클릭하면 해당 사이즈의 최근 거래가, 즉시 구매가, 즉시 판매가 정보 업데이트 */}
                        <b>사이즈:</b>
                        <div>
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                                {size ? size : "사이즈 선택"}
                            </Button>
                            <MyVerticallyCenteredModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </div>
                    </div>
                    <div>
                        <b>최근 거래가:</b> {price?.priceRecent}
                    </div>
                    {/* 클릭하면 구매 페이지로 이동 */}
                    <div style={{ color: "#f50000" }} onClick={() => { history.push(`/transaction/${product.productId}`); dispatch(saveTypeActions.componentType("buy")) }}>
                        <b>즉시 구매가:</b> {price?.priceBuy}
                    </div>
                    {/* 클릭하면 판매 페이지로 이동 */}
                    <div style={{ color: "#32bf9e" }} onClick={() => { history.push(`/transaction/${product.productId}`); dispatch(saveTypeActions.componentType("sell")) }}>
                        <b>즉시 판매가:</b> {price?.priceSell}
                    </div>
                    <div>
                        <b>관심상품:</b> {product?.bookmarkCnt}
                    </div>
                    <div>
                        <b>모델번호:</b> {product?.modelNumber}
                    </div>
                    <div>
                        <b>출시일:</b> {product?.releaseDate}
                    </div>
                    <div>
                        <b>발매가:</b> {product?.priceOriginal}
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => {
                            history.push('/')
                        }}
                    >
                        메인으로 이동
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Detail;