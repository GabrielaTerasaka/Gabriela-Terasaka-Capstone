import jwt_decode from "jwt-decode";
import React from "react";
import UserHeader from "../../components/UserHeader";

export default class UserPage extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const decode = jwt_decode(
      sessionStorage.getItem("authorization").split(" ")[1]
    );
    this.setState({
      user: decode,
    });
    console.log(decode);
  }

  render() {
    return (
      <div>
        <UserHeader />
        <h1>Hello User</h1>
      </div>
    );
  }
}
