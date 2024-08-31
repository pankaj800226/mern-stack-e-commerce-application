import { Link, useNavigate } from "react-router-dom";
import Banner from "../pages/banner";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
interface Product {
  id: string;
  _id: string;
  name: string;
  photo: string;
  price: number;
}
const Home = () => {
  const [allproduct, setAllProduct] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const response = await axios.post("http://localhost:8000/find");
        setAllProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchproduct();
  }, []);
  const sliceProduct = 8;
  const sliceFilter = allproduct.slice(0, sliceProduct);

  const handleWishlist = async (item: Product) => {
    try {
      await axios.post("http://localhost:8000/wishlist", {
        shopId: item._id,
        quantity: 1,
      });

      toast("🦄 Item added to wishlist!", {
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
      toast(`🦄 error ${error}!`, {
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
    <div>
      <Banner />
      <div className="home_header">
        <p>Best Product</p>
        <Link to={"/shop"}>More</Link>
      </div>
      <div className="home">
        {sliceFilter.length === 0 ? (
          <div>
            <h2 style={{ textAlign: "center", marginTop: "3rem" }}>
              {" "}
              🙃 Item Not yet 🙃
            </h2>
          </div>
        ) : (
          sliceFilter.map((product) => (
            <div className="home_section">
              <Link to={`/allproduct/${product._id}`} key={product._id}>
                <div>
                  <img
                    src={`http://localhost:8000/image/${product.photo}`}
                    alt=""
                  />
                </div>
              </Link>
              <h2>{product.name}</h2>
              <p>₹{product.price}</p>
              <AiOutlineHeart
                className="wishlist"
                title="Wishlist"
                onClick={() => handleWishlist(product)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
