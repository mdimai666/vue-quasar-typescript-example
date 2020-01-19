
<template>
  <!-- v-model="m_value" -->
  <q-dialog
    :value="value"
    @input="Input"
    :persistent="false"
    :maximized="$q.screen.lt.sm"
  >
    <q-card>
      <q-toolbar>
        <q-avatar>
          <!-- <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" /> -->
          <q-icon name="search" />
        </q-avatar>

        <q-toolbar-title>
          Search job
        </q-toolbar-title>

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-separator />

      <q-card-section class="">
        <!-- BODY -->

        <q-input square outlined v-model="searchText" label="Search text" />

        <p class="q-ma-4"></p>

        <q-list dense>
          <q-item
            v-for="(str, i) in proposedList"
            :key="i"
            clickable
            v-ripple
            @click="ClickPreposed(str)"
          >
            <q-item-section>{{ i + 1 }}. {{ str }}</q-item-section>
          </q-item>
        </q-list>

        <!-- //BODY -->
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" flat v-close-popup />
        <q-btn
          :disable="searchText.length < 2"
          label="Submit"
          color="primary"
          @click="Submit()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Model, Prop, Emit, Provide, Watch } from 'vue-property-decorator'

@Component
export default class DialogSearchJob extends Vue {

  @Model('change', { type: Boolean, default: false })
  readonly value!: boolean

  public searchText: string = ''

  proposedList: string[] = [
    'нужен программист',
    'ищу программиста',
    'программист php',
  ]

  constructor() {
    super()
    
  }

  Input(val: bool) {
    this.$emit('change', val)
  }

  // @Emit('submit')
  Submit() {
    this.$emit('submit', this.searchText)
    this.Input(false)
  }

  ClickPreposed(str: string) {
    this.searchText = str
    this.Submit()
  }

}
</script>
