import { useEffect, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import axios from "axios";

const Dashboard = () => {
  const [allproduct, setAllProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const response = await axios.post("http://localhost:8000/find");
        setAllProduct(response.data);
        const res = await axios.post("http://localhost:8000/orders");
        setOrders(res.data);
        const totalPrice = response.data.reduce(
          (account: string, product: string) => {
            return account + product.price;
          },
          0
        );
        setTotalPrice(totalPrice);
      } catch (error) {
        console.log(error);
      }
    };

    fetchproduct();
  }, []);
  return (
    <div className="dashboard_container">
      <SidebarMenu />
      <main>
        <div className="dashboard_data">
          <div className="dashboard_left">
            <div className="persion">
              <div>
                <p style={{ color: "green", fontWeight: "600" }}>
                  AllProduct :{allproduct.length}
                </p>
              </div>
            </div>
          </div>
          <div className="dashboard_right">
            <div className="right_data">
              <p style={{ border: "10px solid green" }}>
                TotalPrice : {totalPrice}
              </p>
              <p style={{ border: "10px solid red" }}>
                Order : {orders.length}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
