import "./GrocerySummary.scss";
import listActive from "../../assets/icons/list_active.svg";
import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const listArr = ["list 1", "list 2", "list 3", "list 4"];
// const listArr = [];

class GrocerySummary extends React.Component {
  state = {
    isMore: false,
  };

  toggleMore = () => {
    this.setState({
      isMore: this.state.isMore ? false : true,
    });
  };

  render() {
    const { isMore } = this.state;
    let num = 3;
    if (isMore) {
      num = listArr.length;
    }
    return (
      <article className="summary">
        <Link to="/grocery" className="summary__title">
          Grocery List{" "}
          <img src={listActive} alt="grocery list" className="summary__img" />
        </Link>
        <ul>
          {listArr.slice(0, num).map((list, i) => (
            <Link key={i} className="summary__link" to={`/grocery/${list.i}`}>
              {list}
              <FontAwesomeIcon
                icon={faChevronRight}
                className="summary__icon"
              />
            </Link>
          ))}
        </ul>
        <div className="summary__wrapper">
          <p className="summary__add-button">+ Add New List</p>
          <p className="summary__more-button" onClick={this.toggleMore}>{`${
            isMore ? "Less" : "More"
          }`}</p>
        </div>
      </article>
    );
  }
}

export default GrocerySummary;
