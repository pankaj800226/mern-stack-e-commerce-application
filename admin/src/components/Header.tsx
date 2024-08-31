import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
interface User {
  id: string;
  email: string;
}
const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const userDataString: string | null = localStorage.getItem("user");

  const user: User | null = userDataString
    ? (JSON.parse(userDataString) as User)
    : null;

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to={"/"}>
          {/* <h3>N Shop</h3> */}
          <h3>NShopify</h3>
        </Link>
      </div>

      <div className="toggle">
        <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <p>{user?.email.charAt(0).toUpperCase()}</p>
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
          {user && (
            <button className="logOut_btn" onClick={logOut}>
              LogOut
            </button>
          )}
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
