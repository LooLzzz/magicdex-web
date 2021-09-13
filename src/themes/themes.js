import { createTheme } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const getInitialTheme = () => createTheme({
  palette: {
    primary: {
      main: "#165788",
      contrastText: "#fff",
    },
    secondary: {
      main: "#69BE28",
      contrastText: "#fff",
    },
    primaryBlue: {
      backgroundColor: "#3D75E1",
      color: "#fff",
    },
    secondaryBlue: {
      backgroundColor: "#65CFE9",
      color: "#fff",
    },
    primaryRed: {
      backgroundColor: "#E31036",
      color: "#000",
    },
    secondaryRed: {
      backgroundColor: "#E44D69",
      color: "#000",
    },
    primaryGray: {
      backgroundColor: "#31b09b",
      color: "#000",
    },
    secondaryGray: {
      backgroundColor: "#4fc9b5",
      color: "#000",
    },
    accent: {
      backgroundColor: purple[500],
      color: "#000",
    },
  },
});

const getLightTheme = () => createTheme({
  palette: {
    primary: {
      main: "#165788",
      contrastText: "#fff",
    },
    secondary: {
      main: "#69BE28",
      contrastText: "#fff",
    },
    companyBlue: {
      backgroundColor: "#65CFE9",
      color: "#fff",
    },
    companyRed: {
      backgroundColor: "#E44D69",
      color: "#000",
    },
    accent: {
      backgroundColor: purple[500],
      color: "#000",
    },
  },
});

export { getInitialTheme, getLightTheme };