import { createSlice } from '@reduxjs/toolkit';

// Функция для загрузки данных из localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

// Функция для сохранения данных в localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(), // Загружаем данные из localStorage
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      // Сохраняем обновленную корзину в localStorage
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);

      // Сохраняем обновленную корзину в localStorage
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];

      // Очищаем корзину в localStorage
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;