import { apiURL } from "@/Config";
import { login } from "@/logic/redux/reducerSlice";
import axios from "axios";

const api = {
    authAPI: apiURL + "/auth",
};

//Private methods

const getAuthorizationToken = () => {
    return 'Bearer ' + localStorage.getItem('access-token');
}

const loginSuccessful = (res) => {
    // Any status code that is 2xx
    accessToken = res.data["access-token"];
    localStorage.setItem("access-token", accessToken);
    localStorage.setItem("username", username);
    login({ username, accessToken });
    return true;
}

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



//# API calls

//## Authentication

const auth = {

    //### Login using a username and password combination.

    getCredentials: (username, password) => {
        axios.get(api.authAPI, {
            params: {
              username,
              password,
            },
          })
          .then(loginSuccessful)
          .catch(catchErrors);
    },
    
    
    postCredentials: (username, password) => {
        axios.post(api.authAPI, {
            username,
            password,
        })
        .then(loginSuccessful)
        .catch(catchErrors);
    },
    
    //### Login using a JWT access token.


    getToken: () => {
        axios.get(api.authAPI, {
            params: {
              username,
              password,
            }, headers: {
                Authentication: getAuthorizationToken(),
            }
          })
          .then(loginSuccessful)
          .catch(catchErrors);
    },

    postToken: () => {
        axios.post(api.authAPI, {
            username,
            password,
            }, 
            {
                headers: {
                    Authentication: getAuthorizationToken(),
                }
            })
            .then(loginSuccessful)
            .catch(catchErrors);
    },

    //### Register a new user.

    register: (username, password) => {
        axios.put(api.authAPI, {
            username,
            password,
          })
          .then(loginSuccessful)
          .catch(catchErrors);
    }
}

//## Collections

// const collections = {
//     get: (page, per_page
//         )
// }



/** EXPORT **/
export default { auth };
