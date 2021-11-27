import "./UserForm.scss";

import React from "react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class LoginSignUpPage extends React.Component {
  state = {
    // isSignUp: null,
    isErrorFirstName: false,
    isErrorLastName: false,
    isErrorEmail: false,
    isErrorPassword: false,
    isErrorConfirmPassword: false,
    confirmPasswordMessage: null,
    passwordEntered: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isSignUp = this.props.isSignUp;

    if (isSignUp) {
      const { firstName, lastName, email, password, confirmPassword } =
        e.target;
      if (
        !firstName.value ||
        !lastName.value ||
        !email.value ||
        !password.value ||
        !confirmPassword.value
      ) {
        let msg = "required";
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
        });
      }
    } else {
      const { email, password } = e.target;
      if (!email.value || !password.value) {
        this.setState({
          isErrorEmail: email.value ? false : true,
          isErrorPassword: password.value ? false : true,
        });
      }
    }

    e.target.reset();
  };

  handleChange = (e) => {
    const inputName = e.target.name;
    if (inputName === "confirmPassword") {
      let msg = "required";
      console.log(e.target.value);
      console.log(this.state.passwordEntered);
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

  // componentDidMount() {
  //   this.setState({
  //     isSignUp: this.props.match.path === "/signup" ? true : false,
  //   });
  // }
  // componentDidUpdate() {
  //   this.setState({});
  // }

  render() {
    const {
      // isSignUp,
      isErrorFirstName,
      isErrorLastName,
      isErrorEmail,
      isErrorPassword,
      isErrorConfirmPassword,
      confirmPasswordMessage,
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
              required
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
                required
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
      </form>
    );
  }
}
