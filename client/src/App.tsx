import React, { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
const SignUp = React.lazy(() => import("./components/SignUp"));
const Login = React.lazy(() => import("./components/Login"));
import Header from "./components/Header";
const Home = React.lazy(() => import("./pages/Home"));
const DashBoard = React.lazy(() => import("./pages/Dashboard"));
const Profile = React.lazy(() => import("./pages/admin/Profile"));
const Shop = React.lazy(() => import("./pages/Shop"));
const Manage = React.lazy(() => import("./pages/admin/Manage"));
const Allproduct = React.lazy(() => import("./pages/ProductDetails"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Footer = React.lazy(() => import("./components/Footer"));
const Order = React.lazy(() => import("./pages/admin/Order"));
const Feedback = React.lazy(() => import("./pages/admin/Feedback"));
import PageNotFound from "./components/PageNotFound";
const Wishlist = React.lazy(() => import("./pages/Wishlist"));
// import stype component
import "./styles/app.scss";
import "./styles/home.scss";
import "./styles/color.scss";
import "./styles/header.scss";
import "./styles/signup.scss";
import "./styles/profile.scss";
import "./styles/banner.scss";
import "./styles/manage.scss";
import "./styles/allproduct.scss";
import "./styles/cart.scss";
import "./styles/footer.scss";
import "./styles/order.scss";
import "./styles/dashboard.scss";
import "./styles/feedback.scss";
import "./styles/wishlist.scss";
import BuyNow from "./pages/BuyNow";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<Loading />}>
          {loading ? (
            <Loading />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                    <Home />
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/dashboard"
                element={
                    <DashBoard />
                }
              />

              <Route
                path="/profile"
                element={
                    <Profile />
                }
              />

              <Route
                path="/shop"
                element={
                    <Shop />
                }
              />

              <Route
                path="/manage"
                element={
                    <Manage />
                }
              />

              <Route
                path="/allproduct/:id"
                element={
                    <Allproduct />
                }
              />
              <Route
                path="/cart"
                element={
                    <Cart />
                }
              />
              <Route
                path="/order"
                element={
                    <Order />
                }
              />

              <Route
                path="/feedback"
                element={
                    <Feedback />
                }
              />

              <Route
                path="/wishlist"
                element={
                    <Wishlist />
                }
              />

              <Route path="*" element={<PageNotFound />} />
              <Route path="/buynow" element={<BuyNow />} />
            </Routes>
          )}
        </Suspense>
        <ToastContainer />
        <Footer />
      </Router>
    </>
  );
};

export default App;
