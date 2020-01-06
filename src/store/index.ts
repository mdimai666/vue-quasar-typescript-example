import Vue from 'vue'
import * as Vuex from 'vuex'
import RootStore from './RootStore'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// export function d(/* { ssrContext } */) {
//   const Store = new Vuex.Store({
//     modules: {
//       // example
//     },

//     // enable strict mode (adds overhead!)
//     // for dev mode only
//     strict: process.env.DEV === 'true'
//   })

//   return Store
// }


export interface StoreType {
  root: RootStore
}

const store = new Vuex.Store<StoreType>({
  modules: {
    root: RootStore
  }
})

export default store