import axios from "axios";

import { getAuthHeaders } from './utils'
import { API_URL } from "@/Config";

const ROUTE_URL = `${API_URL}/auth`;


const login = (username, password) => {
  const headers = getAuthHeaders();
  const payload = { username, password };
  
  return axios.post(ROUTE_URL, payload, { headers })
    .then(response => {
      if (response.data['access-token'])
        localStorage.setItem('access-token', response.data['access-token']);
      
      return response;
    })
    .catch(err => {
      return err.response;
    });
};

const register = (username, password) => {
  const payload = { username, password };
  return axios.put(ROUTE_URL, payload)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err.response;
    })
};

export {
  login,
  register,
};
