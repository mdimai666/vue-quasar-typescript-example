import { Notify } from 'quasar'


export function NotifyError(err: any) {
  Notify.create({
    message: err.message || err,
    color: 'negative',
    textColor: 'white'
  })
}

export function NotifySuccess(message: string) {
  Notify.create({
    message: message,
    color: 'primary',
    textColor: 'white'
  })
}

// "async" is optional
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default async ({ app, router, Vue /*, ... */ }) => {
  // something to do

  Vue.prototype.$q.notifyError = NotifyError

  Vue.prototype.$q.notifySuccess = NotifySuccess

}

// import { QVueGlobals } from "quasar/dist/types/globals"
declare module "quasar/dist/types/globals" {
  export interface QVueGlobals {
    /**
     * Custom prepared function
     * @param err Exception os string
     */
    notifyError(err: { message: string } | string): void
    notifySuccess(message: string): void
  }
}