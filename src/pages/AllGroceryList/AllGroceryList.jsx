import jwt_decode from "jwt-decode";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import NoAccess from "../../pages/NoAccess";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader";

import "./AllGroceryList.scss";
import Loading from "../../components/Loading";

export default class AllGroceryList extends React.Component {
  state = {
    user: null,
    allGroceryList: [],
    isLoading: true,
  };

  addNewList = () => {
    const token = sessionStorage.getItem("authorization");
    axios
      // .post(`http://localhost:8080/grocery`, {
      //   headers: { Authorization: token },
      // })
      .post(`https://shrouded-peak-10650.herokuapp.com/grocery`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        // console.log(response.data);
        window.location.href = `/grocery/${response.data[0]}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    if (sessionStorage.getItem("authorization")) {
      const decode = jwt_decode(
        sessionStorage.getItem("authorization").split(" ")[1]
      );
      const token = sessionStorage.getItem("authorization");
      axios
        // .get(`http://localhost:8080/grocery`, {
        //   headers: { Authorization: token },
        // })
        .get(`https://shrouded-peak-10650.herokuapp.com/grocery`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          // console.log(response.data);
          const userList = response.data;
          axios
            // .get(`http://localhost:8080/grocery-users`, {
            //   headers: { Authorization: token },
            // })
            .get(`https://shrouded-peak-10650.herokuapp.com/grocery-users`, {
              headers: { Authorization: token },
            })
            .then((res) => {
              // console.log(res.data);
              const sharedLists = res.data;
              const allListInfo = userList.map((list) => {
                return {
                  ...list,
                  shared_users: sharedLists
                    .filter((sharedList) => sharedList.list_id === list.id)
                    .map((user) => user.shared_user_name),
                };
              });
              // console.log(allListInfo);
              this.setState({
                allGroceryList: allListInfo,
                user: decode,
                isLoading: false,
              });
            });
          // this.setState({
          //   currentLists: response.data,
          // });
        })
        .catch((err) => {
          console.log(err);
        });
      // this.setState({
      //   user: decode,
      // });
      // console.log(decode);
    }
  }

  render() {
    const { user, allGroceryList, isLoading } = this.state;
    // const allGroceryList = [
    //   { id: 1, title: "list 1", shared_users: [], owner: "person 1" },
    //   {
    //     id: 2,
    //     title: "list 2",
    //     shared_users: ["person 1", "person 2"],
    //     owner: "person 1",
    //   },
    //   {
    //     id: 3,
    //     title: "list 3",
    //     shared_users: ["person 2", "person 3", "person 7"],
    //     owner: "person 1",
    //   },
    //   { id: 4, title: "list 4", shared_users: [], owner: "person 1" },
    // ];
    return (
      <div>
        {!sessionStorage.getItem("authorization") && <NoAccess />}
        {sessionStorage.getItem("authorization") && (
          <>
            <UserHeader />
            {isLoading && <Loading />}
            {user && (
              <main className="grocery">
                <div className="grocery__wrapper">
                  <h2 className="grocery__title">Grocery List</h2>
                  <div className="grocery__content-wrapper">
                    <div className="grocery__description-wrapper">
                      <h4 className="grocery__description-left">List Name</h4>
                      <h4 className="grocery__description-middle">Owner</h4>
                      <h4 className="grocery__description-right">
                        Shared with
                      </h4>
                    </div>
                    <ul className="grocery__list">
                      {allGroceryList.map((list) => (
                        <Link
                          className="grocery__link"
                          key={list.id}
                          to={`/grocery/${list.id}`}
                          // listId={list.id}
                        >
                          <p className="grocery__link-name">{list.title}</p>
                          <p className="grocery__link-owner">{list.owner}</p>
                          <p className="grocery__link-shared">
                            {list.shared_users.length !== 0
                              ? list.shared_users.join(", ")
                              : "---"}
                          </p>
                        </Link>
                      ))}
                    </ul>
                  </div>
                  <div className="grocery__button-wrapper">
                    <p
                      className="grocery__add-button"
                      onClick={this.addNewList}
                    >
                      + Add New List
                    </p>
                  </div>
                </div>
              </main>
            )}

            <Sidebar isActive={"Grocery Lists"} />
          </>
        )}
      </div>
    );
  }
}
