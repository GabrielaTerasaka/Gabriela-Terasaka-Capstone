import { Link } from "react-router-dom";
// import logo from "../../assets/logo/MyFoodies_logo_new.png";
import logo from "../../assets/logo/MyFoodies_logo.svg";
import "./HomeHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faSignInAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

class HomeHeader extends React.Component {
  state = {
    isNavOpen: false,
  };

  toggleNavIcon = () => {
    this.setState({
      isNavOpen: this.state.isNavOpen ? false : true,
    });
  };

  render() {
    return (
      <header className="header">
        <div className="header__wrapper">
          <Link to="/home">
            <img src={logo} alt="MyPantry logo" className="header__logo" />
          </Link>
          <div className="header__navbar-icon" onClick={this.toggleNavIcon}>
            {this.state.isNavOpen ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </div>
        </div>
        <nav
          className={`header__navbar  ${
            this.state.isNavOpen ? "header__navbar--active" : ""
          }`}
        >
          <Link to="/signin" className="header__login">
            <FontAwesomeIcon icon={faSignInAlt} className="header__icon" />
            Sign in
          </Link>
          <Link to="/signup" className="header__sign-up">
            <FontAwesomeIcon icon={faUser} className="header__icon" />
            New Account
          </Link>
        </nav>
      </header>
    );
  }
}

export default HomeHeader;
