import "../checkout/CheckoutHeader.css";
import { CheckoutHeader } from "./CheckoutHeader";
import "../checkout/CheckoutPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export const CheckoutPage = ({ cart, addCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => { 
    const getDeliveryData = async () => {
     const res = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
      setDeliveryOptions(res.data);
    } 
    getDeliveryData();

    const getPaymentData = async () => {
      const res = await axios.get("/api/payment-summary")
      setPaymentSummary(res.data);
    } 
    getPaymentData();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <link rel="icon" href="cart-favicon.png" />
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} addCart={addCart} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
};
