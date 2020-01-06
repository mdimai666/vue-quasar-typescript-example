import axios from 'axios'
import { fullUrl } from './../js/functions1'

export const instance = axios.create({
  // withCredentials: true,
});

// console.warn(process.env);

let backend = process.env.BACKEND

if (backend)
  backend = backend.includes('//') ? process.env.BACKEND : '//' + process.env.BACKEND;

instance.defaults.baseURL = backend + '/api/';

Object.defineProperty(instance, "BackendURL", {
  value: instance.defaults.baseURL,
  writable: false,
  enumerable: true,
  configurable: true
});

(instance as any).fullUrl = function (relativeUrl: string) {
  return fullUrl(instance.defaults.baseURL as string, relativeUrl)
}

export default instance
