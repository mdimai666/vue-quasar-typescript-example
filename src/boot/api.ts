import axios from 'axios'
import { fullUrl } from 'src/js/functions1'

const instance = axios.create({
  // withCredentials: true,
})

// console.warn(process.env);

let backend = process.env.BACKEND
let red = process.env.RED

if (backend)
  backend = backend.includes('//') ? backend : '//' + backend
if (red)
  red = red.includes('//') ? red : '//' + red

instance.defaults.baseURL = backend + '/api/'

Object.defineProperty(instance, "BackendURL", {
  value: instance.defaults.baseURL,
  writable: false,
  enumerable: true,
  configurable: true
})

Object.defineProperty(instance, "RedURL", {
  value: red,
  writable: false,
  enumerable: true,
  configurable: true
});

(instance as any).fullUrl = function (relativeUrl: string) {
  return fullUrl(instance.defaults.baseURL as string, relativeUrl)
}

declare module 'axios' {
  // 3. Объявите расширение для Vue
  interface AxiosInstance {
    BackendURL: string
    RedURL: string
    fullUrl: (urlPart: string) => string
  }
}

export default instance
