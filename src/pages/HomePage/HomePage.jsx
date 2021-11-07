import cookingImage from "../../assets/images/becca-tapert-O7sK3d3TPWQ-unsplash.jpg";
import "./HomePage.scss";

import HomeHeader from "../../components/HomeHeader/HomeHeader";
export default function HomePage() {
  return (
    <div>
      {" "}
      <HomeHeader />
      <h1>Welcome</h1>
      <img src={cookingImage} alt="" className="image" />
    </div>
  );
}
