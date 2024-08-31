import { useEffect, useState } from "react";
import SidebarMenu from "../../components/SidebarMenu";
import axios from "axios";

interface OrderItem {
  _id: string;
  photo: string;
  quantity: number;
  price: number;
  shopId: {
    name: string;
  };
}

interface ShippingDetails {
  name: string;
  address: string;
  nearHouse: string;
  phone: string;
  pincode: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  shippingDetails: ShippingDetails;
  createdAt: string;
  status: string; // Fixed typo from "ststus" to "status"
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.post("http://localhost:8000/orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await axios.put(`http://localhost:8000/orderStatus/${id}`, {
        status,
      });
      setOrders((prevData) =>
        prevData.map((order) =>
          order._id === id ? { ...order, status: res.data.status } : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Canceled":
        return "red";
      case "Confirmed":
        return "green";
      case "Shipping":
        return "blue";
      case "Delivered":
        return "darkorange";
      default:
        return "black";
    }
  };

  return (
    <div className="dashboard_container">
      <SidebarMenu />
      <main>
        <div className="order_container">
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="order_item">
                <div className="order_header">
                  <h3>
                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                  </h3>
                  <p>Order ID: {order._id}</p>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
                <div className="order_content">
                  <div className="order_left">
                    <h3>Order Items</h3>
                    {order.items.map((item) => (
                      <div key={item._id} className="order_product_item">
                        <img
                          src={`http://localhost:8000/image/${item.photo}`}
                          alt={item.shopId.name}
                          className="order_item_image"
                        />
                        <div className="order_item_details">
                          <p>{item.shopId.name}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ₹{item.price}</p>
                          <strong
                            style={{ color: getStatusColor(order.status) }}
                          >
                            status:{order.status}
                          </strong>
                        </div>
                      </div>
                    ))}
                    <h4>
                      Total Price: ₹
                      {order.items.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )}
                    </h4>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Order;
