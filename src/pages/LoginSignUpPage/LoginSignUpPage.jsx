// import cookingImage from "../../assets/images/becca-tapert-O7sK3d3TPWQ-unsplash.jpg";
import "./LoginSignUpPage.scss";

import React from "react";

import HomeHeader from "../../components/HomeHeader";
// import HeroBanner from "../../components/HeroBanner";
// import CardSection from "../../components/CardSection";
import Footer from "../../components/Footer";

export default class LoginSignUpPage extends React.Component {
  state = {
    isSignUp: null,
  };

  handleSubmit = (e) => {};

  componentDidMount() {
    this.setState({
      isSignUp: this.props.match.path === "/signup" ? true : false,
    });
  }

  render() {
    return (
      <>
        {/* {this.state.isSignUp && ( */}
        <div>
          <HomeHeader />
          <form onSubmit={this.handleSubmit} className="form">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="form__first-name"
              name="first_name"
              id="first_name"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="form__last-name"
              name="last_name"
            />
            <input
              type="email"
              placeholder="Email"
              className="form__email"
              name="email"
            />
            <input
              type="password"
              placeholder="Password"
              className="form__password"
              name="password"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="form__confirm-password"
              name="confirm_password"
            />
          </form>
          <Footer />
        </div>
        {/* )} */}
      </>
    );
  }
}
