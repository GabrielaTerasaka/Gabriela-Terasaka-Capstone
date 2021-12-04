import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import "./GroceryItem.scss";

class GroceryItem extends React.Component {
  state = {
    isMore: true,
    activeItem: this.props.ingredient,
    unitsArr: this.props.unitsArr,
    categoriesArr: this.props.categoriesArr,
  };

  toggleMore = () => {
    this.setState({ isMore: this.state.isMore ? false : true });
  };

  render() {
    const { qty, unit_id, category_id, shelf_life, ingredient_name } =
      this.state.activeItem;
    const { index, noCheckbox } = this.props;
    const { isMore, unitsArr, categoriesArr } = this.state;
    const unit = String(unit_id);
    const category = String(category_id);

    return (
      <div className="label-box">
        <div className="label">
          <label className="label__checkbox-wrapper">
            {!noCheckbox && (
              <>
                <input
                  type="checkbox"
                  className="label__checkbox"
                  onChange={(e) => {
                    this.props.handleChange(e, index, "checkbox");
                  }}
                />
                <span className="label__custom-checkbox"></span>
              </>
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
              type="number"
              min="1"
              defaultValue={qty}
              className="label__qty"
              placeholder="qty"
              onChange={(e) => {
                this.props.handleChange(e, index, "qty");
              }}
            />
            <select
              defaultValue={unit}
              className="label__unit"
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
        </div>

        <div className="label__optional-wrapper">
          {isMore || window.innerWidth > 768 ? (
            <>
              <select
                defaultValue={category}
                className="label__category"
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
                type="date"
                min="2021-12-01"
                defaultValue={shelf_life}
                className="label__shelf"
                placeholder="expiry date"
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
