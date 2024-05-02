import { Typography, Divider, IconButton, Box, Grid } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import LoginContext from "../store/loginContext";
import './GameDetailsCom.css'
import TrailerPlay from "./TrailerPlay";
import IsAdmin from "../guard/isAdmin";
import './gameSlide.css'
import PauseIcon from '@mui/icons-material/Pause';
const GameDetailsComponent = ({
    title,
    description,
    category,
    trailer,
    level,
    price,
    rating,
    active,
    image,
    id,
    liked,
    Carted,
    onDelete,
    onEdit,
    onFavorite,
}) => {
    const { login } = useContext(LoginContext);
    const navigate = useNavigate();
    const to = useLocation();
    let location = useLocation();

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


    const [currentMovieDetail, setMovie] = useState()

    return (
        <Grid container spacing={2}>
            {/* Movie Image */}
            <Grid Grid item xs={12} md={4}>
                <img
                    src={image}
                    alt={image}
                    style={{
                        maxWidth: "100%",
                        height: "90vh",
                        margin: 5,
                        objectFit: "contain",
                    }}
                />
            </Grid>

            <Grid item xs={12} md={8} sx={{ marginTop: 20 }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                >
                    {title}
                </Typography>

                <Divider />
                <Typography variant="subtitle1" gutterBottom >
                    Description: {description}
                </Typography>
                <Typography variant="subtitle1" gutterBottom >
                    Level: {level}
                </Typography>
                <Typography variant="subtitle1" gutterBottom >
                    Rating: {rating}
                </Typography>
                <Typography variant="subtitle1" gutterBottom >
                    Price: {price}
                </Typography>
                <Typography variant="subtitle1" gutterBottom >
                    Category: {category.join(", ")}
                </Typography>



                <div className="gameSlider">
                    <div className="content">
                        <div className="buttons">
                            <div className={`playBtn ${active ? 'active' : undefined}`} onClick={togglePopup}>
                                <span className='play'>
                                    <PlayCircleIcon
                                    />
                                </span>
                                <span className='pause' onClick={togglePopup}>
                                    &times;
                                    <PauseIcon />
                                </span>
                            </div>

                            {isOpen && (
                                <div className="popup-content">
                                    {/* <button className='pause' onClick={togglePopup}>
                                        &times;
                                    </button> */}
                                    <div className={`video ${active ? "active" : undefined}`}>
                                        <iframe
                                            width="500"
                                            height="300"
                                            src={trailer}
                                            title={title}
                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                                            allowFullScreen
                                        >

                                        </iframe>
                                    </div>
                                    {/* <Box mt={2} mb={2}>
                                        <iframe
                                            title="video"
                                            width="560"
                                            height="315"
                                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                                            src={trailer}
                                            frameBorder="0"
                                            allowFullScreen
                                        ></iframe>
                                    </Box> */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Box>
                    {((IsAdmin) ||
                        to.pathname === ROUTES.MYGAMES) && (
                            <IconButton onClick={handleDeleteClick}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        )}
                    {((login.isBusiness && IsAdmin) ||
                        to.pathname === ROUTES.MYGAMES) && (
                            <IconButton onClick={handleEditClick}>
                                <ModeIcon />
                            </IconButton>
                        )}
                </Box>

                {/* <div className="game">
                <div className="game__intro">
                    <img className="game__backdrop" src={image} />
                </div>
            </div > */}

                {/* <div className="game__detail">
                    <div className="game__detailLeft">
                        <div className="game__posterBox">
                            <img className="game__poster" src={image} />
                        </div>
                    </div>
                    <div className="game__detailRight">
                        <div className="game__detailRightTop">
                            <div className="game__name">{title}</div>
                            <div className="game__tagline">{price}</div>
                            <div className="game__rating">
                                {rating} <i class="fas fa-star" />
                                <span className="game__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                            </div>
                            <div className="game__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                            <div className="game__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                            <div className="game__genres">
                                {
                                    currentMovieDetail && currentMovieDetail.genres
                                        ?
                                        currentMovieDetail.genres.map(genre => (
                                            <><span className="game__genre" id={genre.id}>{genre.name}</span></>
                                        ))
                                        :
                                        ""
                                }
                            </div>
                        </div>
                    </div>
                </div> */}


                {/* <div className="game__detailRightBottom">
                <div className="synopsisText">Synopsis</div>
                <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
            </div> */}

                {/* Movie Details */}
                {/* <ImageHeader imgPath={tmdbConfigs.backdropPath(image.backdrop_path || image.poster_path)} /> */}
            </Grid >
        </Grid >
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
