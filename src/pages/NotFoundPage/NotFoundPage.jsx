// import cookingImage from "../../assets/images/becca-tapert-O7sK3d3TPWQ-unsplash.jpg";
import "./NotFoundPage.scss";
import logo from "../../assets/logo/MyFoodies_logo.svg";

import HomeHeader from "../../components/HomeHeader";
import { Link } from "react-router-dom";
import HomeFooter from "../../components/HomeFooter";

export default function HomePage() {
  return (
    <div>
      <HomeHeader />
      <h1 className="notfound__title"> 404 Page Not Found</h1>
      <Link to="/" className="notfound__link">
        <img src={logo} alt="MyFoodies logo" />
      </Link>
      <HomeFooter />
    </div>
  );
}
