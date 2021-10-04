import { apiURL } from "@/Config";
import { login } from "@/Logic/redux/reducerSlice";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    dispatch: {
        login: (payload) => dispatch(login(payload))
    }
})

const api = {
    authAPI: apiURL + "/auth",
    collectionAPI: apiURL + "/collections",
    collectionAllAPI: apiURL + "/collections/all",
  };
  
let dispatch;
//Login

const getAuthorizationToken = () => {
  return "Bearer " + localStorage.getItem("access-token");
};

const loginSuccessful = (res) => {
  // Any status code that is 2xx
  let accessToken = res.data["access-token"];
  let username = res.data["username"];
  localStorage.setItem("access-token", accessToken);
  localStorage.setItem("username", username);
  dispatch(login({ username, accessToken }));
  return true;
};

//Collections

const returnRes = (res) => {
  return res;
};

//Errors

const catchErrors = (error) => {
  if (error.response) {
    // Request made and server responded
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // Request was made but no response was recieved
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error ", error.message);
  }
  return false;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)({ api, getAuthorizationToken, loginSuccessful, returnRes, catchErrors });