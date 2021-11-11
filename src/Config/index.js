import axios from 'axios'

axios.defaults.headers.common['access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true


const API_URL = 'https://magicdex-server.herokuapp.com'
// const API_URL = 'http://localhost:5000'

const xs = 0
const sm = 600
const md = 900
const lg = 1200
const xl = 1536

const PER_PAGE = 25

const CONDITIONS = [
  'NM',
  'LP',
  'MP',
  'HP',
  'DAMAGED',
]




export {
  API_URL,
  CONDITIONS,
  xs,
  sm,
  md,
  lg,
  xl,
  PER_PAGE,
}