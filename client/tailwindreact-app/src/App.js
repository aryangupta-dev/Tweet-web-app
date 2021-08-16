import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Headbar from "./Component/Headbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";

import TwitSupport from "./pages/TwitSupport";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/auth/login"></Redirect>
          </Route>
          <Route path="/twitsupport">
            <Headbar />
            <TwitSupport />
          </Route>
          <Route path="/posts">
            <Headbar />
            <Home />
          </Route>
          <Route path="/auth" exact>
            <Registration/>
          </Route>
          <Route path="/profile" exact>
            <Headbar/>
            <Profile/>
          </Route>
          <Route path="/auth/login" exact><Login/></Route>
          <Route path="/post/:id" exact>
            <Headbar/>
            <Post/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
