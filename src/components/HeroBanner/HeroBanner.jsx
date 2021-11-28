import "./HeroBanner.scss";
import React from "react";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero__wrapper">
        <div className="hero__wrapper-left">
          <h2 className="hero__title">Organize Your Pantry</h2>
          <p className="hero__content">
            Don't waste your food and time. Have a way to organize your kitchen
            and what dishes you can do with your current ingredients.
          </p>
          <Link to="/signup" className="hero__link">
            Let's Start
          </Link>
        </div>
        <div className="hero__wrapper-right"></div>
      </div>
    </section>
  );
}

export default HeroBanner;
