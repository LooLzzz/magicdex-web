import axios from "axios";

const API_URL = 'https://magicdex-server.herokuapp.com';
// const API_URL = 'http://localhost:5000';

axios.defaults.headers.common['access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;

export {
    API_URL,
};