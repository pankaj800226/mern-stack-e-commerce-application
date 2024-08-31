import { useEffect, useState } from "react";
import SidebarMenu from "../../components/SidebarMenu";
import axios from "axios";
interface Product {
  id: string;
  _id: string;
  name: string;
  photo: string;
  price: number;
  category: string;
  stock: string;
}
const Manage = () => {
  const [allproduct, setAllProduct] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");

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

  const filterProduct = allproduct.filter((item) =>
    item.name.toUpperCase().includes(search.toUpperCase())
  );
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
              </tr>
            </thead>
            <tbody>
              {filterProduct.length === 0 ? (
                <h1>Product Not Found</h1>
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
                  </tr>
                ))
              )}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Manage;
