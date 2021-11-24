import "./CardSection.scss";
import Card from "../Card";
import cardArray from "../../data/homeInfo.json";

function CardSection(props) {
  return (
    <section className="card-section">
      <div className="card-section__wrapper">
        {cardArray.map((card, index) => {
          return <Card card={card} key={card.id} index={index} />;
        })}
      </div>
    </section>
  );
}

export default CardSection;
