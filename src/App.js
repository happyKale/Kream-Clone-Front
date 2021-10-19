import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import {Cookies} from "react-cookie";
import { apis } from "./lib/axios";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";
import Transection from "./pages/Transection";


import { history } from "./redux/store";
import { useDispatch } from "react-redux";
import { checkLogin } from "./redux/modules/user";


function App() {

  const dispatch = useDispatch();

  // React.useEffect(()=>{
  //   const cookies = new Cookies();
  //   const token = cookies.get("token"); 

  //   console.log("token? :::", token);
  //   if (token === undefined) {
  //       dispatch(checkLogin(false));
  //       history.push("/login");
  //       console.log("token is undefined");
  //   } else if (token !== undefined) {
  //       apis
  //           .loginCheckAX(token)
  //           .then((res) => {
  //               if (res.data.msg === "fail") {
  //                   alert("로그인상태 인증 에러");
  //                   dispatch(checkLogin(false));
  //                   history.push('/login');

  //               } else if (res.data.msg === "success") {
  //                 dispatch(checkLogin(true));
  //                   console.log("res:::", res);
  //                   history.push('/');
  //               }
  //           })
  //           .catch((err) => {
  //               console.log(err)
  //           })
  //       }
  // },[])

  return (
    <ConnectedRouter history={history}>
     <Route path="/" exact component={Main}/>
     <Route path="/login" exact component={Login}/>
     <Route path="/signup" exact component={Signup}/>
     <Route path="/detail:" exact component={Detail}/>
     <Route path="/test" exact component={Transection}/>
    </ConnectedRouter>
  );
}

export default App;
