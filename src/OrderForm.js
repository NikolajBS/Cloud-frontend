// OrderForm.js

import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS || 'http://localhost:5000';

const OrderForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const orderMutation = useMutation((order) =>
    axios.post(`${backendAddress}/order`, order)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert price to a number
    const parsedPrice = parseFloat(price);

    // Check if price is a valid number
    if (isNaN(parsedPrice)) {
      alert('Please enter a valid price.');
      return;
    }

    // Perform the mutation
    orderMutation.mutate({ name, price: parsedPrice });

    // Clear the form
    setName('');
    setPrice('');
  };

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={orderMutation.isLoading}>
          Create Order
        </button>
      </form>
      {orderMutation.isSuccess && <p>Order created successfully!</p>}
      {orderMutation.isError && (
        <p>Error creating order: {orderMutation.error.message}</p>
      )}
    </div>
  );
};

export default OrderForm;
