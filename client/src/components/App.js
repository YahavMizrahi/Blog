import React, { useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import history from "../history";
import SideDrawer from "./SideDrawer/SideDrawer";
import BackDrop from "../components/BackDrop/BackDrop";
import PostsList from "./posts/PostsList";
import PostAdd from "./posts/PostAdd";
import PostEdit from "./posts/PostEdit";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import PostShow from "./posts/PostShow";

const App = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerNavbarClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;
  if (sideDrawerOpen) {
    backdrop = <BackDrop click={backdropClickHandler} />;
  }

  return (
    <Router history={history}>
      <div className="App" style={{ height: "100%" }}>
        <Navbar drawerClickHandler={drawerNavbarClickHandler} />
        <SideDrawer show={sideDrawerOpen} />
        {backdrop}
        <Switch>
          <Redirect exact from="/" to="/blog/posts" />
          <Route path="/blog/posts" exact component={PostsList} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/blog/newPost" exact component={PostAdd} />
          <Route path="/blog/post/edit/:id" exact component={PostEdit} />
          <Route path="/blog/post/:id" exact component={PostShow} />s
        </Switch>
      </div>
    </Router>
  );
};

export default App;
