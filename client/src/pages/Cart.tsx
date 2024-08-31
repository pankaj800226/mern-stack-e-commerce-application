import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import shopping from "../assets/shopping.png";
import { useNavigate } from "react-router-dom";
import BuyNow from "./BuyNow";

interface Shop {
  _id: string;
  name: string;
}

interface CartItem {
  _id: string;
  shopId: Shop;
  photo: string;
  quantity: number;
  price: number;
}

interface Cart {
  items: CartItem[];
}

const Cart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const navigate = useNavigate();
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.post<Cart>("http://localhost:8000/cart");
        setCart(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, [cart]);

  const handleGoToHome = () => {
    navigate("/");
  };

  const handleIncreaseQuantity = async (item: string) => {
    try {
      await axios.post("http://localhost:8000/addToCart", {
        shopId: item,
        quantity: 1,
      });
    } catch (error) {
      console.log(error);
      toast(`🦄 Error: ${error}!`, {
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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/cartDelete/${id}`);
      toast("🦄 Remove Ok!", {
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
      toast(`🦄 Error: ${error}!`, {
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

  const handleDecreaseQuantity = async (id: string) => {
    try {
      await axios.post("http://localhost:8000/decreaseQuantity", {
        shopId: id,
        quantity: 1,
      });
    } catch (error) {
      console.log(error);
      toast(`🦄 Error: ${error}!`, {
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

  const renderCartItems = () => {
    if (!cart || cart.items.length === 0) {
      return (
        <div className="shopping_empty">
          <h1>Your cart is empty.</h1>
          <img src={shopping} alt="" />
          <button onClick={handleGoToHome}>Go Home</button>
        </div>
      );
    } else {
      return (
        <div className="cart-container">
          {cart?.items.map((item) => (
            <div className="product-item" key={item._id}>
              <img src={`http://localhost:8000/image/${item.photo}`} alt="" />

              <div className="product-details">
                <div className="product-title">{item.shopId.name}</div>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="price">₹{item.price}</div>
              <div className="btn">
                <button onClick={() => handleDecreaseQuantity(item.shopId._id)}>
                  -
                </button>
                <p>{item.quantity}</p>
                <button onClick={() => handleIncreaseQuantity(item.shopId._id)}>
                  +
                </button>
                <button onClick={() => handleDelete(item.shopId._id)}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <p>Total Items: {cart?.items.length}</p>
            <p>
              Total Price: ₹
              {cart?.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-and-shipping">
        {renderCartItems()}
        {cart?.items.length > 0 && (
          // <div>
          <BuyNow />
          // </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
