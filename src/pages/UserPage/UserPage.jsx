import jwt_decode from "jwt-decode";
import React from "react";
import NoAccess from "../../components/NoAccess";
import Sidebar from "../../components/Sidebar/Sidebar";

import UserHeader from "../../components/UserHeader";

import "./UserPage.scss";

export default class UserPage extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    if (sessionStorage.getItem("authorization")) {
      const decode = jwt_decode(
        sessionStorage.getItem("authorization").split(" ")[1]
      );
      this.setState({
        user: decode,
      });
      console.log(decode);
    }
  }

  render() {
    return (
      <div>
        {!sessionStorage.getItem("authorization") && <NoAccess />}
        {sessionStorage.getItem("authorization") && (
          <>
            <UserHeader />
            <h1>Hello User</h1>
            <Sidebar isActive={"Home"} />
          </>
        )}
      </div>
    );
  }
}
