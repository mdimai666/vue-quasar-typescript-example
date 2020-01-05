import axios from 'axios'
import { fullUrl } from './../js/functions1'

export const instance = axios.create({
  // withCredentials: true,
});

// console.warn(process.env);

let backend = (process.env.BACKEND.includes('//')) ? process.env.BACKEND : '//' + process.env.BACKEND;
instance.defaults.baseURL = backend + '/api/';

Object.defineProperty(instance, "BackendURL", {
  value: instance.defaults.baseURL,
  writable: false,
  enumerable: true,
  configurable: true
});

instance.fullUrl = function (relativeUrl) {
  return fullUrl(instance.defaults.baseURL, relativeUrl)
}

export default instance
