import api from './api'
import axios from 'axios'
import { AxiosInstance } from 'axios'

// "async" is optional
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default async ({ app, router, Vue /*, ... */ }) => {
  // something to do

  Vue.prototype.$api = api
  
}

// export default async ({ Vue }: { Vue: any }) => {
//   Vue.prototype.$api = api
// }

declare module 'vue/types/vue' {
  // 3. Объявите расширение для Vue
  interface Vue {
    $api: AxiosInstance
  }
}