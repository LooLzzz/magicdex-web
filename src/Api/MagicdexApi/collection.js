import axios from 'axios'
import pick from 'lodash/pick'

import { API_URL } from '@/Config'
import { getAuthHeaders, catchErrors, populateCardData } from './utils'


const ROUTE_URL = `${API_URL}/collections`


const Collections = {
  /**
   * Retrieve cards from active user's collection.
   */
  getCards: (page, per_page, cards) => {
    const headers = getAuthHeaders()
    const params = { page, per_page, cards }

    return axios
      .get(ROUTE_URL, { params, headers })
      .then(response => populateCardData(response.data.data))
      .catch(err => catchErrors(err))
  },

  /**
   * Insert or update cards from active user's collection.
   */
  updateCards: async (cards) => {
    const headers = getAuthHeaders()

    // keep only relevant data
    cards = cards
      .map(card => {
        card = pick(card, ['_id', 'id', 'amount', 'tag', 'foil', 'condition', 'signed', 'altered', 'misprint'])
        card.scryfall_id = card.id
        delete card.id
        return card
      })

    try {
      let response = await axios.post(ROUTE_URL, { cards }, { headers })

      response = await Promise.all(response.data.map(async (item, i) => ({
        ...item,
        card: item.card
          ? {
            ...await populateCardData(item.card),
            ...item.card,
          }
          : cards[i]
      })))

      return response
    }
    catch (error) {
      return catchErrors(error)
    }
  },

  /**
   * Delete cards from active user's collection.
   */
  deleteCards: (cards) => {
    const headers = getAuthHeaders()

    return axios
      .delete(ROUTE_URL, { cards }, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },


  /**
   * Retrieve all cards from active user's collection.
   */
  getAllCards: (cards) => {
    const headers = getAuthHeaders()
    const params = { cards }

    return axios
      .get(`${ROUTE_URL}/all`, { params, headers })
      .then(response => populateCardData(response.data.data))
      .catch(err => catchErrors(err))
  },

  /**
   * Clear active user's collection.
   */
  deleteAllCards: () => {
    const headers = getAuthHeaders()

    return axios
      .delete(`${ROUTE_URL}/all`, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },

  /**
   * Retrieve a specific card from active user's collection.
   */
  getCardById: (card_id) => {
    const headers = getAuthHeaders()

    return axios
      .get(`${ROUTE_URL}/${card_id}`, { headers })
      .then(response => populateCardData(response.data))
      .catch(err => catchErrors(err))
  },

  /**
   * Update a specific card from active user's collection.
   */
  updateCardById: (card_id, data) => {
    const headers = getAuthHeaders()

    return axios
      .post(`${ROUTE_URL}/${card_id}`, data, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },

  /**
   * Delete a specific card from active user's collection.
   */
  deleteCardById: (card_id) => {
    const headers = getAuthHeaders()

    return axios
      .delete(`${ROUTE_URL}/${card_id}`, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },
}


/** EXPORTS **/
// const decoratedCollections =
//   Object.fromEntries(
//     Object
//       .entries(Collections)
//       .map(([k, v]) => [k, authHeadersDecorator(v)])
//   )

// export default decoratedCollections
export default Collections

export const {
  getCards,
  updateCards,
  deleteCards,
  getAllCards,
  deleteAllCards,
  getCardById,
  updateCardById,
  deleteCardById,
  // } = decoratedCollections
} = Collections
