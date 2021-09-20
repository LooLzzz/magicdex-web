import { login, register } from "@/logic/redux/reducerSlice";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "./Login.css";

const loginToServer = async (dispatch, username, password, apiURL) => {
  const body = JSON.stringify({ username, password });
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  }
  axios.post(apiURL + "auth/users", body, config).then(res => {
    localStorage.setItem('username', res.data['username']);
    localStorage.setItem('access-token', res.data['access-token']);
    dispatch(login({ username, accessToken: res.data["access-token"] }));
  })
  .catch(e => {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    }
  })
}

const Login = (props) => {
  const myTheme = useSelector((state) => state.actions.themes.currentTheme);
  const apiURL = useSelector((state) => state.actions.apiURL);
  const stateUsername = useSelector((state) => state.actions.account.username);
  const dispatch = useDispatch();
  let username = '';
  let password = '';
  console.log('stateUsername', stateUsername);
  if (stateUsername !== undefined) {
    return <Redirect to="" />;
  }
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
          <Link to="/register">Don't have an account? Register</Link>
        </div>
      </Paper>
    </div>
  );
};

export default Login;
