// import something here

// "async" is optional


import Sidebar1 from 'src/components/Sidebar1.vue';
import DItemEditor from 'src/components/DItemEditor.vue'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default async ({ app, router, Vue, /*... */ }) => {

  Vue.component('Sidebar1', Sidebar1);
  Vue.component('DItemEditor', DItemEditor);

}

// interface Object {
//   isString(): bool
// }

// (Object.prototype as any).isString = function () {
//   return typeof this === 'string' || this instanceof String
// }