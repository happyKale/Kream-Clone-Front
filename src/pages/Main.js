import React from "react";
import Header from "../components/Header";
import { history } from "../redux/store";
import { useSelector } from "react-redux";

const Main = () => {

    const is_login = useSelector(state => state.user.is_login)
    return (
        <React.Fragment>
            {is_login? 
            <article>
            <Header/>
<button onClick={()=>{history.push('/detail')}}>테스트버튼-디테일 이동</button>
</article>
            :null}
            
        </React.Fragment>
    )
}


export default Main;