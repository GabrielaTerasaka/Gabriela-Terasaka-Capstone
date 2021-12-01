import jwt_decode from "jwt-decode";
import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import NoAccess from "../../pages/NoAccess";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import "./IndividualGroceryList.scss";
import GroceryItem from "../../components/GroceryItem";

export default class IndividualGroceryList extends React.Component {
  state = {
    user: null,
    groceryListActive: [],
    isRedirect: false,
    isChanged: false,
    idCounter: 0,
    isEditable: false,
    isErrorEmail: false,
    isErrorTitle: false,
    // listInfo: null,
    ownerList: null,
    listName: null,
    sharedUsers: null,
    unitsArr: null,
    categoriesArr: null,
    listId: null,
    hasAccess: false,
  };

  addNewItem = (e) => {
    e.preventDefault();
    // console.log("Add: " + this.state.groceryListActive);
    // const newID =
    //   this.state.idCounter + 1;
    // console.log(newID);
    const newList = this.state.groceryListActive;
    newList.push({
      ingredient: "",
      quantity: "",
      unit: "0",
      category: "",
      brand: "",
      shelf_life: "",
      ingredientID: this.state.idCounter,
      // ingredientID: newID,
      isChecked: false,
      // isChanged: false,
    });
    this.setState({
      groceryListActive: newList,
      idCounter: this.state.idCounter + 1,
    });
  };

