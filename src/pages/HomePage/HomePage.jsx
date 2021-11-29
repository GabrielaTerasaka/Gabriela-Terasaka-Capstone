import jwt_decode from "jwt-decode";
import React from "react";
import GrocerySummary from "../../components/GrocerySummary";
import RecipeSummary from "../../components/RecipeSummary";
import PantrySummary from "../../components/PantrySummary";
import NoAccess from "../../components/NoAccess";
import Sidebar from "../../components/Sidebar";

import UserHeader from "../../components/UserHeader";

import "./HomePage.scss";

export default class HomePage extends React.Component {
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
      // console.log(decode);
    }
  }

  render() {
    const date = new Date(Date.now());
    const format = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const { user } = this.state;
    console.log(user);
    return (
      <div>
        {!sessionStorage.getItem("authorization") && <NoAccess />}
        {sessionStorage.getItem("authorization") && user && (
          <>
            <UserHeader />
            <main className="home">
              <div className="home__title-wrapper">
                <p className="home__date">{`${date.toLocaleDateString(
                  "en-US",
                  format
                )}`}</p>
                <h2 className="home__title">Hello, {user.first_name}!</h2>
                <div className="home__summary-wrapper">
                  <GrocerySummary user={user} />
                  <PantrySummary user={user} />
                  <RecipeSummary user={user} />
                </div>
              </div>
            </main>
            <Sidebar isActive={"Home"} />
          </>
        )}
      </div>
    );
  }
}
