


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from './CartProvider';
import '../App.css';

function BookDescription() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(book);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Popup will disappear after 3 seconds
  };

  if (!book) return <div className="loading">Loading...</div>;

  return (
    <div className="book-description">
      <h2>{book.volumeInfo.title} - Description</h2>
      <p>{book.volumeInfo.description}</p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      {showPopup && (
        <div className="cart-popup">Item added to cart!</div>
      )}
    </div>
  );
}

export default BookDescription;
