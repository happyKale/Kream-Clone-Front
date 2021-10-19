import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import Main from "./pages/Main";
import User from "./pages/User";
import Detail from "./pages/Detail";
import MyPage from "./pages/MyPage";

import { history } from "./redux/store";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Main} />
      <Route path="/user" exact component={User} />
      <Route path="/mypage" exact component={MyPage} />
      <Route path="/detail/:productId" exact component={Detail} />
    </ConnectedRouter>
  );
}

export default App;
