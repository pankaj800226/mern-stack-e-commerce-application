import { ChangeEvent, FormEvent, useState } from "react";
import SidebarMenu from "../../components/SidebarMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Upload = () => {
  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", category);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);

    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }

    if (
      category !== "" &&
      name !== "" &&
      description !== "" &&
      price !== "" &&
      stock !== "" &&
      file !== null
    ) {
      try {
        await axios.post("http://localhost:8000/storeCreate", formData);
        toast.success("Upload Success");
        setTimeout(() => {
          navigate("/manage");
        }, 2000);
        setBtnLoading(true);
      } catch (error) {
        console.log(error);
        toast.error(`error: ${error}`);
      }
    } else {
      toast.warn("All fields are required");
    }

    setCategory("");
    setName("");
    setDescription("");
    setFile(null);
    setPrice("");
    setStock("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
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
              <input type="file" onChange={handleFileChange} />
            </div>

            <div>
              <button type="submit">
                {btnLoading ? <p>Loading...</p> : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Upload;