  handleDelete = (index) => {
    const newList = this.state.groceryListActive;
    newList.splice(index, 1);
    console.log(newList);
    this.setState({
      groceryListActive: newList,
      isChanged: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(e);
    const selectedItems = this.state.groceryListActive.filter(
      (item) => item.isChecked
    );
    console.log(selectedItems);
    const notSelectedItems = this.state.groceryListActive.filter(
      (item) => !item.isChecked
    );
    // console.log(notSelectedItems);
    // listArr = [...notSelectedItems];
    this.setState({
      groceryListActive: notSelectedItems,
      isChanged: true,
    });
  };

  handleChange = (e, index, name) => {
    // e.preventDefault();
    const additionalItem = this.state.groceryListActive;
    // let listArr;
    console.log(e.target.name);
    // console.log(e.target.checked);
    console.log(e.target.value);
    // console.log(index);
    if (name === "checkbox") {
      additionalItem[index]["isChecked"] = e.target.checked;
      console.log(additionalItem);
      // const listArr = [...additionalItem];

      this.setState({
        groceryListActive: additionalItem,
        isChanged: true,
      });
    } else {
      // const additionalItem = this.state.groceryListActive;
      additionalItem[index][name] =
        name === "unit_id" || name === "category_id"
          ? Number(e.target.value)
          : e.target.value;
      console.log(additionalItem[index][name]);
      // listArr = [...additionalItem];
      console.log(additionalItem);

      this.setState({
        groceryListActive: additionalItem,
        isChanged: true,
      });
    }
  };

  toggleEditable = () => {
    this.setState({
      isEditable: this.state.isEditable ? false : true,
    });
  };

  listUpdate = (e) => {
    e.preventDefault();
    const share = e.target.share.value;
    const title = e.target.title.value;
    const removeId = e.target.remove.value;
    const token = sessionStorage.getItem("authorization");
    // const id = this.props.listId;
    const { id } = this.props.match.params;
    // console.log(removeId);

    axios
      // .get(`http://localhost:8080/users`, {
      //   headers: { Authorization: token },
      // })
      .get(`https://shrouded-peak-10650.herokuapp.com/users`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        const allUsers = response.data;
        const foundUser = allUsers.find((user) => user.email === share);

        if (!share) {
          if (!title && !share) {
            this.setState({
              isErrorTitle: true,
              isErrorEmail: false,
            });
            return;
          } else if (removeId !== "none") {
            axios
              // .put(`http://localhost:8080/grocery/${id}`, {
              //   headers: { Authorization: token },
              //   body: { title: title },
              // })
              .put(`https://shrouded-peak-10650.herokuapp.com/grocery/${id}`, {
                headers: { Authorization: token },
                body: { title: title },
              })
              .then((response) => {
                axios
                  // .delete(
                  //   `http://localhost:8080/grocery-users?listId=${id}&userId=${removeId}`,
                  //   {
                  //     headers: { Authorization: token },
                  //     // body: { listId: id, userId: removeId },
                  //   }
                  // )
                  .delete(
                    `https://shrouded-peak-10650.herokuapp.com/grocery-users?listId=${id}&userId=${removeId}`,
                    {
                      headers: { Authorization: token },
                      // body: { listId: id, userId: removeId },
                    }
                  )
                  .then((response) => {
                    const newSharedUsers = this.state.sharedUsers.filter(
                      (user) => user.user_id !== Number(removeId)
                    );
                    // console.log(newSharedUsers);
                    // if(remove)
                    this.setState({
                      listName: title,
                      isEditable: false,
                      isErrorEmail: false,
                      isErrorTitle: false,
                      sharedUsers: newSharedUsers,
                    });
                  });
              });
            return;
          } else {
            axios
              // .put(`http://localhost:8080/grocery/${id}`, {
              //   headers: { Authorization: token },
              //   body: { title: title },
              // })
              .put(`https://shrouded-peak-10650.herokuapp.com/grocery/${id}`, {
                headers: { Authorization: token },
                body: { title: title },
              })
              .then((response) => {
                // console.log(response);
                // if(remove)
                this.setState({
                  listName: title,
                  isEditable: false,
                  isErrorEmail: false,
                  isErrorTitle: false,
                });
              });
            return;
          }
        } else if (!foundUser || !title) {
          this.setState({
            isErrorTitle: !title ? true : false,
            isErrorEmail: !foundUser ? true : false,
          });
          return;
        }
        axios
          // .put(`http://localhost:8080/grocery/${id}`, {
          //   headers: { Authorization: token },
          //   body: { title: title },
          // })
          .put(`https://shrouded-peak-10650.herokuapp.com/grocery/${id}`, {
            headers: { Authorization: token },
            body: { title: title },
          })
          .then((response) => {
            axios
              // .post(`http://localhost:8080/grocery-users`, {
              //   headers: { Authorization: token },
              //   body: { listId: id, userId: foundUser.id },
              // })
              .post(`https://shrouded-peak-10650.herokuapp.com/grocery-users`, {
                headers: { Authorization: token },
                body: { listId: id, userId: foundUser.id },
              })
              .then((response) => {
                console.log(foundUser);

                if (removeId !== "none") {
                  axios
                    // .delete(
                    //   `http://localhost:8080/grocery-users?listId=${id}&userId=${removeId}`,
                    //   {
                    //     headers: { Authorization: token },
                    //     // body: { listId: id, userId: removeId },
                    //   }
                    // )
                    .delete(
                      `https://shrouded-peak-10650.herokuapp.com/grocery-users?listId=${id}&userId=${removeId}`,
                      {
                        headers: { Authorization: token },
                        // body: { listId: id, userId: removeId },
                      }
                    )
                    .then((response) => {
                      // console.log(response);
                      // if(remove)
                      const newSharedUsers = this.state.sharedUsers.filter(
                        (user) => user.user_id !== Number(removeId)
                      );
                      newSharedUsers.push({
                        shared_user_name: foundUser.first_name,
                        list_id: id,
                        user_id: foundUser.id,
                      });
                      this.setState({
                        listName: title,
                        isEditable: false,
                        isErrorEmail: false,
                        isErrorTitle: false,
                        sharedUsers: newSharedUsers,
                      });
                    });

                  return;
                }
                this.setState({
                  listName: title,
                  isEditable: false,
                  sharedUsers: [
                    ...this.state.sharedUsers,
                    {
                      shared_user_name: foundUser.first_name,
                      list_id: id,
                      user_id: foundUser.id,
                    },
                  ],
                  isErrorEmail: false,
                  isErrorTitle: false,
                });
              });
          });
      });
  };

  componentDidMount() {
    // console.log("Mount: " + this.state.groceryListActive);
    // const id = this.props.listId;
    const { id } = this.props.match.params;

    if (sessionStorage.getItem("authorization")) {
      const decode = jwt_decode(
        sessionStorage.getItem("authorization").split(" ")[1]
      );
      const token = sessionStorage.getItem("authorization");
      axios
        // .get(`http://localhost:8080/grocery/${id}`, {
        //   headers: { Authorization: token },
        // })
        .get(`https://shrouded-peak-10650.herokuapp.com/grocery/${id}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          const listInfo = response.data[0];
          console.log(listInfo);

          axios
            // .get(`http://localhost:8080/grocery-users`, {
            //   headers: { Authorization: token },
            // })
            .get(`https://shrouded-peak-10650.herokuapp.com/grocery-users`, {
              headers: { Authorization: token },
            })
            .then((res) => {
              const sharedLists = res.data;
              const sharedUsers = sharedLists.filter(
                (sharedList) => sharedList.list_id === listInfo.id
              );
              console.log(sharedUsers);

              // .map((user) => user.shared_user_name);
              // console.log(
              //   sharedLists.filter(
              //     (sharedList) => sharedList.list_id === listInfo.id
              //   )
              // );
              axios
                // .get(`http://localhost:8080/grocery-items/${id}`, {
                //   headers: { Authorization: token },
                // })
                .get(
                  `https://shrouded-peak-10650.herokuapp.com/grocery-items/${id}`,
                  {
                    headers: { Authorization: token },
                  }
                )
                .then((respo) => {
                  const newListX = respo.data.map((item, i) => {
                    return {
                      ...item,
                      isChecked: false,
                      ingredientID: i + 1,
                    };
                  });
                  // console.log(newListX);
                  // const newList = listArr.map((item, i) => {
                  //   return {
                  //     ...item,
                  //     isChecked: false,
                  //     ingredientID: i + 1,
                  //   };
                  // });
                  axios
                    // .get(`http://localhost:8080/categories`, {
                    //   headers: { Authorization: token },
                    // })
                    .get(
                      `https://shrouded-peak-10650.herokuapp.com/categories`,
                      {
                        headers: { Authorization: token },
                      }
                    )
                    .then((response) => {
                      axios
                        // .get(`http://localhost:8080/units`, {
                        //   headers: { Authorization: token },
                        // })
                        .get(
                          `https://shrouded-peak-10650.herokuapp.com/units`,
                          {
                            headers: { Authorization: token },
                          }
                        )
                        .then((res) => {
                          // console.log("units: " + res.data.join(", "));
                          // console.log(
                          //   "categories: " + response.data.join(", ")
                          // );
                          const foundUser = sharedUsers.find(
                            (user) => user.user_id === decode.id
                          );

                          if (decode.id === listInfo.ownerId || foundUser)
                            console.log("has access");

                          this.setState({
                            user: decode,
                            // groceryListActive: newList,
                            // idCounter: newList.length + 1,
                            groceryListActive: newListX,
                            idCounter: newListX.length + 1,
                            listName: listInfo.title,
                            sharedUsers: sharedUsers,
                            ownerList: listInfo,
                            unitsArr: res.data,
                            categoriesArr: response.data,
                            hasAccess:
                              decode.id === listInfo.ownerId || foundUser
                                ? true
                                : false,
                          });
                          // this.setState({
                          //   unitsArr: res.data,
                          //   categoriesArr: response.data,
                          // });
                        });
                    });
                });
            });
        });

      // console.log(decode);
    }
  }

