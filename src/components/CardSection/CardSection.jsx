import "./CardSection.scss";
import Card from "../Card";
import cardArray from "../../data/homeInfo.json";

function CardSection(props) {
  return (
    <section className="card-section">
      {cardArray.map((card) => {
        return <Card card={card} key={card.id} />;
      })}
    </section>
  );
}

export default CardSection;
