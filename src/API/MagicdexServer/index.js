import { apiURL } from "@/Config";
import { login } from "@/logic/redux/reducerSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const api = {
  authAPI: apiURL + "/auth",
  collectionAPI: apiURL + "/collections",
  collectionAllAPI: apiURL + "/collections/all",
};

const dispatch = useDispatch();

//Private methods

//Login

const getAuthorizationToken = () => {
  return "Bearer " + localStorage.getItem("access-token");
};

const loginSuccessful = (res) => {
  // Any status code that is 2xx
  accessToken = res.data["access-token"];
  localStorage.setItem("access-token", accessToken);
  localStorage.setItem("username", username);
  dispatch(login({ username, accessToken }));
  return true;
};

//Collections

const returnRes = (res) => {
  return res;
}

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

//# API calls

//## Authentication

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
        params: {
          username,
          password,
        },
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

//## Collections

const collections = {

  //### Retrieve cards from active user's collection.

  getCards: (page, per_page, cards) => {
    axios
      .get(api.collectionAPI, {
        params: {
          page,
          per_page,
          cards
        },
        headers: {
          Authentication: getAuthorizationToken(),
        },
      })
      .then(returnRes)
      .catch(catchErrors);
  },

  //### Insert or update cards from active user's collection.

  updateCards: (cards) => {
    axios
    .post(
      api.collectionAPI,
      {
        cards,
      },
      {
        headers: {
          Authentication: getAuthorizationToken(),
        },
      }
    )
    .then(returnRes)
    .catch(catchErrors);
  },

  //### Delete cards from active user's collection.

  deleteCards: (cards) => {
    axios
    .delete(
      api.collectionAPI,
      {
        cards,
      },
      {
        headers: {
          Authentication: getAuthorizationToken(),
        },
      }
    )
    .then(returnRes)
    .catch(catchErrors);
  },

  //### Retrieve all cards from active user's collection.

  getAllCards: (cards) => {
    axios
      .get(api.collectionAPI, {
        params: {
          cards
        },
        headers: {
          Authentication: getAuthorizationToken(),
        },
      })
      .then(returnRes)
      .catch(catchErrors);
  },

  //### Clear active user's collection.

  deleteAllCards: () => {
    axios
    .delete(
      api.collectionAPI,
      {},
      {
        headers: {
          Authentication: getAuthorizationToken(),
        },
      }
    )
    .then(returnRes)
    .catch(catchErrors);
  },

  //### Retrieve a specific card from active user's collection.

  getCard: (card_id) => {
    axios
    .get(api.collectionAPI + "/" + card_id, {
      headers: {
        Authentication: getAuthorizationToken(),
      },
    })
    .then(returnRes)
    .catch(catchErrors);
  },

  //### Update a specific card from active user's collection.

  updateCard: (card_id, cardData) => {
    axios
    .post(
      api.collectionAPI + "/" + card_id,
      cardData,
      {
        headers: {
          Authentication: getAuthorizationToken(),
        },
      }
    )
    .then(returnRes)
    .catch(catchErrors);
  },

  //### Delete a specific card from active user's collection.

  deleteCard: (card_id, cardData) => {
    axios
    .post(
      api.collectionAPI + "/" + card_id,
      {},
      {
        headers: {
          Authentication: getAuthorizationToken(),
        },
      }
    )
    .then(returnRes)
    .catch(catchErrors);
  },
};

/** EXPORT **/
export default { auth, collections };
