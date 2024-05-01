import Typography from "@mui/material/Typography";
import { Container, Grid, Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutUsPage = () => {
    return (
        <Container>
            <Grid container spacing={2} mt={2} xs={12}>
                <Grid container xs={12} md={12} width={"100vw"}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        fontSize: "2.5rem",
                        width: "60vw"
                    }}>
                    <Typography fontSize="3rem" fontFamily="'Righteous', sans-serif"
                    >

                        About
                    </Typography>
                </Grid>

                <Grid xs={12} md={12} width={"100vw"}>
                    <Typography fontSize="1.5rem" fontFamily="'Righteous', sans-serif"
                        sx={{
                            fontSize: "1.4rem",
                            color: "inherit",
                        }}
                    >
                        This Website is about Cards, cards bearing business information about a company or individual.
                        We are a company which promotes other businesses to share their information. The business card typically includes the giver's name, usually with a image and contact information such as street addresses, telephone number, email address, and website. This website helps you to share your business information with the world, you can create your own business card, update your business card, and you can add cards to your favorite. You only allowed to do this stuff after you have signed up to business account.
                    </Typography>
                </Grid>
                <Box className="Container" square raised >
                    <img className="image" src="./assets/imgs/Bg.png"
                    />
                </Box>
            </Grid>
        </Container >
    );
};

export default AboutUsPage;
