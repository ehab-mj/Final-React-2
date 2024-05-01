import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LoginContext from "../store/loginContext";
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import "../Layout/header/ui/CssHeader/Text.css";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { upload, useAuth } from "./ui/firebase";
import AuthGuard from "../guard/AuthGuard";
import axios from "axios";
const UserDataComponet = ({ UserDetails, onDelete, onEdit }) => {
  const { login } = useContext(LoginContext);
  const to = useLocation();
  // const handleDeleteClick = () => {
  //   onDelete(UserDetails._id);
  // };
  const handleEditClick = () => {
    onEdit(UserDetails._id);
  };

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  const upload = async () => {
    const fromData = new FormData();
    fromData.append("file", photo);
    // axios.post("/upload", fromData)
    try {
      const res = await axios.post('/upload', fromData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded:', res.data);
      // Handle success, maybe update UI
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error
    }
  }

  return (
    <Container mt={4}>
      <Grid container spacing={2} justifyContent="center" style={{ boxShadow: "0px 0px 10px 0px #00000029" }}>
        <Grid item>
          <input type="file" onChange={handleChange} />
          {/* <button disabled={loading || !photo} onClick={handleClick}>Upload</button> */}
          <button type="button" onClick={upload}>Upload</button>
          <img src="./assets/imgs/Profile.png"
            width="305" height="205"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className="Font"
            fontSize={"1.5rem"}
            fontWeight={500}
          >
            Name:
            {" "} {UserDetails.first} {UserDetails.last} <VerifiedRoundedIcon style={{ marginBottom: "-7px", color: "#1AA5B0" }} />
          </Typography>
          <Typography
            align="start"
            variant="body2"
            color="text.dark"
            style={{ fontSize: "1rem", marginBottom: "4px" }}
          >
            Email: {UserDetails.email}
          </Typography>
          <Typography
            align="start"
            variant="body2"
            color="text.dark"
            style={{ fontSize: "1rem", marginBottom: "4px" }}
          >
            Phone: {UserDetails.phone}
          </Typography>
          <Typography className="Font"
            align="start"
          >
            Admin: {UserDetails.isAdmin ?
              <CheckBoxIcon style={{ marginBottom: "-7px" }} /> :
              <CheckBoxOutlineBlankRoundedIcon style={{ marginBottom: "-7px" }} />}
          </Typography>
          <Typography
            align="start"
            variant="body2"
            color="text.dark"
            style={{ fontSize: "1rem", marginBottom: "4px" }}
          >
            Business: {UserDetails.isBusiness ?
              <CheckBoxIcon style={{ marginBottom: "-7px" }} /> :
              <CheckBoxOutlineBlankRoundedIcon style={{ marginBottom: "-7px" }} />}
          </Typography>
        </Grid>
        <Box
        >
          {/* {((login && login.isAdmin) ||
            to.pathname === ROUTES.MYCARDS) && (
              <IconButton onClick={handleDeleteClick}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            )} */}
          <IconButton edge="end" aria-label="edit" onClick={handleEditClick}>
            <ModeIcon />
          </IconButton>
        </Box>
      </Grid >
    </Container >
  );

};

UserDataComponet.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  UserDetails: PropTypes.shape({
    _id: PropTypes.string,
    first: PropTypes.string.isRequired,
    middle: PropTypes.string,
    last: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string,
    isAdmin: PropTypes.bool,
    isBusiness: PropTypes.bool,
  }).isRequired,
};

export default UserDataComponet;
