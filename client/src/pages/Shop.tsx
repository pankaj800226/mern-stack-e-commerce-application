import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Laptop from "../assets/smart-laptop.png";
import Phone from "../assets/smartphone.png";
import Lahenga from "../assets/womens-lahenga.png";
import Shirt from "../assets/shirt.png";
import Shoes from "../assets/shoes.png";
import Salwarsut from "../assets/salwarsut.png";
import Headphone from "../assets/headset.png";
import Cap from "../assets/baseball-hat.png";
import Iphone from "../assets/iphone.png";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";

interface Product {
  id: string;
  _id: string;
  name: string;
  photo: string;
  price: number;
  category: string;
}
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
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
  const filterProduct = allproduct.filter(
    (item) =>
      item.name.toUpperCase().includes(search.toUpperCase()) &&
      (!selectedCategory || item.category === selectedCategory)
  );

  const categories = [
    { name: "Laptop", image: Laptop },
    { name: "Phone", image: Phone },
    { name: "Lahenga", image: Lahenga },
    { name: "Shirt", image: Shirt },
    { name: "Shoes", image: Shoes },
    { name: "Salwarsut", image: Salwarsut },
    { name: "Headphone", image: Headphone },
    { name: "Cap", image: Cap },
    { name: "Iphone", image: Iphone },
  ];

  if (!allproduct) {
    return <div>Loading...</div>;
  }

  const handleWishlist = async (item: Product) => {
    try {
      const res = await axios.post("http://localhost:8000/wishlist", {
        shopId: item._id,
        quantity: 1,
      });
      console.log(res);

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
      <div className="categori">
        <div className="image_categori">
          <button
            onClick={() => setSelectedCategory("")}
            className={selectedCategory === "" ? "activeBtn" : ""}
          >
            ALL
          </button>
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
            >
              <img
                key={category.name}
                width={100}
                src={category.image}
                alt={category.name}
                onClick={() => setSelectedCategory(category.name)}
                // className={selectedCategory === category.name ? "active" : ""}
              />
              <p>{category.name}</p>
            </div>
          ))}
        </div>

        <div className="inp_categori">
          <input
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="home">
        {filterProduct.length === 0 ? (
          <div>
            <h2 style={{ textAlign: "center", marginTop: "3rem" }}>
              {" "}
              🙃 Item Not yet 🙃
            </h2>
          </div>
        ) : (
          filterProduct.map((product) => (
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
