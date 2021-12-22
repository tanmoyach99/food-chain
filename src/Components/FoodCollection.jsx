import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "./AllFoods/Allfoods.css";

import { isInCart } from "../reducers/cartReducers";

const FoodCollection = ({ food }) => {
  const { cartItems, increase, addFood, decrease } = useContext(CartContext);
  const { idMeal, strMeal, strMealThumb } = food;
  const foodSelected = { idMeal, strMeal, strMealThumb };
  return (
    <div>
      <div className="food-details">
        <img src={strMealThumb} alt="" className="food-img" />
        <p className="food-name"> {strMeal}</p>
        <p className="food-price"> $ {Number(idMeal / 1000).toFixed(2)}</p>
        {!isInCart(food, cartItems) && (
          <button className="btn-cart" onClick={() => addFood(foodSelected)}>
            Add to carts
          </button>
        )}{" "}
        {isInCart(food, cartItems) && (
          <div>
            <button
              className=" btn btn-change"
              onClick={() => increase(foodSelected)}
            >
              +
            </button>

            <button
              className="btn btn-change"
              onClick={() => decrease(foodSelected)}
            >
              -
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCollection;
