import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Product {
  id: string;
  _id: string;
  name: string;
  photo: string;
  price: number;
  description: string;
  stock: number;
}

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post<Product>(
          `http://localhost:8000/findByIdProduct/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCartHandler = async (product: Product) => {
    try {
      await axios.post("http://localhost:8000/addToCart", {
        shopId: product._id,
        quantity: 1,
      });
      toast("🦄 Item added to cart!", {
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
      toast(`🦄 Error: ${error}`, {
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
    <div className="product-details-container">
      <div className="product-image-section">
        <img
          src={`http://localhost:8000/image/${product.photo}`}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info-section">
        <h2>{product.name}</h2>
        <p>₹{product.price}</p>

        <p>{product.description}</p>
        <div className="product-actions">
          <button
            onClick={() => addToCartHandler(product)}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? "Add To Cart" : "Out of stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
