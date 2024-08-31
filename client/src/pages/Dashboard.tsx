import { useEffect, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import axios from "axios";
// import Profile from "../pages/admin/Profile";
interface Product {
  id: string;
  name: string;
  price: number;
  // Add any other properties your product has
}

interface CartItem {
  productId: string;
  quantity: number;
  // Add any other properties your cart item has
}

interface Cart {
  items: CartItem[];
}

const Dashboard = () => {
  const [allProduct, setAllProduct] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.post("http://localhost:8000/find");
        const cartResponse = await axios.post("http://localhost:8000/cart");
        setAllProduct(productResponse.data);
        setCart(cartResponse.data);

        const calculatedTotalPrice = productResponse.data.reduce(
          (acc: number, product: Product) => {
            return acc + product.price;
          },
          0
        );
        setTotalPrice(calculatedTotalPrice);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <>
        {/* <Profile /> */}
      <div className="dashboard_container">
        <SidebarMenu />
        <main>
          <div className="dashboard_data">
            <div className="dashboard_left">
              <div className="persion">
                <div>
                  <p
                    style={{
                      color: "green",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    AllProduct<h1>{allProduct.length}</h1>
                  </p>
                </div>
              </div>
            </div>
            <div className="dashboard_right">
              <div className="right_data">
                <p style={{ border: "10px solid green", textAlign: "center" }}>
                  <h3>TotalPrice</h3>:<p>{totalPrice}</p>
                </p>
                <p style={{ border: "10px solid red" }}>
                  Cart : {cart?.items.length}
                </p>
              </div>
            </div>
          </div>
          {/* // second  */}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
