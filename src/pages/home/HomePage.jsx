import axios from "axios";
import "./HomePage.css";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";

export const HomePage = ({cart}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios("/api/products")
    .then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <>
      <title>Ecommerce Shop</title>

      <link rel="icon" href="home-favicon.png" />

      <Header cart={cart} />
      
      <div className="home-page">
        <ProductsGrid products={products} />      
      </div>
    </>
  );
};
