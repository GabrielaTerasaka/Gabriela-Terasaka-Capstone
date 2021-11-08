import cookingImage from "../../assets/images/becca-tapert-O7sK3d3TPWQ-unsplash.jpg";
import "./HomePage.scss";

import HomeHeader from "../../components/HomeHeader";
import HeroBanner from "../../components/HeroBanner";
import Card from "../../components/Card";

import cardArray from "../../data/homeInfo.json";

export default function HomePage() {
  return (
    <div>
      <HomeHeader />
      <HeroBanner />
      {cardArray.map((card) => {
        return <Card card={card} />;
      })}
    </div>
  );
}
