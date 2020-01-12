<template>
  <q-page padding>
    <h3 class="q-ma-none">{{ item.title || 'Title' }}</h3>

    <DItemEditor v-model="item" @submit="submit" dense debug />
  </q-page>
</template>

<script  lang="ts">
import Vue from 'vue';
import { openURL, LocalStorage, uid } from 'quasar';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { clone } from 'src/js/functions1';
import store, { StoreType } from '../store/index';
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import RootStore from '../store/RootStore';
import { QTableSetup } from 'src/models/QTableSetup';
import { TableColumn } from '../models/TableColumn';
import moment from 'moment';
import { LogItem } from 'src/models/LogItem';
import { GetIMetaFieldType } from 'src/class/QMeta';

@Component
export default class ItemEditorPage extends Vue {
  item: LogItem;

  constructor() {
    super();

    this.item = new LogItem({
    // this.item = ({
      id: 123,
      code: 123,
      source: 'source',
      title: 'Item Title',
      deleted: false,
      checked: false,
      body: 'BODY TEXT',
      json: '{}',
      dt_insert: new Date(2019, 11, 11),
      dt_checked: new Date(),
      screenshot: 'http://localhost:8080/img/quasar-logo-full.svg',
      uid: uid()
    });

    console.dir(LogItem);

    // console.warn(this.m_fields);
  }

  root = getModule(RootStore, this.$store);

  ////////////////////////////////////////

  submit() {
    // console.warn('123', item);
    console.warn('123', this.item);

  }

  ///////////////////////////////////////
}
</script>
