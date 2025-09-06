import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";

export function OrderSummary({ deliveryOptions, cart, addCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const SelectedOption = deliveryOptions.find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          });

          if (!SelectedOption) {
            console.error(
              "No matching delivery option found for cart item:",
              cartItem
            );
            return null;
          }

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(SelectedOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>
              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} />
                <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} addCart={addCart} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
