import { login, register } from "@/logic/redux/reducerSlice";
import { Button, Grid, Paper, TextField, Link } from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Login.css";

const loginToServer = async (dispatch, username, password, apiURL) => {
  const credentials = { username, password };
  const res = await fetch(apiURL + 'auth/users', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    }
  });
  if (res.status != 200) {
    console.log('HTML Status Error: ', res.status);
  } else {
    const resJson = await res.json();
    localStorage.setItem('access-token', resJson['access-token']);
    dispatch(
      login({ username, accessToken: resJson['access-token'] })
    );
  }
}

const Login = (props) => {
  const history = useHistory();
  const myTheme = useSelector((state) => state.actions.themes.currentTheme);
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
        style={myTheme.palette.primaryGray}
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
            style={myTheme.palette.secondaryGray}
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
