import React, { useContext, useEffect } from 'react';
import './shopBagItem.css';
import { AppContext } from '../App';
import ShopContext from '../store/ShopContext';
import useDataCard from '../hooks/useDataCard';
import LoginContext from '../store/loginContext';
import normalizeCart from '../Pages/Cart/normalizeCart';
import { Bounce, Slide, toast } from 'react-toastify';
import filterContext from '../store/filterContext';
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';


function ShopBagItem({
    game,
    title,
    description,
    level,
    category,
    rating,
    poster,
    discount,
    price,
    img,
    trailer,
    id,
    onDelete,
    userId,
    onEdit,
    onFav,
    onLike,
    onCart,
    videoUrl,
    productId,
    toggleVideo,
    active,
    index,
}) {
    const { cart, setCart } = useContext(ShopContext);
    const { login } = useContext(LoginContext);
    const GameFav = useDataCard();
    let { setGamesCopy, setDataFromServer } = useContext(filterContext);
    // Remove From  Bag
    const handleRemoveFromBag = game => {
        setCart(cart.filter(item => item._id !== game._id));
    };

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                await axios.get("/games/cart/")
                    .then(({ data }) => {
                        setDataFromServer(normalizeCart(data));
                        setGamesCopy(normalizeCart(data));
                        toast.success("Check you favourites here!", {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Slide,
                        });
                    });
            } catch (err) {
                toast.error("There was an error!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
        };

        fetchLikes();
    }, [setGamesCopy, setDataFromServer]);

    if (!GameFav || !GameFav.length) {
    }



    return (
        <div>
            {
                GameFav.map(
                    (game, index) =>
                        GameFav[index].likes.some((id) => id === login._id) && (
                            <tr className="shopBagItem">
                                <th scope='row'>{index + 1}</th>
                                <td>
                                    <img src={game.image.url} alt='' className='img-fluid' />
                                </td>
                                <td>{game.title}</td>
                                <td>${game.price}</td>
                                <td>{game.discount * 100}%</td>
                                <td>${(game.price * (1 - game.discount)).toFixed(2)}</td>
                                <td>
                                    <a href="#" onClick={() => handleRemoveFromBag(game)}>
                                        <DeleteIcon class="bi bi-trash" />
                                        {/* // <i class="bi bi-trash"></i> */}
                                    </a>
                                </td>
                            </tr>
                        )
                )}
        </div>
    )
}

export default ShopBagItem;
