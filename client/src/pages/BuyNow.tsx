import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ShippingAddress {
  name: string;
  address: string;
  nearHouse: string;
  phone: string;
  pincode: string;
}

const BuyNow = () => {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [pincodeError, setPincodeError] = useState<boolean>(false);

  const navigate = useNavigate();

  const [shippingDetails, setShippingAddresh] = useState<ShippingAddress>({
    name: "",
    address: "",
    nearHouse: "",
    phone: "",
    pincode: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setShippingAddresh((prevData) => ({ ...prevData, [name]: value }));
    if (name === "pincode") {
      setPincodeError(false);
    }
  };

  const handleBuyNow = async () => {
    if (
      shippingDetails.name !== "" &&
      shippingDetails.address !== "" &&
      shippingDetails.nearHouse !== "" &&
      shippingDetails.phone !== "" &&
      shippingDetails.pincode !== ""
    ) {
      setBtnLoading(true);
      try {
        // backend code add
        const res = await axios.post("http://localhost:8000/placeOrder", {
          shippingDetails,
        });

        setTimeout(() => {
          navigate("/order", { state: { order: res.data } });
          setBtnLoading(false);
        }, 3000);

        toast.success("🦄 Order Done!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error: unknown) {
        console.log(error);
        if (
          toast.warn("Pincode not available for delivery")
          // error.response &&
          // error.response.data.message === "Pincode not available for delivery"
        ) {
          setPincodeError(true);
        } else {
          toast.error("🦄 Something went wrong!", {
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
        setBtnLoading(false);
      }
    } else {
      toast.warn("🦄 All fields are required!", {
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
    setShippingAddresh({
      name: "",
      address: "",
      nearHouse: "",
      phone: "",
      pincode: "",
    });
  };

  return (
    <div className="shipping-input">
      <h3>Shipping Details</h3>
      <div className="shipping-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={shippingDetails.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Full Address"
          required
          value={shippingDetails.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nearHouse"
          placeholder="Near house"
          required
          value={shippingDetails.nearHouse}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone Number"
          required
          value={shippingDetails.phone}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="pincode"
          placeholder="Pincode"
          required
          value={shippingDetails.pincode}
          onChange={handleInputChange}
        />
        {pincodeError && (
          <p className="error">
            This pincode is not available for delivery in this area.
          </p>
        )}
      </div>

      <button onClick={handleBuyNow} disabled={btnLoading}>
        {btnLoading ? <p>Loading...</p> : "Buy Now"}
      </button>
    </div>
  );
};

export default BuyNow;
