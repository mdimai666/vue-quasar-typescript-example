<template>
  <div>My component</div>
</template>

<script  lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component({})
export default class DItemEditor extends Vue {
  m(){
    let v = this.$api;
  }
}
</script>
