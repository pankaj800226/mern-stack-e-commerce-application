import axios from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      try {
        const res = await axios.post(
          "http://localhost:8000/login",
          {
            email,
            password,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        if (res.data.code === 500) {
          toast("🦄 user Not found!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.data.code === 401) {
          toast("🦄 password wrong!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.data.code === 200) {
          navigate("/profile");
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("NAME", res.data.name);
          localStorage.setItem("EMAIL", res.data.email);
          localStorage.setItem("PROFILEPHOTO", res.data.profileImage);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast(`🦄 all feild are require!`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="contact_container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        <div className="form-group"></div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {/* <label onClick={hideShowHandler}>{hide ? <FaEye /> : <FiEyeOff />}</label> */}
        </div>

        <div className="form-group">
          <button type="submit">Login</button>
          <span>
            Already have an account? <Link to="/signup">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
