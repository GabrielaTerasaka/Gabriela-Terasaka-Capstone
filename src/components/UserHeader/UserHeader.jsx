import { Link } from "react-router-dom";
// import logo from "../../assets/logo/MyFoodies_logo_new.png";
import logo from "../../assets/logo/MyFoodies_logo.svg";
import "./UserHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

class UserHeader extends React.Component {
  state = {
    isNavOpen: false,
  };

  // toggleNavIcon = () => {
  //   if (window.innerWidth < 768) {
  //     this.setState({
  //       isNavOpen: this.state.isNavOpen ? false : true,
  //     });
  //   }
  // };

  signOut = () => {
    sessionStorage.clear();
  };

  render() {
    return (
      <>
        <header
          // className={`header ${this.state.isNavOpen ? "header--active" : ""}`}
          className={`header`}
        >
          <div className="header__wrapper">
            <Link to="/home">
              <img src={logo} alt="MyPantry logo" className="header__logo" />
            </Link>
            {/* <div className="header__navbar-icon" onClick={this.toggleNavIcon}>
              {this.state.isNavOpen ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </div> */}
            <Link
              to="/profile"
              className="header__sign-up"
              // onClick={this.toggleNavIcon}
            >
              <FontAwesomeIcon icon={faUser} className="header__icon" />
              Profile
            </Link>
            <Link to="/" className="header__sign-up" onClick={this.signOut}>
              <FontAwesomeIcon icon={faSignOutAlt} className="header__icon" />
              Sign Out
            </Link>
          </div>
          {/* <nav
            className={`header__navbar  ${
              this.state.isNavOpen ? "header__navbar--active" : ""
            }`}
          >
            <Link
              to="/signin"
              className="header__login"
              onClick={this.toggleNavIcon}
            >
              <FontAwesomeIcon icon={faSignInAlt} className="header__icon" />
              Sign in
            </Link>
            <Link
              to="/signup"
              className="header__sign-up"
              onClick={this.toggleNavIcon}
            >
              <FontAwesomeIcon icon={faUser} className="header__icon" />
              New Account
            </Link>
          </nav> */}
        </header>
        {/* <div className="header__box-empty"></div> */}
      </>
    );
  }
}

export default UserHeader;
