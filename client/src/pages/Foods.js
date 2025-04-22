import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Foods.css";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/foods");
        setFoods(response.data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải dữ liệu món ăn. Vui lòng thử lại sau.");
        setLoading(false);
        console.error("Error fetching foods:", err);
      }
    };

    fetchFoods();
  }, []);

  const addToCart = (food) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === food.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm món ăn vào giỏ hàng!");
  };

  if (loading) {
    return (
      <div className="foods-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return <div className="foods-error">{error}</div>;
  }

  return (
    <div className="foods-container">
      <div className="foods-header">
        <h1>Thức Ăn</h1>
        <p>Khám phá các món ăn ngon miệng của chúng tôi</p>
      </div>

      <div className="foods-grid">
        {foods.map((food) => (
          <div key={food.id} className="food-card">
            <div className="food-image-container">
              <img
                src={`http://localhost:8000/images/${food.image}`}
                alt={food.name}
                className="food-image"
              />
              {food.oldPrice && (
                <div className="food-discount">
                  {Math.round(
                    ((food.oldPrice - food.price) / food.oldPrice) * 100
                  )}
                  %
                </div>
              )}
            </div>
            <div className="food-info">
              <h3 className="food-name">{food.name}</h3>
              <p className="food-description">{food.description}</p>
              <div className="food-price-container">
                {food.oldPrice && (
                  <span className="food-old-price">
                    {food.oldPrice.toLocaleString()}đ
                  </span>
                )}
                <span className="food-price">
                  {food.price.toLocaleString()}đ
                </span>
              </div>
              <div className="food-actions">
                <Link to={`/Foods/${food.id}`} className="food-detail-btn">
                  Xem chi tiết
                </Link>
                <button
                  className="food-cart-btn"
                  onClick={() => addToCart(food)}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foods;
