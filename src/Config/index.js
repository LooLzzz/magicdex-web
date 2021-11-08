import axios from 'axios'

const API_URL = 'https://magicdex-server.herokuapp.com'
// const API_URL = 'http://localhost:5000'

const CONDITIONS = [
  'NM',
  'LP',
  'MP',
  'HP',
  'DAMAGED',
]

const xs = 0
const sm = 600
const md = 900
const lg = 1200
const xl = 1536

axios.defaults.headers.common['access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true

export {
  API_URL,
  CONDITIONS,
  xs,
  sm,
  md,
  lg,
  xl,
}