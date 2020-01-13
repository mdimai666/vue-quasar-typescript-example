<template>
  <q-page padding>
    <p></p>
    <h4 class="q-ma-sm text-primary">{{ filter_mode }} ({{ v_totalCount }})</h4>
    <p></p>
    <p></p>
    <div class="gt-xs">
      test btns
      <q-btn-group push>
        <q-btn push color="primary" label="Get" @click="api_get" />
        <q-btn push color="green" label="Add" @click="api_add" />
        <q-btn push color="orange" label="Clear" @click="items = []" />
      </q-btn-group>
    </div>
    <p></p>
    <q-separator />
    <p></p>
    <q-btn-group push>
      <q-btn push color="primary" label="Actual" @click="set_mode('actual')" />
      <q-btn push color="green" label="Link" @click="set_mode('linked')" />
      <q-btn push color="orange" label="Spam" @click="set_mode('spam')" />
      <q-btn push color="red" @click="set_mode('deleted')">
        <div class="gt-xs">Deleted</div>
        <div class="xs">del</div>
      </q-btn>
      <q-btn push label="All" @click="set_mode('all')" />
    </q-btn-group>
    <p></p>
    <q-separator />

    <p></p>

    <q-list bordered separator>
      <q-item
        v-for="item in items"
        :key="item.id"
        clickable
        v-ripple
        :class="['d-item', row_class(item)]"
      >
        <!-- :style="{ 'background-color': row_color(item) }" -->
        <q-item-label lines="1" class="absolute " style="left:10px;right:10px;">
          {{ item.author }}
          <span class="text-grey float-right"> #{{ item.id }} </span>
        </q-item-label>

        <q-item-section avatar @click.native="onItemClick(item)">
          <q-avatar>
            <img
              :src="get_src_gromImgHtml(item.screenshot)"
              placeholder-src="statics/app-logo-128x128.png"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section class="q-pt-lg">
          <!-- <q-item-label lines="1">
            #{{ item.id }} | {{ item.author }}
          </q-item-label> -->
          <q-item-label
            lines="1"
            class="text-caption text-primary"
            @click.native="onItemClick(item)"
          >
            {{ item.dt_insert | TimeSince }}
          </q-item-label>
          <q-item-label
            caption
            class="item-body text-black"
            lines="4"
            @click.native="onItemClick(item)"
          >
            {{ item.body }}
          </q-item-label>

          <!-- tools btns -->
          <div class="text-grey-8 q-gutter-sm text-right">
            <!-- more -->
            <q-btn
              color="grey-7"
              flat
              icon="more_vert"
              class="absolute"
              style="left:0px;"
            >
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section>Add User to Spamers</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Bookmark</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Unmark linked</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Share</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>

            <!-- spam -->
            <q-btn
              class="gt-xs1"
              label="spam"
              color="orange"
              flat
              dense
              icon="report_problem"
              @click="click_spam(item.id, item)"
            />

            <!-- delete -->
            <q-btn
              class="gt-xs1"
              label="del"
              flat
              dense
              icon="delete"
              color="red"
              @click="click_del(item.id, item)"
            />
          </div>
          <!-- //tools -->
        </q-item-section>

        <q-item-section side bottom class="hidden">
          <div class="text-grey-8 q-gutter-xs">
            <q-btn
              class="gt-xs1"
              size="12px"
              flat
              dense
              round
              icon="report_problem"
              @click="click_spam(item.id, item)"
            />

            <q-btn
              class="gt-xs1"
              size="12px"
              flat
              dense
              round
              icon="delete"
              color="red"
              @click="click_del(item.id, item)"
            />
            <q-btn
              class="gt-xs hidden"
              size="12px"
              flat
              dense
              round
              icon="done"
              @click="click_link(item.id, item)"
            />
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="more_vert"
              class="hidden"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="v_totalCount < 1">
      <div class="text-center">
        <h4 class="text-orange">
          No data
        </h4>
      </div>
    </div>

    <!-- pagination -->
    <div class="row">
      <div class="col q-pa-lg">
        <div class="row">
          <div class="col-10 offset-1">
            <div class=" flex flex-center">
              <q-pagination
                v-model="v_page"
                :max="v_totalPages"
                :max-pages="5"
                :boundary-links="true"
              />
            </div>
            <div class="text-center text-grey-7">
              {{ v_page }}/{{ v_totalPages }}
            </div>
          </div>
          <div class="col-1">
            <q-select
              dense
              borderless
              v-model="v_perpage"
              :options="c_perPageVariants"
              class="float-right"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- footer action -->

    <q-btn-group push>
      <q-btn
        color="red"
        label="Remove all"
        icon="delete"
        @click="do_removeAll"
      />
      <q-btn
        color="orange"
        label="Spam all"
        icon="report_problem"
        @click="do_spamAll"
      />
    </q-btn-group>
  </q-page>
