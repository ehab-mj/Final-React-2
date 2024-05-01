import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../routes/ROUTES.js";
import GameDetailsComponent from "../../Component/GameDetailsComponent.jsx";
import LoginContext from "../../store/loginContext.js";
import useHandleDelete from "../../hooks/useHandleDelete.jsx";
import useHandleFavClick from "../../hooks/useHandleFav.jsx";
import { fromServer } from "../../services/normalizeFromServer.js";
const GamesDetailsPage = () => {
    const handleDelete = useHandleDelete();
    const { handleFavClick } = useHandleFavClick();
    const navigate = useNavigate();
    const { login } = useContext(LoginContext);
    const { id } = useParams();
    const [GameDetails, setGameDetails] = useState({
        title: "",
        description: "",
        category: [""],
        trailer: "",
        url: "",
    });
    useEffect(() => {
        axios.get("/games/" + id).then(({ data }) => {
            setGameDetails({
                ...fromServer(data),
                likes: data.likes || [],
            });
        });
    }, [id]);

    const handleDeleteGame = (id) => {
        handleDelete(id);
    };

    const handleEditGame = (id) => {
        navigate(`${ROUTES.EDITGAME}/${id}`);
    };

    const handleFavGame = async (id) => {
        handleFavClick(id);
    };


    let liked = false; // Initialize 'liked' as false by default
    if (GameDetails.likes && GameDetails.likes.find((id) => id === login._id)) {
        liked = true;
    }

    return (
        <GameDetailsComponent
            id={id}
            title={GameDetails.title}
            description={GameDetails.description}
            year={GameDetails.year}
            director={GameDetails.director}
            category={GameDetails.category}
            actors={GameDetails.actors}
            trailer={GameDetails.trailer}
            watchLink={GameDetails.watchLink}
            image={GameDetails.url}
            liked={liked}
            onDelete={handleDeleteGame}
            onEdit={handleEditGame}
            onFavorite={handleFavGame}
        />
    );
};

export default GamesDetailsPage;
