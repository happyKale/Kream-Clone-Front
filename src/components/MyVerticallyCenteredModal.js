import React from "react";
import { history } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { actionCreators as sizeActions } from "../redux/modules/size";

function MyVerticallyCenteredModal(props) {
    const dispatch = useDispatch();

    const [size, setSize] = React.useState("");


    const priceBySizeTemporary = useSelector((state) => state.size.priceBuyPromptList);

    // 임시로 받는 사이즈별 가격 리스트
    // 서버에서 받는 것으로 대체 필요
    // const priceBySizeTemporary = [
    //     { size: "230", price: "130,000" },
    //     { size: "240", price: "140,000" },
    //     { size: "250", price: "150,000" },
    //     { size: "260", price: "160,000" },
    //     { size: "270", price: "170,000" },
    //     { size: "280", price: "180,000" },
    // ]

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* layer_container */}
            <div
                styles={{
                    display: "flex",
                    flexDirection: "column",
                    // width: "480px",
                    // height: "514px",
                    overflow: "hidden",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    // borderRadius: "16px",
                }}
            >
                {/* layer_header */}
                <div>
                    <h2
                        style={{
                            lineHeight: "22px",
                            padding: "18px 50px 20px",
                            minHeight: "60px",
                            fontSize: "18px",
                            fontWeight: "700",
                            letterSpacing: "-.15px",
                            color: "#000",
                            textAlign: "center",
                            backgroundColor: "#fff",
                            borderRadius: "30px",
                        }}
                    >
                        사이즈
                    </h2>
                </div>
                {/* layer_content */}
                <div
                    style={{
                        position: "realtive",
                        flex: "1",
                        marginTop: "10px",
                        marginBottom: "32px",
                        overflowX: "hidden",
                        overflowY: "auto",
                    }}
                >
                    {/* select_area */}
                    <div
                        style={{
                            padding: "0 32px"
                        }}
                    >
                        <div
                            style={{
                                // lineHeight: "0",
                                // margin: "-4px",
                                // fontSize: "0",
                            }}
                        >
                            {priceBySizeTemporary?.map((p, idx) => {
                                return (
                                    <div
                                        key={p.size}
                                        style={{
                                            overflow: "hidden",
                                            margin: "4px",
                                            display: "inline-block",
                                            verticalAlign: "top",
                                            width: "calc(33.3333% - 8px)",
                                            height: "52px",
                                            border: "1px solid #d3d3d3",
                                            borderRadius: "10px",
                                            backgroundColor: "#fff",

                                        }}
                                        onClick={() => {
                                            // console.log(p.size);
                                            // setSize 디스패치
                                            dispatch(sizeActions.setSize(p.size));
                                            // Detail 페이지로 돌아가기
                                        }}
                                    >
                                        <button
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                padding: "0",
                                                border: "0",
                                                outline: "none",
                                                background: "none",
                                                backgroundColor: "rgba(0,0,0,0)",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    margin: "0 auto",
                                                    maxWidth: "90px",
                                                    padding: "0",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                        display: "block",
                                                        lineHeight: "17px",
                                                        marginTop: "-3px",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    {p.size}
                                                </span>
                                                <span
                                                    style={{
                                                        color: "#f15746",
                                                        fontWeight: "700",
                                                        display: "block",
                                                        lineHeight: "14px",
                                                        marginTop: "1px",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    {p.price}
                                                </span>

                                            </div>
                                        </button>


                                    </div>
                                )
                            })}

                        </div>

                    </div>

                </div>
                {/* Close Button */}
                <div
                    style={{
                        position: "absolute",
                        top: "18px",
                        right: "20px"
                    }}
                >
                    <button
                        type="button"
                        class="btn-close close"
                        aria-label="Close"
                    >
                    </button>
                </div>
            </div>
        </Modal >
    );
}

export default MyVerticallyCenteredModal;