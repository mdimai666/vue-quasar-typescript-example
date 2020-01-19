<template>
  <q-page padding>
    <q-toolbar class="text-primary">
      <q-toolbar-title>
        List of Jobs
      </q-toolbar-title>
      <div class="q-block-inline q-gutter-sm">
        <q-btn
          push
          round
          dense
          size="lg"
          icon="refresh"
          @click="UserRefreshParser()"
        />
        <q-btn
          push
          round
          dense
          size="lg"
          icon="search"
          @click="OpenSearchDialog()"
        />
      </div>
    </q-toolbar>

    <p></p>
    <h4 class="q-ma-sm text-primary">{{ getTitle }}</h4>
    <p></p>

    <p></p>
    <q-btn-group flat spread>
      <q-btn
        color="primary"
        label="Actual"
        @click="set_mode(EJobsKind.actual)"
      />
      <q-btn color="green" label="Link" @click="set_mode(EJobsKind.linked)" />
      <q-btn color="orange" label="Spam" @click="set_mode(EJobsKind.spam)" />
      <q-btn color="red" @click="set_mode(EJobsKind.deleted)">
        <div class="gt-xs">Deleted</div>
        <div class="xs">del</div>
      </q-btn>
      <q-btn
        color="grey-4"
        class="text-black"
        label="All"
        @click="set_mode(EJobsKind.all)"
      />
    </q-btn-group>
    <p></p>
    <q-separator />

    <p></p>

    <!-- :bordered="!$q.screen.lt.sm" -->
    <q-list separator>
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
              :src="get_src_fromImgHtml(item.screenshot)"
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

            <!-- copy -->
            <q-btn
              class="gt-xs1"
              flat
              dense
              icon="file_copy"
              @click="click_copy(item)"
            >
              <span class="gt-sm">Copy</span>
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

    <q-btn-group flat>
      <q-btn color="red" icon="delete" @click="do_removeAll">
        <div class="gt-xs">
          Remove
        </div>
        all
      </q-btn>
      <q-btn color="orange" icon="report_problem" @click="do_spamAll">
        <span class="gt-xs">Spam</span>
        all
      </q-btn>
    </q-btn-group>

    <!-- Dialog search -->
    <DialogSearchJob v-model="dialogSearch" @submit="OnSearchSubmit" />
  </q-page>
</template>

<script  lang="ts">
import Vue from 'vue'

import { LocalStorage, openURL, copyToClipboard } from 'quasar'
import { trimSlash, clone } from '../js/functions1'
import Component from 'vue-class-component'
import { Watch, Provide } from 'vue-property-decorator'
import { JobItem } from '../models/JobItem'
import { EJobsKind } from '../controllers/JobsController'
import { IQBackend_ListRequestParam } from 'src/controllers/QController'
import DialogSearchJob from 'src/components/DialogSearchJob.vue'

@Component({
  components: { DialogSearchJob }
})
export default class LogsPage extends Vue {
  items: JobItem[] = []
  controller: string = 'jobs'
  v_page: int = 1
  v_perpage: int = 15
  v_totalPages: int = 1
  v_totalCount: int = 1
  c_perPageVariants: int[] = [5, 10, 15, 25, 50]

  filter_mode: string = 'actual'

  dialogSearch: bool = false

  jobKind: EJobsKind = EJobsKind.actual

  EJobsKind = EJobsKind

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
    this.Update()
  }

  created() {

    this.v_perpage = LocalStorage.getItem('v_perpage') || 10

    let q_jobKind: string = this.$route.query['jobKind'] as string
    if (q_jobKind)
      this.jobKind = (EJobsKind as any)[q_jobKind]

    this.Update()
  }

  openURL = openURL
  copyToClipboard = copyToClipboard

  get getTitle(): string {
    // return `${this.filter_mode} (${this.v_totalCount})`
    return `${EJobsKind[this.jobKind]} (${this.v_totalCount})`
  }

  async Update(): Promise<void> {
    try {

      let param: IQBackend_ListRequestParam = {
        page: this.v_page,
        perpage: this.v_perpage,
        sort: undefined,
        desc: true,
      }

      let res = await this.$backend.jobs.list2(param, this.jobKind)

      if (res) {

        this.items = res.data
        this.v_totalPages = res.totalPages
        this.v_totalCount = res.totalCount

      }

    } catch (err) {
      this.$q.notifyError(err)
    } finally {

    }
  }

  async UserRefreshParser() {
    await JobItem.ParserUpdateAsync()
  }

  OpenSearchDialog() {
    this.dialogSearch = true
  }

  OnSearchSubmit(text: string) {
    JobItem.ParserSearch(text)
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

  click_copy(item: JobItem) {
    this.copyToClipboard(item.body)
    this.$q.notify('copied')

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

    this.Update()
  }

  async do_removeAll() {
    let a = await Promise.all([
      ...this.items.map(item => this.do_mark(item, 'deleted', true))
    ])
    this.Update()
  }

  async do_spamAll() {
    let a = await Promise.all([
      ...this.items.map(item => this.do_mark(item, 'm_spam', true))
    ])
    this.Update()
  }

  ///////////////////////////////////////

  // onPageSelect(page){
  //   console.log('page', page)
  // },

  set_mode(mode: EJobsKind) {
    this.jobKind = mode
    this.$router.replace('/jobs/?jobKind=' + EJobsKind[this.jobKind])
    this.Update()
  }

  get_src_fromImgHtml(imgHtml: string) {
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
