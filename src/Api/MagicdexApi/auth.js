import axios from "axios"

import { authHeadersDecorator } from './utils'
import { API_URL } from "@/Config"


const ROUTE_URL = `${API_URL}/auth`

const renameKeys = (obj, keyMap) =>
  Object.keys(obj)
    .reduce((acc, key) => {
      const newKey = keyMap[key] || key
      acc[newKey] = obj[key]
      return acc
    }, {})

const Auth = {
  /**
   * Try to login with the given credentials.
   * If credentials provided it will try to use the saved access token.
   * @param {String?} username
   * @param {String?} password
   * @returns Response Object
   */
  login: authHeadersDecorator(({ username, password, headers }) => {
    let payload = { username, password }

    return axios
      .post(ROUTE_URL, payload, { headers })
      .then(response => renameKeys(response.data, { 'access-token': 'accessToken' }))
    // .catch(err => catchErrors(err));
  }),

  /**
   * Try to register a new user.
   * @param {String?} username
   * @param {String?} password
   * @returns Response Object
   */
  register: ({ username, password }) => {
    const payload = { username, password }

    return axios
      .put(ROUTE_URL, payload)
      .then(response => renameKeys(response.data, { 'access-token': 'accessToken' }))
    // .catch(err => catchErrors(err));
  },
}

export default Auth

export const {
  login,
  register,
} = Auth
