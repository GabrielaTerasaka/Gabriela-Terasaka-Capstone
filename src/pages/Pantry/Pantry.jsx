import jwt_decode from "jwt-decode";
import React from "react";
import axios from "axios";

import NoAccess from "../NoAccess";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader";

import "./Pantry.scss";
import GroceryItem from "../../components/GroceryItem";
import Loading from "../../components/Loading";

let messageControl;

export default class Pantry extends React.Component {
  state = {
    idCounter: 0,
    currentPantry: null,
    unitsArr: null,
    categoriesArr: null,
    isLoading: true,
    showMessage: false,
    message: true,
  };

  addNewItem = (e) => {
    e.preventDefault();

    const newList = this.state.currentPantry;
    newList.push({
      ingredient_name: "",
      qty: "",
      unit_id: 1,
      category_id: 1,
      shelf_life: "",
      ingredientID: this.state.idCounter,
    });
    this.setState({
      currentPantry: newList,
      idCounter: this.state.idCounter + 1,
    });
  };

  handleSaveChanges = (e) => {
    e.preventDefault();
    const { id } = this.state.user;
    const token = sessionStorage.getItem("authorization");
    const saveItems = this.state.currentPantry.filter(
      (item) => item.ingredient_name
    );
    const newPantryItems = saveItems.map((item) => {
      return {
        user_id: id,
        ingredient_name: item.ingredient_name,
        qty: item.qty === "" ? 1 : item.qty,
        unit_id: item.unit_id,
        shelf_life: item.shelf_life,
        category_id: item.category_id,
      };
    });

    axios
      .put(`https://shrouded-peak-10650.herokuapp.com/pantry-items`, {
        headers: { Authorization: token },
        body: { newPantryItems },
      })
      .then(() => {});

    this.setState({
      currentPantry: saveItems,
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
    const newList = this.state.currentPantry;
    newList.splice(index, 1);
    this.setState({
      currentPantry: newList,
    });
  };

  handleChange = (e, index, name) => {
    const additionalItem = this.state.currentPantry;

    additionalItem[index][name] =
      name === "unit_id" || name === "category_id"
        ? Number(e.target.value)
        : e.target.value;

    this.setState({
      currentPantry: additionalItem,
    });
  };

  componentDidMount() {
    if (sessionStorage.getItem("authorization")) {
      const decode = jwt_decode(
        sessionStorage.getItem("authorization").split(" ")[1]
      );
      const token = sessionStorage.getItem("authorization");
      axios
        .get(`https://shrouded-peak-10650.herokuapp.com/categories`, {
          headers: { Authorization: token },
        })
        .then((resp) => {
          axios
            .get(`https://shrouded-peak-10650.herokuapp.com/units`, {
              headers: { Authorization: token },
            })
            .then((res) => {
              axios
                .get(`https://shrouded-peak-10650.herokuapp.com/pantry-items`, {
                  headers: { Authorization: token },
                })
                .then((response) => {
                  const newList = response.data.map((item, i) => {
                    return {
                      ...item,
                      ingredientID: i + 1,
                    };
                  });
                  this.setState({
                    currentPantry: newList,
                    unitsArr: res.data,
                    categoriesArr: resp.data,
                    user: decode,
                    idCounter: newList.length + 1,
                    isLoading: false,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        });
    }
  }

  componentWillUnmount() {
    clearTimeout(messageControl);
  }

  render() {
    const {
      user,
      currentPantry,
      unitsArr,
      categoriesArr,
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
              <main className="ing-grocery">
                <div className="ing-grocery__wrapper">
                  <div className="ing-grocery__title-wrapper">
                    <h2 className="ing-grocery__title">Pantry</h2>
                  </div>

                  <div className="ing-grocery__content-wrapper">
                    <form className="grocery-form" onSubmit={this.handleSubmit}>
                      <div className="grocery-form__ing-wrapper">
                        {currentPantry.map((ingredient, i) => (
                          <GroceryItem
                            ingredient={ingredient}
                            index={i}
                            noCheckbox={true}
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
                            <p className="grocery-form__message pantry-form__message">
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
                            type="submit"
                            name="save"
                            className="pantry__save--bottom"
                            onClick={(e) => {
                              this.handleSaveChanges(e);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </main>
            )}
            <Sidebar isActive={"Pantry"} />
          </>
        )}
      </div>
    );
  }
}
