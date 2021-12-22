import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import "./Allfoods.css";

import FoodCollection from "../FoodCollection";
import { ProductContext } from "../../Context/ProductContext";

const AllFoods = () => {
  const [product] = useContext(ProductContext);
  // useEffect(() => {
  //   fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
  //     .then((res) => res.json())
  //     .then((data) => setFood(data.meals));
  // }, []);

  const { cartItems, itemCount, total, remove } = useContext(CartContext);
  console.log(cartItems, total, itemCount);

  return (
    <div>
      <h4>cart-{itemCount}</h4>
      <button onClick={remove}> Clear the Cart</button>
      <h2 style={{ color: "red" }}>total- $ {total} </h2>
      <div className="container">
        {product.map((food) => (
          <FoodCollection key={food.idMeal} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AllFoods;
