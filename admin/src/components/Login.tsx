import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FormEvent, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase";
import { FaEye } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";
interface User {
  id: string;
  email: string;
  uid: string;
  user: string;
}
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(false);

  const navigate = useNavigate();


  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("All fields are required");
    }

    try {
      const users = await signInWithEmailAndPassword(auth, email, password);
      await localStorage.setItem("user", JSON.stringify(users));

      const user = users.user;
      const userDataString: string | null = localStorage.getItem("user");

      const localUser: User | null = userDataString
        ? (JSON.parse(userDataString) as User)
        : null;

      if (localUser && localUser.uid === user.uid) {
        navigate("/");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
      toast("🦄 Login Working!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast("🦄 Faild!", {
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
            type={hide ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label onClick={hideShowHandler}>
            {hide ? <FaEye /> : <FiEyeOff />}
          </label>
        </div>

        <div className="form-group">
          <button type="submit">Login</button>
       
        </div>
      </form>
     
    </div>
  );
};

export default Login;
