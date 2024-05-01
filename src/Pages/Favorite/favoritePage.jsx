import { Grid, Slide } from "@mui/material";
import { Fragment, useContext, useEffect } from "react";
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
import normalizeGames from "./normalizeFav";
import gameContext from "../../store/gameContext";
const FavPage = () => {
    const { handleFavClick } = useHandleFavClick();
    const { handleEditClick } = useHandleEditGame();
    const navigate = useNavigate();
    const { login } = useContext(LoginContext);
    const GameFav = useDataCard();
    let { setGamesCopy, setDataFromServer } = useContext(filterContext);
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                await axios.get("/games")
                    .then(({ data }) => {
                        setDataFromServer(normalizeGames(data));
                        setGamesCopy(normalizeGames(data));
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
                                    subtitle={game.subtitle}
                                    img={game.image.url}
                                    phone={game.phone}
                                    address={game.address}
                                    cardNumber={game.bizNumber}
                                    onDelete={handleDeleteGame}
                                    Info={handleInfoClick}
                                    onEdit={handleEditGame}
                                    onFav={handleFavGame}
                                    onLike={game.liked}
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
            </Grid>
        </Fragment>
    );
};

export default FavPage;
