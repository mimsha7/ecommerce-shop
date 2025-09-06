import { HomePage } from "./pages/home/HomePage";
import "./App.css";
import { Route, Routes } from "react-router";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/tracking/TrackingPage";
import { NotFound } from "./pages/NotFound";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);

  const addCart = async () => {
    const res = await axios.get("/api/cart-items?expand=product")
     setCart(res.data);
   }

  useEffect(() => {
    addCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} addCart={addCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} addCart={addCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
