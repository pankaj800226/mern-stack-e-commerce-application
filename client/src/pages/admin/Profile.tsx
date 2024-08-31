import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface UserInfo {
  name: string;
  email: string;
  photo: string | null;
}
const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    photo: null,
  });

  const navigete = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    const email = localStorage.getItem("EMAIL");
    const photo = localStorage.getItem("PROFILEPHOTO");
    const name = localStorage.getItem("NAME");

    if (!token) {
      navigete("/");
    } else {
      setUserInfo({ name: name || "", email: email || "", photo });
    }
  }, [navigete]);
  return (
    <div className="profile_container">
      <div className="profile_left">
        <img
          src={`http://localhost:8000/profileimage/${userInfo.photo}`}
          alt=""
        />
      </div>
      <div className="profile_right">
        <strong>Full Name</strong>
        <p>{userInfo.name}</p>

        <strong>Email</strong>
        <p>{userInfo.email}</p>

        <Link to={"/order"}>Order</Link>
      </div>
    </div>
  );
};

export default Profile;
