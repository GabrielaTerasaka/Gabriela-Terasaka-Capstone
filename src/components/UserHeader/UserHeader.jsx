import { Link } from "react-router-dom";

import logo from "../../assets/logo/MyFoodies_logo.svg";
import "./UserHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

class UserHeader extends React.Component {
  state = {
    dropdownShowing: false,
  };
  signOut = () => {
    sessionStorage.clear();
  };
  toggleDropDown = () => {
    this.setState({
      dropdownShowing: this.state.dropdownShowing ? false : true,
    });
  };
  render() {
    return (
      <>
        <header className="user-header">
          <div className="user-header__wrapper">
            <Link to="/home" className="user-header__logo-link">
              <img
                src={logo}
                alt="MyPantry logo"
                className="user-header__logo"
              />
            </Link>
            <FontAwesomeIcon
              icon={faUserCircle}
              className="user-header__icon--main"
              onClick={this.toggleDropDown}
            />
          </div>
        </header>
        <div
          className={`user-header__dropdown ${
            this.state.dropdownShowing ? "user-header__dropdown--active" : ""
          }`}
        >
          <Link to="/profile" className="user-header__link">
            <FontAwesomeIcon icon={faUser} className="user-header__icon" />
            <span className="user-header__icon-text">Profile</span>
          </Link>
          <Link to="/" className="user-header__link" onClick={this.signOut}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="user-header__icon"
            />
            <span className="user-header__icon-text">Log Out</span>
          </Link>
        </div>
      </>
    );
  }
}

export default UserHeader;
