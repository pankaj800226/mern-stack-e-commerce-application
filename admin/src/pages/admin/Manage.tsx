import { FiEdit2 } from "react-icons/fi";
import SidebarMenu from "../../components/SidebarMenu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
interface Product {
  _id: string;
  name: string;
  price: number;
  photo: string;
  stock: string;
}

const Manage = () => {
  const [allproduct, setAllProduct] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");

  const filterProduct = allproduct.filter((item) =>
    item.name.toUpperCase().includes(search.toUpperCase())
  );

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

  // delete product
  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/deleteProduct/${id}`);
      setAllProduct((prevData) => prevData.filter((data) => data._id !== id));
      toast.success("delete successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      toast.error("delete error", {
        position: "bottom-center",
        autoClose: 2000,
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
        <div className="manage_container">
          <div className="search_baar">
            <div className="bar">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <img src="userprofile.jpg" alt="" />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Edit</th>
                <th>Delete</th>
                {/* <th>Status</th> */}
              </tr>
            </thead>
            <tbody>
              {filterProduct.length === 0 ? (
                <h2>Product Not Found</h2>
              ) : (
                filterProduct.map((product, index) => (
                  <tr>
                    <td>{product._id}</td>
                    <td key={index}>
                      <img
                        src={`http://localhost:8000/image/${product.photo}`}
                        alt=""
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stock}</td>

                    <td>
                      <Link
                        style={{ color: "black" }}
                        to={`/edit/${product._id}`}
                      >
                        <IconButton aria-label="delete" size="large">
                          <FiEdit2 fontSize="inherit" />
                        </IconButton>
                      </Link>
                    </td>

                    <td>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => deleteProduct(product._id)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </td>
                    {/* <td>Conform</td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Manage;
