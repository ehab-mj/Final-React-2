import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ROUTES from "../routes/ROUTES";
import { useLocation, useNavigate } from "react-router-dom";
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../store/loginContext";
import './gameCard.css'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import { Bounce, toast } from "react-toastify";
import { AppContext } from "../App";
import ShopContext from "../store/ShopContext";
import filterContext from "../store/filterContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";
import GameRating from "../Pages/GameRating/GameRating";
import PauseIcon from '@mui/icons-material/Pause';
import useDataCard from "../hooks/useDataCard";
import gameContext from "../store/gameContext";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TrailerPlay from "./TrailerPlay";
import { Swiper, SwiperSlide } from 'swiper/react';
const GameComponent = ({
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
  productId,
}) => {
  const login = useContext(LoginContext);
  const { library, setLibrary, bag, setBag } = useContext(AppContext);
  const to = useLocation();
  const navigate = useNavigate();
  const [cartMessage, setCartMessage] = useState('');
  const GameFav = useDataCard();
  // const { addToCart, cartItems } = useContext(ShopContext);

  const handleDetails = () => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  }
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const handleFavClick = () => {
    onFav(id);
  };
  const handlePhone = () => {
    toast.success('📞 Ringing...', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  let AdminType = false;
  if (login) {
    if (login._id === userId || login.isAdmin) {
      AdminType = true;
    }
  }
  const handleEditClick = () => {
    onEdit(id);
  };

  //Add
  const handleAddToLibrary = game => {
    setLibrary([...library, game]);
  };
  //Remove
  const handleRemoveFromLibrary = game => {
    setLibrary(library.filter(item => item._id !== game._id));
  };
  const handleAddToBag = game => {
    if (bag.includes(game)) return;
    setBag([...bag, game]);
  };

  const [cards, setGames] = useState([]);
  const [cart, setCart] = useState(1);

  const fetchCards = async () => {
    try {
      const response = await axios.get('/games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };
  useEffect(() => {
    fetchCards();
  }, []);

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

  const [active, setActive] = useState(false);

  const handleToggleVideo = () => {
    setActive(!active);
  }

  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="gameCard">
        <img src={img} alt={title} className='img-fluid' onClick={handleDetails} />

        {/* {GameFav.map(game => (
          <SwiperSlide key={game._id}>
            <TrailerPlay
              game={game}
              active={active}
              trailer={trailer}
              toggleVideo={handleToggleVideo}
            />
          </SwiperSlide>
        ))} */}


        {login && (
          <IconButton className={`like ${library.includes(game) ? 'active' : undefined}`} onClick={handleFavClick}>
            <ShoppingCartIcon color={onLike ? 'warning' : "inherit"} />
          </IconButton>
        )}
        {/* <a href="#" className={`like ${library.includes(game) ? 'active' : undefined}`}
          onClick={
            library.includes(game)
              ? () => handleRemoveFromLibrary(game) : () => handleAddToLibrary(game)
          }>
          <i className='bi bi-heart-fill'></i>
        </a> */}

        <div className="gameFeature">
          <span className="gameType">{level}</span>
          <GameRating rating={rating} />
        </div>

        <div className="gameTitle mt-4 mb-3">{title}</div>
        {/* <div className="Des">{description}</div> */}

        <div className="gamePrice">
          {discount != 0 && (
            <>
              <span className="discount">
                <i>{discount * 100}%</i>
              </span>

              {/* <span className="prevPrice">$
                {GameFav.toFixed(2)}
              </span> */}
            </>
          )}

          <span className="currentPrice">
            ${((1 - discount) * price).toFixed(2)}
          </span>
        </div>

        {/* <a href="#" className="addBag" onClick={() => handleAddToBag(game)}>
          <i className="bi bi-cart-plus"></i>
        </a> */}


        <IconButton className="addBag">
          <PlayArrowIcon color="inherit" />
        </IconButton>

        <Box>
          {((AdminType) ||
            to.pathname === ROUTES.MYGAMES) && (
              <IconButton onClick={handleDeleteClick}>
                <DeleteIcon color="inherit" />
              </IconButton>
            )}
          {((login.isBusiness && AdminType) ||
            to.pathname === ROUTES.MYGAMES) && (
              <IconButton onClick={handleEditClick}>
                <ModeIcon />
              </IconButton>
            )}
        </Box>

        <Box>
          {/* <IconButton onClick={handlePhone}>
            <LocalPhoneIcon />
          </IconButton> */}

          {/* {login && (
            <IconButton onClick={handleFavClick}>
              <BookmarkRoundedIcon color={onLike ? "error" : "inherit"} />
            </IconButton>
          )}
          <button onClick={handleAddToCart}>Add to Cart</button> */}

        </Box>

        {/* onClick={handleDetails}
          component="img"
          image={img}
          alt="image" */}
      </div>
    </div>
  );
  {/* <CardHeader className="gameTitle mt-4 mb-3" title={title} subheader={subtitle}>
      </CardHeader>

      <Divider></Divider> */}

  {/* <CardContent> */ }

  {/* <Typography>
          <Typography component="span" fontWeight={700}>
            Phone:
          </Typography>
          {""} {phone}
        </Typography> */}

  {/* <Typography>
          <Typography component="span" fontWeight={700}>
            Address:
          </Typography>
          {""} {address.city}
        </Typography> */}

  {/* <Typography>
          <Typography component="span" fontWeight={700}>
            Card number:
          </Typography>
          {""} {cardNumber}
        </Typography> */}

  {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>

          <Box>
            {((AdminType) ||
              to.pathname === ROUTES.MYGAMES) && (
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              )}
            {((login.isBusiness && AdminType) ||
              to.pathname === ROUTES.MYGAMES) && (
                <IconButton onClick={handleEditClick}>
                  <ModeIcon />
                </IconButton>
              )}
          </Box>

          <Box>
            <IconButton onClick={handlePhone}>
              <LocalPhoneIcon />
            </IconButton>

            {login && (
              <IconButton onClick={handleFavClick}>
                <BookmarkRoundedIcon color={onLike ? "error" : "inherit"} />
              </IconButton>
            )}
          </Box>

        </Box> */}

  {/* </CardContent> */ }
};

GameComponent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string,
  trailer: PropTypes.string,
  active: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  Info: PropTypes.func,
  onEdit: PropTypes.func,
  onFav: PropTypes.func,
  onLike: PropTypes.bool,
};

// GameComponent.defaultProps = {
//   img: "https://img.redro.pl/plakaty/default-profile-picture-avatar-photo-placeholder-vector-illustration-700-216668545.jpg",
//   title: "title default",
//   level: "Median",
//   category: "Action",
//   rating: 5,
//   description: "description",
//   discount: 0.5,
//   price: 0,
//   trailer: "https://www.youtube.com/embed/S9STizATKjE?si=S5iKxB0AGgqNJupo"
// };
export default GameComponent;
