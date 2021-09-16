import { Button, Chip, Grid } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./TopRightMenu.css";
import { useSelector } from "react-redux";

const TopRightMenu = (props) => {
  const myTheme = useSelector((state) => state.actions.themes.currentTheme);
  const username = useSelector((state) => state.actions.account.username);
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
          <Chip label={username} style={myTheme.palette.secondaryBlue}/>
        )}
      </Grid>
    </>
  );
};

export default TopRightMenu;
