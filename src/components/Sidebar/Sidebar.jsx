import "./Sidebar.scss";
import { Link } from "react-router-dom";
import homeActive from "../../assets/icons/home_active.svg";
import homeInactive from "../../assets/icons/home.svg";
import listActive from "../../assets/icons/list_active.svg";
import listInactive from "../../assets/icons/list.svg";
import pantryActive from "../../assets/icons/pantry_active.svg";
import pantryInactive from "../../assets/icons/pantry.svg";
import recipeActive from "../../assets/icons/recipe_active.svg";
import recipeInactive from "../../assets/icons/recipe.svg";

const optionsArr = [
  {
    title: "Home",
    active: homeActive,
    inactive: homeInactive,
    link: "home",
  },
  {
    title: "Grocery Lists",
    active: listActive,
    inactive: listInactive,
    link: "grocery",
  },
  {
    title: "Pantry",
    active: pantryActive,
    inactive: pantryInactive,
    link: "pantry",
  },
  {
    title: "My Recipes",
    active: recipeActive,
    inactive: recipeInactive,
    link: "recipes",
  },
];

function Sidebar(props) {
  // const props = { isActive: "Home" };
  const { isActive } = props;
  return (
    <aside className="sidebar">
      {optionsArr.map((option, i) => (
        <Link
          key={i}
          className="sidebar__option-wrapper"
          to={`/${option.link}`}
        >
          <img
            src={isActive === option.title ? option.active : option.inactive}
            alt={option.title + " icon"}
            className="sidebar__img"
          />
          <h3
            className={`sidebar__option ${
              isActive === option.title ? "sidebar__option--active" : ""
            }`}
          >
            {option.title}
          </h3>
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
