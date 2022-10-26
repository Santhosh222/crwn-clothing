// NOTE: This is not used currently. This logic is moved to redux store.

import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util";

// Helper methods
const addCartItem = (cartItems, productToAdd) => {
  let existingCartItem = cartItems.find(item => item.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map(cartItem => 
      cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem);
  }

  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  if (cartItemToRemove.quantity === 1) {

    return clearCartItem(cartItems, cartItemToRemove);
  }

  return cartItems.map(cartItem => 
    cartItem.id === cartItemToRemove.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem);
}

const clearCartItem = (cartItems, cartItemToClear) =>  cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

// Cart Context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS: 
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

// Cart Provider component
// Returns Context provider with 'value' attribute
export const CartProvider = ({children}) => {
  const [{ 
    isCartOpen, 
    cartItems, 
    cartCount, 
    cartTotal 
  }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = newCartItems => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, {quantity, price}) => total + (quantity * price), 
      0
    );
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal
    }));
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = cartItemToRemove => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = cartItemToClear => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  }
  
  const setIsCartOpen = bool => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, 
    cartTotal, removeItemFromCart, clearItemFromCart};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}