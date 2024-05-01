// import { Typography, Grid, Box, Slide, List, CssBaseline, Paper, ImageList } from "@mui/material";
import PropTypes from "prop-types";
import "../header/ui/CssHeader/Background.css"
// import "../header/ui/CssHeader/Text.css"
// import "../header/ui/CssHeader/SearchBox.css"
// import { ArrowRightCircle } from 'react-bootstrap-icons';
// import React, { Fragment, useEffect, useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import TrackVisibility from "react-on-screen";
// import headerImg from "../header/ui/CssHeader/img/header.svg";
import React, { useEffect, useRef, useState } from "react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ui/CssHeader/Background.css';
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import img from "./ui/CssHeader/img/img1.png";
import { Link } from "react-router-dom";
import "./HomeImg.css"
import StarIcon from '@mui/icons-material/Star';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import useDataCard from "../../hooks/useDataCard";

export const PageHeader = ({ medias }) => {

  const [popularGames, setPopularGames] = useState([])
  const GameFav = useDataCard();
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
      .then(res => res.json())
      .then(data => setPopularGames(data.results))
  }, [])

  return (
    <div className="poster">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {
          GameFav.map(game => (
            <Link style={{ textDecoration: "none", color: "white" }} to={`/games/${game.id}`} >
              <div className="posterImage">
                <img src={game.image.url} />
              </div>

              <div className="posterImage__overlay">
                <div className="posterImage__title">{game ? game.title : ""}</div>
                <div className="posterImage__runtime">
                  {game ? game.price : ""}
                  <span className="posterImage__rating">
                    {game ? game.rating : ""}
                    <StarIcon className="fas fa-star" />{" "}
                    {/* <i className="fas fa-star" />{" "} */}
                  </span>
                </div>
                <div className="posterImage__description">{game ? game.description : ""}</div>
              </div>

            </Link>
          ))
        }
      </Carousel>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  paragraph: PropTypes.string,
};
PageHeader.defaultProps = {
  title: "title default",
  level: "Median",
  category: "Action",
  rating: 5,
  description: "description",
  discount: 0.5,
  price: 0,
  trailer: "https://www.youtube.com/embed/S9STizATKjE?si=S5iKxB0AGgqNJupo"
};
export default PageHeader;
