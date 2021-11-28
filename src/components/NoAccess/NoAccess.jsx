import "./NoAccess.scss";
import HomeFooter from "../../components/HomeFooter";
import HomeHeader from "../../components/HomeHeader";

function NoAccess() {
  return (
    <>
      <HomeHeader />
      <h1 className="access_title">
        You have logged out! Please Sign In or Create a New Account!
      </h1>
      <HomeFooter />
    </>
  );
}

export default NoAccess;
