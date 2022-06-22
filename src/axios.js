import config from './config.js'
import axios from 'axios'

axios.defaults.baseURL = new config().url
axios.defaults.withCredentials = true
export default axios