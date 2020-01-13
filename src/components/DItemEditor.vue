<template>
  <q-banner class="bg-warning text-white q-ma-sm" v-if="errored || !model">
    Error: {{ error_message }}
  </q-banner>

  <q-form v-else @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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
    <div class="row">
      <div
        v-for="field in fields"
        :key="field.name"
        class="q-mb-md col-12 field"
        :class="['field--' + field.name]"
      >
        <template v-if="!field.hidden">
          <template v-if="!field.readonly">
            <!-- Number -->
            <q-input
              v-if="field.type.name === 'Number'"
              type="number"
              :dense="dense"
              outlined
              stack-label
              v-model="model[field.field]"
              :label="field.label || field.name"
              :hint="field.type.name"
            />

            <!-- Date -->
            <q-input
              v-else-if="field.type.name === 'Date'"
              :dense="dense"
              outlined
              stack-label
              v-model="model[field.field]"
              :label="field.label || field.name"
              :hint="field.type.name"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="model[field.field]"
                      mask="YYYY-MM-DD HH:mm"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="model[field.field]"
                      mask="YYYY-MM-DD HH:mm"
                      format24h
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <!-- Toggle bool -->
            <q-toggle
              v-else-if="field.type.name === 'Boolean'"
              :dense="dense"
              outlined
              stack-label
              v-model="model[field.field]"
              :label="field.label || field.name"
              :hint="field.type.name"
            />

            <!-- dropdown -->
            <q-select
              v-else-if="field.type.name === 'SDropdown'"
              :dense="dense"
              outlined
              stack-label
              v-model="model[field.field]"
              :label="field.label || field.name"
              :hint="field.type.name"
              :options="field.m_options"
            />

            <!-- Radio list -->
            <q-field
              v-else-if="field.type.name === 'SRadio'"
              :dense="dense"
              outlined
              borderless
              :label="field.label || field.name"
              :hint="field.type.name"
              stack-label
            >
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-radio
                    v-for="opt in field.m_options"
                    :key="opt.value"
                    v-model="model[field.field]"
                    :dense="dense"
                    :val="opt.value"
                    :label="opt.label"
                  />
                </div>

                <!-- <div class="q-px-sm">
                  Your selection is: <strong>{{ model[field.field] }}</strong>
                </div> -->
              </div>
            </q-field>

            <!-- Checkboxes -->
            <q-field
              v-else-if="field.type.name === 'SCheckboxes'"
              :dense="dense"
              outlined
              borderless
              :label="field.label || field.name"
              :hint="field.type.name"
              stack-label
            >
              <div class="q-pa-md">
                <div class="q-gutter-sm">
                  <q-checkbox
                    v-for="opt in field.m_options"
                    :key="opt.value"
                    v-model="model[field.field]"
                    :dense="dense"
                    :val="opt.value"
                    :label="opt.label"
                  />
                </div>

                <!-- <div class="q-px-sm">
                  Your selection is: <strong>{{ model[field.field] }}</strong>
                </div> -->
              </div>
            </q-field>

            <!-- Image -->
            <q-field
              v-else-if="field.type.name === 'Image'"
              :dense="dense"
              outlined
              borderless
              :label="field.label || field.name"
              :hint="field.type.name"
              stack-label
            >
              <q-img
                :src="model[field.field]"
                spinner-color="white"
                class="q-ma-sm"
                style="height: 140px; max-width: 150px"
              />
              <div>
                <q-btn outline label="Change" />
              </div>
            </q-field>

            <!-- Else string -->
            <q-input
              v-else
              :dense="dense"
              :type="field.m_istextarea ? 'textarea' : 'text'"
              outlined
              stack-label
              v-model="model[field.field]"
              :label="field.label || field.name"
              :hint="field.type.name"
              :readonly="field.readonly"
            />
          </template>

          <!-- ------------------------------------------------- -->
          <!-- ------------------------------------------------- -->
          <!-- ReadOnly -->
          <template v-if="field.readonly">
            <!-- date -->
            <q-field
              v-if="field.type.name === 'Date'"
              :dense="dense"
              class="q-mx-sm q-px-xs"
              borderless
              :label="field.label || field.name"
              stack-label
            >
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  {{ model[field.field] | moment('lll') }}
                </div>
              </template>
            </q-field>

            <!-- else -->
            <q-field
              v-else
              :dense="dense"
              class="q-mx-sm q-px-xs"
              borderless
              :label="field.label || field.name"
              stack-label
            >
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  {{ model[field.field] }}
                </div>
              </template>
            </q-field>
          </template>
        </template>
      </div>
    </div>
    <div class="text-right" v-if="showsubmit">
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      <q-btn label="Submit" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script  lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch, Prop, Model, Emit, PropSync } from 'vue-property-decorator'
import { TableColumn } from 'src/models/TableColumn'
import { clone } from 'src/js/functions1'
import { GetIMetaFieldType } from 'src/class/QMeta'

@Component
export default class DItemEditor extends Vue {
  @Model('change', { required: true })
  readonly model: any | undefined

  @Prop({ default: false })
  readonly dense: bool | string | any

  @Prop({ default: false })
  readonly debug: bool | string | any

  @Prop({ default: true })
  readonly showsubmit: bool | string | any

  private type: Type

  m_fields: TableColumn<unknown>[]

  public errored: bool = false
  error_message: string = ''

  constructor() {
    super()
    this.m_fields = []

    let isValid =
      this.model.constructor && this.model.constructor.name == 'Object'

    if (isValid) {
      this.errored = true
      // throw new Error('Model must me Class Instance')
      this.error_message = 'Model must be Class Instance'
      console.error(this.error_message)
    }

    this.type = this.model.constructor

    let T = this.type

    let instance = new (T as any)()
    let fields: string[] = Object.keys(instance)

    for (let field of fields) {
      // let index = this.columns.findIndex(s => s.field == field)

      // let f = (instance as any)[field]
      // console.warn('T.' + field, GetTypeName(f))
      // let typeName: string = GetTypeName(f)
      // let fieldType: Type = ThisType<f>

      let qmetaType: Function | null = GetIMetaFieldType(T, field)
      // console.warn('qmeta-' + field, qmetaType)
      // console.warn('as',qmeta.mapFieldTypeList.get(field))
      let constcr: Function = qmetaType ? qmetaType : String
      let col = new TableColumn<any>(constcr as any, field, field, field, T)

      this.m_fields.push(col)
    }
  }

  get fields(): TableColumn<unknown>[] {
    return this.m_fields ? this.m_fields : []
  }

  onReset() { }

  @Emit('submit')
  onSubmit() {
    // if (this.model) {
    //   console.warn(clone(this.model))
    // }
  }
}
</script>
