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
const GameDetailsComponent = ({
    title,
    description,
    // category,
    trailer,
    price,
    rating,
    image,
    id,
    liked,
    onDelete,
    onEdit,
    onFavorite,
}) => {
    const { login } = useContext(LoginContext);
    const navigate = useNavigate();
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


    const [currentMovieDetail, setMovie] = useState()

    return (
        <Grid container spacing={2}>
            {/* Movie Image */}
            {/* <Grid Grid item xs={12} md={4}>
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
            </Grid> */}
            <div className="game">
                <div className="game__intro">
                    <img className="game__backdrop" src={image} />
                </div>
            </div >

            <div className="game__detail">
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
            </div>

            <div className="game__detailRightBottom">
                <div className="synopsisText">Synopsis</div>
                <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
            </div>

            {/* Movie Details */}
            {/* <ImageHeader imgPath={tmdbConfigs.backdropPath(image.backdrop_path || image.poster_path)} /> */}

            <Grid item xs={12} md={8} sx={{ marginTop: 10 }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ color: "#333", fontWeight: 600 }}
                >
                    {title}
                </Typography>
                <Divider />
                {/* <Typography variant="subtitle1" gutterBottom sx={{ color: "#666" }}>
                    Category: {category.join(", ")}
                </Typography> */}
                <Typography variant="subtitle1" gutterBottom sx={{ color: "#666" }}>
                    Description: {description}
                </Typography>
                <Box
                    sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                >
                    <PlayCircleIcon
                        sx={{ fontSize: "30px", marginRight: 1, color: "#db0000" }}
                    />
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ color: "#333", fontWeight: 600 }}
                    >
                        Trailer:
                    </Typography>
                </Box>
                <Box mt={2} mb={2}>
                    <iframe
                        width="100%"
                        height="315"
                        src={trailer}
                        title="Trailer"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </Box>
                {/* Action buttons */}
                {login && (
                    <Box mt={4}>
                        {((login && login.isAdmin) ||
                            location.pathname === ROUTES.MYGAMES) && (
                                <IconButton onClick={handleDeleteClick}>
                                    <DeleteIcon style={{ color: "black" }} />
                                </IconButton>
                            )}
                        {((login && location.pathname === ROUTES.MYGAMES) ||
                            login?.isAdmin) && (
                                <IconButton onClick={handleEditClick}>
                                    <ModeIcon style={{ color: "black" }} />
                                </IconButton>
                            )}
                        {login && (
                            <IconButton
                                onClick={handleFavoriteClick}
                                sx={{ bgcolor: "#db0000", borderRadius: 2 }}
                            >
                                <FavoriteIcon style={{ color: liked ? "black" : "white" }} />
                            </IconButton>
                        )}
                    </Box>
                )}
            </Grid>
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
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired,
};

export default GameDetailsComponent;
