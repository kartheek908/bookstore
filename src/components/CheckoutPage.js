import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartProvider';
import '../App.css';

function CheckoutPage(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { total } = location.state;
    const { clearCart } = useCart();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.loggedIn) {
            alert('Check your mobile for payment confirmation!');
            clearCart();
            window.location.href = "https://web3forms.com/success";
        } else {
            setError('You haven\'t logged in. Please log in to proceed with payment.');
            setTimeout(() => {
                setError('');
                navigate('/login', { state: { from: location } });
            }, 2000); // Redirect after 2 seconds
        }
    };

    return (
        <div className="page-container checkout-page">
            <h1>Checkout</h1>
            <p>Total Amount to Pay: ${total}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    required
                    className="input-field"
                />
                <input
                    type="hidden"
                    name="redirect"
                    value="https://web3forms.com/success"
                />
                <button type="submit" className="btn-payment">Pay</button>
            </form>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </div>
    );
}

export default CheckoutPage;
