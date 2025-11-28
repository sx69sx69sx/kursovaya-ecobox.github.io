import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = { items: [] };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART': {
      // ожидаем, что в localStorage лежит объект вида { items: [...] }
      const data = action.payload;
      if (data && Array.isArray(data.items)) {
        return { ...state, items: data.items };
      }
      return state;
    }

    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + (action.payload.quantity || 1),
                  // image оставляем как был (или можно обновить, если передаёшь новый)
                }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload], // payload уже должен содержать image
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Загрузка из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ecobox-cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_CART', payload: parsed });
      } catch (e) {
        console.error('Ошибка парсинга ecobox-cart', e);
      }
    }
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('ecobox-cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
