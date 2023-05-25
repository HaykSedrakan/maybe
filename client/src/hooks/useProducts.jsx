import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { vars } from "../constants/variables";

const useProducts = (limit) => {
  const [products, setProducts] = useState([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const fetchProducts = async () => {
        try {
          const res = await axios.get(`${vars.API}/products`);
          const limitedProducts = res.data.slice(0, limit);
          setProducts(limitedProducts);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProducts();
    }
  }, [limit]);

  return products;
};

export default useProducts;
