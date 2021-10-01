import { Button, Grid, IconButton, InputBase, Paper } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./TopLeftMenu.css";

const TopLeftMenu = (props) => {
  const myTheme = useSelector((state) => state.actions.theme.currentTheme);
  return (
    <>
      <Grid item>
        <Link to="/homepage">
          <Button color="secondary" variant="contained">
            <HomeIcon />
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default TopLeftMenu;
