import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";

import { history } from "./redux/store";


function App() {

  return (
    <ConnectedRouter history={history}>
     <Route path="/" exact component={Main}/>
     <Route path="/login" exact component={Login}/>
     <Route path="/signup" exact component={Signup}/>
     <Route path="/detail:" exact component={Detail}/>
    </ConnectedRouter>
  );
}

export default App;
