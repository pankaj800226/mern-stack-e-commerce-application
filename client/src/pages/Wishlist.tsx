import { MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface WishlistItem {
  _id: string;
  id: string;
  shopId: {
    _id: string;
    name: string;
  };
  photo: string;
  quantity: number;
  price: number;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.post("http://localhost:8000/findWishlist");
        setWishlist(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();
  }, [wishlist]);

  const wishlistdeleteHandle = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/wishlistDelete/${id}`);
      toast(`🦄 wishlist deleted!`, {
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
    <div className="wishlist-container">
      {wishlist.length === 0 ? (
        <h2 className="empty-message">Wishlist Not Yet</h2>
      ) : (
        wishlist.map((wish) => (
          <div key={wish.id} className="wishlist-item">
            <div className="img">
              <img src={`http://localhost:8000/image/${wish?.photo}`} alt="" />
            </div>
            <div className="wishlist-content">
              <h2 className="shop-name">{wish.shopId.name}</h2>
              <h2 className="price">${wish.price}</h2>
              <MenuItem
                className="wishlist_delete"
                onClick={() => wishlistdeleteHandle(wish.shopId._id)}
              >
                <AiFillDelete />
              </MenuItem>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
