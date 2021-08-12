import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Headbar from "./Component/Headbar";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Registration from "./pages/Registration";

import TwitSupport from "./pages/TwitSupport";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/posts"></Redirect>
          </Route>
          <Route path="/twitsupport">
            <Headbar />
            <TwitSupport />
          </Route>
          <Route path="/posts">
            <Headbar />
            <Home />
          </Route>
          <Route path="/auth">
            <Registration/>
          </Route>
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
