<template>
  <q-page padding>
    <div class="gt-xs">
      test btns
      <q-btn-group push>
        <q-btn push color="primary" label="Get" @click="api_get" />
        <q-btn push color="green" label="Add" @click="api_add" />
        <q-btn push color="orange" label="Clear" @click="items = []" />
      </q-btn-group>
    </div>

    <p></p>
    <q-separator spaced="" />
    <p></p>

    <q-btn push size="lg" label="Dialog" @click="dd()" />

    <p>
      count1 = <b>{{ count1 }}</b>
    </p>

    <p></p>
    <q-separator spaced="" />
    <p></p>

    <!-- :pagination="table.pagination" -->
    <!-- :rows-per-page-options="table.rows-per-page-options" -->
    <div class="q-pa-md">
      <q-table
        dense
        title="Table Logs"
        :data="items"
        :columns="columns"
        :rows-per-page-options="c_perPageVariants"
        :loading="table.loading"
        row-key="id"
      />
    </div>
  </q-page>
</template>

<script  lang="ts">
import Vue from 'vue';
import { openURL, LocalStorage } from 'quasar';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { clone } from 'src/js/functions1';
import store, { StoreType } from '../store/index';
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import RootStore from '../store/RootStore';
import LogItem from 'src/models/LogItem';
import { QTableSetup } from 'src/models/QTableSetup';
import { TableColumn } from '../models/TableColumn';

const columns_sample = [
  // array of Objects
  // column Object definition
  {
    // unique id
    // identifies column
    // (used by pagination.sortBy, "body-cell-[name]" slot, ...)
    name: 'desc',

    // label for header
    label: 'Dessert (100g serving)',

    // row Object property to determine value for this column
    field: 'name',
    // OR field: row => row.some.nested.prop

    // (optional) if we use visible-columns, this col will always be visible
    required: true,

    // (optional) alignment
    align: 'left',

    // (optional) tell QTable you want this column sortable
    sortable: true,

    // (optional) compare function if you have
    // some custom data or want a specific way to compare two rows
    sort: (a: any, b: any, rowA: any, rowB: any) =>
      parseInt(a, 10) - parseInt(b, 10),
    // function return value:
    //   * is less than 0 then sort a to an index lower than b, i.e. a comes first
    //   * is 0 then leave a and b unchanged with respect to each other, but sorted with respect to all different elements
    //   * is greater than 0 then sort b to an index lower than a, i.e. b comes first

    // (optional) you can format the data with a function
    format: (val: any, row: any) => `${val}%`,
    // one more format example:
    // format: val => val
    //   ? /* Unicode checkmark checked */ "\u2611"
    //   : /* Unicode checkmark unchecked */ "\u2610",

    // body td:
    style: 'width: 500px',
    classes: 'my-special-class',

    // (v1.3.0+) header th:
    headerStyle: 'width: 500px',
    headerClasses: 'my-special-class'
  },
  { name: 'calories', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' }
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
];

let columns_logs: TableColumn<LogItem>[];
// let columns_logs: TableColumns<LogItem> = [
//   {
//     name: 'id',
//     label: 'ID',
//     field: 'id',
//     sortable: true,
//     headerClasses: 'bg-primary1 text-white1'
//   },
//   { name: 'title', label: 'Title', field: 'title', sortable: true }
// ];

const table = new QTableSetup<LogItem>(LogItem, {
  // includeColumns: /(?!=title)/,
  // includeColumns: /(dt_)/,
  // includeColumns: 'id',
  excludeColumns: 'code,json,source,code,screenshot,uid'
});

columns_logs = table.Columns();

// export default Vue.extend({

@Component
export default class LogsPage extends Vue {
  // name: 'LogsName',
  // data: () => ({
  items: LogItem[] = [];
  controller: string = 'logs';
  v_page: int = 1;
  v_perpage: int = 15;
  v_totalPages: int = 1;
  v_totalCount: int = 1;
  c_perPageVariants: int[] = [5, 10, 15, 25, 50];

  filter_mode: string = 'actual';

  columns: any = columns_logs;
  data: any = [
    {
      id: 123,
      title: 'Title'
    },
    {
      id: 222,
      title: 'Title 2'
    }
  ];

  table = {
    loading: false
  };

  root = getModule(RootStore, this.$store);

  c_counter = this.root.get1;

  openURL = openURL;

  // }),

  @Watch('v_page')
  onPageChanged(v: int, old: int) {
    LocalStorage.set('v_perpage', v);
  }

  @Watch('v_perpage')
  onPerPageChanged(v: int, old: int) {
    LocalStorage.set('v_perpage', v);
    this.api_get();
  }

  created() {

    this.v_perpage = LocalStorage.getItem('v_perpage') || 10;

    // this.api_get();
  }

  async dd() {
    await this.root.Act1();
  }

  get count1() {
    return this.$store.state.root.count;
  }

  // methods: {
  // openURL,

  async api_get() {
    let link = `${this.controller}/list?page=${this.v_page}&perpage=${this.v_perpage}`;
    console.log(link);
    let res = await this.$api.get(link);

    if (res.status == 200 && res.data) {
      let items = res.data.data;
      console.log(res.data);

      this.items = clone(items);
      this.v_totalPages = res.data.totalPages;
      this.v_totalCount = res.data.totalCount;

      return this.items;
    }

    return false;
  }

  async data_request(req: any) {
    // clone()
  }

  async api_add() {
    let item = {
      id: 666,
      body: 'body',
      author: 'mdimai666'
    };

    let res = await this.$api.post(this.controller, item);

    await this.api_get();

    console.log(res);
  }

  async click_del__reallyDel(id: int) {
    let res = await this.$api.delete(`${this.controller}/${id}`);

    this.items = this.items.filter(s => s.id != id);

    console.log(res);
  }

  onItemClick(item: LogItem) {
    // this.do_mark(item, 'm_link', true);
    // this.openURL('https://m.vk.com/' + item.link)
  }

  // async click_del(id: int, _item: LogItem) {
  //   await this.do_mark(_item, 'deleted', !_item.deleted);
  // }
  // async click_spam(id: int, _item: LogItem) {
  //   await this.do_mark(_item, 'm_spam', !_item.m_spam);
  // }
  // async click_link(id: int, _item: LogItem) {
  //   await this.do_mark(_item, 'm_link', !_item.m_link);
  // }

  async do_mark(_item: LogItem, _propName: string, _val: any) {
    const id = _item.id;

    if (!id) throw new Error('ID required');

    (_item as any)[_propName] = _val;

    let patch = [
      // {op: 'replace', path: '/deleted', value: !_item.deleted},
      { op: 'replace', path: `/${_propName}`, value: _val }
    ];

    let res = await this.$api.patch(`${this.controller}/${id}`, patch);

    let index = this.items.findIndex(s => s.id != id);
    let item = res.data;

    this.items[index] = clone(item);

    console.log('item', res.data);

    this.api_get();
  }

  ///////////////////////////////////////
}
</script>
