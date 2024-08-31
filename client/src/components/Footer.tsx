import { Link } from "react-router-dom";
import whatshap from "../assets/whatsapp.png";
import linkedin from "../assets/linkedin.png";
import instagram from "../assets/instagram.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer_container">
      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">NShopify</h1>
          <h2>Contact</h2>
          <address>
            Vill = Chaurai, Post = Bhelai, Police = Udawantnagar,(Ara
            Bihar,India)
            <br />
            <Link className="footer__btn" to="mailto:pk0158548@gmail.com">
              Email Us
            </Link>
          </address>
        </div>

        <ul className="footer__nav">
          {/* <li className="nav__item">
            <h2 className="nav__title">Media</h2>

            <ul className="nav__ul">
              <li>
                <Link to="#">Online</Link>
              </li>

              <li>
                <Link to="#">Print</Link>
              </li>

              <li>
                <Link to="#">Alternative Ads</Link>
              </li>
            </ul>
          </li> */}

          <li className="nav__item nav__item--extra">
            <h2 className="nav__title">Menu Item</h2>

            <ul className="nav__ul nav__ul--extra">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <h2>Free Delivery Open</h2>
            </ul>
          </li>
        </ul>

        <div className="legal">
          <p>&copy; {year} NShopify. All rights reserved.</p>
          <p>Designer By Coder Pankaj</p>

          <div className="social_link">
            <Link to="https://wa.me/8002264717">
              <img src={whatshap} alt="" />
            </Link>
            <Link to={""}>
              <img src={linkedin} alt="" />
            </Link>
            <Link to={""}>
              <img src={instagram} alt="" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
