import { useEffect, useState } from 'react'
// import axios from "axios";
import { Button, TextField, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import { login, setCurrentTab } from "@/Logic/redux/reducerSlice";
import useStyles from "./styles";


const mapStateToProps = (state) => ({
  theme: state.actions.theme.currentTheme,
  apiUrl: state.actions.apiUrl,
  username: state.actions.account.username,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    login: (payload) => dispatch(login(payload)),
    setCurrentTab: (payload) => {dispatch(setCurrentTab(payload))},
  }
})

const Login = (props) => {
  /** VARS **/
  const [username_input, setUsername] = useState('');
  const [password_input, setPassword] = useState('');
  const history = useHistory();
  const { 
    classes,
    // theme,
    // apiUrl,
    username,
    dispatch,
  } = props
  
  /** EFFECTS **/
  useEffect(() => {
    //onMount
    if (username !== undefined)
      history.push("");

    dispatch.setCurrentTab('login')
  })

  /** HANDLERS **/
  const handleSubmit = (e) => {
    //TODO
    console.log({username_input, password_input})
  }

  /** RENDER **/
  return (
    <Grid container rowSpacing={4} component='form' className={classes.form} onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <TextField 
          inputMode = "text"
          label = "Username"
          prefix = "pre"
          value = {username_input}
          onChange = { e => setUsername(e.target.value) }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          inputMode = "password"
          label = "Password"
          value = {password_input}
          onChange = { e => setPassword(e.target.value) }
        />
      </Grid>
      <Grid item>
        <Button color="primary" variant="contained">
          Submit
        </Button>
      </Grid>
      <Grid item>
        <Button color="secondary" variant="outlined">
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

/** EXPORTS **/
export default
  connect(mapStateToProps, mapDispatchToProps) (
    withStyles(useStyles) (
      Login
    )
  )
