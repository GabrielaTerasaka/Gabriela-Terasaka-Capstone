import "./SignInPage.scss";

import React from "react";

import HomeHeader from "../../components/HomeHeader";
import HomeFooter from "../../components/HomeFooter";
import UserForm from "../../components/UserForm";

export default function SignInPage() {
  return (
    <>
      <HomeHeader />
      <section className="sign">
        <div className="sign__wrapper">
          <h1 className="sign__title">Please sign in</h1>
          <UserForm isSignUp={false} />
        </div>
      </section>

      <HomeFooter />
    </>
  );
}
