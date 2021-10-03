import { login, register } from "@/Logic/redux/reducerSlice";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./Register.css";

const registerToServer = async (history, username, password, apiURL) => {
  const body = JSON.stringify({ username, password });
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  }
  axios.put(apiURL + "auth/users", body, config).then(res => {
    localStorage.setItem('access-token', res['access-token']);
    history.push("login");
  })
  .catch(e => {
    if (e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    }
  })
  // if (res.status != 200) {
  //   console.log('HTML Status Error: ', res.status);
  // } else {
  //   const resJson = await res.json();
  //   localStorage.setItem('access-token', resJson['access-token']);
  //   dispatch(
  //     login({ username, accessToken: resJson['access-token'] })
  //   );
  // }
}

const Register = (props) => {
  const myTheme = useSelector((state) => state.actions.theme.currentTheme);
  const apiURL = useSelector((state) => state.actions.apiURL);
  const stateUsername = useSelector((state) => state.actions.account.username);
  const dispatch = useDispatch();
  const history = useHistory();
  let username = '';
  let password = '';
  console.log('stateUsername', stateUsername);
  if (stateUsername !== undefined) {
    return <Redirect to="" />;
  }
  return (
    <div className="RegisterForm">
      <Paper
        className="Paper"
        variant="elevation"
        elevation={3}
        cololr="primary"
      >
        <div className="title">
          <h1>Register</h1>
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
        <div className="register">
          <Button
            variant="contained"
            className="Button"
            type="submit"
            color="secondary"
            onClick={(e) => {
              registerToServer(history, username, password, apiURL);
            }}
          >
            Register
          </Button>
        </div>
        <div className="login">
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </Paper>
    </div>
  );
};

export default Register;
