import "./UserForm.scss";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class LoginSignUpPage extends React.Component {
  state = {
    isErrorFirstName: false,
    isErrorLastName: false,
    isErrorEmail: false,
    isErrorPassword: false,
    isErrorConfirmPassword: false,
    confirmPasswordMessage: null,
    emailMessage: null,
    passwordMessage: null,
    passwordEntered: null,
    redirect: null,
  };

  checkSignUpInputs = (e) => {
    const { firstName, lastName, email, password, confirmPassword } = e.target;
    if (
      !firstName.value ||
      !lastName.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      let msg = "required";
      const emailMsg = "required";

      if (confirmPassword.value !== password.value) {
        msg = "does not match password";
      }
      this.setState({
        isErrorFirstName: firstName.value ? false : true,
        isErrorLastName: lastName.value ? false : true,
        isErrorEmail: email.value ? false : true,
        isErrorPassword: password.value ? false : true,
        isErrorConfirmPassword:
          confirmPassword.value && confirmPassword.value !== password.value
            ? false
            : true,
        confirmPasswordMessage: msg,
        emailMessage: email.value ? false : emailMsg,
      });
      return true;
    }
  };

  checkSignInInputs = (e) => {
    const { email, password } = e.target;
    if (!email.value || !password.value) {
      const emailMsg = "required";
      const passwordMsg = "required";

      this.setState({
        isErrorEmail: email.value ? false : true,
        isErrorPassword: password.value ? false : true,
        emailMessage: email.value ? false : emailMsg,
        passwordMessage: password.value ? false : passwordMsg,
      });
      return true;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isSignUp = this.props.isSignUp;

    if (isSignUp) {
      if (this.checkSignUpInputs(e)) return;
      const { firstName, lastName, email, password } = e.target;
      const signUpInfo = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        password: password.value,
      };
      axios
        .post(`https://shrouded-peak-10650.herokuapp.com/signup`, signUpInfo)
        .then((response) => {
          sessionStorage.setItem("authorization", `Bearer ${response.data}`);
          e.target.reset();
          window.history.pushState(null, "Home Page", "/home");
          this.setState({ redirect: <Redirect to="/home" /> });
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 401") {
            this.setState({
              isErrorEmail: true,
              emailMessage: "email already registered",
            });
          }
          return;
        });
    } else {
      if (this.checkSignInInputs(e)) return;
      const { email, password } = e.target;
      const signInInfo = {
        email: email.value,
        password: password.value,
      };

      axios
        .post(`https://shrouded-peak-10650.herokuapp.com/login`, signInInfo)
        .then((response) => {
          sessionStorage.setItem("authorization", `Bearer ${response.data}`);
          e.target.reset();
          window.history.pushState(null, "Home Page", "/home");
          this.setState({ redirect: <Redirect to="/home" /> });
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 401") {
            this.setState({
              isErrorPassword: true,
              passwordMessage: "invalid password",
            });
          } else if (err.message === "Request failed with status code 400") {
            this.setState({
              isErrorEmail: true,
              emailMessage: "invalid email",
            });
          }
        });
      return;
    }
  };

  handleChange = (e) => {
    const inputName = e.target.name;
    if (inputName === "confirmPassword") {
      let msg = "required";
      if (e.target.value !== this.state.passwordEntered) {
        msg = "does not match password";
        this.setState({
          confirmPasswordMessage: msg,
          [`isError${inputName[0].toUpperCase() + inputName.slice(1)}`]: true,
        });
      } else {
        this.setState({
          [`isError${inputName[0].toUpperCase() + inputName.slice(1)}`]: false,
        });
      }
    } else if (inputName === "password") {
      this.setState({
        [`isError${inputName[0].toUpperCase() + inputName.slice(1)}`]: false,
        passwordEntered: e.target.value,
      });
    } else {
      this.setState({
        [`isError${inputName[0].toUpperCase() + inputName.slice(1)}`]: false,
      });
    }
  };

  render() {
    const {
      isErrorFirstName,
      isErrorLastName,
      isErrorEmail,
      isErrorPassword,
      isErrorConfirmPassword,
      confirmPasswordMessage,
      emailMessage,
      passwordMessage,
    } = this.state;
    const isSignUp = this.props.isSignUp;
    return (
      <form onSubmit={this.handleSubmit} className="form">
        {isSignUp ? (
          <>
            <div className="form__name-wrapper">
              <label className="form__label-name">
                First Name
                <input
                  type="text"
                  placeholder="First Name"
                  className={`form__first-name ${
                    isErrorFirstName ? "form__input-error" : ""
                  }`}
                  name="firstName"
                  onChange={this.handleChange}
                />
                {isErrorFirstName ? (
                  <span className="form__alert">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="form__alert-icon"
                    />
                    required
                  </span>
                ) : (
                  ""
                )}
              </label>
              <label className="form__label-name">
                Last Name
                <input
                  type="text"
                  placeholder="Last Name"
                  className={`form__last-name ${
                    isErrorLastName ? "form__input-error" : ""
                  }`}
                  name="lastName"
                  onChange={this.handleChange}
                />
                {isErrorLastName ? (
                  <span className="form__alert">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="form__alert-icon"
                    />
                    required
                  </span>
                ) : (
                  ""
                )}
              </label>
            </div>
          </>
        ) : (
          ""
        )}
        <label className="form__label-email">
          Email
          <input
            type="email"
            placeholder="Email"
            className={`form__email ${isErrorEmail ? "form__input-error" : ""}`}
            name="email"
            onChange={this.handleChange}
          />
          {isErrorEmail ? (
            <span className="form__alert">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="form__alert-icon"
              />
              {emailMessage}
            </span>
          ) : (
            ""
          )}
        </label>
        <div className="form__password-wrapper">
          <label className="form__label-password">
            Password
            <input
              type="password"
              placeholder="Password"
              className={`form__password ${
                isErrorPassword ? "form__input-error" : ""
              }`}
              name="password"
              onChange={this.handleChange}
            />
            {isErrorPassword ? (
              <span className="form__alert">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="form__alert-icon"
                />
                {`${isSignUp ? "required" : passwordMessage}`}
              </span>
            ) : (
              ""
            )}
          </label>
          {isSignUp ? (
            <>
              <label
                htmlFor="confirm_password"
                className="form__label-password"
              >
                Confirm Password
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`form__confirm-password ${
                    isErrorConfirmPassword ? "form__input-error" : ""
                  }`}
                  name="confirmPassword"
                  onChange={this.handleChange}
                />
                {isErrorConfirmPassword ? (
                  <span className="form__alert">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="form__alert-icon"
                    />
                    {confirmPasswordMessage}
                  </span>
                ) : (
                  ""
                )}
              </label>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="form__buttons-wrapper">
          <button type="submit" className="form__submit">
            {isSignUp ? "Sign up" : "Sign in"}
          </button>
        </div>
        {this.state.redirect}
      </form>
    );
  }
}
