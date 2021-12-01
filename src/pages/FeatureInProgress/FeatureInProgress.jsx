// import cookingImage from "../../assets/images/becca-tapert-O7sK3d3TPWQ-unsplash.jpg";
import "./FeatureInProgress.scss";
import logo from "../../assets/logo/MyFoodies_logo.svg";

import UserHeader from "../../components/UserHeader";

import Sidebar from "../../components/Sidebar";

export default function HomePage() {
  return (
    <div>
      <UserHeader />
      <h1 class="notfound__title"> Feature Coming Soon</h1>
      <img src={logo} alt="MyFoodies logo" className="notfound__logo" />
      <Sidebar />
    </div>
  );
}
