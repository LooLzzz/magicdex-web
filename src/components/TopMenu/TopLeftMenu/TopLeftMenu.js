import { Button, Grid, IconButton, InputBase, Paper } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import "./TopLeftMenu.css";

const TopLeftMenu = (props) => {
  return (
    <>
      <Grid item>
        <Link to="/homepage">
          <Button variant="contained" color="primary">
            <HomeIcon />
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default TopLeftMenu;
