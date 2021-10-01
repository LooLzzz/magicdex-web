import { login, register } from "@/Logic/redux/reducerSlice";
import { Button, Grid, Paper, TextField, Link } from "@material-ui/core";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Login.css";

const loginToServer = async (dispatch, username, password, apiURL) => {
  const credentials = { username, password };
  axios.post(
    apiURL + 'auth/users',
    credentials
  )
  .then( data => {
    console.log(data["data"]);
    // localStorage.setItem('access-token', data['access-token']);
    // dispatch(
    //   login({ username, accessToken: data['access-token'] })
    // );
  })
  .catch( err => console.error(err) );
};

const Login = (props) => {
  const history = useHistory();
  const myTheme = useSelector((state) => state.actions.theme.currentTheme);
  const apiURL = useSelector((state) => state.actions.apiURL);
  const stateUsername = useSelector((state) => state.actions.account.username);
  if (stateUsername !== undefined) {
    history.push("");
  }
  const dispatch = useDispatch();
  let username = '';
  let password = '';
  return (
    <div className="LoginForm">
      <Paper
        className="Paper"
        variant="elevation"
        elevation={3}
        color="primary"
      >
        <div className="title">
          <h1>Login</h1>
        </div>
        <div>
          <TextField
            className="TextField"
            id="username"
            label="Username"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            onChange={(e) => {
              username = e.target.value
            }}
          />
        </div>
        <div>
          <TextField
            className="TextField"
            id="password"
            label="Password"
            type="password"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            onChange={(e) => {
              password = e.target.value
            }}
          />
        </div>
        <div className="login">
          <Button
            variant="contained"
            className="Button"
            type="submit"
            color="secondary"
            onClick={(e) => {
              loginToServer(dispatch, username, password, apiURL);
            }}
          >
            Login
          </Button>
        </div>
        <div className="register">
          <Link href="/register">Already signed in?</Link>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
