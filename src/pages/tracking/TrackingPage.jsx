import { Link, useParams } from "react-router";
import { Header } from "../../components/Header";
import './TrackingPage.css'
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export const TrackingPage = ({ cart }) => {
   const { orderId, productId } = useParams();
   const [order, setOrder] = useState(null)

   useEffect(() => {
    const getOrderData = async () => {
     const res = await axios.get(`/api/orders/${orderId}?expand=products`)
      setOrder(res.data);
    }
    getOrderData();
   }, [orderId])

   if(!order) {
    return null;
   }

   const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId
  });
    // Calculate progress percentage
    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    let progressPercentage = (timePassedMs / totalDeliveryTimeMs) * 100;

    // Limit progress at 100%
    if(progressPercentage >= 100) {
      progressPercentage = 100;
    }

    // Determine progress status based on percentage
    let progressStatus = '';

    if(progressPercentage < 33) {
      progressStatus = 'Preparing';
    } else if(progressPercentage >= 33 && progressPercentage < 50) {
      progressStatus = 'Halfway';
    } else if(progressPercentage >=50 && progressPercentage < 100) {
      progressStatus = 'Almost there';
    } else {
      progressStatus = 'Delivered';
    }


  return (
    <>
      <title>Tracking</title>
  
      <link rel="icon" href="orders-favicon.png" />
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>
            <div className="tracking-url">
              Order ID: {orderId} | Product ID: {productId}
            </div>
          <div className="delivery-date">
            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}</div>

          <div className="current-status-display" >
            📦 Current Status: {progressStatus}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${progressStatus === 'Preparing' ? 'current-status' : ''}`}>
              Preparing
            </div>
            <div className={`progress-label ${progressStatus === 'Halfway' ? 'current-status' : ''}`}>
              Shipped
            </div>
            <div className={`progress-label ${progressStatus === 'Almost there' || progressStatus === 'Delivered' ? 'current-status' : ''}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${progressPercentage}%`}}></div>
          </div>
          
          <div className="progress-percentage" 
          >
            Progress: {Math.round(progressPercentage)}%
          </div>
        </div>
      </div>
    </>
  );
};
