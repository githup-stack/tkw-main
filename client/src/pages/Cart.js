import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Lấy dữ liệu từ localStorage khi component được render
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Tính tổng tiền
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Xử lý tăng số lượng
  const handleIncrease = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật localStorage
  };

  // Xử lý giảm số lượng
  const handleDecrease = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật localStorage
  };

  // Xử lý xóa món ăn khỏi giỏ hàng
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật localStorage
  };

  return (
    <div className="cart-page-kfc">
      <div className="cart-header-kfc">
        <a href="/Desserts" className="back-menu-btn">
          Quay lại menu
        </a>
        <h1 className="cart-title-kfc">GIỎ HÀNG CỦA TÔI</h1>
        <div className="cart-logo-kfc">WFF</div>
      </div>
      {/* Thông báo lỗi giả lập */}
      {/* <div className="cart-alert-kfc">Xin lỗi, nhà hàng này sẽ không thể đáp ứng yêu cầu của bạn vào thời gian chọn. Vui lòng chọn một ngày và giờ khác.</div> */}
      <div className="cart-main-kfc">
        {/* Cột trái: danh sách món */}
        <div className="cart-left-kfc">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Giỏ hàng của bạn đang trống.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item-kfc">
                <img
                  src={`http://localhost:8000/images/${item.image}`}
                  alt={item.name}
                  className="cart-item-image-kfc"
                />
                <div className="cart-item-info-kfc">
                  <div className="cart-item-row1-kfc">
                    <span className="cart-item-oldprice-kfc">
                      {item.oldPrice
                        ? `${item.oldPrice.toLocaleString()}đ`
                        : ""}
                    </span>
                    <span className="cart-item-price-kfc">
                      {item.price.toLocaleString()}đ
                    </span>
                  </div>
                  <div className="cart-item-name-kfc">{item.name}</div>
                  <div className="cart-item-actions-kfc">
                    <a
                      href={
                        item.category && item.category.toLowerCase() === "dest"
                          ? `/Desserts/${item.id}`
                          : item.category &&
                            item.category.toLowerCase() === "drink"
                          ? `/Drinks/${item.id}`
                          : `/Foods/${item.id}`
                      }
                      className="cart-item-action-kfc"
                    >
                      Xem chi tiết
                    </a>
                    <button className="cart-item-action-kfc">Chỉnh sửa</button>
                    <button
                      className="cart-item-action-kfc remove-button"
                      onClick={() => handleRemove(item.id)}
                    >
                      Xóa
                    </button>
                  </div>
                  <div className="cart-item-qty-kfc">
                    <button
                      className="qty-btn-kfc"
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn-kfc"
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-total-kfc">
                  {(item.price * item.quantity).toLocaleString()}đ
                </div>
              </div>
            ))
          )}
        </div>
        {/* Cột phải: tổng kết */}
        <div className="cart-summary-kfc">
          <div className="cart-summary-title-kfc">{cartItems.length} MÓN</div>
          <div className="cart-summary-discount-kfc">
            <span>Bạn có Mã giảm giá?</span>
            <div className="cart-summary-discount-input-kfc">
              <input type="text" placeholder="Mã giảm giá *" />
              <button>Áp dụng</button>
            </div>
          </div>
          <div className="cart-summary-row-kfc">
            <span>Tổng đơn hàng</span>
            <span>{calculateTotal().toLocaleString()}đ</span>
          </div>
          <div className="cart-summary-row-kfc cart-summary-totalpay-kfc">
            <span>Tổng thanh toán</span>
            <span>{calculateTotal().toLocaleString()}đ</span>
          </div>
          <button className="checkout-button-kfc">Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
