import React, { createContext, useCallback, useReducer } from "react";
import { cartReducer, sumItems } from "../reducers/cartReducers";

export const CartContext = createContext();
const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  cartItems: cartFromStorage,
  ...sumItems(cartFromStorage),
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addFood = (food) => dispatch({ type: "ADD_TO_CART", payload: food });
  const increase = (food) => dispatch({ type: "INCREASE", payload: food });
  const decrease = (food) => dispatch({ type: "DECREASE", payload: food });
  const remove = () => dispatch({ type: "REMOVE" });

  const contextValues = { ...state, addFood, increase, decrease, remove };
  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
