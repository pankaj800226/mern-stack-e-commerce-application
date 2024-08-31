import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { useEffect, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaPlaceOfWorship } from "react-icons/fa";

const AdminSidebar = () => {
  const [show, setShow] = useState(false);
  const [phoneActive, setPhoneActive] = useState(window.innerWidth < 1100);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const resizeHandle = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandle);
    return () => {
      window.removeEventListener("resize", resizeHandle);
    };
  }, []);

  return (
    <>
      {phoneActive && (
        <button id="hambuger" onClick={() => setShow(true)}>
          <HiMenuAlt4 />
        </button>
      )}
      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: show ? 0 : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        <h2>NShopify</h2>
        <div>
          <h5>Dashboard</h5>
          <ul>
            <li
              style={{
                backgroundColor: location.pathname.includes("/dashboard")
                  ? // ? "rgba(0, 115,255,0.1)"
                    "rgb(219, 242, 219)"
                  : "#eee",
              }}
            >
              <Link to="/dashboard">
                <MdDashboard />
                DashBoard
              </Link>
            </li>
          </ul>

          <ul>
            <li
              style={{
                backgroundColor: location.pathname.includes("/profile")
                  ? "rgba(0, 115,255,0.1)"
                  : "#eee",
              }}
            >
              <Link to="/profile">
                <CgProfile />
                Profile
              </Link>
            </li>
          </ul>

          <ul>
            <li
              style={{
                backgroundColor: location.pathname.includes("/manage")
                  ? "rgba(0, 115,255,0.1)"
                  : "#eee",
              }}
            >
              <Link to="/manage">
                <MdManageAccounts />
                Manage
              </Link>
            </li>
          </ul>

          <ul>
            <li
              style={{
                backgroundColor: location.pathname.includes("/order")
                  ? "rgba(0, 115,255,0.1)"
                  : "#eee",
              }}
            >
              <Link to="/order">
                <FaPlaceOfWorship />
                Order
              </Link>
            </li>
          </ul>

          <ul>
            <li
              style={{
                backgroundColor: location.pathname.includes("/feedback")
                  ? "rgba(0, 115,255,0.1)"
                  : "#eee",
              }}
            >
              <Link to="/feedback">
                <FaPlaceOfWorship />
                Feedback
              </Link>
            </li>
          </ul>
        </div>

        {/* second  */}

        {phoneActive && (
          <button id="close_sidebar" onClick={() => setShow(false)}>
            Close
          </button>
        )}
      </aside>
    </>
  );
};

export default AdminSidebar;
