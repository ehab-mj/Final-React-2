import React, { useState } from 'react'
import CateCard from './Cate.Card'
import CateButtons from './Cate.Buttons'
import GameComponent from '../../Component/GameComponent'
import CategoryMenu from '../../Layout/CategoryMenu'

function CateApp() {
    const [game, setGame] = useState([])
    const menuItems = [...new Set(game.map(item => item.category))]
    const [games, setGames] = useState([])
    const [data, setData] = useState(games);
    const [filters, setFilters] = useState(CategoryMenu);
    // const handleFilterGames = (category) => {
    //     const newItems = GameComponent.filter((newItem) => newItem.category === category)
    //     setGame(newItems)
    // }

    const handleFilterGames = (category) => {
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

        setData(games.filter(game => game.category === category))
    };

    return (
        <div>
            <h1>Games</h1>
            <CateButtons
                games={games}
                menuItems={menuItems}
                handleFilterGames={handleFilterGames}
                setGame={setGame}
            />
            <CateCard game={game} />
        </div>
    )
}

export default CateApp
