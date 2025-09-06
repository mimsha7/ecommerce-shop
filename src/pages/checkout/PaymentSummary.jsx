import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useNavigate } from "react-router";

export function PaymentSummary({ paymentSummary, addCart }) {
  const navigate = useNavigate();

  const placeOrder = async () => {
    await axios.post('/api/orders');
    await addCart();
    navigate('/orders');
  }

  if (!paymentSummary) return null;
  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      <div className="payment-summary-row">
          <div>Items ({paymentSummary.totalItems}):</div>
          <div className="payment-summary-money">
            {formatMoney(paymentSummary.productCostCents)}
          </div>
        </div>
  
        <div className="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div className="payment-summary-money">
            {formatMoney(paymentSummary.shippingCostCents)}
          </div>
        </div>
  
        <div className="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div className="payment-summary-money">
            {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
          </div>
        </div>
  
        <div className="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div className="payment-summary-money">
            {formatMoney(paymentSummary.taxCents)}
          </div>
        </div>
  
        <div className="payment-summary-row total-row">
          <div>Order total:</div>
          <div className="payment-summary-money">
            {formatMoney(paymentSummary.totalCostCents)}
          </div>
        </div>
  
        <button className="place-order-button button-primary" onClick={placeOrder}>
          Place your order
        </button>
    </div>
  );
}
