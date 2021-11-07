import axios from "axios"

import { API_URL } from "@/Config"
import { authHeadersDecorator, catchErrors, fetchScryfallCardData, arrayContains } from "./utils"
// import { fetchScryfallSymbolData, fetchScryfallSetData } from "./utils";


const ROUTE_URL = `${API_URL}/collections`
// const zip = (a, b) => a.map((k, i) => [k, b[i]]);


const populateCardData = async (cards) => {
  const cardInfo =
    cards instanceof Array
      ? cards.map(card => ({ id: card.scryfall_id, set_id: card.set }))
      : [cards.scryfall_id, cards.set]

  const scryfallData = await fetchScryfallCardData(cardInfo)

  const populatedCards = await Promise.all(
    cards.map(async (card, i) => {
      const { is_transform, is_split, is_flip } = {
        is_transform: arrayContains(scryfallData[i].layout, ['modal', 'transform']),
        is_split: arrayContains(scryfallData[i].layout, ['split', 'fuse']),
        is_flip: arrayContains(scryfallData[i].layout, ['flip']),
      }

      return Object.assign(scryfallData[i], {
        ...card,
        is_transform,
        is_split,
        is_flip,
        // rulings: await scryfallData[i].getRulings(),
        date_created: new Date(card.date_created),
        mana_cost: is_transform
          ? [scryfallData[i].card_faces[0].mana_cost, scryfallData[i].card_faces[1].mana_cost]
          : scryfallData[i].mana_cost,
      })
    })
  )

  return (cards instanceof Array)
    ? populatedCards
    : populatedCards[0]
}


const Collections = {
  /**
   * Retrieve cards from active user's collection.
   */
  getCards: ({ page, per_page, cards, headers }) => {
    // const headers = { ...getAuthHeaders() };
    const params = { page, per_page, cards }

    return axios
      .get(ROUTE_URL, { params, headers })
      .then(response => populateCardData(response.data.data))
      .catch(err => catchErrors(err))
  },

  /**
   * Insert or update cards from active user's collection.
   */
  updateCards: ({ cards, headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .post(ROUTE_URL, { cards }, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },

  /**
   * Delete cards from active user's collection.
   */
  deleteCards: ({ cards, headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .delete(ROUTE_URL, { cards }, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },


  /**
   * Retrieve all cards from active user's collection.
   */
  getAllCards: ({ cards, headers }) => {
    // const headers = { ...getAuthHeaders() };
    const params = { cards }

    return axios
      .get(`${ROUTE_URL}/all`, { params, headers })
      .then(response => populateCardData(response.data.data))
      .catch(err => catchErrors(err))
  },

  /**
   * Clear active user's collection.
   */
  deleteAllCards: ({ headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .delete(`${ROUTE_URL}/all`, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },

  /**
   * Retrieve a specific card from active user's collection.
   */
  getCardById: ({ card_id, headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .get(`${ROUTE_URL}/${card_id}`, { headers })
      .then(response => populateCardData(response.data))
      .catch(err => catchErrors(err))
  },

  /**
   * Update a specific card from active user's collection.
   */
  updateCardById: ({ card_id, data, headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .post(`${ROUTE_URL}/${card_id}`, data, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },

  /**
   * Delete a specific card from active user's collection.
   */
  deleteCardById: ({ card_id, headers }) => {
    // const headers = { ...getAuthHeaders() };

    return axios
      .delete(`${ROUTE_URL}/${card_id}`, { headers })
      .then(response => response)
      .catch(err => catchErrors(err))
  },
}


/** EXPORTS **/
const decoratedCollections =
  Object.fromEntries(
    Object
      .entries(Collections)
      .map(([k, v]) => [k, authHeadersDecorator(v)])
  )

export default decoratedCollections
// export default Collections;

export const {
  getCards,
  updateCards,
  deleteCards,
  getAllCards,
  deleteAllCards,
  getCardById,
  updateCardById,
  deleteCardById,
} = decoratedCollections
// } = Collections
