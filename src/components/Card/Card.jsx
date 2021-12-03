import "./Card.scss";

function Card(props) {
  const { title, image_path, image_alt } = props.card;

  return (
    <article className="card">
      <h3
        className={`card__title ${
          props.index % 2 === 0 ? "" : "card__title--right"
        }`}
      >
        {title}
      </h3>
      <img src={image_path} alt={image_alt} className="card__image" />
    </article>
  );
}

export default Card;
