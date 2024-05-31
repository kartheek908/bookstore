import React, { useState } from 'react';
import { useCart } from './CartProvider';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function CartPage() {
    const { cartItems, removeFromCart } = useCart();
    const navigate = useNavigate();
    const [showRemovePopup, setShowRemovePopup] = useState(false);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.saleInfo && (item.saleInfo.listPrice?.amount || item.saleInfo.retailPrice?.amount);
            return total + (price || 0);
        }, 0).toFixed(2);
    };

    const handleCheckout = () => {
        navigate('/checkout', { state: { total: calculateTotal() } });
    };

    const handleRemove = (item) => {
        removeFromCart(item);
        setShowRemovePopup(true);
        setTimeout(() => setShowRemovePopup(false), 3000); // Popup disappears after 3 seconds
    };

    if (!cartItems.length) return <div className="cart-empty">Your cart is empty.</div>;

    return (
        <div className="cart-page">
            <h1>Cart</h1>
            <ul className="cart-list">
                {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                        <img
                            src={`http://books.google.com/books/content?id=${item.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
                            alt={item.volumeInfo.title}
                            className="cart-item-image"
                        />
                        <div className="cart-item-info">
                            <h3>{item.volumeInfo.title}</h3>
                            <p>{item.volumeInfo.authors.join(', ')}</p>
                            {item.saleInfo && item.saleInfo.listPrice && (
                                <p>Price: ${item.saleInfo.listPrice.amount.toFixed(2)} {item.saleInfo.listPrice.currencyCode}</p>
                            )}
                            {item.saleInfo && item.saleInfo.retailPrice && !item.saleInfo.listPrice && (
                                <p>Retail Price: ${item.saleInfo.retailPrice.amount.toFixed(2)} {item.saleInfo.retailPrice.currencyCode}</p>
                            )}
                            <button onClick={() => handleRemove(item)} className="btn-remove">Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-total">
                <h2>Total: ${calculateTotal()}</h2>
                <button onClick={handleCheckout} className="btn-checkout">Checkout</button>
            </div>
            {showRemovePopup && (
                <div className="remove-popup">Removed from cart!</div>
            )}
        </div>
    );
}

export default CartPage;
