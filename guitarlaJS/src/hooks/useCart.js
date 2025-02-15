import { useState, useEffect } from 'react';
import { db } from '../data/db';

export const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    
    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MIN_ITEMS = 1;
    const MAX_ITEMS = 5;

    useEffect(() => {
        saveToLocalStorage()
    }, [cart])

    function addToCart(item){
        const itemExists = cart.findIndex(guitar => guitar.id === item.id);
        if(itemExists !== -1) {
            const updatedCart = [...cart];
            if(updatedCart[itemExists].quantity < MAX_ITEMS){
                updatedCart[itemExists].quantity += 1;
                setCart(updatedCart);
            }
        }
        else{
            item.quantity = 1
            setCart((prevCart) => [...prevCart, item]);
        }
    }
    
    function removeFromCart(id) {
        setCart(cart.filter(guitar => guitar.id !== id));
    }
    
    function increaseQuantity(id) {
        // const updatedCart = cart.map(guitar => guitar.id === id ? {...guitar, quantity:guitar.quantity + 1} : guitar);
        // setCart(updatedCart);

        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decrementQuantity(id) {
        // const updatedCart = cart.map(guitar => guitar.id === id ? {...guitar, quantity:guitar.quantity - 1} : guitar);
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart);
    }

    function clearCart () {
        setCart([]);
    }

    function saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

        //state derivado
    const isEmpty = () => cart.length === 0;
    const cartTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
      

    return {
        data, cart, removeFromCart, 
        addToCart, clearCart, 
        decrementQuantity, increaseQuantity,
        isEmpty, cartTotal
    }
}
