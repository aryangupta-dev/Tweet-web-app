import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Headbar from "./Component/Headbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import YourPosts from "./pages/YourPosts";

import TwitSupport from "./pages/TwitSupport";
import UpdatePassword from "./pages/UpdatePassword";

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
          <Route path="/posts" exact>
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
          <Route path="/userposts/:id" exact>
            <Headbar/>
            <YourPosts/>
          </Route>
          <Route path="/auth/login" exact><Login/></Route>
          <Route path="/post/:id" exact>
            <Headbar/>
            <Post/>
          </Route>
          <Route path="/changepassword" exact>
            <Headbar/>
            <UpdatePassword/>
          </Route>
          <Route path="*" >
            <PageNotFound/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
