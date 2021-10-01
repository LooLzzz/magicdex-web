import { Button, Grid, IconButton, InputBase, Paper } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import "./TopCenterMenu.css";

const NavigationMenu = (props) => {
  return (
    <>
      <Grid item xs={9} className="center">
        <Paper component="form" className="search">
          <IconButton aria-label="menu" size="small">
            <SearchIcon />
          </IconButton>
          <InputBase
            className="search"
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            color="primary"
          />
        </Paper>
      </Grid>
    </>
  );
};

export default NavigationMenu;
