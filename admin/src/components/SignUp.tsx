import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase";
import { FaEye } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);

      toast("🦄 User Create sucessfully!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/login");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast("🦄 User Existing!", {
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

  const hideShowHandler = () => {
    setHide(!hide);
  };

  return (
    <div className="contact_container">
      <form onSubmit={handleSignUp}>
        <h2>SignUp</h2>

        <div className="form-group"></div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="form-group">
          <input
            type={hide ? "text" : "password"} // Change type to password
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label onClick={hideShowHandler}>
            {hide ? <FaEye /> : <FiEyeOff />}
          </label>
        </div>

        <div className="form-group">
          <button type="submit">Register</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
