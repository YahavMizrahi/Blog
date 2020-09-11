import React from "react";
import { Link } from "react-router-dom";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  let draweClasses = "side-drawer";
  if (props.show) {
    draweClasses = "side-drawer open";
  }

  return (
    <nav className={draweClasses}>
      <div>
        <Link className="item" to="/">
          Home
        </Link>
      </div>
      <div>
        <Link className="item" to="/register">
          Register
        </Link>
      </div>
      <div>
        <Link className="item" to="/login">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default SideDrawer;
