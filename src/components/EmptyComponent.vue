
<template>
  <q-dialog
    :value="value"
    @input="Input"
    :persistent="false"
    :maximized="$q.screen.gt.sm"
  >
    <q-card>
      {{value}}
  </q-dialog>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Model, Prop, Emit, Provide, Watch } from 'vue-property-decorator'
import { emit } from 'cluster'

@Component
export default class EmptyComponent extends Vue {

  @Model('change', { type: Boolean, default: false })
  readonly value!: boolean

  constructor() {
    super()
  }

  Input(val: bool) {
    this.$emit('change', val)
  }

}
</script>
