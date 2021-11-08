import "./Card.scss";
import listImage from "../../assets/images/list.jpg";
import vegetablesImage from "../../assets/images/fresh_vegetables.jpg";
import pantryImage from "../../assets/images/pantry.jpg";
import cookingImage from "../../assets/images/cooking.jpg";
import mealImage from "../../assets/images/dish.jpg";

function Card(props) {
  const { title, image_path, image_alt } = props.card;
  const imagesArray = [
    listImage,
    vegetablesImage,
    pantryImage,
    cookingImage,
    mealImage,
  ];

  return (
    <article className="card">
      <h3
        className={`card__title ${
          props.index % 2 === 0 ? "" : "card__title--right"
        }`}
      >
        {title}
      </h3>
      {/* <img src={`${image_path}`} alt={image_alt} className="card_image" /> */}
      <img
        src={imagesArray[props.index]}
        alt={image_alt}
        className="card__image"
      />
    </article>
  );
}

export default Card;
