import axios from "axios"

import { API_URL } from "@/Config"
import { authHeadersDecorator, catchErrors, populateCardData } from "./utils"


const ROUTE_URL = `${API_URL}/users`


const Users = {
  /**
   * Retrieve basic user info.
   */
  getInfo: ({ headers }) => {
    // const headers = { ...getAuthHeaders() };
    const params = {}

    return axios
      .get(ROUTE_URL, { params, headers })
      .then(response => populateCardData(response.data.data))
      .catch(err => catchErrors(err))
  },

  /**
   * Update user's info.
   */
  updateInfo: ({ headers, ...data }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .post(ROUTE_URL, { ...data }, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },

  /**
   * Retrieve cards from active user's collection.
   */
  getCards: ({ username, page, per_page, cards, headers }) => {
    // const headers = { ...getAuthHeaders() };
    const params = { page, per_page, cards }

    return axios
      .get(`${ROUTE_URL}/collections/${username}`, { params, headers })
      .then(response => populateCardData(response.data.data))
      .catch(err => catchErrors(err))
  },

  /**
   * Insert or update cards from active user's collection.
   */
  updateCards: ({ username, cards, headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .post(`${ROUTE_URL}/collections/${username}`, { cards }, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },

  /**
   * Delete cards from active user's collection.
   */
  deleteCards: ({ username, cards, headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .delete(`${ROUTE_URL}/collections/${username}`, { cards }, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },


  /**
   * Retrieve all cards from active user's collection.
   */
  getAllCards: ({ username, cards, headers }) => {
    // const headers = { ...getAuthHeaders() };
    const params = { cards }

    return axios
      .get(`${ROUTE_URL}/${username}/collections/all`, { params, headers })
      .then(response => populateCardData(response.data.data))
      .catch(err => catchErrors(err))
  },

  /**
   * Clear active user's collection.
   */
  deleteAllCards: ({ username, headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .delete(`${ROUTE_URL}/${username}/collections/all`, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },

  /**
   * Retrieve a specific card from active user's collection.
   */
  getCardById: ({ username, card_id, headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .get(`${ROUTE_URL}/${username}/collections/${card_id}`, { headers })
      .then(response => populateCardData(response.data))
      .catch(err => catchErrors(err))
  },

  /**
   * Update a specific card from active user's collection.
   */
  updateCardById: ({ username, card_id, data, headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .post(`${ROUTE_URL}/${username}/collections/${card_id}`, data, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },

  /**
   * Delete a specific card from active user's collection.
   */
  deleteCardById: ({ username, card_id, headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .delete(`${ROUTE_URL}/${username}/collections/${card_id}`, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },
}


/** EXPORTS **/
const decoratedUsers =
  Object.fromEntries(
    Object
      .entries(Users)
      .map(([k, v]) => [k, authHeadersDecorator(v)])
  )

export default decoratedUsers
// export default Users

export const {
  getInfo,
  updateInfo,
  getCards,
  updateCards,
  deleteCards,
  getAllCards,
  deleteAllCards,
  getCardById,
  updateCardById,
  deleteCardById,
} = decoratedUsers
// } = Users
