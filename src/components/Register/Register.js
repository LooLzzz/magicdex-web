import { login, register } from "@/logic/redux/reducerSlice";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "./Register.css";

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

const Register = (props) => {
  const myTheme = useSelector((state) => state.actions.themes.currentTheme);
  const apiURL = useSelector((state) => state.actions.apiURL);
  const stateUsername = useSelector((state) => state.actions.account.username);
  const dispatch = useDispatch();
  let username = '';
  let password = '';
  console.log('stateUsername', stateUsername);
  if (stateUsername !== undefined) {
    console.log(stateUsername);
    return <Redirect to="" />;
  }
  return (
    <div className="RegisterForm">
      <Paper
        className="Paper"
        variant="elevation"
        elevation={3}
        style={myTheme.palette.primaryGray}
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
            style={myTheme.palette.secondaryGray}
            onClick={(e) => {
              loginToServer(dispatch, username, password, apiURL);
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
