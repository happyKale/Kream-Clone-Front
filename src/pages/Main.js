import React from "react";
import Header from "../components/Header";
import { history } from "../redux/store";

const Main = () => {

    return (
        <React.Fragment>
            <Header/>
<button onClick={()=>{history.push('/detail')}}>테스트버튼-디테일 이동</button>
        </React.Fragment>
    )
}


export default Main;