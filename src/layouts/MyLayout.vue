<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Jobs App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      overlay
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-2"
    >
      <Sidebar1 />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script  lang="ts">
// Vue
import Vue from 'vue'
import Component from 'vue-class-component'

// Store modules
import { getModule } from 'vuex-module-decorators'
import LayoutStoreModule from './LayoutStoreModule'

// @Component
// export default class MyLayout extends Vue {
//   leftDrawerOpen = false;
// }

@Component
export default class MyLayout extends Vue {
  store = getModule(LayoutStoreModule);

  get leftDrawerOpen() {
    return this.store.leftDrawerOpen
  }

  set leftDrawerOpen(value: boolean) {
    this.store.setLeftDrawerOpen(value)
  }
}

// export default Vue.extend({
//   name: 'MyLayout',

//   data () {
//     return {
//       leftDrawerOpen: false
//     }
//   }
// })
</script>
