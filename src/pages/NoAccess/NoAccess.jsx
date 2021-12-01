import "./NoAccess.scss";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NoAccess() {
  return (
    <>
      <UserHeader />
      <h1 className="access__title">
        You have logged out! Please Sign In or Create a New Account!
      </h1>
      <nav className={`access__navbar`}>
        <Link to="/signin" className="access__login">
          <FontAwesomeIcon icon={faSignInAlt} className="access__icon" />
          Sign in
        </Link>
        <Link to="/signup" className="access__sign-up">
          <FontAwesomeIcon icon={faUser} className="access__icon" />
          New Account
        </Link>
      </nav>
      <Sidebar />
    </>
  );
}

export default NoAccess;
