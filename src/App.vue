<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

window.clone = a => a && JSON.parse(JSON.stringify(a));




export default {
  name: 'App',
  created(){
    window.App = this;
  }
}
</script>