</template>

<script  lang="ts">
import Vue from 'vue'

import { LocalStorage, openURL } from 'quasar'
import { trimSlash, clone } from '../js/functions1'
import Component from 'vue-class-component'
import { Watch, Provide } from 'vue-property-decorator'
import { JobItem } from '../models/JobItem'

@Component
// export default class LogsPage extends Vue implements Vue {
export default class LogsPage extends Vue {
  // export default Vue.extend({
  // name: 'PageApi',
  // data: () => ({
  items: JobItem[] = []
  controller: string = 'jobs'
  v_page: int = 1
  v_perpage: int = 15
  v_totalPages: int = 1
  v_totalCount: int = 1
  c_perPageVariants: int[] = [5, 10, 15, 25, 50]

  filter_mode: string = 'actual'
  // }),

  // watch: {
  //   v_perpage(n:int, o:int) {
  //     LocalStorage.set('v_perpage', n)
  //     this.api_get()
  //   },
  //   v_page(n, o) {
  //     this.api_get()
  //   },

  // }

  @Watch('v_page')
  onPageChanged(v: int, old: int) {
    LocalStorage.set('v_perpage', v)
  }

  @Watch('v_perpage')
  onPerPageChanged(v: int, old: int) {
    LocalStorage.set('v_perpage', v)
    this.api_get()
  }

  created() {
    console.log(123)

    this.v_perpage = LocalStorage.getItem('v_perpage') || 10

    this.api_get()
  }

  // openURL = (url) =  => openU,
  // methods: {

  async api_get() {
    let link = `${this.controller}/list?page=${this.v_page}&perpage=${
      this.v_perpage
      }${this.get_modeAsQueryString()}`
    console.log(link)
    let res = await this.$api.get(link)

    if (res.status == 200 && res.data) {
      let items = res.data.data
      console.log(res.data)

      this.items = clone(items)
      this.v_totalPages = res.data.totalPages
      this.v_totalCount = res.data.totalCount

      return this.items
    }

    return false
  }

  async api_add() {
    let item = {
      id: 666,
      body: 'body',
      author: 'mdimai666'
    }

    let res = await this.$api.post(this.controller, item)

    console.log(res)
  }

  async click_del__reallyDel(id: int) {
    let res = await this.$api.delete(`${this.controller}/${id}`)

    this.items = this.items.filter(s => s.id != id)

    console.log(res)
  }

  onItemClick(item: JobItem) {
    this.do_mark(item, 'm_link', true)
    openURL('https://m.vk.com/' + item.link)
  }

  async click_del(id: int, _item: JobItem) {
    await this.do_mark(_item, 'deleted', !_item.deleted)
  }
  async click_spam(id: int, _item: JobItem) {
    await this.do_mark(_item, 'm_spam', !_item.m_spam)
  }
  async click_link(id: int, _item: JobItem) {
    await this.do_mark(_item, 'm_link', !_item.m_link)
  }

