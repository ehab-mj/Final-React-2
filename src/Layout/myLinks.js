import ROUTES from "../routes/ROUTES";
import HomeIcon from '@mui/icons-material/Home';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { Tooltip } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const alwaysLinks = [{

  to: ROUTES.HOME, title:
    <Tooltip title="Home">
      <HomeIcon
        style={{
          width: "2.2rem",
          height: "3rem",
        }}
      />
    </Tooltip>
},
{

  to: ROUTES.ABOUT, title:
    <Tooltip title="About">
      <FeedbackIcon
        style={{
          width: "2.2rem",
          height: "3rem",
        }}
      />
    </Tooltip>
}
];

const loggedInLinks = [{
  to: ROUTES.FAV, title:
    <Tooltip title="Favorite ">
      <BookmarkRoundedIcon
        style={{
          width: "2.2rem",
          height: "3rem",
        }}
      />
    </Tooltip >
},
{
  to: ROUTES.CART, title:
    <Tooltip title="Cart ">
      <ShoppingCartIcon
        style={{
          width: "2.2rem",
          height: "3rem",
        }}
      />
    </Tooltip >
},
];

const bizLinks = [
  {
    to: ROUTES.MYGAMES, title:
      <Tooltip title="My Games">
        <StyleRoundedIcon
          style={{
            width: "2.2rem",
            height: "3rem",
          }}
        />
      </Tooltip >
  },
];
const adminLinks = [
  {
    to: ROUTES.SANDBOX, title:
      <Tooltip title="sandbox">
        <AccountBalanceIcon
          style={{
            width: "2.2rem",
            height: "3rem",
          }}
        />
      </Tooltip>
  }
];

const loggedOutLinks = [
  {
    to: ROUTES.REGISTER, title:
      <Tooltip title="Register">
        <PersonAddAltRoundedIcon
          style={{
            width: "2.2rem",
            height: "3rem",
          }}
        />
      </Tooltip>
  },
  {
    to: ROUTES.LOGIN, title:
      <Tooltip title="Login">
        <VpnKeyRoundedIcon
          style={{
            width: "2.2rem",
            height: "3rem",
          }}
        />
      </Tooltip>
  },
];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks, adminLinks };
