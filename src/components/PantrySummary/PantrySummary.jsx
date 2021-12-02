import "./PantrySummary.scss";
import pantryActive from "../../assets/icons/pantry_active.svg";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// const listArr = [
//   { ingredient: "ingredient 1", quantity: "1", unit: "gram" },
//   { ingredient: "ingredient 2", quantity: "2", unit: "lb" },
//   { ingredient: "ingredient 3", quantity: "3", unit: "lb" },
//   { ingredient: "ingredient 4", quantity: "4", unit: "lb" },
//   { ingredient: "ingredient 5", quantity: "5", unit: "lb" },
//   { ingredient: "ingredient 6", quantity: "6", unit: "lb" },
//   { ingredient: "ingredient 7", quantity: "7", unit: "lb" },
//   { ingredient: "ingredient 8", quantity: "8", unit: "lb" },
//   { ingredient: "ingredient 9", quantity: "9", unit: "lb" },
//   { ingredient: "ingredient 10", quantity: "10", unit: "lb" },
//   { ingredient: "ingredient 11", quantity: "11", unit: "lb" },
// ];
// const listArr = [];

class PantrySummary extends React.Component {
  state = {
    currentPantry: null,
    units: null,
  };

  componentDidMount() {
    const token = sessionStorage.getItem("authorization");
    axios
      // .get(`http://localhost:8080/units`, {
      //   headers: { Authorization: token },
      // })
      .get(`https://shrouded-peak-10650.herokuapp.com/units`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        axios
          // .get(`http://localhost:8080/pantry-items`, {
          //   headers: { Authorization: token },
          // })
          .get(`https://shrouded-peak-10650.herokuapp.com/pantry-items`, {
            headers: { Authorization: token },
          })
          .then((response) => {
            // console.log(response.data);
            this.setState({
              currentPantry: response.data,
              units: res.data,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  render() {
    const { currentPantry, units } = this.state;
    // const lastUpdate =
    //   currentPantry &&
    //   Math.max(
    //     currentPantry.map((item) => Number(item.ingredient_date_bought))
    //   );
    // console.log(lastUpdate);
    const date =
      currentPantry &&
      new Date(
        Number(currentPantry[currentPantry.length - 1].ingredient_date_bought)
      );
    // const date = new Date(Date.now());
    const format = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return (
      <article className="summary">
        {currentPantry && (
          <>
            <Link
              to="/pantry"
              className="summary__title"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Pantry{" "}
              <img
                src={pantryActive}
                alt="grocery list"
                className="summary__img"
              />
            </Link>
            <ul>
              {currentPantry.slice(0, 10).map((list, i) => (
                <li key={i} className="summary__list">
                  <span className="summary__list-left">
                    {list.ingredient_name}
                  </span>
                  <span className="summary__list-left">
                    {list.qty} {units[list.unit_id - 1].unit}
                  </span>
                </li>
              ))}
            </ul>
            {date && (
              <h4 className="summary__sub-title">
                last updated on {`${date.toLocaleDateString("en-US", format)}`}
              </h4>
            )}
            <div className="summary__wrapper">
              {/* <p className="summary__add-button">+ Add New Ingredient</p> */}
              <Link to="/pantry" className="summary__more-button">
                See More
              </Link>
            </div>
          </>
        )}
      </article>
    );
  }
}

export default PantrySummary;
