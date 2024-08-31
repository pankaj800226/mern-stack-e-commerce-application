import { FormEvent, useEffect, useState } from "react";
import SidebarMenu from "../../components/SidebarMenu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("http://localhost:8000/findByIdProduct/" + id)
      .then((result) => {
        setCategory(result.data.category);
        setName(result.data.name);
        setDescription(result.data.description);
        setPrice(result.data.price);
        setStock(result.data.stock);

      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/productEdit/${id}`, {
        category,
        name,
        price,
        stock,
        description,
      });
      navigate("/manage");

      toast.success("Success edit product");
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  const categories = [
    "Laptop",
    "Phone",
    "Lahenga",
    "Shirt",
    "Shoes",
    "Salwarsut",
    "Headphone",
    "Cap",
    "Iphone",
  ];
  return (
    <div className="dashboard_container">
      <SidebarMenu />
      <main>
        <div className="upload_container">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                {categories.map((cat) => (
                  <option>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <button type="submit">Edit</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Edit;
