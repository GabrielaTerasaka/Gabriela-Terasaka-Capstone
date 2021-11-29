import "./PantrySummary.scss";
import pantryActive from "../../assets/icons/pantry_active.svg";
import React from "react";

const listArr = [
  { ingredient: "ingredient 1", quantity: "1", unit: "gram" },
  { ingredient: "ingredient 2", quantity: "2", unit: "lb" },
  { ingredient: "ingredient 3", quantity: "3", unit: "lb" },
  { ingredient: "ingredient 4", quantity: "4", unit: "lb" },
  { ingredient: "ingredient 5", quantity: "5", unit: "lb" },
  { ingredient: "ingredient 6", quantity: "6", unit: "lb" },
  { ingredient: "ingredient 7", quantity: "7", unit: "lb" },
  { ingredient: "ingredient 8", quantity: "8", unit: "lb" },
  { ingredient: "ingredient 9", quantity: "9", unit: "lb" },
  { ingredient: "ingredient 10", quantity: "10", unit: "lb" },
  { ingredient: "ingredient 11", quantity: "11", unit: "lb" },
];
// const listArr = [];

class PantrySummary extends React.Component {
  render() {
    const date = new Date(Date.now());
    const format = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return (
      <article className="summary">
        <h3 className="summary__title">
          Pantry{" "}
          <img src={pantryActive} alt="grocery list" className="summary__img" />
        </h3>
        <ul>
          {listArr.slice(0, 10).map((list, i) => (
            <li key={i} className="summary__list">
              <span className="summary__list-left">{list.ingredient}</span>
              <span className="summary__list-left">
                {list.quantity} {list.unit}
              </span>
            </li>
          ))}
        </ul>
        <h4 className="summary__sub-title">
          last updated on {`${date.toLocaleDateString("en-US", format)}`}
        </h4>
        <div className="summary__wrapper">
          <p className="summary__add-button">+ Add New Ingredient</p>
          <p className="summary__more-button">See More</p>
        </div>
      </article>
    );
  }
}

export default PantrySummary;
