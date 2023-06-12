import axios from 'axios'

axios.defaults.headers.common['access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['access-Control-Allow-Credentials'] = true

const Config = {
  // MODIFY_DB_ALLOWED: false,
  MODIFY_DB_ALLOWED: true,

  API_URL: process.env.API_URL || 'http://localhost:5000',
  // API_URL: 'https://magicdex-server.herokuapp.com',
  // API_URL: 'http://localhost:5000',

  PER_PAGE: 25,
  CONDITIONS: [
    'NM',
    'LP',
    'MP',
    'HP',
    'DAMAGED',
  ],

  BREAKPOINTS: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
}

export default Config

export const {
  MODIFY_DB_ALLOWED,
  API_URL,
  CONDITIONS,
  BREAKPOINTS,
  PER_PAGE,
} = Config