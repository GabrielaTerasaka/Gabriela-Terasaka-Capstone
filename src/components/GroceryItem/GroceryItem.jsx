import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import "./GroceryItem.scss";

const unitArr = [
  {
    unit: "unit",
    unit_description: "whole",
  },
  {
    unit: "g",
    unit_description: "grams",
  },
  {
    unit: "lb",
    unit_description: "pound",
  },
  {
    unit: "cup",
    unit_description: "cup",
  },
  {
    unit: "oz",
    unit_description: "ounce",
  },
  {
    unit: "ml",
    unit_description: "milliliter",
  },
  {
    unit: "tbsp",
    unit_description: "tablespoon",
  },
  {
    unit: "L",
    unit_description: "liter",
  },
  {
    unit: "tsp",
    unit_description: "teaspoon",
  },
];

class GroceryItem extends React.Component {
  state = {
    isMore: false,
  };

  toggleMore = () => {
    this.setState({ isMore: this.state.isMore ? false : true });
  };

  render() {
    const { ingredientID, quantity, unit, brand, shelf_life, ingredient } =
      this.props.ingredient;
    const { index } = this.props;
    const { isMore } = this.state;
    return (
      <div className="label-box">
        <div className="label">
          {/* <label className="label"> */}
          <label>
            <input
              type="checkbox"
              name={ingredientID}
              className="label__check"
              onChange={(e) => {
                this.props.handleChange(e, index);
              }}
            />
          </label>
          <div className="label__mandatory-wrapper">
            <input
              type="text"
              defaultValue={ingredient}
              className="label__name"
              placeholder="ingredient"
              onChange={(e) => {
                this.props.handleChange(e, index, "ingredient");
              }}
            />
            <input
              type="text"
              defaultValue={quantity}
              className="label__qty"
              placeholder="qty"
              onChange={(e) => {
                this.props.handleChange(e, index, "quantity");
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
              type="text"
              defaultValue={unit}
              className="label__unit"
              placeholder="unit"
              onChange={(e) => {
                this.props.handleChange(e, index, "unit");
              }}
            >
              {unitArr.map((unit, i) => (
                <option value={i} key={i}>
                  {unit.unit}
                </option>
              ))}
            </select>
          </div>
          {/* </label> */}
        </div>

        <div className="label__optional-wrapper">
          {isMore || window.innerWidth > 768 ? (
            <>
              <input
                type="text"
                defaultValue={brand}
                className="label__brand"
                placeholder="brand"
                onChange={(e) => {
                  this.props.handleChange(e, index, "brand");
                }}
              />
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
        </div>
      </div>
    );
  }
}

export default GroceryItem;
