import cookingImage from "../../assets/images/becca-tapert-O7sK3d3TPWQ-unsplash.jpg";
import "./HomePage.scss";

import HomeHeader from "../../components/HomeHeader";
import HeroBanner from "../../components/HeroBanner";

export default function HomePage() {
  return (
    <div>
      {" "}
      <HomeHeader />
      <HeroBanner />
      <h1>Welcome</h1>
      <img src={cookingImage} alt="" className="image" />
    </div>
  );
}
