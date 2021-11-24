import "./HeroBanner.scss";
import React from "react";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero__wrapper">
        <div className="hero__wrapper-left">
          <h2 className="hero__title">Organize Your Food</h2>
          <Link to="/" className="hero__link">
            Let's Start
          </Link>
        </div>
        <div className="hero__wrapper-right"></div>
      </div>
    </section>
  );
}

export default HeroBanner;
