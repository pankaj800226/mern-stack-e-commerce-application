import { useState } from "react";
import SidebarMenu from "../../components/SidebarMenu";
import axios from "axios";
import { FaDeleteLeft, FaStar } from "react-icons/fa6";
import { MenuItem } from "@mui/material";
import { toast } from "react-toastify";
interface User {
  id: string;
  email: string;
}

interface FeedBack {
  comment: string;
  stars: string;
  _id: string;
}
const Feedback = () => {
  const userDataString: string | null = localStorage.getItem("user");

  const user: User | null = userDataString
    ? (JSON.parse(userDataString) as User)
    : null;

  const [feedback, setFeedback] = useState<FeedBack[]>([]);

  useState(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.post("http://localhost:8000/ratingFind");
        setFeedback(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  const renderStars = (rating: string) => {
    const starCount = parseInt(rating, 10);

    return (
      <div>
        {[...Array(starCount)].map((_, index) => (
          <FaStar style={{ fontSize: "1.6rem" }} key={index} color="gold" />
        ))}
      </div>
    );
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/ratingDelete/${id}`);
      setFeedback((prevData) => prevData.filter((data) => data._id !== id));
      toast.success("delete successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      toast.error("error deleting");
    }
  };
  return (
    <div className="dashboard_container">
      <SidebarMenu />

      <main>
        <div className="feedback_container">
          {feedback.length === 0 ? (
            <h2>Feedback Not yet</h2>
          ) : (
            feedback.map((feed) => (
              <div>
                <h1>{user?.email.charAt(0).toUpperCase()}</h1>
                <p>{renderStars(feed.stars)}</p>
                <h2>{feed.comment}</h2>
                <MenuItem
                  className="delete"
                  onClick={() => handleDelete(feed._id)}
                >
                  <FaDeleteLeft />
                </MenuItem>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Feedback;
