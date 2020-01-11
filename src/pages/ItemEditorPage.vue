<template>
  <q-page padding>
    <h3>{{ item.title || 'Title' }}</h3>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <!-- <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        :rules="[
          val => (val !== null && val !== '') || 'Please type your age',
          val => (val > 0 && val < 100) || 'Please type a real age'
        ]"
      /> -->
      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
      <div class="content">
        <div v-for="field in fields" :key="field.name" class="q-mb-sm">
          <q-input
            v-if="!field.readonly"
            dense
            outlined
            stack-label
            v-model="item[field.field]"
            :label="field.label || field.name"
            :hint="field.type.name"
            :readonly="field.readonly"
          />
          <q-field
            dense
            class="q-mx-sm q-px-xs"
            borderless
            v-if="field.readonly"
            :label="field.label || field.name"
            stack-label
          >
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ item[field.field] }}
              </div>
            </template>
          </q-field>
        </div>
      </div>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
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
import LogItem, {
  IMeta,
  GetIMeta,
  GetIMetaFieldType
} from 'src/models/LogItem';
import { QTableSetup } from 'src/models/QTableSetup';
import { TableColumn } from '../models/TableColumn';
import moment from 'moment';

@Component
export default class ItemEditorPage extends Vue {
  item: LogItem;

  m_fields: TableColumn<unknown>[];

  constructor() {
    super();
    console.log(123);

    this.item = new LogItem({
      id: 123,
      code: 123,
      source: 'source',
      title: 'Item Title',
      deleted: false,
      checked: false,
      body: 'BODY TEXT',
      json: '{}',
      dt_insert: new Date(),
      // dt_checked: null,
      uid: uid()
    });

    {
      this.m_fields = [];

      let instance = new LogItem();
      let fields: string[] = Object.keys(instance);

      for (let field of fields) {
        // let index = this.columns.findIndex(s => s.field == field);

        // let f = (instance as any)[field]
        // console.warn('T.' + field, GetTypeName(f))
        // let typeName: string = GetTypeName(f)
        // let fieldType: Type = ThisType<f>;

        let qmetaType: Function | null = GetIMetaFieldType(LogItem, field);

        // console.warn('qmeta-' + field, qmetaType);

        // console.warn('as',qmeta.mapFieldTypeList.get(field));

        let constcr: Function = qmetaType ? qmetaType : String;

        let col = new TableColumn<any>(constcr as any, field);

        this.m_fields.push(col);
      }
    }
    console.dir(LogItem);

    // console.warn(this.m_fields);
  }

  root = getModule(RootStore, this.$store);

  ////////////////////////////////////////

  get fields(): TableColumn<unknown>[] {
    return this.m_fields ? this.m_fields : [];
  }

  onReset() {}
  onSubmit() {}

  ///////////////////////////////////////
}
</script>
