import React, { useContext, useEffect, useState } from 'react';
import './categories.css';

import GameComponent from '../../Component/GameComponent';
import CategoryMenu from '../../Layout/CategoryMenu';
import useDataCard from '../../hooks/useDataCard';
import normalizeGames from '../Favorite/normalizeFav';
import filterContext from '../../store/filterContext';
import { Typography } from '@mui/material';
import axios from 'axios';

function Categories({ games, reference }) {
    const [data, setData] = useState(games);
    const GameFav = useDataCard();
    const [filters, setFilters] = useState(CategoryMenu);
    const handleFilterGames = category => {
        setFilters(
            filters.map(filter => {
                filter.active = false;
                if (filter.name === category) {
                    filter.active = true;
                }
                return filter;
            })
        );

        if (category === 'All') {
            setData(games);
            return;
        }

        setData(GameFav.filter(game => game.category === category))
    };

    const [text, setText] = useState('');

    const handleSearchGames = e => {
        setData(
            games.filter(game => game.title.toLowerCase().includes(e.target.value.toLowerCase()))
        )
        setText(e.target.value);
    }


    let { setDataFromServer, dataFromServer, setGamesCopy, CopyGame, } =
        useContext(filterContext);
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
    return (
        <section id='categories'>
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
                    <div className="col-lg-4 d-flex align-items-center justify-content-end">
                        <div className="search">
                            <i class="bi bi-search"></i>
                            <input
                                type="text" name='search' placeholder='Search'
                                value={text}
                                onChange={handleSearchGames}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        GameFav.map(game => (
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
                                // onDelete={handleDeleteGame}
                                // Info={handleInfoClick}
                                // onEdit={handleEditGame}
                                // onFav={handleFavGame}
                                // onAddToCart={handleCartClick}
                                onLike={game.liked}
                                onCart={game.Carted}
                                key={game._id} game={game} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default Categories;
