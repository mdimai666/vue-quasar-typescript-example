<template>
  <div>
    <q-img
      class="absolute-top1"
      src="/statics/material-head.png"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div class="text-weight-bold">Razvan Stoenescu</div>
        <div>@rstoenescu</div>
      </div>
    </q-img>
    <q-list>
      <q-item-label header>MENU</q-item-label>

      <q-item to="/">
        <q-item-section avatar>
          <q-icon name="code" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Index</q-item-label>
          <!-- <q-item-label caption>quasar.dev</q-item-label> -->
        </q-item-section>
      </q-item>

      <q-item to="/jobs">
        <q-item-section avatar>
          <q-icon name="code" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Jobs</q-item-label>
          <q-item-label caption>list of job</q-item-label>
        </q-item-section>
      </q-item>

      <q-item to="/logs">
        <q-item-section avatar>
          <q-icon name="code" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Logs</q-item-label>
          <q-item-label caption>list of job</q-item-label>
        </q-item-section>
      </q-item>

      <q-item to="/itemeditor">
        <q-item-section avatar>
          <q-icon name="edit" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Item Editor</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <q-item-label header>Essential Links</q-item-label>
      <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
        <q-item-section avatar>
          <q-icon name="school" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Docs</q-item-label>
          <q-item-label caption>quasar.dev</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        tag="a"
        target="_blank"
        href="https://github.quasar.dev"
      >
        <q-item-section avatar>
          <q-icon name="code" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Github</q-item-label>
          <q-item-label caption>github.com/quasarframework</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script  lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Sidebar1 extends Vue {
  m() {
    let v = this.$api
  }
}

// export default Vue.extend({
//   name: 'Sidebar1',
//   data() {
//     return {}
//   }
// })
</script>
