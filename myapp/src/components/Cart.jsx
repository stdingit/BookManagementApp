import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract the cart state passed from the Dashboard
  const [cart, setCart] = useState(location.state?.cart || []);  // Use cart passed from Dashboard or initialize empty array

  useEffect(() => {
    // If cart is empty, redirect to Dashboard
    if (cart.length === 0) {
      navigate('/dashboard');
    }
  }, [cart, navigate]);

  const handleBackClick = () => {
    navigate('/dashboard');  // Navigate to the Dashboard
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px', // Space between button and other content
        }}
      >
        Back to Dashboard
      </button>

      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No books in cart.</p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          {cart.map((book, index) => (
            <div
              key={index}
              style={{
                width: '200px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <img
                src="https://img.freepik.com/free-photo/full-shot-ninja-wearing-equipment_23-2150960856.jpg?t=st=1745177074~exp=1745180674~hmac=36bd6230471697bd72b723166879e0adeb3030fb1db1581f93b81bc4dc443077&w=740" // Placeholder image, replace with a book cover if available
                alt={book.title}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  marginBottom: '15px',
                }}
              />
              <h4>{book.title}</h4>
              <p>{book.author}</p>
              <p>{book.published_date}</p>
              <p>{book.isbn}</p>
              <p>{book.genre}</p>
              <p>{book.available ? 'In Stock' : 'Out of Stock'}</p>

              {/* Buy Now Button */}
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '15px',
                }}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
