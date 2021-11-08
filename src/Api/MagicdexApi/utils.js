import Scryfall from "scryfall-client"
import zipObjectDeep from "lodash/zipObjectDeep"
import intersectionWith from 'lodash/intersectionWith'


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

  arrayContains: (array, values, type = 'some') => {
    array = array instanceof Array ? array : [array]
    values = values instanceof Array ? values : [values]

    const intersection = intersectionWith(array, values,
      (a, b) => a.includes(b)
    )
    switch (type) {
      case 'some':
        return intersection.length > 0
      case 'every':
        return intersection.length === values.length
      default:
        return false
    }
  },

  populateCardData: async (cards) => {
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
  },
}

export default Utils

export const {
  getAuthHeaders,
  authHeadersDecorator,
  catchErrors,
  fetchScryfallCardData,
  arrayContains,
  populateCardData,
} = Utils
