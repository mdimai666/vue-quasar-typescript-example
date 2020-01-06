<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script  lang="ts">

// https://github.com/Xkonti/quasar-clean-typescript/tree/master/src - project ts sample

import Vue from 'vue';
import moment from 'moment';
import Component from 'vue-class-component';
import { clone } from './js/functions1';

moment.locale('ru');

window.clone = clone

declare global {
  interface Window {
    App: any;
    clone: (a: object) => object;
  }
}

@Component
export default class App extends Vue {
  created() {
    window.App = this
  }
}

// export default Vue.extend({
//   name: 'App',
//   created() {
//     window.App = this;
//   }
// });
</script>
