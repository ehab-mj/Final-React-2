import ROUTES from "../../routes/ROUTES";
import FeedbackIcon from '@mui/icons-material/Feedback';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const alwaysButtons = [
  {
    to: ROUTES.ABOUT, title: "About Us", icon: <FeedbackIcon />,
  },
];
const loggedInButtons = [
  { to: ROUTES.FAV, title: "Favorite", icon: <BookmarkRoundedIcon /> },
];

const bizButtons = [
  { to: ROUTES.MYGAMES, title: "MYGAMES", icon: <StyleRoundedIcon /> },
];

const adminButtons = [
  { to: ROUTES.SANDBOX, title: "UserManage", icon: <AdminPanelSettingsIcon /> },
];

const loggedOutButtons = [
  {
    to: ROUTES.REGISTER, title: "Register page", icon: <PersonAddAltRoundedIcon />,
  },
  { to: ROUTES.LOGIN, title: "Login page", icon: <VpnKeyRoundedIcon /> },
];

export {
  alwaysButtons,
  loggedInButtons,
  loggedOutButtons,
  bizButtons,
  adminButtons,
};
