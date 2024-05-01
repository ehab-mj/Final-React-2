import React, { useContext, useEffect, useState } from 'react';
import useDataCard from '../../hooks/useDataCard';
import axios from 'axios';
import { Typography } from '@mui/material';
import normalizeGames from '../Favorite/normalizeFav';
import filterContext from '../../store/filterContext';
import GameComponent from '../../Component/GameComponent';

const Cart = ({ items, removeFromCart }) => {
    const GameFav = useDataCard();
    let { setDataFromServer, dataFromServer, setGamesCopy, CopyGame, } =
        useContext(filterContext);
    const [cart, setCart] = useState(1);
    const [game, setGame] = useState([])
    // useEffect(() => {
    //     const fetchInfo = async () => {
    //         try {
    //             await axios.get("/games").then(({ data }) => {
    //                 setDataFromServer(normalizeGames(data));
    //                 setGamesCopy(normalizeGames(data));
    //             });
    //         } catch (err) {
    //             return <Typography>Error, Something went wrong i guess</Typography>;
    //         }
    //     };

    //     fetchInfo();
    // }, []);

    // if (!dataFromServer || !dataFromServer.length) {
    // }

    {/* <ul>
                {cart.map(game => (
                    <li key={game.id}>
                        {game.title} <button onClick={() => removeFromCart(game.id)}>Remove</button>
                    </li>
                ))}
            </ul> */}
    const handleAddToCart = async () => {
        try {
            await axios.post('/cart/add', {
                game,
                cart
            });
            alert('Item added to cart successfully!');
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('An error occurred while adding item to cart.');
        }
    };
    return (
        <div className="cart">
            <h2>Cart</h2>
            <div className="App">
                {GameFav.map((game, index) => (
                    <GameComponent key={index} title={game.title} img={game.image.url} />
                ))}
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>


    );
};

export default Cart;