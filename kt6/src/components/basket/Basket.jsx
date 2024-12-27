import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../store/cartSlice';
import './basket.scss';

const Basket = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [quantities, setQuantities] = useState({}); // Количество для каждого товара
  const [isOrderPlaced, setIsOrderPlaced] = useState(false); // Состояние для кнопки "Order"
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна

  // Функция для увеличения количества товара
  const handleIncrement = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) + 1,
    }));
  };

  // Функция для уменьшения количества товара
  const handleDecrement = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) - 1),
    }));
  };

  // Общая стоимость с учетом количества товаров
  const totalPrice = cartItems.reduce((total, item) => {
    const quantity = quantities[item.id] || 1;
    return total + (item.discont_price || item.price) * quantity;
  }, 0);

  // Общее количество товаров в корзине
  const totalItems = cartItems.reduce((total, item) => {
    const quantity = quantities[item.id] || 1;
    return total + quantity;
  }, 0);

  // Обработчик нажатия на кнопку "Order"
  const handleOrder = () => {
    setIsModalOpen(true);
    setIsOrderPlaced(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="basketHeader">
        <h1>Shopping Cart</h1>
        <button onClick={() => dispatch(clearCart())} className="clearCartButton">
          Clear Cart
        </button>
        <a href="/store" className="backLink">Back to the store</a>
      </div>

      <div className="basketContainer">
        <div className="cartItems">
          {cartItems.length === 0 ? (
            <p className="empty">Тут ничаго нэт</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cartItem">
                <img src={item.image} alt={item.title} className="itemImage" />
                <div className="itemInfo">
                  <div className="itemhead">
                    <h3>{item.title}</h3>
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="itemRemove">
                      X
                    </button>
                  </div>
                  <div className="itemDetails">
                    <span className="itemName">
                      <button onClick={() => handleDecrement(item.id)}>-</button>
                      <div className="count">
                        <p>{quantities[item.id] || 1}</p>
                      </div>
                      <button onClick={() => handleIncrement(item.id)}>+</button>
                    </span>
                    <span className="itemPrice">${item.discont_price || item.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="orderDetails">
          <h2>Order Details</h2>
          <div className="priceInfo">
            <span className="originalPrice"></span>
            <span className="discountedPrice"></span>
          </div>
          <div className="itemCount">
            <p>{totalItems} items</p>
          </div>
          <div className="totalPrice">
            <p>Total</p>
            <h1>${totalPrice.toFixed(2)}</h1>
          </div>

          <div className="containerFeedback">
            <div className="feedback">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleOrder();
                }}
              >
                <input type="text" placeholder="Name" required />
                <input type="tel" placeholder="Phone number" required />
                <input type="email" placeholder="Email" required />
                <button
                  type="submit"
                  disabled={isOrderPlaced || cartItems.length === 0}
                >
                  {isOrderPlaced ? 'The Order Placed' : 'Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Basket;