<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

import moment from 'moment'

moment.locale('ru')

window.clone = a => a && JSON.parse(JSON.stringify(a));



export default {
  name: 'App',
  created(){
    window.App = this;
  }
}
</script>
