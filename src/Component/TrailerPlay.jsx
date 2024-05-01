import React from 'react'
import { SwiperSlide } from 'swiper/react';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
function TrailerPlay({ game, active, toggleVideo, trailer, title }) {
    return (
        <SwiperSlide>
            <div className="gameSlider">
                <div className={`video ${active ? "active" : undefined}`}>
                    <iframe
                        width="340"
                        height="120"
                        src={trailer}
                        title={title}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen
                    >
                    </iframe>
                </div>
                <div className="content">
                    <div className="buttons">
                        <a href="#" className={`playBtn ${active ? 'active' : undefined}`} onClick={toggleVideo}>
                            <span className='pause'>
                                <PauseIcon className="bi bi-pause-fill" />
                                {/* <i className="bi bi-pause-fill"></i> */}
                            </span>
                            <span className="play">
                                <PlayArrowIcon className="bi bi-play-fill" />
                                {/* <i class="bi bi-play-fill"></i> */}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </SwiperSlide>
    )
}

export default TrailerPlay
