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

    <hr />

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

<script>
import { openURL, LocalStorage } from 'quasar'

const columns_sample = [ // array of Objects
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
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    // function return value:
    //   * is less than 0 then sort a to an index lower than b, i.e. a comes first
    //   * is 0 then leave a and b unchanged with respect to each other, but sorted with respect to all different elements
    //   * is greater than 0 then sort b to an index lower than a, i.e. b comes first

    // (optional) you can format the data with a function
    format: (val, row) => `${val}%`,
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
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const columns_logs = (() => [
  { name: 'id', label: 'ID', field: 'id', sortable: true, headerClasses: 'bg-primary1 text-white1' },
  { name: 'title', label: 'Title', field: 'title', sortable: true },
])();

export default {
  name: 'LogsName',
  data: () => ({
    items: [],
    controller: 'logs',
    v_page: 1,
    v_perpage: 15,
    v_totalPages: 1,
    v_totalCount: 1,
    c_perPageVariants: [5, 10, 15, 25, 50],

    filter_mode: 'actual',

    columns: columns_logs,
    data: [
      {
        id: 123,
        title: 'Title',
      },
      {
        id: 222,
        title: 'Title 2',
      }
    ],

    table: {
      loading: false,
      // 'rows-per-page-options': this.c_perPageVariants,
      pagination: {

      }
    }
  }),

  watch: {
    v_perpage(n, o) {
      LocalStorage.set('v_perpage', n);
      this.api_get();
    },
    v_page(n, o) {
      this.api_get();
    },

  },

  created() {
    console.log(123);

    this.v_perpage = LocalStorage.getItem('v_perpage') || 10;

    // this.api_get();
  },

  methods: {
    openURL,

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

    },



    /**
     * @param {ReqProp} req
     */
    async data_request(req) {
      clone()
    },

    async api_add() {
      let item = {
        id: 666,
        body: 'body',
        author: 'mdimai666',
      }

      let res = await this.$api.post(this.controller, item);

      await this.api_get();

      console.log(res);

    },

    async click_del__reallyDel(id) {
      let res = await this.$api.delete(`${this.controller}/${id}`);

      this.items = this.items.filter(s => s.id != id);

      console.log(res);
    },

    onItemClick(item) {
      // this.do_mark(item, 'm_link', true);
      // this.openURL('https://m.vk.com/' + item.link)
    },

    async click_del(id, _item) {
      await this.do_mark(_item, 'deleted', !_item.deleted);
    },
    async click_spam(id, _item) {
      await this.do_mark(_item, 'm_spam', !_item.m_spam);
    },
    async click_link(id, _item) {
      await this.do_mark(_item, 'm_link', !_item.m_link);
    },

    async do_mark(_item, _propName, _val) {

      const id = _item.id;

      if (!id) throw new Error("ID required");

      _item[_propName] = _val;

      let patch = [
        // {op: 'replace', path: '/deleted', value: !_item.deleted},
        { op: 'replace', path: `/${_propName}`, value: _val },
      ]

      let res = await this.$api.patch(`${this.controller}/${id}`, patch);

      let index = this.items.findIndex(s => s.id != id);
      let item = res.data;

      this.items[index] = clone(item);

      console.log('item', res.data);

      this.api_get();
    },

    ///////////////////////////////////////

  },

  computed: {

  },
}

</script>
