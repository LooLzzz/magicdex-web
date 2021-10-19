import axios from "axios"
// import scryfall from "scryfall-client";

import { API_URL } from "@/Config"
import { authHeadersDecorator, catchErrors, fetchScryfallCardData } from "./utils"
// import { fetchScryfallSymbolData, fetchScryfallSetData } from "./utils";


const ROUTE_URL = `${API_URL}/collections`
// const zip = (a, b) => a.map((k, i) => [k, b[i]]);

const populateCardData = async (cards) => {
  const cardInfo =
    cards instanceof Array
      ? cards.map(card => ({ id: card.scryfall_id, set_id: card.set }))
      : [cards.scryfall_id, cards.set]

  const scryfallData = await fetchScryfallCardData(cardInfo)
  const isDfc = (card) => Boolean(card?.card_faces.length > 1)

  const populatedCards =
    cards.map((card, i) => ({
      ...scryfallData[i],
      ...card,
      date_created: new Date(card.date_created),
      is_dfc: isDfc(scryfallData[i]),
      mana_cost: isDfc(scryfallData[i])
        ? [scryfallData[i].card_faces[0].mana_cost, scryfallData[i].card_faces[1].mana_cost]
        : scryfallData[i].mana_cost,
    }))

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

  // /**
  //  * Get all sets names and codes.
  //  */
  // getAllSets: async () => {
  //   return await fetchScryfallSetData();
  // },

  // getAllSymbols: async () => {
  //   return await fetchScryfallSymbolData();
  // },
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
  // getAllSets,
  // getAllSymbols,
} = decoratedCollections
// } = Collections
