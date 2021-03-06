import "./IndexPage.scss";

import HomeHeader from "../../components/HomeHeader";
import HeroBanner from "../../components/HeroBanner";
import CardSection from "../../components/CardSection";
import HomeFooter from "../../components/HomeFooter";

export default function IndexPage() {
  return (
    <div>
      <HomeHeader />
      <HeroBanner />
      <CardSection />
      <HomeFooter />
    </div>
  );
}