  // componentDidUpdate(preProps, preState) {
  //   console.log("Update " + this.state.groceryListActive);
  //   // console.log(preState);
  //   if (this.state.isChanged) {
  //     this.setState({
  //       groceryListActive: listArr,
  //       isChanged: false,
  //     });
  //   }
  // }

  render() {
    const {
      user,
      isRedirect,
      groceryListActive,
      isEditable,
      isErrorEmail,
      isErrorTitle,
      listName,
      sharedUsers,
      ownerList,
      unitsArr,
      categoriesArr,
      hasAccess,
    } = this.state;

    // let listName, sharedUsers, ownerList;
    // if (listInfo) {
    //   listName = listInfo.listName;
    //   sharedUsers = listInfo.sharedUsers;
    //   ownerList = listInfo.ownerList;
    // }

    // const { id } = this.props.match.params;
    // console.log(groceryListActive);
    // const usersName = sharedUsers.map((user) => user.shared_user_name);
    // console.log(usersName);
    return (
      <div>
        {!sessionStorage.getItem("authorization") && <NoAccess />}
        {sessionStorage.getItem("authorization") && user && (
          <>
            <UserHeader />
            {!hasAccess ? (
              <h1 className="ing-grocery__wrapper ing-grocery__wrapper--access">
                You do not access this grocery list
              </h1>
            ) : (
              <main className="ing-grocery">
                <div className="ing-grocery__wrapper">
                  {isEditable ? (
                    <form
                      className="list-form"
                      onSubmit={(e) => {
                        this.listUpdate(e);
                      }}
                    >
                      <input
                        defaultValue={`${listName}`}
                        type="text"
                        name="title"
                        className={`list-form__title ${
                          isErrorTitle ? "list-form__title--error" : ""
                        }`}
                        placeholder="list name"
                      />
                      <button type="submit" className="list-form__button">
                        Save
                      </button>
                      <p className="ing-grocery__shared">
                        Shared with{" "}
                        {sharedUsers
                          .map((user) => user.shared_user_name)
                          .join(", ")}
                      </p>
                      <label className="list-form__share">
                        Add person to share:{" "}
                        <input
                          type="email"
                          name="share"
                          className={`list-form__share-input ${
                            isErrorEmail ? "list-form__share-input--error" : ""
                          }`}
                          placeholder="email"
                        />
                        {isErrorEmail ? (
                          <span className="list-form__alert">
                            <FontAwesomeIcon
                              icon={faExclamationCircle}
                              className="form__alert-icon"
                            />
                            invalid email
                          </span>
                        ) : (
                          ""
                        )}
                      </label>
                      <label className="list-form__share">
                        Remove a person from share:{" "}
                        <select
                          name="remove"
                          className="list-form__share-remove"
                          defaultValue="none"
                        >
                          <option value="none">Please select a name</option>
                          {sharedUsers.map((user) => (
                            <option value={user.user_id} key={user.user_id}>
                              {user.shared_user_name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <p className="ing-grocery__owner-form">
                        Owned by {ownerList.owner}
                      </p>
                    </form>
                  ) : (
                    <div className="ing-grocery__title-wrapper">
                      <h2 className="ing-grocery__title">{listName}</h2>
                      <p
                        className="ing-grocery__edit"
                        onClick={this.toggleEditable}
                      >
                        Edit
                      </p>
                      <p className="ing-grocery__shared">
                        Shared with{" "}
                        {sharedUsers
                          .map((user) => user.shared_user_name)
                          .join(", ")}
                      </p>
                      <p className="ing-grocery__owner">
                        Owned by {ownerList.owner}
                      </p>
                    </div>
                  )}

                  <div className="ing-grocery__content-wrapper">
                    {/* <div className="ing-grocery__description-wrapper">
                    <h4 className="ing-grocery__description">List Name</h4>
                    <h4 className="ing-grocery__description">Shared with</h4>
                  </div> */}
                    <form className="grocery-form" onSubmit={this.handleSubmit}>
                      <div className="grocery-form__buttons-top">
                        <button
                          type="submit"
                          name="save"
                          className="grocery-form__button-save--top"
                        >
                          Save Changes
                        </button>
                        <button
                          name="addPantry"
                          onClick={this.addToPantry}
                          className="grocery-form__button-pantry--top"
                        >
                          Add Selected Items to Pantry
                        </button>
                      </div>

                      <div className="grocery-form__ing-wrapper">
                        {groceryListActive.map((ingredient, i) => (
                          <GroceryItem
                            ingredient={ingredient}
                            index={i}
                            // key={i}
                            key={ingredient.ingredientID}
                            handleChange={this.handleChange}
                            handleDelete={this.handleDelete}
                            unitsArr={unitsArr}
                            categoriesArr={categoriesArr}
                          />
                        ))}
                      </div>
                      <div className="grocery-form__buttons-wrapper">
                        {/* <button
                        type="submit"
                        name="save"
                        className="grocery-form__button-save"
                      >
                        Save Changes
                      </button> */}
                        <button
                          onClick={this.addNewItem}
                          className="grocery-form__button-add"
                        >
                          + New Ingredient
                        </button>
                        {/* <button
                        name="addPantry"
                        onClick={this.addToPantry}
                        className="grocery-form__button-pantry"
                      >
                        Add Items to Pantry
                      </button> */}
                        <div className="grocery-form__buttons-bottom">
                          <button
                            type="submit"
                            name="save"
                            className="grocery-form__button-save--bottom"
                          >
                            Save Changes
                          </button>
                          <button
                            name="addPantry"
                            onClick={this.addToPantry}
                            className="grocery-form__button-pantry--bottom"
                          >
                            Add Selected Items to Pantry
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <p className="ing-grocery__comments">
                    * selected items will be added to owner's list pantry
                  </p>
                </div>
              </main>
            )}
            <Sidebar isActive={"Grocery Lists"} />
          </>
        )}
        {isRedirect && <Redirect to="/grocery" />}
      </div>
    );
  }
}
