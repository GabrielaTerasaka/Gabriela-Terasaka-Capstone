import "./HomeFooter.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function HomeFooter() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__copyright">
          Developed by Gabriela Mayumi Soga Terasaka on 2021{" "}
          <span className="footer__copyright--break">
            Connect with me!
            <a
              href="https://github.com/GabrielaTerasaka"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              <FontAwesomeIcon icon={faGithubAlt} />
            </a>
            <a
              href="https://www.linkedin.com/in/gabriela-terasaka/"
              target="_blank"
              className="footer__link"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default HomeFooter;
