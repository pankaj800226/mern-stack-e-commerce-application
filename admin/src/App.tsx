import React, { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
const SignUp = React.lazy(() => import("./components/SignUp"));
const Login = React.lazy(() => import("./components/Login"));
import Header from "./components/Header";
const Home = React.lazy(() => import("./pages/Home"));
const Manage = React.lazy(() => import("./pages/admin/Manage"));
const Upload = React.lazy(() => import("./pages/admin/Upload"));
const Edit = React.lazy(() => import("./pages/admin/Edit"));
const DashBoard = React.lazy(() => import("./pages/Dashboard"));
const Order = React.lazy(() => import("./pages/Order"));
import Feedback from "./pages/admin/Feedback";

// import stype component
import "./styles/app.scss";
import "./styles/color.scss";
import "./styles/header.scss";
import "./styles/signup.scss";
import "./styles/manage.scss";
import "./styles/upload.scss";
import "./styles/dashboard.scss";
import "./styles/order.scss";
import "./styles/feedback.scss";

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
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />

              <Route path="/manage" element={<Manage />} />

              <Route path="/upload" element={<Upload />} />

              <Route path="/edit/:id" element={<Edit />} />

              <Route path="/dashboard" element={<DashBoard />} />

              <Route path="/order" element={<Order />} />

              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          )}
        </Suspense>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
