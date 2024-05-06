import Typography from "@mui/material/Typography";
import { Container, Grid, Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './About.css'
const AboutUsPage = () => {
    return (

        <section class="home" id="home">
            <div class="home-content">
                <h3>Hello, It's</h3>
                <h1>Ehab Majdub Portfolio</h1>
                <h3>And I'm a <span class="typeEffect"></span></h3>

                <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>

                {/* <script>
                    var typed = new Typed(".typeEffect", {
                        strings: ["Graphic Designer", "Web Developer", "Logo Maker", "Programmer"],
                    typeSpeed: 100,
                    backSpeed: 80,
                    looped: true,
                    backDelay: 2000,
                });
                </script> */}

                <div class="social-media">
                    <ul>
                        <a href="#"><i class='bx bxl-facebook-circle'></i></a>
                        <a href="#"><i class='bx bxs-phone'></i></a>
                        <a href="#"><i class='bx bxl-whatsapp'></i></a>
                        <a href="#"><i class='bx bxs-location-plus'></i></a>
                    </ul>
                </div>
                <a href="./CV.pdf" class="btn">Download CV</a>
            </div>

            <div class="home-img">
                <img src="images/vetor.png" alt="" />
            </div>
        </section>
    );
};

export default AboutUsPage;
