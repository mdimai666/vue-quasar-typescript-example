import api from './api'
import axios from 'axios'

// "async" is optional
export default async ({ app, router, Vue /*, ... */ }) => {
  // something to do

  Vue.prototype.$api = api
  
}
