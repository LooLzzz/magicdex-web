import "./TopMenu.css";
import { Grid } from "@material-ui/core";
import TopCenterMenu from "./TopCenterMenu/TopCenterMenu";
import TopLeftMenu from "./TopLeftMenu/TopLeftMenu";
import TopRightMenu from "./TopRightMenu/TopRightMenu";

const TopMenu = (props) => {
  return (
    <>
      <div className="TopMenuComponent">
        <Grid container justifyContent="center" direction="row" spacing={1}>
          <Grid item xs={4}>
            <TopLeftMenu />
          </Grid>
          <Grid item xs={4}>
            <TopCenterMenu />
          </Grid>
          <Grid item xs={4}>
            <TopRightMenu />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default TopMenu;
