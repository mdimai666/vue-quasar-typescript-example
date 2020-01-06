// import something here

// "async" is optional


import Sidebar1 from '../components/Sidebar1.vue';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default async ({ app, router, Vue, /*... */ }) => {

  Vue.component('Sidebar1', Sidebar1);

}
