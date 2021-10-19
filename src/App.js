import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { Cookies } from "react-cookie";
import { apis } from "./lib/axios";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";
import Transection from "./pages/Transaction";
import MyPage from "./pages/MyPage";

import { history } from "./redux/store";
import { useDispatch } from "react-redux";
import { checkLogin } from "./redux/modules/user";

function App() {

    const dispatch = useDispatch();

    // React.useEffect(() => {
    //     const cookies = new Cookies();
    //     const token = cookies.get("X-AUTH-TOKEN");

    //     console.log("token? :::", token);
    //     if (token === undefined) {
    //         dispatch(checkLogin(false));
    //         history.push("/login");
    //         console.log("token is undefined");
    //     } else if (token !== undefined) {
    //         apis
    //             .loginCheckAX()
    //             .then((res) => {
    //                 console.log("[Login] response:::", res)
    //                 if (res.data.statusCode === "500") {
    //                     dispatch(checkLogin(false));
    //                     history.push('/login');

    //                 } else if (res.data.statusCode === "200") {
    //                     dispatch(checkLogin(true));
    //                     console.log("res:::", res);
    //                     dispatch(checkLogin(true))
    //                     history.push('/');
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //         }
    // }, [])

    return (
        <ConnectedRouter history={history}>
            <Route path="/" exact="exact" component={Main} />
            <Route path="/login" exact="exact" component={Login} />
            <Route path="/signup" exact="exact" component={Signup} />
            <Route path="/test" exact="exact" component={Transection} />
            <Route path="/mypage" exact="exact" component={MyPage} />
            <Route path="/detail/:productId" exact="exact" component={Detail} />
        </ConnectedRouter>
    );
}

export default App;
