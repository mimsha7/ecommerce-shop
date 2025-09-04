import axios from "axios";
import "./OrdersPage.css";
import { Header } from "../../components/Header";
import { Link } from "react-router";
import buyIcon from "../../assets/images/icons/buy-again.png";
import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

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

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((OrederProduct) => {
                    return (
                      <Fragment key={OrederProduct.product.id}>
                        <div className="product-image-container">
                          <img src={OrederProduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {OrederProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on: {dayjs(OrederProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                          </div>
                          <div className="product-quantity">Quantity: {OrederProduct.quantity}</div>
                          <button className="buy-again-button button-primary">
                            <img className="buy-again-icon" src={buyIcon} />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <Link to="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
