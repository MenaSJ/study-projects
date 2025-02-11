import './App.css'
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Guitar from './components/Guitar';
import { db } from './data/db';

function App() {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    
    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        saveToLocalStorage()
    }, [cart])

    function addToCart(item){
        const itemExists = cart.findIndex(guitar => guitar.id === item.id);
        console.log(itemExists)
        if(itemExists !== -1) {
            const updatedCart = [...cart];
            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
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
        const updatedCart = cart.map(guitar => guitar.id === id ? {...guitar, quantity:guitar.quantity + 1} : guitar);
        setCart(updatedCart);

        // const updatedCart = cart.map( Item => {
        //     if(item.id === id) {
        //         return {
        //             ...item,
        //             uantiy: item.uantity + 1
        //         }
        //     }
        //     return item
        // })
        // setCart(updatedCart)
    }

    function decrementQuantity(id) {
        const updatedCart = cart.map(guitar => guitar.id === id ? {...guitar, quantity:guitar.quantity - 1} : guitar);
        setCart(updatedCart);
    }

    function saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return (
        <>
        <Header 
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decrementQuantity={decrementQuantity}
            />
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar) => (
                    <Guitar 
                        key={guitar.id}
                        guitar={guitar}
                        addToCart={addToCart}
                    />
                ))}
            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
        </>
    )
    }

export default App
