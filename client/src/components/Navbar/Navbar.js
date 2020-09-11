import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut, signIn } from "../../redux/action";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

import "./Navbar.css";
import logo from "./NationalGeographicLogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";

const Navbar = ({
  drawerClickHandler,
  isSignedIn,
  userDetails,
  signOut,
  signIn,
}) => {
  useEffect(() => {
    const setStorage = () => {
      const currUser = JSON.parse(localStorage.getItem("whoSignIn"));
      if (currUser) signIn(currUser);
    };
    setStorage();
  }, [signIn]);

  const renderIfLogin = () => {
    if (isSignedIn) {
      return (
        <div className="navbar__navigation-right-items">
          <Link
            className="item"
            to="/user"
            style={{
              borderLeft: "solid 1px #8685856e",
            }}
          >
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              className="user-icon"
              icon={faUser}
            />
            {userDetails.username}
          </Link>

          <Link
            style={{
              borderLeft: "solid 1px #8685856e",
              borderRight: "solid 1px #8685856e",
            }}
            onClick={clickOnSignOut}
            className="item"
            to="/login"
          >
            Logout
          </Link>
        </div>
      );
    }
    return (
      <div className="navbar__navigation-right-items">
        <Link
          className="item"
          to="/register"
          style={{
            borderLeft: "solid 1px #8685856e",
          }}
        >
          Sign Up
        </Link>
        <Link
          className="item"
          to="/login"
          style={{
            borderLeft: "solid 1px #8685856e",
            borderRight: "solid 1px #8685856e",
          }}
        >
          Login
        </Link>
      </div>
    );
  };
  const clickOnSignOut = () => {
    signOut();
    localStorage.clear();
  };

  return (
    <header className="navbar">
      <nav className="navbar__navigation">
        <div className="navbar__toggle-button">
          <DrawerToggleButton click={drawerClickHandler} />
        </div>
        <Link className="navbar__logo" to="/blog/posts">
          <img className="blog-logo" alt="logo" src={logo} />
        </Link>

        <div className="navbar__navigation-left-items">
          <Link
            className="item"
            to="/blog/posts"
            style={{
              borderLeft: "solid 1px #8685856e",
              borderRight: "solid 1px #8685856e",
            }}
          >
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              className="user-icon"
              icon={faHome}
            />
            Home
          </Link>
        </div>

        {renderIfLogin()}
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userDetails: JSON.parse(localStorage.getItem("whoSignIn")) || null,
  };
};
export default connect(mapStateToProps, { signOut, signIn })(Navbar);
