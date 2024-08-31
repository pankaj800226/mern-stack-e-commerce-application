import { useEffect, useState } from "react";
import SidebarMenu from "../components/SidebarMenu";
import axios from "axios";
import { toast } from "react-toastify";

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
  status: string;
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

  const orderDeleteHandle = async (id: string) => {
    try {
      await axios.delete("http://localhost:8000/orderDelete/" + id);
      setOrders((prevData) => prevData.filter((item) => item._id !== id));
      toast("🦄 Item/Order Removed!", {
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
      toast(`🦄 error remove!`, {
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

                  <div className="order_status">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Canceled">Canceled</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
                <div className="order_content">
                  <div className="order_left">
                    <h3>Order Items</h3>
                    <table className="order_items_table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={item._id}>
                            <td>
                              <img
                                src={`http://localhost:8000/image/${item.photo}`}
                                alt={item.shopId.name}
                                className="order_item_image"
                              />
                            </td>
                            <td>{item.shopId.name}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <h4>
                      Total Price: ₹
                      {order.items.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )}
                    </h4>
                  </div>
                  <div className="order_right">
                    <h3>Shipping Details</h3>
                    <p>
                      <strong>Name:</strong> {order.shippingDetails.name}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.shippingDetails.address}
                    </p>
                    <p>
                      <strong>Near House:</strong>{" "}
                      {order.shippingDetails.nearHouse}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.shippingDetails.phone}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {order.shippingDetails.pincode}
                    </p>
                    <div className="order_status">
                      <h4 style={{ color: getStatusColor(order.status) }}>
                        Status: {order.status}
                      </h4>

                      <button onClick={() => orderDeleteHandle(order._id)}>
                        Remove
                      </button>
                    </div>
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
