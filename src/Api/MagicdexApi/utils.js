import scryfall from "scryfall-client"


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
      console.error('Request made and server responded', error.response);
    else if (error.request)
      console.error('Request was made but no response was recieved', error.request);
    else
      console.error("Something happened in setting up the request that triggered an error", error.message);

    return error;
  },

  fetchScryfallCardData: async (card_ids) => {
    const ids = (card_ids instanceof Array)
      ? card_ids.map(id => ({ id }))
      : [card_ids].map(id => ({ id }))

    const data = await scryfall.getCollection(ids)
    return (card_ids instanceof Array)
      ? data
      : data[0]
  },
}

export default Utils;

export const {
  getAuthHeaders,
  authHeadersDecorator,
  catchErrors,
  fetchScryfallCardData,
} = Utils;
