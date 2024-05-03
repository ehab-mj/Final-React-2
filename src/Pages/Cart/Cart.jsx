import { Divider, Grid, IconButton, Slide } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, Flip, toast } from "react-toastify";
import filterContext from "../../store/filterContext";
import LoginContext from "../../store/loginContext";
import useHandleFavClick from "../../hooks/useHandleFav";
import useDataCard from "../../hooks/useDataCard";
import ROUTES from "../../routes/ROUTES";
import GameComponent from "../../Component/GameComponent";
import useHandleEditGame from "../../hooks/useHandleEdit";
import gameContext from "../../store/gameContext";
import normalizeCart from "./normalizeCart";
import useHandleCartClick from "../../hooks/useHandleCart";
import './cart.css'
import ShopContext from "../../store/ShopContext";
import DeleteIcon from "@mui/icons-material/Delete";
const FavPage = () => {
    const { handleFavClick } = useHandleFavClick();
    const { handleEditClick } = useHandleEditGame();
    const { handleCartClick } = useHandleCartClick();
    const navigate = useNavigate();
    const { login } = useContext(LoginContext);
    const GameFav = useDataCard();
    let { setGamesCopy, setDataFromServer } = useContext(filterContext);
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                await axios.get("/games")
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

    const handleEditGame = (id) => {
        handleEditClick(id);
    };

    const handleFavGame = async (id) => {
        handleFavClick(id);
    };

    const handleCartGame = async (id) => {
        handleCartClick(id);
    };
    const handleDeleteGame = (id) => {
        const fetchInfo = async () => {
            try {
                await axios.delete("/games/" + id).then(({ data }) => {
                    setDataFromServer((cGamesFromServer) => {
                        return cGamesFromServer.filter((game) => game._id !== id);
                    });
                });
                toast.success('🧹 Game has been deleted', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                });
            } catch (error) {
                if (!login) navigate(ROUTES.LOGIN);
            }
            toast.warn("You are not allowed to delete", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        };
        fetchInfo();
    };

    const handleInfoClick = (id) => {
        navigate(`${ROUTES.DETAILS}/${id}`);
    };
    ///

    const [total, setTotal] = useState(0);

    const handleTotalPayment = () => {
        return GameFav.map(game => game.price * (1 - game.discount))
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2);
    };

    useEffect(() => {
        setTotal(handleTotalPayment());
    }, [GameFav]);

    ///

    const { cart, setCart } = useContext(ShopContext);

    const handleRemoveFromBag = game => {
        setCart(cart.filter(item => item._id !== game._id));
    };
    return (
        <Fragment>
            <Grid container spacing={2} mt={5}>
                {GameFav.map(
                    (game, index) =>
                        GameFav[index].likes.some((id) => id === login._id) && (
                            <Grid item lg={4} md={6} xs={12} key={"carsGame" + index}>
                                <GameComponent
                                    id={game._id}
                                    title={game.title}
                                    price={game.price}
                                    description={game.description}
                                    rating={game.rating}
                                    discount={game.discount}
                                    img={game.image.url}
                                    onDelete={handleDeleteGame}
                                    Info={handleInfoClick}
                                    onEdit={handleEditGame}
                                    onFav={handleFavGame}
                                    onAddToCart={handleCartGame}
                                    onLike={game.liked}
                                    onCart={game.Carted}
                                />
                            </Grid>
                        )
                )}
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    m={3}
                >
                </Grid>

                <section id="bag" className='bag'>
                    <div className="container-fluid">
                        <div className="row mb-3">
                            <h1>My Bag</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="table-responsive">
                            <table className="shopBagTable table table-borderless align-middle">
                                <thead>
                                    <tr>
                                        <th class="p-3 text-sm">No.</th>
                                        <th class="p-3 text-sm">Preview</th>
                                        <th class="p-3 text-sm">Game</th>
                                        <th class="p-3 text-sm">Price</th>
                                        <th class="p-3 text-sm">Discount</th>
                                        <th class="p-3 text-sm">Payment</th>
                                        {/* class="p-3"col">Remove</th> */}
                                    </tr>
                                </thead>
                                {GameFav.map(
                                    (game, index) =>
                                        GameFav[index].likes.some((id) => id === login._id) && (
                                            <>
                                                <tbody>

                                                    <tr className="shopBagItem">
                                                        <th scope='row'>{index + 1}</th>
                                                        <td>
                                                            <img src={game.image.url} alt='' className='img-fluid' />
                                                        </td>
                                                        <td className="title">{game.title}</td>
                                                        <td>${game.price.toFixed(2)}</td>
                                                        <td>{game.discount * 100}%</td>
                                                        <td>${(game.price * (1 - game.discount)).toFixed(2)}</td>
                                                        {/* <td>
                                                            <IconButton href="#" onClick={() => handleRemoveFromBag(game)}>
                                                                <DeleteIcon color="error"></DeleteIcon>
                                                            </IconButton>
                                                        </td> */}
                                                    </tr>
                                                </tbody>

                                                <div className="row d-flex justify-content-between mt-5">
                                                    <div className="col-lg-2 d-flex align-items-center">
                                                        <p className="itemCount">Total Items: {GameFav.length}</p>
                                                    </div>

                                                    <div className="col-lg-10 d-flex justify-content-end">
                                                        <div className="payment">
                                                            Total: ${total}
                                                            <a href="#">
                                                                Check Out <i className='bi bi-wallet-fill'></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                )}
                            </table >
                        </div>
                    </div>
                </section>
            </Grid>
        </Fragment >
    );
};

export default FavPage;
