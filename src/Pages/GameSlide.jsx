import React, { useEffect, useRef, useState } from "react";
import styles from "./carausel.module.css";

import Carousel from "react-bootstrap/Carousel";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "90vh",
    width: "100%",
};

const slideImages = [
    {
        url: "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/ddc99aa0-4c20-4fe9-b8f9-65e277e74396.jpeg?alt=media",
    },
    {
        url: "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/dd8a26a1-9a18-4149-b0ff-a86cb40b8aa6.jpeg?alt=media",
    },
    {
        url: "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/99abbb7b-38b4-4116-895e-34d3a2fc1d00.jpeg?alt=media",
    },
    {
        url: "https://firebasestorage.googleapis.com/v0/b/netflixo-minah.appspot.com/o/a0dbb5a2-db0e-45a0-bde0-2a8daa560c94.jpeg?alt=media",
    },
    {
        url: "https://netflixo-ten.vercel.app/images/about2.jpg",
    },
];


export const GameSlide = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const slideRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            slideRef.current.goNext();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="slide-container"
            style={{ width: "75vw", justifyContent: "center" }}
        >
            <Slide
                ref={slideRef}
                prevArrow={<div />}
                nextArrow={<div />}
                pauseOnHover={false}
            >
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div
                            style={{
                                ...divStyle,
                                backgroundImage: `url(${slideImage.url})`,
                            }}
                        ></div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};
