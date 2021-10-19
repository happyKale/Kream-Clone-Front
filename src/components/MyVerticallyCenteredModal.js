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

    // 임시로 받는 사이즈별 가격 리스트
    // 서버에서 받는 것으로 대체 필요
    const priceBySizeTemporary = [
        { size: "230", price: "130,000" },
        { size: "240", price: "140,000" },
        { size: "250", price: "150,000" },
        { size: "260", price: "160,000" },
        { size: "270", price: "170,000" },
        { size: "280", price: "180,000" },
    ]

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeLabel="" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    사이즈
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* 사이즈별 즉시 판매가 정보 맵핑 */}
                {priceBySizeTemporary.map((p, idx) => {
                    return (
                        <div
                            key={p.size}
                            style={{
                                margin: "5px 0px",
                                padding: "0px 5px",
                                border: "1px solid black",
                                borderRadius: "5px"
                            }}
                            onClick={() => {
                                // console.log(p.size);
                                // setSize 디스패치
                                dispatch(sizeActions.setSize(p.size));
                                // Detail 페이지로 돌아가기
                            }}
                        >
                            <div>
                                <b>size: </b>{p.size}
                            </div>
                            <div>
                                <b>price: </b>{p.price}
                            </div>
                        </div>
                    )
                })}
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default MyVerticallyCenteredModal;