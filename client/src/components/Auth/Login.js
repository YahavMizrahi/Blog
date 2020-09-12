import React from "react";
import { Link } from "react-router-dom";
import { server } from "../../apis/server";
import { connect } from "react-redux";
import { signIn } from "../../redux/action";
import history from "../../history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import "./Auth.css";

function Login({ signIn }) {
  const onClickLogin = async (event) => {
    event.preventDefault();

    const usernameLogin = {
      name: event.target[0].name,
      value: event.target[0].value,
    };
    const passwordLogin = {
      name: event.target[1].name,
      value: event.target[1].value,
    };

    server
      .post("/loginRequest", {
        username: usernameLogin.value,
        password: passwordLogin.value,
      })
      .then(
        (response) => {
          const userDetails = response.data;
          localStorage.setItem("whoSignIn", JSON.stringify(userDetails));
          signIn(userDetails);
          history.push("/blog/posts");
        },
        (error) => {
          console.log(error);
          alert(error + " ,username or password are incorrect");
        }
      );
    event.target[0].value = "";
    event.target[1].value = "";
  };

  const userDetails = JSON.parse(localStorage.getItem("whoSignIn"));

  if (userDetails) return <div>You are already logged in</div>;
  return (
    <div>
      <h2 className="header-form">SIGN IN</h2>
      <div className="container-grid">
        <form className="grid-form" onSubmit={(event) => onClickLogin(event)}>
          <div className="form-item">
            <label className="labelName">
              {" "}
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                className="user-icon"
                icon={faUser}
              />
              Username:
            </label>
            <input
              name="uesrname"
              className="field-input"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="form-item">
            <label className="labelName">
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                className="user-icon"
                icon={faUnlockAlt}
              />
              Password:
            </label>
            <input
              name="password"
              className="field-input"
              type="password"
              placeholder="Password"
            ></input>
          </div>
          <div>
            <div className="form-item grid-btn">
              <button className="blue-background btn " type="submit">
                Login
              </button>

              <Link to="/Register">
                <button className="blue-border btn ">Sign Up</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default connect(null, { signIn })(Login);
