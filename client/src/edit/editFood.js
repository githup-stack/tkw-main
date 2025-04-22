import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  // Lấy thông tin món ăn hiện tại
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`/api/food/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch food details");
      }
    };

    fetchFood();
  }, [id]);

  // Xử lý thay đổi trong form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gửi yêu cầu cập nhật món ăn
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/food/update/${id}`, formData);
      alert(response.data.message);
      navigate("/Desserts");
    } catch (error) {
      console.error(error);
      alert("Failed to update food item");
    }
  };

  return (
    <div className="edit-food-container">
      <h1>Edit Food</h1>
      <form onSubmit={handleSubmit} className="edit-food-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Food</button>
      </form>
    </div>
  );
};

export default EditFood;
