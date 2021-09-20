import "./TopMenu.css";
import { Grid } from "@material-ui/core";
import TopCenterMenu from "./TopCenterMenu/TopCenterMenu";
import TopLeftMenu from "./TopLeftMenu/TopLeftMenu";
import TopRightMenu from "./TopRightMenu/TopRightMenu";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login } from "@/logic/redux/reducerSlice";

const TopMenu = (props) => {
  const myTheme = useSelector((state) => state.actions.themes.currentTheme);
  const username = useSelector((state) => state.actions.account.username);
  const history = useHistory();
  const dispatch = useDispatch();
  const t = localStorage.getItem('access-token');
  if (t === null)
    history.push("login");
  else{
    dispatch(
      login({ username: localStorage.getItem("username"), accessToken: t })
    );
  }
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
