import React from "react";
import { history } from "../redux/store";

const Detail = () => {

    return (
        <React.Fragment>
<button onClick={()=>{history.push('/') }}>테스트버튼-메인이동</button>
        </React.Fragment>
    )
}


export default Detail;