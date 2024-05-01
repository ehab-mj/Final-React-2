import { Grid, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameComponent from "../Component/GameComponent";
import PageHeader from "../Layout/header/PageHeader";
import useHandleEditGame from "../hooks/useHandleEdit";
import useHandleFavClick from "../hooks/useHandleFav";
// import normalizeFav from "../services/normalizeFavs";
import filterContext from "../store/filterContext";
import useDataCard from "../hooks/useDataCard";
import ROUTES from "../routes/ROUTES";
import LoginContext from "../store/loginContext";
import { Bounce, Flip, toast } from "react-toastify";
import normalizeGames from "./Favorite/normalizeFav";
import { Contact } from "../Layout/header/Contact";
import gameContext from "../store/gameContext";
import { GameSlide } from "./GameSlide";
import Categories from "./Category/Category";
const HomePage = () => {
  const { handleFavClick } = useHandleFavClick();
  const { handleEditClick } = useHandleEditGame();
  const GameFav = useDataCard();
  const login = useContext(LoginContext);
  const [count] = useState(12);
  const navigate = useNavigate();
  let { setDataFromServer, dataFromServer, setGamesCopy, CopyGame, } =
    useContext(filterContext);

  // let { dataFromServer, setDataFromServer, setGamesCopy } =
  //   useContext(filterContext);
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
  const handleEditGame = (id) => {
    handleEditClick(id);
  };
  const handleFavGame = async (id) => {
    handleFavClick(id);
  };
  const handleInfoClick = (id) => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  };
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        await axios.get("/games").then(({ data }) => {
          setDataFromServer(normalizeGames(data));
          setGamesCopy(normalizeGames(data));
        });
      } catch (err) {
        return <Typography>Error, Something went wrong i guess</Typography>;
      }
    };

    fetchInfo();
  }, []);

  if (!dataFromServer || !dataFromServer.length) {
  }

  const [cart, setCart] = useState([]);
  // let dataFromServerFiltered = normalizeGames(
  //   dataFromServer,
  //   login ? login._id : undefined
  // );
  // if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
  return (
    <div>
      <PageHeader />
      <Grid container spacing={2} mt={2}>
        <Link to={ROUTES.CREATEGAME}>
          <Grid>
          </Grid>
        </Link>

        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>

        {GameFav.slice(0, count).map((game, index) => (
          <Grid item lg={4} md={6} xs={12} key={"carsGame" + index}>
            <GameComponent
              id={game._id}
              title={game.title}
              description={game.description}
              category={game.category}
              level={game.level}
              rating={game.rating}
              discount={game.discount}
              price={game.price}
              img={game.image.url}
              trailer={game.trailer}
              onDelete={handleDeleteGame}
              Info={handleInfoClick}
              onEdit={handleEditGame}
              onFav={handleFavGame}
              onLike={game.liked}
            />
          </Grid>
        ))}

        {/* <Contact /> */}
      </Grid>
    </div>
  );
};
export default HomePage;