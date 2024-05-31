import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth(); 
    
    
    useEffect(() => {
        if (user) {
            loadCartItems();
        } else {
            loadCartFromLocalStorage();
        }
    }, [user]);

    const loadCartFromLocalStorage = () => {
        const localCart = localStorage.getItem('cartItems');
        if (localCart) {
            setCartItems(JSON.parse(localCart));
        }
    };

    const loadCartItems = async () => {
        try {
            const cartDoc = ( 'carts', user.uid);
            const cartSnapshot = await (cartDoc);
            if (cartSnapshot.exists()) {
                const items = cartSnapshot.data().items || [];
                setCartItems(items);
                localStorage.setItem('cartItems', JSON.stringify(items));
            } else {
                loadCartFromLocalStorage();
            }
        } catch (error) {
            console.error("Error loading cart items: ", error);
            loadCartFromLocalStorage();
        }
    };

    const saveCartItems = async (items) => {
        try {
            if (user) {
                const cartDoc = ( 'carts', user.uid);
                await (cartDoc, { items });
            }
            localStorage.setItem('cartItems', JSON.stringify(items));
        } catch (error) {
            console.error("Error saving cart items: ", error);
        }
    };

    const addToCart = (item) => {
        setCartItems(currentItems => {
            const updatedItems = [...currentItems, item];
            saveCartItems(updatedItems);
            return updatedItems;
        });
    };

    const removeFromCart = (item) => {
        setCartItems(currentItems => {
            const updatedItems = currentItems.filter(cartItem => cartItem.id !== item.id);
            saveCartItems(updatedItems);
            return updatedItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        saveCartItems([]);
    };

    const value = { cartItems, addToCart, removeFromCart, clearCart };


    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
