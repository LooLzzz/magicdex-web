import axios from "axios";

import { authHeadersDecorator, saveAuth, catchErrors } from './utils';
import { API_URL } from "@/Config";


const ROUTE_URL = `${API_URL}/auth`;

const Auth = {
  /**
   * Try to login with the given credentials.
   * If credentials provided it will try to use the saved access token.
   * If success, save the token in localStorage.
   * @param {String?} username
   * @param {String?} password
   * @returns Response Object
   */
  login: authHeadersDecorator( ({username, password, headers}) => {
    // const headers = { ...getAuthHeaders() };
    const payload = { username, password };
    
    return axios
      .post(ROUTE_URL, payload, { headers })
      .then(response => saveAuth(response))
      .catch(err => catchErrors(err));
  }),

  /**
   * Try to register a new user.
   * @param {String?} username
   * @param {String?} password
   * @returns Response Object
   */
  register: (username, password) => {
    const payload = { username, password };
    
    return axios
      .put(ROUTE_URL, payload)
      .then(response => saveAuth(response))
      .catch(err => catchErrors(err));
  },
}

export default Auth;

export const {
  login,
  register,
} = Auth;
