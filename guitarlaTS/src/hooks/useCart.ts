import { useState, useEffect } from 'react';
import { db } from '../data/db';
import type { Guitar, CartItem } from '../types';

export const useCart = () => {

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    
    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MIN_ITEMS = 1;
    const MAX_ITEMS = 5;

    useEffect(() => {
        saveToLocalStorage()
    }, [cart])

    function addToCart(item: Guitar){
        const itemExists = cart.findIndex(guitar => guitar.id === item.id);
        if(itemExists !== -1) {
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart];
            updatedCart[itemExists].quantity += 1;
            setCart(updatedCart);
        }
        else{
            const updatedItem : CartItem = {...item, quantity: 1 }
            setCart([...cart, updatedItem]);
            //setCart((prevCart) => [...prevCart, updatedItem]);
        }
    }
    
    function removeFromCart(id: Guitar['id']) {
        setCart(cart.filter(guitar => guitar.id !== id));
    }
    
    function increaseQuantity(id: Guitar['id']) {
        // const updatedCart = cart.map(guitar => guitar.id === id ? {...guitar, quantity:guitar.quantity + 1} : guitar);
        // setCart(updatedCart);s

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

    function decrementQuantity(id: Guitar['id']) {
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
