import { Link } from "react-router-dom";
import logo from "../../assets/logo/MyFoodies_logo_new.png";
import "./HomeHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCoffee, faTimes } from "@fortawesome/free-solid-svg-icons";
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
        <nav
          className={`header__navbar  ${
            this.state.isNavOpen ? "header__navbar--active" : ""
          }`}
        >
          <Link to="/home" className="header__login">
            Log in
          </Link>
          <Link to="/home" className="header__sign-up">
            Sign up
          </Link>
        </nav>
      </header>
    );
  }
}

export default HomeHeader;
