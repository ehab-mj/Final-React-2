import React from 'react'
import useDataCard from '../../hooks/useDataCard'
import { Grid } from '@mui/material';
import GameComponent from '../../Component/GameComponent';


function CateCard({ game }) {
    const GameFav = useDataCard();
    return (
        // <div>
        //     <div>
        //         {game.map((item) => (
        //             <div key={item.title}>
        //                 <div>
        //                     <img src={item.image.url} alt={item.title} />
        //                 </div>
        //                 <div>
        //                     <div>
        //                         {item.title} {item.price}
        //                     </div>
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <div>
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
                            // onDelete={handleDeleteGame}
                            // Info={handleInfoClick}
                            // onEdit={handleEditGame}
                            // onFav={handleFavGame}
                            // onAddToCart={handleCartClick}
                            onLike={game.liked}
                            onCart={game.Carted}
                        />
                    </Grid>
                ))
            }
        </div>
    )
}

export default CateCard
