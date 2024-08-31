import { useState } from "react";
import SidebarMenu from "../../components/SidebarMenu";
import axios from "axios";
import { toast } from "react-toastify";

const Feedback = () => {
  const [comment, setComment] = useState<string>("");
  const [stars, setStars] = useState<string>("");

  const handleSubmit = async () => {
    if (comment !== "" && stars !== "") {
      try {
        await axios.post("http://localhost:8000/Createfeedback", {
          comment,
          stars,
        });
        toast("🦄 Feedback Done!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.log(error);
        toast("🦄 Error!", {
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
    } else {
      toast("🦄 All fields are required!", {
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
    setStars("");
    setComment("");
  };

  const feedBackRender = () => {
    const star = [1, 2, 3, 4, 5, 6];
    return (
      <div className="feedback_container">
        <div>
          <select onChange={(e) => setStars(e.target.value)} value={stars}>
            <option value="">Select</option>
            {star.map((star) => (
              <option key={star} value={star}>
                {star}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Add Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button onClick={handleSubmit}>SEND</button>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard_container">
      <SidebarMenu />
      <main>{feedBackRender()}</main>
    </div>
  );
};

export default Feedback;
