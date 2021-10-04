import { api, getAuthorizationToken, returnRes, catchErrors } from "./utils";
import axios from "axios";

const collections = {
  //### Retrieve cards from active user's collection.

  getCards: (page, per_page, cards) => {
    axios
      .get(api.collectionAPI, {
        params: {
          page,
          per_page,
          cards,
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
          cards,
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
      .post(api.collectionAPI + "/" + card_id, cardData, {
        headers: {
          Authentication: getAuthorizationToken(),
        },
      })
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

export default collections;
