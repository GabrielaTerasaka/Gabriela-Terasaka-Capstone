import React from "react";
// import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import "./GroceryItem.scss";

// const unitArr = [
//   {
//     unit: "unit",
//     unit_description: "whole",
//   },
//   {
//     unit: "g",
//     unit_description: "grams",
//   },
//   {
//     unit: "lb",
//     unit_description: "pound",
//   },
//   {
//     unit: "cup",
//     unit_description: "cup",
//   },
//   {
//     unit: "oz",
//     unit_description: "ounce",
//   },
//   {
//     unit: "ml",
//     unit_description: "milliliter",
//   },
//   {
//     unit: "tbsp",
//     unit_description: "tablespoon",
//   },
//   {
//     unit: "L",
//     unit_description: "liter",
//   },
//   {
//     unit: "tsp",
//     unit_description: "teaspoon",
//   },
// ];

class GroceryItem extends React.Component {
  state = {
    isMore: false,
    activeItem: this.props.ingredient,
    unitsArr: this.props.unitsArr,
    categoriesArr: this.props.categoriesArr,
  };

  toggleMore = () => {
    this.setState({ isMore: this.state.isMore ? false : true });
  };

  // componentDidMount() {
  // console.log("mount");
  // const token = sessionStorage.getItem("authorization");
  // axios
  //   .get(`http://localhost:8080/categories`, {
  //     headers: { Authorization: token },
  //   })
  //   // .get(`https://shrouded-peak-10650.herokuapp.com/login`, {
  //   //   headers: { Authorization: token },
  //   // })
  //   .then((response) => {
  //     axios
  //       .get(`http://localhost:8080/units`, {
  //         headers: { Authorization: token },
  //       })
  //       // .get(`https://shrouded-peak-10650.herokuapp.com/login`, {
  //       //   headers: { Authorization: token },
  //       // })
  //       .then((res) => {
  //         console.log("units: " + res.data);
  //         console.log("categories: " + response.data);
  //         this.setState({
  //           unitsArr: res.data,
  //           categoriesArr: response.data,
  //         });
  //       });
  //   });
  // }

  // componentDidUpdate() {
  //   console.log("update");
  // }

  render() {
    const { qty, unit_id, category_id, shelf_life, ingredient_name } =
      // const { ingredientID, quantity, unit, category, shelf_life, ingredient } =
      this.state.activeItem;
    const { index, noCheckbox } = this.props;
    const { isMore, unitsArr, categoriesArr } = this.state;
    // console.log(this.state.activeItem);
    const unit = String(unit_id);
    const category = String(category_id);
    // if (unitsArr)
    //   console.log(unitsArr.find((unit) => unit.id === Number(unit)));
    return (
      <div className="label-box">
        <div className="label">
          {/* <label className="label"> */}
          <label>
            {!noCheckbox && (
              <input
                type="checkbox"
                // name={ingredientID}
                className="label__check"
                onChange={(e) => {
                  this.props.handleChange(e, index, "checkbox");
                }}
              />
            )}
          </label>
          <div className="label__mandatory-wrapper">
            <input
              type="text"
              defaultValue={ingredient_name}
              className="label__name"
              placeholder="ingredient"
              onChange={(e) => {
                this.props.handleChange(e, index, "ingredient_name");
              }}
            />
            <input
              type="text"
              defaultValue={qty}
              className="label__qty"
              placeholder="qty"
              onChange={(e) => {
                this.props.handleChange(e, index, "qty");
              }}
            />
            {/* <input
              type="text"
              defaultValue={unit}
              className="label__unit"
              placeholder="unit"
              onChange={(e) => {
                this.props.handleChange(e, index, "unit");
              }}
            /> */}
            <select
              // type="text"
              defaultValue={unit}
              className="label__unit"
              // placeholder="unit"
              name="unit_id"
              onChange={(e) => {
                this.props.handleChange(e, index, "unit_id");
              }}
            >
              {unitsArr &&
                unitsArr.map((unit, i) => (
                  <option value={String(unit.id)} key={unit.id}>
                    {unit.unit}
                  </option>
                ))}
            </select>
            {window.innerWidth < 768 ? (
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="label__info-icon--delete"
                onClick={() => {
                  this.props.handleDelete(index);
                }}
              />
            ) : (
              ""
            )}
          </div>
          {/* </label> */}
        </div>

        <div className="label__optional-wrapper">
          {isMore || window.innerWidth > 768 ? (
            <>
              {/* <input
                type="text"
                defaultValue={category}
                className="label__category"
                placeholder="category"
                onChange={(e) => {
                  this.props.handleChange(e, index, "category");
                }}
              /> */}

              <select
                // type="text"
                defaultValue={category}
                className="label__category"
                // placeholder="unit"
                name="category_id"
                onChange={(e) => {
                  this.props.handleChange(e, index, "category_id");
                }}
              >
                {categoriesArr &&
                  categoriesArr.map((category, i) => (
                    <option value={String(category.id)} key={category.id}>
                      {category.category}
                    </option>
                  ))}
              </select>
              <input
                type="text"
                defaultValue={shelf_life}
                className="label__shelf"
                placeholder="shelf life"
                onChange={(e) => {
                  this.props.handleChange(e, index, "shelf_life");
                }}
              />
            </>
          ) : (
            ""
          )}
          {window.innerWidth > 768 ? (
            ""
          ) : (
            <span className="label__info" onClick={this.toggleMore}>
              {isMore ? (
                <FontAwesomeIcon icon={faMinus} className="label__info-icon" />
              ) : (
                <FontAwesomeIcon icon={faPlus} className="label__info-icon" />
              )}{" "}
              Info
            </span>
          )}
          {window.innerWidth > 768 ? (
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="label__info-icon--delete"
              onClick={() => {
                this.props.handleDelete(index);
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default GroceryItem;
