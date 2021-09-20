import { Button, Chip, Grid, Popover } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./TopRightMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/logic/redux/reducerSlice";
import { useState } from "react";

const TopRightMenu = (props) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  // const handlePopClick = (event) => {
  //   setAnchorEl(event.target);
  // }

  // const handleClose = () => {
  //   setAnchorEl(null);
  // }

  const handleLogoutClick = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('access-token');
    dispatch(logout());
  }

  const myTheme = useSelector((state) => state.actions.themes.currentTheme);
  const username = useSelector((state) => state.actions.account.username);

  const id = open ? 'popover' : undefined;

  return (
    <>
      <Grid item>
        {username === undefined ? (
          <Link to="/login" className="Link">
            <Button style={myTheme.palette.secondaryBlue} variant="contained">
              Login
            </Button>
          </Link>
        ) : (
          <>
            <Chip
              id='usernameChip'
              label={username}
              style={myTheme.palette.secondaryBlue}
              onClick={(e) => setOpen(true)}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={document.getElementById('usernameChip')}
              onClose={(e) => setOpen(false)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Button
                variant="contained"
                style={myTheme.palette.secondaryBlue}
                onClick={handleLogoutClick}
              >
                Logout
              </Button>
            </Popover>
          </>
        )}
      </Grid>
    </>
  );
};

export default TopRightMenu;
