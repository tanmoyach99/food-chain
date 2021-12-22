const storeCartItems = (cartItems) => {
  const cart = cartItems.length > 0 ? cartItems : [];
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const sumItems = (cartItems) => {
  storeCartItems(cartItems);
  return {
    itemCount: cartItems.reduce((total, food) => total + food.quantity, 0),

    total: cartItems.reduce(
      (total, food) =>
        total + food.quantity * (Number(food.idMeal) / 1000).toFixed(2),
      0
    ),
  };
};

export const isInCart = (food, cartItems) => {
  //   console.log(food.idMeal);
  return cartItems.find((item) => item.idMeal === food.idMeal);
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (
        !state.cartItems.find((food) => food.idMeal === action.payload.idMeal)
      ) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      return {
        ...state,
        cartItems: [...state.cartItems],
        ...sumItems(state.cartItems),
      };
    case "INCREASE":
      const updatedCart = [...state.cartItems];
      const increaseIndex = updatedCart.findIndex(
        (item) => item.idMeal === action.payload.idMeal
      );

      const selectedFoodToIncrease = { ...updatedCart[increaseIndex] };
      selectedFoodToIncrease.quantity++;
      updatedCart[increaseIndex] = selectedFoodToIncrease;
      return {
        ...state,
        cartItems: [...updatedCart],
        ...sumItems(updatedCart),
      };
    case "DECREASE":
      const decreasedUpdatedCart = [...state.cartItems];
      const decreaseIndex = state.cartItems.findIndex(
        (item) => item.idMeal === action.payload.idMeal
      );
      const selectedFoodToDecrease = { ...decreasedUpdatedCart[decreaseIndex] };

      let food = selectedFoodToDecrease;
      if (food.quantity > 1) {
        food.quantity--;
      }
      decreasedUpdatedCart[decreaseIndex] = selectedFoodToDecrease;

      return {
        ...state,
        cartItems: [...decreasedUpdatedCart],
        ...sumItems(decreasedUpdatedCart),
      };
    case "REMOVE":
      return {
        cartItems: [],
        total: 0,
        itemCount: 0,
      };

    default:
      return state;
  }
};
