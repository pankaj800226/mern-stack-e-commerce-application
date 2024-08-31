import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const navigation = () => {
    navigate("/");
  };
  return (
    <div className="not_found">
      <h2>Page Not Found</h2>
      <button onClick={navigation}>Go Back To Home</button>
    </div>
  );
};

export default PageNotFound;
