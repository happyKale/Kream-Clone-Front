import React from "react";
import { history } from "../redux/store";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// Bootstrap-related
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Font Awesome-related
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown as fasCaretDown } from '@fortawesome/free-solid-svg-icons';

// Action Creators-related
import { actionCreators as productActions } from "../redux/modules/product";
import { actionCreators as sizeActions } from "../redux/modules/size";
import { actionCreators as saveTypeActions } from "../redux/modules/transaction";

// Components-related
import MyVerticallyCenteredModal from "../components/MyVerticallyCenteredModal";
import Text from "../elements/Text";


const Detail = () => {
    const dispatch = useDispatch();
    const productId = useParams().productId;
    const product = useSelector((state) => state.product.product);
    const size = useSelector((state) => state.size.size);
    const priceBySize = useSelector((state) => state.size.priceBySize);

    console.log("productId", productId);
    console.log("size", size);
    console.log("priceBySize", priceBySize);

    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    const toggleBookmark = (e) => {
        if (isBookmarked === false) {
            setIsBookmarked(true);
        }
        else {
            setIsBookmarked(false);
        }
    }

    const toTransactionBuy = () => {
        if (size === null) {
            window.alert("사이즈를 선택하세요.")
        }
        else {
            history.push(`/transaction/${product.productId}`); dispatch(saveTypeActions.componentType("buy"))
        }
    }

    const toTransactionSell = () => {
        if (size === null) {
            window.alert("사이즈를 선택하세요.")
        }
        else {
            history.push(`/transaction/${product.productId}`); dispatch(saveTypeActions.componentType("sell"))
        }
    }



    React.useEffect(() => {
        // 상세페이지 정보 불러오기 MW dispatch (가격 관련 정보 제외) 
        dispatch(productActions.loadProductByIdMW(productId));
    }, [productId]);

    React.useEffect(() => {
        // 모든 사이즈 즉시 구매가 조회 MW dispatch 
        dispatch(sizeActions.getPriceBuyPromptMW(productId));
        // 단일 사이즈 가격 조회 MW dispatch (size를 인풋으로 받는)
        dispatch(sizeActions.getPriceBySizeMW(productId, size));
        // 북마크 갯수 조회 MW dispatch
    }, [size]);

    return (
        <React.Fragment>
            <div
                className="content"
                style={{
                    overflow: "hidden",
                    margin: "0 auto",
                    padding: "30px 40px 120px",
                    maxWidth: "1280px",
                }}
            >
                {/* Columns */}
                <div
                    className="column_bind"
                    style={{
                        position: "relative",
                    }}
                >
                    {/* Left Column */}
                    <div
                        className="column_left"
                        style={{
                            float: "left",
                            paddingRight: "3.334%",
                            width: "50%",
                        }}
                    >
                        <div
                            style={{
                                // border: "1px solid black",
                                backgroundColor: "#f1f1ea"
                            }}>
                            <img
                                src={product?.image}
                                alt=""
                                width="100%"
                                height="100%"
                                resizeMode="contain"
                            />
                        </div>
                    </div>
                    {/* Right Column */}
                    <div
                        className="column_right"
                        style={{
                            position: "relative",
                            float: "right",
                            paddingLeft: "3.334%",
                            width: "50%",
                            borderLeft: "1px solid #ebebeb"
                        }}
                    >
                        <div
                            className="column_box"
                            style={{
                                margin: "0px",
                                padding: "0px",
                            }}
                        >
                            {/* column_top */}
                            <div
                                className="column_top"
                                style={{
                                    margin: "0px",
                                    padding: "0px",
                                }}
                            >
                                {/* detail_main_title */}
                                <div
                                    className="detail_main_title"
                                >
                                    {/* 브랜드 */}
                                    <div
                                        style={{
                                            display: "inline-block",
                                            verticalAlign: "top",
                                            lineHeight: "19px",
                                            paddingTop: "1px",
                                            marginBottom: "9px",
                                            fontSize: "18px",
                                            letterSpacing: "-0.27px",
                                            fontWeight: "800",
                                            borderBottom: "2px solid #222",
                                        }}
                                    >
                                        {product?.brand}
                                    </div>
                                    {/* 타이틀 */}
                                    <div
                                        style={{
                                            marginBottom: "4px",
                                            fontSize: "18px",
                                            letterSpacing: "-0.09px",
                                            fontWeight: "400",
                                        }}
                                    >
                                        {` ${product?.modelName.split(";")[0]}`}
                                    </div>
                                    {/* 서브 타이틀 */}
                                    <div
                                        style={{
                                            lineHeight: "17px",
                                            fontSize: "14px",
                                            letterSpacing: "-0.15px",
                                            color: "rgba(34,34,34,.5)",
                                        }}
                                    >
                                        {product?.modelName.split(";")[1]}
                                    </div>
                                </div>

                                {/* product_info_wrap */}
                                <div
                                    className="product_info_wrap"
                                >
                                    {/* detail size */}
                                    <div
                                        style={{
                                            paddingTop: "19px",
                                            paddingBottom: "12px",
                                            borderBottom: "1px solid #ebebeb",
                                        }}
                                    >
                                        <div
                                            style={{
                                                paddingTop: "4px",
                                                display: "inline-block",
                                                lineHeight: "16px",
                                                fontSize: "13px",
                                                letterSpacing: "-0.07px",
                                                color: "rgba(34,34,34,.8)",
                                            }}
                                        >
                                            사이즈
                                        </div>
                                        <div
                                            style={{
                                                float: "right"
                                            }}
                                        >
                                            <button
                                                style={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                    letterSpacing: "-0.21px",
                                                    fontWeight: "700",
                                                    color: "inherit",
                                                    backgroundColor: "inherit",
                                                    border: "0px",
                                                    display: "flex"
                                                }}
                                                variant="primary"
                                                onClick={() => setModalShow(true)}
                                            >
                                                <div
                                                    style={{
                                                        marginRight: "5px"
                                                    }}
                                                >
                                                    {size ? size : "사이즈 선택"}
                                                </div>
                                                <div
                                                >
                                                    <FontAwesomeIcon
                                                        icon={fasCaretDown}
                                                    />
                                                </div>
                                            </button>
                                            <MyVerticallyCenteredModal
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                            />
                                        </div>
                                    </div>
                                    {/* detail_price */}
                                    <div
                                        style={{
                                            marginTop: "11px",
                                            minHeight: "44px"
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    float: "left",
                                                    paddingTop: "5px",
                                                    display: "inline-block",
                                                    fontSize: "13px",
                                                    letterSpacing: "-.07px",
                                                    color: "rgba(34,34,34,.8)",
                                                }}
                                            >
                                                최근 거래가
                                            </div>
                                            <div
                                                style={{
                                                    fontWeight: "700",
                                                    fontSize: "20px",
                                                    textAlign: "right",
                                                    lineHeight: "26px",
                                                    letterSpacing: "-0.1px",
                                                    verticalAlign: "top",
                                                }}
                                            >
                                                {priceBySize?.priceRecent === "null" ? "-" : priceBySize?.priceRecent}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* btn_wrap */}
                                <div>
                                    {/* 구매, 판매 버튼 */}
                                    <div
                                        style={{
                                            marginTop: "0px", // 원래는 17px 
                                            display: "flex",
                                            height: "60px",
                                        }}
                                    >
                                        {/* 구매 버튼 (btn_division buy) */}
                                        <div
                                            style={{
                                                backgroundColor: "#ef6253",
                                                position: "relative",
                                                display: "inline-flex",
                                                flex: "1",
                                                alignItems: "center",
                                                borderRadius: "10px",
                                                color: "#fff"
                                            }}
                                            onClick={toTransactionBuy}
                                        >
                                            <div
                                                style={{
                                                    width: "55px",
                                                    textAlign: "center",
                                                    fontSize: "18px",
                                                    letterSpacing: "-0.27px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                구매
                                            </div>
                                            <div
                                                style={{
                                                    content: "",
                                                    position: "absolute",
                                                    top: "0px",
                                                    bottom: "0px",
                                                    left: "55px",
                                                    width: "1px",
                                                    backgroundColor: "rgba(34,34,34,.1)",
                                                }}
                                            >
                                            </div>
                                            <div
                                                style={{
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "block",
                                                        marginLeft: "10px",
                                                        lineHeight: "15px",
                                                        fontWeight: "bold",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {priceBySize?.priceBuy === "구매 입찰" ? "-원" : priceBySize?.priceBuy}
                                                </div>
                                                <div
                                                    style={{
                                                        display: "block",
                                                        marginLeft: "10px",
                                                        fontSize: "11px",
                                                        fontWeight: "600",
                                                        color: "hsla(0,0%,100%,.8)",
                                                        lineHeight: "15px",
                                                        textAlign: "left",
                                                    }}>
                                                    즉시 구매가
                                                </div>
                                            </div>

                                        </div>

                                        {/* 판매 버튼 (btn_division sell) */}
                                        <div
                                            style={{
                                                backgroundColor: "#41b979",
                                                position: "relative",
                                                display: "inline-flex",
                                                flex: "1",
                                                alignItems: "center",
                                                borderRadius: "10px",
                                                color: "#fff",
                                                marginLeft: "10px",
                                            }}
                                            onClick={toTransactionSell}
                                        >
                                            <div
                                                style={{
                                                    width: "55px",
                                                    textAlign: "center",
                                                    fontSize: "18px",
                                                    letterSpacing: "-0.27px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                판매
                                            </div>
                                            <div
                                                style={{
                                                    content: "",
                                                    position: "absolute",
                                                    top: "0px",
                                                    bottom: "0px",
                                                    left: "55px",
                                                    width: "1px",
                                                    backgroundColor: "rgba(34,34,34,.1)",
                                                }}
                                            >
                                            </div>
                                            <div
                                                style={{
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "block",
                                                        marginLeft: "10px",
                                                        lineHeight: "15px",
                                                        fontWeight: "bold",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {priceBySize?.priceSell === "판매 입찰" ? "-원" : priceBySize?.priceSell}
                                                </div>
                                                <div
                                                    style={{
                                                        display: "block",
                                                        marginLeft: "10px",
                                                        fontSize: "11px",
                                                        fontWeight: "600",
                                                        color: "hsla(0,0%,100%,.8)",
                                                        lineHeight: "15px",
                                                        textAlign: "left",
                                                    }}>
                                                    즉시 판매가
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 관심상품 등록 버튼 */}
                                    <div
                                        style={{
                                            height: "60px",
                                            lineHeight: "58px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: "1px solid #ebebeb",
                                            borderRadius: "10px",
                                            color: "#333",
                                            marginTop: "12px",
                                        }}
                                    >

                                        <span
                                            onClick={toggleBookmark}
                                        >
                                            {isBookmarked ?
                                                <FontAwesomeIcon
                                                    icon={fasBookmark}
                                                />
                                                :
                                                <FontAwesomeIcon
                                                    icon={farBookmark}
                                                />}
                                        </span>
                                        <span
                                            style={{
                                                marginLeft: "4px",
                                                fontSize: "15px",
                                                fontWeight: "400",
                                                letterSpacing: "normal",
                                                lineHeight: "58px"
                                            }}
                                        >
                                            관심상품
                                        </span>
                                        <span
                                            style={{
                                                marginLeft: "4px",
                                                fontSize: "15px",
                                                fontWeight: "600",
                                                letterSpacing: "normal",
                                                lineHeight: "58px"
                                            }}>
                                            {product?.bookMarkCnt}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* product_info_wrap */}
                            <div>
                                <h3
                                    style={{
                                        paddingBottom: "13px",
                                        lineHeight: "22px",
                                        padding: "39px 0px 20px",
                                        fontSize: "18px",
                                        letterSpacing: "-.15px",
                                        margin: "0px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    상품 정보
                                </h3>
                                {/* detail_product_wrap */}
                                <div
                                    style={{
                                        border: "1px solid #ebebeb",
                                        borderWidth: "1px 0",
                                        margin: "0px",
                                        padding: "0px",
                                        display: "block",
                                    }}
                                >
                                    {/* detail_ product*/}
                                    <dl
                                        style={{
                                            display: "flex",
                                            minHeight: "20px",
                                            paddingTop: "20px",
                                            paddingBottom: "20px",
                                        }}
                                    >
                                        {/* 모델번호 */}
                                        <div
                                            style={{
                                                paddingLeft: "0px",
                                                flex: "1",
                                                padding: "0 12px",
                                                margin: "0",
                                                display: "block",
                                            }}
                                        >
                                            <dt
                                                style={{
                                                    lineHeight: "14px",
                                                    fontSize: "12px",
                                                    letterSpacing: "-.33px",
                                                    color: "rgba(34,34,34,.5)",
                                                    margin: "0",
                                                    padding: "0",
                                                }}
                                            >
                                                모델번호
                                            </dt>
                                            <dd
                                                style={{
                                                    fontWeight: "600",
                                                    marginTop: "4px",
                                                    wordBreak: "break-word",
                                                    lineHeight: "17px",
                                                    fontSize: "14px",
                                                    margin: "0",
                                                    padding: "0",
                                                }}
                                            >
                                                {product?.modelNumber}
                                            </dd>
                                        </div>
                                        {/* 출시일 */}
                                        <div
                                            style={{
                                                borderLeft: "1px solid #ebebeb",
                                                paddingLeft: "0px",
                                                flex: "1",
                                                padding: "0 12px",
                                                margin: "0",
                                                display: "block",
                                            }}
                                        >
                                            <dt
                                                style={{
                                                    lineHeight: "14px",
                                                    fontSize: "12px",
                                                    letterSpacing: "-.33px",
                                                    color: "rgba(34,34,34,.5)",
                                                    margin: "0",
                                                    padding: "0",
                                                }}
                                            >
                                                출시일
                                            </dt>
                                            <dd
                                                style={{
                                                    fontWeight: "600",
                                                    marginTop: "4px",
                                                    wordBreak: "break-word",
                                                    lineHeight: "17px",
                                                    fontSize: "14px",
                                                    margin: "0",
                                                    padding: "0",
                                                }}
                                            >
                                                {product?.releaseDate}
                                            </dd>
                                        </div>
                                        {/* 발매가 */}
                                        <div
                                            style={{
                                                borderLeft: "1px solid #ebebeb",
                                                paddingLeft: "0px",
                                                flex: "1",
                                                padding: "0 12px",
                                                margin: "0",
                                                display: "block",
                                            }}
                                        >
                                            <dt
                                                style={{
                                                    lineHeight: "14px",
                                                    fontSize: "12px",
                                                    letterSpacing: "-.33px",
                                                    color: "rgba(34,34,34,.5)",
                                                    margin: "0",
                                                    padding: "0",
                                                }}
                                            >
                                                발매가
                                            </dt>
                                            <dd
                                                style={{
                                                    fontWeight: "600",
                                                    marginTop: "4px",
                                                    wordBreak: "break-word",
                                                    lineHeight: "17px",
                                                    fontSize: "14px",
                                                    margin: "0",
                                                    padding: "0",
                                                }}
                                            >
                                                {product?.priceOriginal}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>


                            {/* delivery_way_wrap */}
                            <div
                                className="delivery_way_wrap"
                            >
                                <h3
                                    style={{
                                        lineHeight: "17px",
                                        padding: "39px 0 20px",
                                        fontSize: "14px",
                                        letterSpacing: "-.21px",
                                        fontWeight: "400",
                                        color: "rgba(34,34,34,.8)",
                                    }}
                                >
                                    배송 정보
                                </h3>
                                {/* delivery_way */}
                                <div
                                    style={{
                                        paddingTop: "19px",
                                        paddingBottom: "10px",
                                        padding: "18px 0px",
                                    }}
                                >
                                    {/* way_info */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            width: "100%",
                                            margin: "0",
                                            padding: "0",
                                        }}
                                    >
                                        {/* way_status_thumb */}
                                        <div
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                flex: "none",
                                                marginRight: "14px",
                                            }}
                                        >
                                            <img src="https://kream-phinf.pstatic.net/MjAyMTA5MDZfMjIx/MDAxNjMwODk1NjkzMzQz.UtRbBxzFBX_H7Z4P8pmLdfZe8Erk1qH9pKWthl3qnvMg.EQeekXUH0aqR-mVPXiO9tmbWdI4LQ6frB-CiE_a3sHsg.PNG/a_d8e9ca1d381b4514b82b28d9c18e4794.png"
                                                alt="무료 이벤트"
                                                width="40px"
                                                height="40px"
                                                verticalAlign="top" />
                                        </div>
                                        {/* way_desc */}
                                        <div
                                            style={{
                                                flex: "1",
                                                margin: "0",
                                                padding: "0",
                                                display: "block"
                                            }}
                                        >
                                            {/* company */}
                                            <p
                                                style={{
                                                    fontSize: "14px",
                                                    letterSpacing: "-.21px",
                                                    lineHeight: "17px",
                                                    margin: "0px",
                                                    padding: "0px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "600",
                                                        fontSize: "14px",
                                                        letterSpacing: "-.21px",
                                                        lineHeight: "17px",
                                                    }}
                                                >
                                                    일반 택배
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: "14px",
                                                        letterSpacing: "-.21px",
                                                        lineHeight: "17px",
                                                    }}
                                                >
                                                    무료 이벤트
                                                </span>

                                            </p>
                                            {/* sub_text */}
                                            <p
                                                style={{
                                                    lineHeight: "16px",
                                                    marginTop: "3px",
                                                    marginBottom: "0px",
                                                    fontSize: "13px",
                                                    letterSpacing: "-.07px",
                                                    color: "rgba(34,34,34,.5)",

                                                }}
                                            >
                                                판매자 발송 ・ 검수 합격 후 출고
                                            </p>

                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* banner_box */}
                            <div
                                style={{
                                    position: "relative",
                                    paddingTop: "20px,"
                                }}
                            >
                                {/* slick-list */}
                                <div
                                    style={{
                                        height: "80px",
                                        display: "block"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            display: "inline-block",
                                            position: "relative",
                                            verticalAlign: "top",
                                        }}
                                    >
                                        <img
                                            src="https://kream-phinf.pstatic.net/MjAyMTEwMTVfMjU0/MDAxNjM0Mjg3NDU1Nzkx.sBYqARVbST8_M1dmbo9KnCN5U7U7HYc_GB5XPjBxviAg.Od5719O0kOa9alanXkpwdBsARNGj0xvVIROafy97dgMg.JPEG/a_a0269ef97b51427f8b6cf0fb487faf44.jpg"
                                            alt=""
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                verticalAlign: "top",
                                            }}
                                        >
                                        </img>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}
export default Detail;