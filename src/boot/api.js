import axios from 'axios'
import { fullUrl } from './../js/functions1'

export const instance = axios.create({
  // withCredentials: true,
});

instance.defaults.baseURL = 'http://192.168.0.6:5000/api/'; //(process.env.BACKEND.includes('//'))?process.env.BACKEND:'//'+process.env.BACKEND;

Object.defineProperty( instance, "BackendURL", {
  value: instance.defaults.baseURL,
  writable: false,
  enumerable: true,
  configurable: true
});

instance.fullUrl = function(relativeUrl) {
  return fullUrl(instance.defaults.baseURL, relativeUrl)
}

export default instance
