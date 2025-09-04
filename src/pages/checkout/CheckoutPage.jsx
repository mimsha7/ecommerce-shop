import "../checkout/CheckoutHeader.css";
import { CheckoutHeader } from "./CheckoutHeader";
import "../checkout/CheckoutPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export const CheckoutPage = ({ cart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((res) => {
        setDeliveryOptions(res.data);
      })
      .catch((error) => {
        console.error("Error loading delivery options:", error);
      });

    axios
      .get("/api/payment-summary")
      .then((res) => {
        setPaymentSummary(res.data);
      })
      .catch((error) => {
        console.error("Error loading payment summary:", error);
      });
  }, []);

  return (
    <>
      <title>Checkout</title>

      <link rel="icon" href="cart-favicon.png" />
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
};
