import { Typography, Divider, IconButton, Box, Grid, AppBar, Container, Slide } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import LoginContext from "../store/loginContext";
import './GameDetailsCom.css'
import TrailerPlay from "./TrailerPlay";
import IsAdmin from "../guard/isAdmin";
import './gameSlide.css'
import './Test.css'
import PauseIcon from '@mui/icons-material/Pause';
import GameRating from "../Pages/GameRating/GameRating";
import ImageHeaderDetails from "./ImageHeaderDetails";
import uiConfigs from "../config/uiConfigs";
import StarIcon from '@mui/icons-material/Star';
import tmdbConfigs from "../config/tmdb.configs";
import { Button } from "react-bootstrap";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useHandleFavClick from "../hooks/useHandleFav";
import GameComponent from "./GameComponent";
import useHandleCartClick from "../hooks/useHandleCart";
import axios from "axios";
import { Flip, toast } from "react-toastify";
import filterContext from "../store/filterContext";
import useDataCard from "../hooks/useDataCard";
const GameDetailsComponent = ({
    game,
    title,
    description,
    category,
    discount,
    trailer,
    price,
    rating,
    active,
    image,
    id,
    liked,
    Carted,
    onDelete,
    onEdit,
    onAddToCart,
    onFavorite,
}) => {
    const { login } = useContext(LoginContext);
    const navigate = useNavigate();
    const to = useLocation();
    let location = useLocation();
    const { handleFavClick } = useHandleFavClick();
    const { setDataFromServer } = useContext(filterContext);
    const GameFav = useDataCard();

    const handleFavGame = async (id) => {
        handleFavClick(id);
    };

    const handleCartClick = () => {
        onAddToCart(id);
    };

    const handleDeleteClick = () => {
        onDelete(id);
    };

    const handleEditClick = () => {
        onEdit(id);
    };

    const handleFavoriteClick = () => {
        onFavorite(id);
    };

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const [autoplay, setAutoplay] = useState(true);

    const [currentMovieDetail, setMovie] = useState()

    return (
        <Box >

            <Box className="Tbg">
                <div className="gradient"></div>
                <img
                    src={image}
                    alt={title}
                    className="image"
                />
            </Box>

            <div className="T-detail">
                <div className="Trow">
                    <div >
                        <img className="T-poster"
                            src={image}
                            alt={title}
                        // className="w-full h-full object-cover"
                        />
                        <div className="T-Price">
                            <h1 className="T-currentPrice">
                                {discount != 0 && (
                                    <>
                                        <span className="T-discount">
                                            <i>{discount * 100}%</i><span>Off</span>
                                        </span>

                                        {/* <span className="prevPrice">$
                                            {price.toFixed(2)}
                                        </span> */}
                                        {/* <span className="T-discount">
                                            <i>{discount * 100}%</i> <span>Off</span>
                                        </span> */}
                                        {/* 
                                        <span className="prevPrice">$
                                            {price.toFixed(2)}
                                        </span> */}
                                        {/* <span className="prevPrice">$
                {game.price.toFixed(2)}
              </span> */}
                                    </>
                                )}
                                <span className="currentPrice">
                                    ${((1 - discount) * price).toFixed(2)}
                                </span>
                            </h1>
                        </div>

                        <Box className="T-Buy">
                            <button
                                to={title}
                                className="T-BuyClick"
                            >
                                Buy Now
                            </button>
                        </Box>
                        {login && (
                            <Box className="T-Cart">
                                <IconButton
                                    onClick={handleCartClick}
                                    className="T-CartClick"
                                >
                                    <ShoppingCartIcon style={{ marginRight: "1rem" }} />
                                    Add To Cart
                                </IconButton>
                            </Box>
                        )}
                    </div>
                </div>

                <div className="T-detailRight">
                    <div className="T-detailRightTop">
                        {/* Title */}
                        <h1 className=".T.name ">
                            {title}
                        </h1>
                        {/* flex items */}
                        {/* <div className="flex items-center gap-4 font-medium text-dryGray"> */}
                        <div className="T-rating">
                            {rating} <StarIcon className="star" />
                        </div>
                        <div className="T-category">
                            {category}
                        </div>
                        <div className="T-synopsisText">
                            {description}
                        </div>
                        {/* <ModeIcon /> */}
                        {/* </div> */}
                        {/* description */}
                        {/* <p className="text-text text-sm leading-7"> {description}</p> */}

                        <div className={`video ${active ? "active" : undefined}`}>
                            <iframe
                                width="500"
                                height="300"
                                autoPlay={autoplay}
                                src={trailer}
                                title={title}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                                allowFullScreen
                            >
                            </iframe>
                        </div>
                        <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                            {/* share */}
                            {/* <div className="col-span-1 flex-colo border-r border-border">
                                    <button
                                        onClick={() => setModalOpen(true)}
                                        className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20"
                                    >
                                        <ModeIcon />
                                    </button>
                                </div> */}
                            {/* language */}
                            {/* <div className="col-span-2 flex-colo font-medium text-sm">
                                    <p>
                                        Language :{" "}
                                        <span className="ml-2 truncate">{movie?.language}</span>
                                    </p>
                                </div> */}
                            {/* watch button */}
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
};

GameDetailsComponent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
    trailer: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    Carted: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired,
};

export default GameDetailsComponent;
