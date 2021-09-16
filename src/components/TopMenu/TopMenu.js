import "./TopMenu.css";
import { Grid } from "@material-ui/core";
import TopCenterMenu from "./TopCenterMenu/TopCenterMenu";
import TopLeftMenu from "./TopLeftMenu/TopLeftMenu";
import TopRightMenu from "./TopRightMenu/TopRightMenu";
import { useSelector } from "react-redux";

const TopMenu = (props) => {
  const myTheme = useSelector((state) => state.actions.themes.currentTheme);
  return (
    <>
      <div className="TopMenuComponent" style={myTheme.palette.primaryBlue}>
        <Grid container justifyContent="flex-start" direction="row">
          <Grid container xs={4}>
            <TopLeftMenu />
          </Grid>
          <Grid container xs={4} justifyContent="center">
            <TopCenterMenu />
          </Grid>
          <Grid container xs={4} justifyContent="flex-end">
            <TopRightMenu />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default TopMenu;
