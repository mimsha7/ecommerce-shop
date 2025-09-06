import axios from "axios";
import "./OrdersPage.css";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { OrdersGrid } from "./OrdersGrid";

export const OrdersPage = ({ cart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersData = async () => {
      const res = await axios.get("/api/orders?expand=products")
      setOrders(res.data);
    }
    getOrdersData();
  }, []);

  return (
    <>
      <title>Orders</title>

      <link rel="icon" href="orders-favicon.png" />
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
};
