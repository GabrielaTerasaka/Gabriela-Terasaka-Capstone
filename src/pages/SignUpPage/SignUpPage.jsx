import "./SignUpPage.scss";

import React from "react";

import HomeHeader from "../../components/HomeHeader";
import HomeFooter from "../../components/HomeFooter";
import UserForm from "../../components/UserForm";

export default function SignUpPage() {
  return (
    <>
      <HomeHeader />
      <section className="sign">
        <div className="sign__wrapper">
          <h1 className="sign__title">Create a New Account</h1>
          <UserForm isSignUp={true} />
        </div>
      </section>

      <HomeFooter />
    </>
  );
}
