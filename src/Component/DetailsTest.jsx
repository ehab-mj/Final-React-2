import React from 'react'

function DetailsTest() {
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
                <Grid Grid item xs={12} md={4} sx={{ marginBottom: "70px", position: "relative" }}
                    style={{
                        maxWidth: "100%",
                        height: "20vh",
                        marginTop: -120,
                        objectFit: "contain",
                    }}>
                    Buy Now
                </Grid>
            </Grid>

            <Grid item xs={12} md={8} sx={{ marginTop: 20 }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                >
                    {title}
                    <GameRating rating={rating} />
                </Typography>

                <Divider />
                <Typography variant="subtitle1" gutterBottom >
                    {description} {" "}
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

                <div className={`video ${active ? "active" : undefined}`}>
                    <iframe
                        width="500"
                        height="300"
                        autoPlay={autoplay}
                        src={trailer}
                        title={title}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen
                    >

                    </iframe>
                </div>


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
    )
}

export default DetailsTest
