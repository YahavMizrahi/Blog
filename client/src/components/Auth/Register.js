import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { server } from "../../apis/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUnlockAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import "./Auth.css";

const Register = (props) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [errorForm, setErrorForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });
  const [redirect, setRedirect] = useState(false);

  const onClickSignUp = async (event) => {
    event.preventDefault();
    if (validateForm(errorForm)) {
      server.post("/registerRequest", newUser).then(
        (response) => {
          console.log("The User As Been Added.", response.data);
          setRedirect(response.data);
        },
        (error) => {
          console.log(error);
          console.log("The username is already in use.");
        }
      );
      setNewUser({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
      });
    } else {
      alert(`The form don't complate`);
    }
  };

  const setErrMessege = (event) => {
    const { name, value } = event.target;
    let formErrors = errorForm;
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 && value.length > 0
            ? "Minmum 3 characters required"
            : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 && value.length > 0
            ? "Minmum 3 characters required"
            : "";
        break;

      case "email":
        formErrors.email =
          validEmailRegex.test(value) && value.length > 0
            ? ""
            : "Invalid email address";
        break;

      case "password":
        formErrors.password =
          value.length < 8 && value.length > 0
            ? "Minmum 8 characters required"
            : "";
        break;

      case "username":
        formErrors.username =
          value.length < 5 && value.length > 0
            ? "Minmum 5 characters required"
            : "";
        break;
      default:
        break;
    }
    return formErrors;
  };

  const changeHandler = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    let formErrors = errorForm;
    formErrors = setErrMessege(event);
    setErrorForm({ ...formErrors });

    setNewUser({ ...newUser, [name]: value });
  };

  const renderRedirect = () => {
    if (redirect) return <Redirect to="/login" />;
  };

  const validEmailRegex = RegExp(
    /^(([^<>()[\].,;:s@"]+(.[^<>()[\].,;:s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i
  );

  const validateForm = (formErrors) => {
    let valid = true;
    const errorMessages = {
      username: "Must Enter Username",
      password: "Must Enter Password",
      firstName: "Must Enter Name",
      lastName: "Must Enter Last Name",
      email: "Must Enter Email",
    };
    Object.values(formErrors).forEach((val) => {
      val.length > 0 && (valid = false);
    });
    Object.values(newUser).forEach((val) => {
      if (val.length === 0) {
        valid = false;
        setErrorForm({ ...errorMessages });
      }
    });

    return valid;
  };
  const userDetails = JSON.parse(localStorage.getItem("whoSignIn"));

  if (userDetails) return <div>You are already logged in</div>;
  return (
    <div>
      <h2 className="header-form">CREATE ACOUNT</h2>

      <div className="container-grid">
        <form
          className="grid-form"
          onSubmit={(event) => onClickSignUp(event)}
          onChange={(event) => changeHandler(event)}
        >
          <div className="form-item">
            <label className="labelName">First Name:</label>

            <input
              className="field-input"
              onChange={(event) => changeHandler(event)}
              name="firstName"
              placeholder="First name"
              value={newUser.firstName}
            />
            <span className="err-msg">{errorForm.firstName}</span>
          </div>

          <div className="form-item">
            <label className="labelName">Last Name:</label>
            <input
              className="field-input"
              onChange={(event) => changeHandler(event)}
              name="lastName"
              placeholder="Last name"
              value={newUser.lastName}
            />
            <span className="err-msg">{errorForm.lastName}</span>
          </div>

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
              className="field-input"
              onChange={(event) => changeHandler(event)}
              name="username"
              placeholder="Username"
              value={newUser.username}
            />
            <span className="err-msg">{errorForm.username}</span>
          </div>

          <div className="form-item">
            <label className="labelName">
              {" "}
              <FontAwesomeIcon
                style={{ marginRight: "5px" }}
                className="user-icon"
                icon={faEnvelope}
              />{" "}
              Email:
            </label>
            <input
              className="field-input"
              onChange={(event) => changeHandler(event)}
              type="email"
              name="email"
              placeholder="Your email"
              value={newUser.email}
            />
            <span className="err-msg">{errorForm.email}</span>
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
              className="field-input"
              onChange={(event) => changeHandler(event)}
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
            />
            <span className="err-msg">{errorForm.password}</span>
          </div>
          <div className=" grid-btn">
            <button
              className="blue-background btn "
              type="submit"
              action="/login"
            >
              Sign Up
            </button>
            {renderRedirect()}

            <Link to="/login">
              <button className="blue-border btn ">
                I already have a user
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
