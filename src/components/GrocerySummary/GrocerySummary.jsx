import "./GrocerySummary.scss";
import listActive from "../../assets/icons/list_active.svg";
import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// const listArr = ["list 1", "list 2", "list 3", "list 4"];
// const listArr = [];

class GrocerySummary extends React.Component {
  state = {
    isMore: false,
    currentLists: null,
  };

  toggleMore = () => {
    this.setState({
      isMore: this.state.isMore ? false : true,
    });
  };
  addNewList = () => {
    const token = sessionStorage.getItem("authorization");
    axios
      // .post(`http://localhost:8080/grocery`, {
      //   headers: { Authorization: token },
      // })
      .post(`https://shrouded-peak-10650.herokuapp.com/grocery`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        // console.log(response.data);
        window.location.href = `/grocery/${response.data[0]}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    const token = sessionStorage.getItem("authorization");
    axios
      // .get(`http://localhost:8080/grocery`, {
      //   headers: { Authorization: token },
      // })
      .get(`https://shrouded-peak-10650.herokuapp.com/grocery`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        // console.log(response.data);
        this.setState({
          currentLists: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { isMore, currentLists } = this.state;
    let num = 3;
    if (isMore) {
      num = currentLists.length;
    }
    return (
      <article className="summary">
        <Link
          to="/grocery"
          className="summary__title"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Grocery List{" "}
          <img src={listActive} alt="grocery list" className="summary__img" />
        </Link>
        <ul>
          {currentLists &&
            currentLists.slice(0, num).map((list, i) => (
              <Link
                key={list.id}
                className="summary__link"
                to={`/grocery/${list.id}`}
                // listId={list.id}
              >
                {list.title}
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="summary__icon"
                />
              </Link>
            ))}
        </ul>
        <div className="summary__wrapper">
          <p className="summary__add-button" onClick={this.addNewList}>
            + Add New List
          </p>
          {currentLists && currentLists.length <= 3 ? (
            ""
          ) : (
            <>
              <p className="summary__more-button" onClick={this.toggleMore}>{`${
                isMore ? "Less" : "More"
              }`}</p>
            </>
          )}
        </div>
      </article>
    );
  }
}

export default GrocerySummary;
