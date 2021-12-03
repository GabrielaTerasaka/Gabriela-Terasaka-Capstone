import jwt_decode from "jwt-decode";
import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import NoAccess from "../NoAccess";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import "./IndividualGroceryList.scss";
import GroceryItem from "../../components/GroceryItem";
import DeleteModal from "../../components/DeleteModal";
import Loading from "../../components/Loading";

let messageControl;

export default class IndividualGroceryList extends React.Component {
  state = {
    user: null,
    groceryListActive: [],
    isRedirect: false,
    idCounter: 0,
    isEditable: false,
    isErrorEmail: false,
    isErrorTitle: false,
    ownerList: null,
    listName: null,
    sharedUsers: null,
    unitsArr: null,
    categoriesArr: null,
    listId: null,
    hasAccess: false,
    isDelete: false,
    isLoading: true,
    showMessage: false,
    message: null,
    redirect: null,
  };

  addNewItem = (e) => {
    e.preventDefault();

    const newList = this.state.groceryListActive;
    newList.push({
      ingredient_name: "",
      qty: "",
      unit_id: 1,
      category_id: 1,
      shelf_life: "",
      ingredientID: this.state.idCounter,
      isChecked: false,
    });
    this.setState({
      groceryListActive: newList,
      idCounter: this.state.idCounter + 1,
    });
  };

  handleSaveChanges = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;

    const token = sessionStorage.getItem("authorization");
    const saveItems = this.state.groceryListActive.filter(
      (item) => item.ingredient_name
    );
    const newListItems = saveItems.map((item) => {
      return {
        list_id: id,
        ingredient_name: item.ingredient_name,
        qty: item.qty === "" ? 1 : item.qty,
        unit_id: item.unit_id,
        shelf_life: item.shelf_life,
        category_id: item.category_id,
      };
    });

    axios
      .put(`https://shrouded-peak-10650.herokuapp.com/grocery-items/${id}`, {
        headers: { Authorization: token },
        body: { newListItems },
      })
      .then(() => {});

    this.setState({
      groceryListActive: saveItems,
      showMessage: true,
      message: "Saved Successfully",
    });

