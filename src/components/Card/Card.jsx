import "./Card.scss";
import image from "../../assets/images/torbjorn-helgesen-C4FbCe4L_pw-unsplash.jpg";

function Card(props) {
  const { title, image_path, image_alt } = props.card;

  return (
    <article className="card">
      <h3 className="card__title">{title}</h3>
      {/* <img src={`${image_path}`} alt={image_alt} className="card_image" /> */}
      <img src={image} alt={image} className="card__image" />
    </article>
  );
}

export default Card;
