// import cookingImage from "../../assets/images/becca-tapert-O7sK3d3TPWQ-unsplash.jpg";
import "./NotFoundPage.scss";

import HomeHeader from "../../components/HomeHeader";

import HomeFooter from "../../components/HomeFooter";

export default function HomePage() {
  return (
    <div>
      <HomeHeader />
      <h1 class="notfound__title"> 404 Page Not Found</h1>
      <HomeFooter />
    </div>
  );
}