  async do_mark(_item: JobItem, _propName: string, _val: any) {
    const id = _item.id

    if (!id) {
      throw new Error('ID required')
    }

    (_item as any)[_propName] = _val

    let patch = [
      // {op: 'replace', path: '/deleted', value: !_item.deleted},
      { op: 'replace', path: `/${_propName}`, value: _val }
    ]

    let res = await this.$api.patch(`${this.controller}/${id}`, patch)

    let index = this.items.findIndex(s => s.id != id)
    let item = res.data

    this.items[index] = clone(item)

    console.log('item', res.data)

    this.api_get()
  }

  async do_removeAll() {
    let a = await Promise.all([
      ...this.items.map(item => this.do_mark(item, 'deleted', true))
    ])
    this.api_get()
  }

  async do_spamAll() {
    let a = await Promise.all([
      ...this.items.map(item => this.do_mark(item, 'm_spam', true))
    ])
    this.api_get()
  }

  ///////////////////////////////////////

  // onPageSelect(page){
  //   console.log('page', page)
  // },

  set_mode(mode: string) {
    this.filter_mode = mode
    this.api_get()
  }

  get_modeAsQueryString() {
    let filter_mode = this.filter_mode
    function get_modeAsQueryString() {
      if (filter_mode == 'spam') return `m_spam=true&m_link=&deleted=false`
      else if (filter_mode == 'linked') return `m_spam=&m_link=true&deleted=`
      else if (filter_mode == 'deleted')
        return `m_spam=false&m_link=&deleted=true`
      else if (filter_mode == 'all') return `m_spam=&m_link=&deleted=`
      // if(filter_mode == 'actual')
      else return `m_spam=false&m_link=&deleted=false&dt_actual=true`
    }
    return `&${get_modeAsQueryString()}&`
  }

  get_src_gromImgHtml(imgHtml: string) {
    const def = 'statics/empty-photo.jpg'

    if (!imgHtml) return def
    // input = "<img src="https://sun1-18.userapi.com/c849416/v849416832/16382e/6-2supeqNd4.jpg?ava=1" class="wi_img _p128419803">"
    let reg = /src="(.*?)"/

    let match = imgHtml.match(reg)

    let v: string = match ? match[1] : ''

    if (v.indexOf('http') == -1) v = 'https://m.vk.com/' + trimSlash(v)

    return v ? v : def
  }

  ///////////////////////////////////////
  row_color(e: JobItem) {
    if (e.m_link) return '#a2d2ff'
    else if (e.deleted) return 'red'
    else if (e.m_spam) return 'orange'

    return 'unset'
  }

  row_class(e: JobItem) {
    if (e.m_spam) return `m_spam`
    else if (e.m_link) return `m_link`
    else if (e.deleted) return `m_del`
    else return ``
  }
}
</script>


<style lang="scss" scoped>
// darken,lighten

$color-spam: rgb(245, 220, 174);
$color-deleted: rgb(255, 176, 166);
$color-link: rgb(198, 228, 255);

@mixin stripped_bg($bg: gray, $bg2: white, $strip: red, $strip2: gray) {
  background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      $strip 10px,
      $strip2 20px
    ),
    linear-gradient(to bottom, $bg, $bg2);
}

@mixin strip_overlap($color) {
  $bg: lighten($color, 10%); //, lighten($color, 30%)
  @include stripped_bg(lighten($color, 20%), $color, $bg, $bg);
}

.d-item {
  &.m_link {
    @include strip_overlap(lighten($color-link, 5%));
    background-color: $color-link;
  }
  &.m_spam {
    // @include strip_overlap($color-spam);
    @include strip_overlap(lighten($color-spam, 5%));
    // background-color: $color-spam;
  }
  &.m_del {
    @include strip_overlap(lighten($color-deleted, 10%));
    // background-color: $color-deleted;
  }
}
</style>
