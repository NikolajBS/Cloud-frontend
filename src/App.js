import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import OrderForm from './OrderForm';

function App() {
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS || 'http://localhost:5000';

  // Fetch menu items
  const fetchMenu = async () => {
    return await axios
      .get(`${backendAddress}/menu`)
      .then((response) => response.data);
  };

  // Fetch orders
  const fetchOrders = async () => {
    return await axios
      .get(`${backendAddress}/orders`)
      .then((response) => response.data);
  };

  // UseQuery for menu
  const { data: menuData, error: menuError, isLoading: menuIsLoading } = useQuery('menu', fetchMenu);

  // UseQuery for orders with refetchInterval
  const { data: ordersData, error: ordersError, isLoading: ordersIsLoading } = useQuery('orders', fetchOrders, {
    refetchInterval: 5000, // 5000 milliseconds = 5 seconds
  });

  if (menuIsLoading || ordersIsLoading) {
    return <div>Loading...</div>;
  }

  if (menuError || ordersError) {
    return <div>Error...</div>;
  }

  const handlePlaceOrder = (item) => {
    // Handle placing an order here (you can make a POST request to /orders endpoint)
    console.log('Placing order:', item);
  };

  return (
    <>
      <h1>Menu</h1>
      {menuData.map((food) => (
        <li key={food.id}>
          {food.name} - {food.price}
          <button onClick={() => handlePlaceOrder(food)}>Add to cart</button>
        </li>
      ))}

      <h1>Orders</h1>
      {ordersData.map((order) => (
        <li key={order.id}>
          {order.name} - {order.price}
        </li>
      ))}

      {/* Render the OrderForm component */}
      <OrderForm />
    </>
  );
}

export default App;
