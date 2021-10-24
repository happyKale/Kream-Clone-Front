import React from "react";

// Bootstrap-related
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

// Font Awesome-related
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle as farTimesCircle} from '@fortawesome/free-regular-svg-icons';

import {useSelector, useDispatch} from "react-redux";
import {actionCreators as sizeActions} from "../redux/modules/size";

function MyVerticallyCenteredModal(props) {
    const dispatch = useDispatch();

    const priceBySizeTemporary = useSelector(
        (state) => state.size.priceBuyPromptList
    );

    const hideModal = props.onHide;

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered="centered">
            {/* layer_container */}
            <div
                styles={{
                    display: "flex",
                    flexDirection: "column",
                    // width: "480px", height: "514px",
                    overflow: "hidden",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    // borderRadius: "16px",
                }}>
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
                            borderRadius: "30px"
                        }}>
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
                        overflowY: "auto"
                    }}>
                    {/* select_area */}
                    <div
                        style={{
                            padding: "0 32px"
                        }}>
                        <div
                            style={{
                                // lineHeight: "0", margin: "-4px", fontSize: "0",
                            }}>
                            {
                                priceBySizeTemporary
                                    ?.map((p, idx) => {
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
                                                    backgroundColor: "#fff"
                                                }}
                                                onClick={() => {
                                                    // console.log(p.size); setSize 디스패치
                                                    dispatch(sizeActions.setSize(p.size));
                                                    hideModal();
                                                }}>
                                                <button
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        padding: "0",
                                                        border: "0",
                                                        outline: "none",
                                                        background: "none",
                                                        backgroundColor: "rgba(0,0,0,0)"
                                                    }}>
                                                    <div
                                                        style={{
                                                            margin: "0 auto",
                                                            maxWidth: "90px",
                                                            padding: "0"
                                                        }}>
                                                        <span
                                                            style={{
                                                                fontWeight: "normal",
                                                                display: "block",
                                                                lineHeight: "17px",
                                                                marginTop: "-3px",
                                                                fontSize: "12px"
                                                            }}>
                                                            {p.size}
                                                        </span>
                                                        <span
                                                            style={{
                                                                color: "#f15746",
                                                                fontWeight: "normal",
                                                                display: "block",
                                                                lineHeight: "14px",
                                                                marginTop: "1px",
                                                                fontSize: "12px"
                                                            }}>
                                                            {p.price}
                                                        </span>

                                                    </div>
                                                </button>

                                            </div>
                                        )
                                    })
                            }

                        </div>

                    </div>

                </div>
                {/* Close Button */}
                <div
                    style={{
                        position: "absolute",
                        top: "18px",
                        right: "20px"
                    }}>
                    <FontAwesomeIcon
                        onClick={props.onHide}
                        style={{
                            width: "24px",
                            height: "24px",
                            color: "#d3d3d3"
                        }}
                        icon={farTimesCircle}/>
                </div>
            </div>
        </Modal >
    );
}

export default MyVerticallyCenteredModal;