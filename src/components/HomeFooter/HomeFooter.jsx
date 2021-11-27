import "./HomeFooter.scss";
import DateObject from "react-date-object";

function HomeFooter() {
  const date = new DateObject();

  return (
    <footer className="footer">
      <p className="footer__copyright">
        Copyright © {date.format("YYYY")} Gabriela Mayumi Soga Terasaka.{" "}
        <span className="footer__copyright--break"> All rights reserved.</span>
      </p>
    </footer>
  );
}

export default HomeFooter;
