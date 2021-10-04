import axios from "axios";
import { api, getAuthorizationToken, loginSuccessful, catchErrors } from "./utils";

const auth = {
  //### Login using a username and password combination.

  getCredentials: (username, password) => {
    axios
      .get(api.authAPI, {
        params: {
          username,
          password,
        },
      })
      .then(loginSuccessful)
      .catch(catchErrors);
  },

  postCredentials: (username, password) => {
    axios
      .post(api.authAPI, {
        username,
        password,
      })
      .then(loginSuccessful)
      .catch(catchErrors);
  },

  //### Login using a JWT access token.

  getToken: () => {
    axios
      .get(api.authAPI, {
        headers: {
          Authentication: getAuthorizationToken(),
        },
      })
      .then(loginSuccessful)
      .catch(catchErrors);
  },

  postToken: () => {
    axios
      .post(
        api.authAPI,
        {
          username,
          password,
        },
        {
          headers: {
            Authentication: getAuthorizationToken(),
          },
        }
      )
      .then(loginSuccessful)
      .catch(catchErrors);
  },

  //### Register a new user.

  register: (username, password) => {
    axios
      .put(api.authAPI, {
        username,
        password,
      })
      .then(loginSuccessful)
      .catch(catchErrors);
  },
};

export default auth;