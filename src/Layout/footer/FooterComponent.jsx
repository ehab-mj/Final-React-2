import { BottomNavigation, Paper, Grid } from "@mui/material";

import BottomButtons from "./BottmoNavigation";
const FooterComponent = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Paper
        elevation={4}
        sx={{ position: "sticky", mt: 3, mb: 0, width: "100%" }}
      >
        <BottomNavigation>
          <BottomButtons />
        </BottomNavigation>
      </Paper>
    </Grid>
  );
};

export default FooterComponent;
