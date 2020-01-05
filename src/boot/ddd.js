// import something here

// "async" is optional

import path from 'path';

import Sidebar1 from '../components/Sidebar1';


export default async ({ app, router, Vue, /*... */ }) => {

  Vue.component('Sidebar1', Sidebar1);

}
