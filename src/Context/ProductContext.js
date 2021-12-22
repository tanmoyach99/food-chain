import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
      .then((res) => res.json())
      .then((data) => setProduct(data.meals));
  }, []);
  return (
    <ProductContext.Provider value={[product]}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
