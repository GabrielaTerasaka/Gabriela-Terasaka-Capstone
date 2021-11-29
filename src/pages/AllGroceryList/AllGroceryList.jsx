import jwt_decode from "jwt-decode";
import React from "react";
import { Link, Redirect } from "react-router-dom";

import NoAccess from "../../components/NoAccess";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader";

import "./AllGroceryList.scss";

export default class AllGroceryList extends React.Component {
  state = {
    user: null,
    allGroceryList: [],
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
    const { user } = this.state;
    const allGroceryList = [
      { id: 1, title: "list 1", shared_users: [] },
      { id: 2, title: "list 2", shared_users: ["person 1", "person 2"] },
      {
        id: 3,
        title: "list 3",
        shared_users: ["person 2", "person 3", "person 7"],
      },
      { id: 4, title: "list 4", shared_users: [] },
    ];
    return (
      <div>
        {!sessionStorage.getItem("authorization") && <NoAccess />}
        {sessionStorage.getItem("authorization") && user && (
          <>
            <UserHeader />
            <main className="grocery">
              <div className="grocery__wrapper">
                <h2 className="grocery__title">Grocery List</h2>
                <div className="grocery__content-wrapper">
                  <div className="grocery__description-wrapper">
                    <h4 className="grocery__description-left">List Name</h4>
                    <h4 className="grocery__description-right">Shared with</h4>
                  </div>
                  <ul className="grocery__list">
                    {allGroceryList.map((list) => (
                      <Link
                        className="grocery__link"
                        key={list.id}
                        to={`/grocery/${list.id}`}
                      >
                        <p className="grocery__link-name">{list.title}</p>
                        <p className="grocery__link-shared">
                          {list.shared_users.length !== 0
                            ? list.shared_users.join(", ")
                            : "---"}
                        </p>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            </main>
            <Sidebar isActive={"Grocery Lists"} />
          </>
        )}
      </div>
    );
  }
}
