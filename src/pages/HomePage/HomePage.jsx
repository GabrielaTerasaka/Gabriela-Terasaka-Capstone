// import cookingImage from "../../assets/images/becca-tapert-O7sK3d3TPWQ-unsplash.jpg";
import "./HomePage.scss";

import HomeHeader from "../../components/HomeHeader";
import HeroBanner from "../../components/HeroBanner";
import CardSection from "../../components/CardSection";
import Footer from "../../components/Footer";

export default function HomePage() {
  return (
    <div>
      <HomeHeader />
      <HeroBanner />
      <CardSection />
      <Footer />
    </div>
  );
}
