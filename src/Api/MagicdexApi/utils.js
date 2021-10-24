import Scryfall from "scryfall-client"
import zipObjectDeep from "lodash/zipObjectDeep"


const Utils = {
  getAuthHeaders: () => {
    let token = localStorage.getItem("accessToken")

    return token ? { Authorization: `Bearer ${token}` } : {}
  },

  authHeadersDecorator: (func) => (
    function (args) {
      args = {
        ...args,
        headers: {
          ...args?.headers,
          ...getAuthHeaders(),
        },
      }
      return func(args)
    }
  ),

  catchErrors: (error) => {
    if (error.response)
      console.error('Request made and server responded', error.response)
    else if (error.request)
      console.error('Request was made but no response was recieved', error.request)
    else
      console.error("Something happened in setting up the request that triggered an error", error.message)

    return error
  },

  fetchScryfallCardData: async (cardInfo) => {
    const all_sets = await Scryfall.getSets()
    const setData = zipObjectDeep(all_sets.map(set => set.id), all_sets) // { 'M19': {...}, 'M20': {...}, ... }

    const card_ids = cardInfo.map(card => ({ id: card.id }))
    const cardData = await Scryfall.getCollection(card_ids)

    return cardData.map((card) => ({
      ...card,
      set_data: setData[card.set_id],
    }))
  },
}

export default Utils

export const {
  getAuthHeaders,
  authHeadersDecorator,
  catchErrors,
  fetchScryfallCardData,
} = Utils
