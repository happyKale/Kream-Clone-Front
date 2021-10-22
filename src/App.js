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
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userCheckAction } from "./redux/modules/user";
import { actionCreators as productActions } from "./redux/modules/product";

function App() {
    const is_login = useSelector((state) => state.user.is_login);
    const cookies = new Cookies();
    const dispatch = useDispatch();

    React.useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get("X-AUTH-TOKEN");

        console.log("token? :::", token);
        if (token === undefined) {
            dispatch(userCheckAction.checkLogin(false));
            console.log("token is undefined");
        } else if (token !== undefined) {
            apis
                .loginCheckAX()
                .then((res) => {
                    console.log("[Login] response:::", res);
                    if (res.data.statusCode === "500") {
                        dispatch(userCheckAction.checkLogin(false));
                    } else if (res.data.statusCode === "200") {
                        dispatch(userCheckAction.checkLogin(true));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    React.useEffect(() => {
        console.log("app 쿠키!!! ", cookies.get("X-AUTH-TOKEN"));

        dispatch(productActions.getProductsMW());
    }, [is_login]);

    return (
        <div>
            <ConnectedRouter history={history}>
                <Route path="/" exact component={Main} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/transaction/:productID" exact component={Transection} />
                <Route path="/mypage" exact component={MyPage} />
                <Route path="/detail/:productId" exact component={Detail} />
            </ConnectedRouter>
        </div>
    );
}

export default App;
