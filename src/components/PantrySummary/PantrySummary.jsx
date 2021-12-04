import "./PantrySummary.scss";
import pantryActive from "../../assets/icons/pantry_active.svg";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class PantrySummary extends React.Component {
  state = {
    currentPantry: null,
    units: null,
  };

  componentDidMount() {
    const token = sessionStorage.getItem("authorization");
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
    const date =
      currentPantry &&
      currentPantry.length !== 0 &&
      new Date(
        currentPantry.sort(
          (a, b) => a.ingredient_date_bought - b.ingredient_date_bought
        )[currentPantry.length - 1].ingredient_date_bought
      );
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
