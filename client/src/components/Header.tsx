import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { FaBars, FaTimes } from "react-icons/fa";
import cartimg from "../assets/shopping.png";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const email = localStorage.getItem("EMAIL");
  const [cart, setCart] = useState<{ items: [] } | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.post("http://localhost:8000/cart");
        setCart(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [cart]);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to={"/"}>
          {/* <h3>N Shop</h3> */}
          <h3>NShopify</h3>
        </Link>
      </div>
      <div className="navbar__toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={isOpen ? "navbar__menu active" : "navbar__menu"}>
        <li>
          <Link to="/" onClick={closeMenu}>
            {" "}
            Home
          </Link>
        </li>

        <li>
          <Link to="/shop" onClick={closeMenu}>
            {" "}
            Shop
          </Link>
        </li>

        <li>
          <Link to="/wishlist" onClick={closeMenu}>
            {" "}
            Wishlist
          </Link>
        </li>

        <li>
          {/* {user && (
            <button className="second_auth" onClick={logOut}>
              LogOut
            </button>
          )} */}
        </li>
      </ul>

      <div className="toggle">
        <Link to={"/cart"}>
          <MenuItem>
            <img src={cartimg} alt="" width={35} height={35} />
            <sub>{cart?.items.length}</sub>
          </MenuItem>
        </Link>

        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <p>{email?.charAt(0)}</p>
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Link to={"/dashboard"}>
            <MenuItem onClick={handleClose}>User</MenuItem>
          </Link>

          <Link to={"/profile"}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Link>

          {!email ? (
            <Link to={"/login"}>Login</Link>
          ) : (
            <MenuItem onClick={logOut}>LogOut</MenuItem>
          )}
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
