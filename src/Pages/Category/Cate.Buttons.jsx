import React, { useState } from 'react'
import GameComponent from '../../Component/GameComponent'
import CategoryMenu from '../../Layout/CategoryMenu';
import useDataCard from '../../hooks/useDataCard';
import { Grid } from '@mui/material';

function CateButtons({ games, menuItems, setGame, handleFilterGames }) {
    const [data, setData] = useState(games);
    const [filters, setFilters] = useState(CategoryMenu);
    const GameFav = useDataCard();

    return (
        <section id='categories' className="categories">
            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-lg-8 d-flex align-items-center justify-content-start">
                        <ul className="filters">
                            {filters.map(filter => (
                                <li key={filter._id}
                                    className={`${filter.active ? 'active' : undefined}`}
                                    onClick={() => handleFilterGames(filter.name)}>{filter.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="row">
                        {
                            GameFav.map((game, index) => (
                                <Grid item lg={4} md={6} xs={12} key={"carsGame" + index}>
                                    <GameComponent
                                        id={game._id}
                                        title={game.title}
                                        description={game.description}
                                        category={game.category}
                                        rating={game.rating}
                                        discount={game.discount}
                                        price={game.price}
                                        img={game.image.url}
                                        trailer={game.trailer}
                                        onLike={game.liked}
                                        onCart={game.Carted}
                                    />
                                </Grid>
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                menuItems.map((item) => (
                    <button onClick={() => handleFilterGames(item)}>
                        {item}
                    </button>
                ))
            }
            <button onClick={() => setGame(GameComponent)}>All</button>
            {/* <button key={index} onClick={() => handleFilterGames(item)}>{item}</button> */}
        </section>
    )
}

export default CateButtons
