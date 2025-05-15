import React, { createContext, useContext, useReducer } from 'react';
import { CartState, CartItem, PlateDecor } from '../types';

type CartAction = 
  | { type: 'ADD_ITEM'; payload: PlateDecor }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  cartState: CartState;
  addToCart: (item: PlateDecor) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const initialState: CartState = {
  items: [],
  total: 0
};

const calculateTotal = (items: CartItem[]): number => {
  return parseFloat(
    items.reduce((total, item) => total + item.plateDecor.price * item.quantity, 0).toFixed(2)
  );
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.plateDecor.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      } else {
        const updatedItems = [
          ...state.items,
          { plateDecor: action.payload, quantity: 1 }
        ];
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        item => item.plateDecor.id !== action.payload
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.plateDecor.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item: PlateDecor) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};