    messageControl = setTimeout(() => {
      this.setState({
        showMessage: false,
      });
    }, 5000);
  };

  handleDelete = (index) => {
    const newList = this.state.groceryListActive;
    newList.splice(index, 1);

    this.setState({
      groceryListActive: newList,
    });
  };

  addToPantry = (e) => {
    e.preventDefault();

    const selectedItems = this.state.groceryListActive.filter(
      (item) => item.isChecked && item.ingredient_name
    );

    const addPantryItems = selectedItems.map((item) => {
      return {
        ingredient_name: item.ingredient_name,
        qty: item.qty === "" ? 1 : item.qty,
        unit_id: item.unit_id,
        shelf_life: item.shelf_life,
        category_id: item.category_id,
      };
    });

    const { id } = this.props.match.params;
    const notSelectedItems = this.state.groceryListActive
      .filter((item) => !item.isChecked || !item.ingredient_name)
      .filter((item) => item.ingredient_name);

    const newListItems = notSelectedItems.map((item) => {
      return {
        list_id: id,
        ingredient_name: item.ingredient_name,
        qty: item.qty === "" ? 1 : item.qty,
        unit_id: item.unit_id,
        shelf_life: item.shelf_life,
        category_id: item.category_id,
      };
    });

    const token = sessionStorage.getItem("authorization");
    axios
      .post(`https://shrouded-peak-10650.herokuapp.com/pantry-items`, {
        headers: { Authorization: token },
        body: { addPantryItems, ownerId: this.state.ownerList.ownerId },
      })
      .then(() => {
        axios
          .put(
            `https://shrouded-peak-10650.herokuapp.com/grocery-items/${id}`,
            {
              headers: { Authorization: token },
              body: { newListItems },
            }
          )
          .then(() => {});
      });

    this.setState({
      groceryListActive: notSelectedItems,
      showMessage: true,
      message: "Added Successfully",
    });
    messageControl = setTimeout(() => {
      this.setState({
        showMessage: false,
      });
    }, 5000);
  };

  handleDeleteList = (e) => {
    e.preventDefault();

    this.setState({
      isDelete: true,
    });
  };

  cancelDeleteOption = () => {
    this.setState({ isDelete: false });
  };

  handleDeleteElement = () => {
    const { id } = this.props.match.params;
    const token = sessionStorage.getItem("authorization");

    axios
      .delete(`https://shrouded-peak-10650.herokuapp.com/grocery/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        this.setState({
          isRedirect: true,
        });
      });
  };

  handleChange = (e, index, name) => {
    const additionalItem = this.state.groceryListActive;

    if (name === "checkbox") {
      additionalItem[index]["isChecked"] = e.target.checked;

      this.setState({
        groceryListActive: additionalItem,
      });
    } else {
      additionalItem[index][name] =
        name === "unit_id" || name === "category_id"
          ? Number(e.target.value)
          : e.target.value;

      this.setState({
        groceryListActive: additionalItem,
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
    const { id } = this.props.match.params;

    axios
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
              .put(`https://shrouded-peak-10650.herokuapp.com/grocery/${id}`, {
                headers: { Authorization: token },
                body: { title: title },
              })
              .then(() => {
                axios
                  .delete(
                    `https://shrouded-peak-10650.herokuapp.com/grocery-users?listId=${id}&userId=${removeId}`,
                    {
                      headers: { Authorization: token },
                    }
                  )
                  .then(() => {
                    const newSharedUsers = this.state.sharedUsers.filter(
                      (user) => user.user_id !== Number(removeId)
                    );

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
              .put(`https://shrouded-peak-10650.herokuapp.com/grocery/${id}`, {
                headers: { Authorization: token },
                body: { title: title },
              })
              .then(() => {
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
          .put(`https://shrouded-peak-10650.herokuapp.com/grocery/${id}`, {
            headers: { Authorization: token },
            body: { title: title },
          })
          .then(() => {
            axios
              .post(`https://shrouded-peak-10650.herokuapp.com/grocery-users`, {
                headers: { Authorization: token },
                body: { listId: id, userId: foundUser.id },
              })
              .then(() => {
                if (removeId !== "none") {
                  axios
                    .delete(
                      `https://shrouded-peak-10650.herokuapp.com/grocery-users?listId=${id}&userId=${removeId}`,
                      {
                        headers: { Authorization: token },
                      }
                    )
                    .then(() => {
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
    const { id } = this.props.match.params;

    if (sessionStorage.getItem("authorization")) {
      const decode = jwt_decode(
        sessionStorage.getItem("authorization").split(" ")[1]
      );
      const token = sessionStorage.getItem("authorization");
      axios
        .get(`https://shrouded-peak-10650.herokuapp.com/grocery/${id}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          const listInfo = response.data[0];

          if (listInfo) {
            axios
              .get(`https://shrouded-peak-10650.herokuapp.com/grocery-users`, {
                headers: { Authorization: token },
              })
              .then((res) => {
                const sharedLists = res.data;
                const sharedUsers = sharedLists.filter(
                  (sharedList) => sharedList.list_id === listInfo.id
                );

                axios
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

                    axios
                      .get(
                        `https://shrouded-peak-10650.herokuapp.com/categories`,
                        {
                          headers: { Authorization: token },
                        }
                      )
                      .then((response) => {
                        axios
                          .get(
                            `https://shrouded-peak-10650.herokuapp.com/units`,
                            {
                              headers: { Authorization: token },
                            }
                          )
                          .then((res) => {
                            const foundUser = sharedUsers.find(
                              (user) => user.user_id === decode.id
                            );

                            this.setState({
                              user: decode,
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
                              isLoading: false,
                            });
                          });
                      });
                  });
              });
          } else {
            window.history.pushState(
              null,
              "List Page",
              `/grocery/${response.data[0]}`
            );
            this.setState({
              redirect: <Redirect to={`/notfound`} />,
            });
          }
        })
        .catch(() => {
          this.setState({ isRedirect: true });
        });
    }
  }

  componentWillUnmount() {
    clearTimeout(messageControl);
  }

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
      isDelete,
      isLoading,
      showMessage,
      message,
    } = this.state;

    return (
      <div className="list-wrapper">
        {!sessionStorage.getItem("authorization") && <NoAccess />}
        {sessionStorage.getItem("authorization") && (
          <>
            <UserHeader />
            {isLoading && <Loading />}
            {user && (
              <>
                {!hasAccess ? (
                  <h1 className="ing-grocery__wrapper ing-grocery__wrapper--access">
                    You do not have access this grocery list
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
                            {sharedUsers.length === 0
                              ? "-----"
                              : sharedUsers
                                  .map((user) => user.shared_user_name)
                                  .join(", ")}
                          </p>
                          <label className="list-form__share">
                            Add person to share:{" "}
                            <input
                              type="email"
                              name="share"
                              className={`list-form__share-input ${
                                isErrorEmail
                                  ? "list-form__share-input--error"
                                  : ""
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
                            {sharedUsers.length === 0
                              ? "-----"
                              : sharedUsers
                                  .map((user) => user.shared_user_name)
                                  .join(", ")}
                          </p>
                          <p className="ing-grocery__owner">
                            Owned by {ownerList.owner}
                          </p>
                        </div>
                      )}

                      <div className="ing-grocery__content-wrapper">
                        <form className="grocery-form">
                          <div className="grocery-form__ing-wrapper">
                            {groceryListActive.map((ingredient, i) => (
                              <GroceryItem
                                ingredient={ingredient}
                                index={i}
                                // key={i}
                                noCheckbox={false}
                                key={ingredient.ingredientID}
                                handleChange={this.handleChange}
                                handleDelete={this.handleDelete}
                                unitsArr={unitsArr}
                                categoriesArr={categoriesArr}
                              />
                            ))}
                          </div>
                          <div className="grocery-form__buttons-wrapper">
                            <div className="grocery-form__inner-wrapper">
                              {showMessage && (
                                <p className="grocery-form__message">
                                  {message}
                                </p>
                              )}
                              <button
                                onClick={this.addNewItem}
                                className="grocery-form__button-add"
                              >
                                + New Ingredient
                              </button>
                            </div>
                            <div className="grocery-form__buttons-bottom">
                              <button
                                name="save"
                                className="grocery-form__button-save--bottom"
                                onClick={(e) => {
                                  this.handleSaveChanges(e);
                                }}
                              >
                                Save
                              </button>
                              <button
                                name="addPantry"
                                onClick={(e) => {
                                  this.addToPantry(e);
                                }}
                                className="grocery-form__button-pantry--bottom"
                              >
                                Add to Pantry
                              </button>
                              <button
                                className="grocery-form__button-delete--bottom"
                                onClick={(e) => {
                                  this.handleDeleteList(e);
                                }}
                              >
                                Delete List
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <p className="ing-grocery__comments">
                        * selected items will be added to owner's pantry
                      </p>
                    </div>
                  </main>
                )}
              </>
            )}

            <Sidebar isActive={"Grocery Lists"} />
          </>
        )}
        {isDelete && (
          <DeleteModal
            selectedItem={ownerList}
            cancelDeleteOption={this.cancelDeleteOption}
            handleDeleteElement={this.handleDeleteElement}
          />
        )}
        {this.state.redirect}
        {isRedirect && <Redirect to="/grocery" />}
      </div>
    );
  }
}
