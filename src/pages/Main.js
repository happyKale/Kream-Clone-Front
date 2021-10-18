import React from "react";
import { history } from "../redux/store";

const Main = () => {

    return (
        <React.Fragment>
<button onClick={()=>{history.push('/detail')}}>테스트버튼-디테일 이동</button>
        </React.Fragment>
    )
}


export default Main;