import jwt_decode from "jwt-decode";
import React from "react";
import { Redirect } from "react-router-dom";

import NoAccess from "../../components/NoAccess";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/UserHeader";

import "./IndividualGroceryList.scss";
import GroceryItem from "../../components/GroceryItem";

const listArr = [
  {
    ingredient: "ing 1",
    quantity: "1",
    unit: "lb",
    category: "cat 1",
    brand: "brand",
    shelf_life: "none",
    ingredientID: "1",
    isChecked: false,
  },
  {
    ingredient: "ing 2",
    quantity: "2",
    unit: "lb",
    category: "cat 2",
    brand: "brand",
    shelf_life: "none",
    ingredientID: "2",
    isChecked: false,
  },
];

export default class IndividualGroceryList extends React.Component {
  state = {
    user: null,
    groceryListActive: [],
    isRedirect: false,
  };

  addNewItem = (e) => {
    e.preventDefault();
    // console.log("Add: " + this.state.groceryListActive);

    const additionalItem = this.state.groceryListActive;
    additionalItem.push({
      ingredient: "",
      quantity: "",
      unit: "",
      category: "",
      brand: "",
      shelf_life: "",
      ingredientID: "",
      isChecked: false,
    });
    this.setState({
      groceryListActive: additionalItem,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(e);
    // this.setState({
    //   groceryListActive: additionalItem,
    // });
  };

  handleChange = (e, index, name) => {
    // e.preventDefault();

    // console.log(name);
    // console.log(e.target.checked);
    // console.log(e.target.value);
    // console.log(index);

    const additionalItem = this.state.groceryListActive;
    additionalItem[index][name] = e.target.value;
    // console.log(additionalItem);
    this.setState({
      groceryListActive: additionalItem,
    });
  };

  componentDidMount() {
    // console.log("Mount: " + this.state.groceryListActive);

    if (sessionStorage.getItem("authorization")) {
      const decode = jwt_decode(
        sessionStorage.getItem("authorization").split(" ")[1]
      );
      this.setState({
        user: decode,
        groceryListActive: listArr,
      });
      // console.log(decode);
    }
  }

  // componentDidUpdate(preProps, preState) {
  //   // console.log("Update " + this.state.groceryListActive);
  //   // console.log(preState);
  //   if (
  //     preState.groceryListActive.length !== this.state.groceryListActive.length
  //   ) {
  //     this.setState({
  //       groceryListActive: listArr,
  //     });
  //   }
  // }

  render() {
    const { user, isRedirect, groceryListActive } = this.state;
    const { id } = this.props.match.params;
    console.log(groceryListActive);
    return (
      <div>
        {!sessionStorage.getItem("authorization") && <NoAccess />}
        {sessionStorage.getItem("authorization") && user && (
          <>
            <UserHeader />
            <main className="ind-grocery">
              <div className="ind-grocery__wrapper">
                <h2 className="ind-grocery__title">List {id}</h2>
                <div className="ind-grocery__content-wrapper">
                  {/* <div className="ind-grocery__description-wrapper">
                    <h4 className="ind-grocery__description">List Name</h4>
                    <h4 className="ind-grocery__description">Shared with</h4>
                  </div> */}
                  <form className="form" onSubmit={this.handleSubmit}>
                    {groceryListActive.map((ingredient, i) => (
                      <GroceryItem
                        ingredient={ingredient}
                        index={i}
                        key={i}
                        handleChange={this.handleChange}
                      />
                      // <label key={i} className="form__label">
                      //   <input
                      //     type="checkbox"
                      //     name={ingredient.ingredientID}
                      //     className="form__ing-check"
                      //   />
                      //   <div className="form__mandatory-wrapper">
                      //     <input
                      //       type="text"
                      //       defaultValue={ingredient.ingredient}
                      //       className="form__ing-name"
                      //       placeholder="ingredient"
                      //     />
                      //     <input
                      //       type="text"
                      //       defaultValue={ingredient.quantity}
                      //       className="form__ing-qty"
                      //       placeholder="qty"
                      //     />
                      //     <input
                      //       type="text"
                      //       defaultValue={ingredient.unit}
                      //       className="form__ing-unit"
                      //       placeholder="unit"
                      //     />
                      //   </div>
                      //   <div className="form__optional-wrapper">
                      //     <input
                      //       type="text"
                      //       defaultValue={ingredient.brand}
                      //       className="form__ing-brand"
                      //       placeholder="brand"
                      //     />
                      //     <input
                      //       type="text"
                      //       defaultValue={ingredient.shelf_life}
                      //       className="form__ing-shelf"
                      //       placeholder="shelf life"
                      //     />
                      //   </div>
                      // </label>
                    ))}
                    <div className="ind-grocery__buttons-wrapper">
                      <button type="submit" name="save">
                        Save Changes
                      </button>
                      <button onClick={this.addNewItem}>Add New Item</button>
                      <button name="addPantry" onClick={this.addToPantry}>
                        Add Items to Pantry
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
            <Sidebar isActive={"Grocery Lists"} />
          </>
        )}
        {isRedirect && <Redirect to="/grocery" />}
      </div>
    );
  }
}
