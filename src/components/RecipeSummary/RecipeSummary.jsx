import "./RecipeSummary.scss";
import recipeActive from "../../assets/icons/recipe_active.svg";
import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const listArr = ["recipe 1", "recipe 2", "recipe 3", "recipe 4"];

class RecipeSummary extends React.Component {
  render() {
    return (
      <article className="summary">
        <Link
          to="/recipes"
          className="summary__title"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Recipes{" "}
          <img src={recipeActive} alt="grocery list" className="summary__img" />
        </Link>
        <p className="summary__recipe">Personal Recipes</p>
        <ul>
          {listArr.slice(0, 3).map((list, i) => (
            <Link
              key={i}
              className="summary__link summary__link--recipe"
              to="/featureinprogress"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              {list}
              <FontAwesomeIcon
                icon={faChevronRight}
                className="summary__icon"
              />
            </Link>
          ))}
        </ul>
        <div className="summary__wrapper summary__wrapper--recipe">
          <Link
            to="/featureinprogress"
            className="summary__add-button"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            + Add New Recipe
          </Link>
          <Link
            to="/featureinprogress"
            className="summary__more-button"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            See More
          </Link>
        </div>
        <p className="summary__recipe summary__recipe--suggested">
          Suggested Recipes
        </p>
        <ul>
          {listArr.slice(0, 3).map((list, i) => (
            <Link
              key={i}
              className="summary__link summary__link--recipe"
              to="/featureinprogress"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              {list}
              <FontAwesomeIcon
                icon={faChevronRight}
                className="summary__icon"
              />
            </Link>
          ))}
        </ul>
        <div className="summary__wrapper summary__wrapper--recipe">
          <Link
            to="/featureinprogress"
            className="summary__more-button summary__more-button--tasty"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            See More
          </Link>
        </div>
      </article>
    );
  }
}

export default RecipeSummary;
