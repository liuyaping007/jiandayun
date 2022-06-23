<template>
  <div v-if="data !== null">
    <div v-for="(item, key) in data.options" v-bind:key="key">
      <template v-if="helpertitle[key] !== undefined">
        <template v-if="helpertype[key] === 'selectoptionlist'">
          <optionlist
            :title="helpertitle[key]"
            :content="helpercontent[key]"
            :datalist="data.options.options"
            :defaultValue="data.options.defaultValue"
          />
        </template>
        <template v-else-if="helpertype[key] === 'panelist'">
          <panelist
            :title="helpertitle[key]"
            :content="helpercontent[key]"
            :datalist="data.options.panelist"
          />
        </template>
        <template v-else-if="helpertype[key] === 'dynamiclist'">
          <dynamiclist
            :title="helpertitle[key]"
            :content="helpercontent[key]"
            :datalist="data.options.dynamiclist"
          />
        </template>
        <template v-else-if="helpertype[key] === 'layoutitemlist'">
          <Layoutitemlist
            :title="helpertitle[key]"
            :content="helpercontent[key]"
            :datalist="data.options.layoutitemlist"
          />
        </template>
        <template
          v-else-if="
            helpertype[key] === 'columnslist' && data.type === 'wmpDetail'
          "
        >
          <columnslist
            :title="helpertitle[key]"
            :content="helpercontent[key]"
            :datalist="data.options.columns"
          />
        </template>
        <template v-else-if="helpertype[key] === 'columnslist'">
          <gridcolumns
            :title="helpertitle[key]"
            :content="helpercontent[key]"
            :datalist="data.options.columns"
            :widgetdata="data"
          />
        </template>
        <template v-else-if="helpertype[key] === 'select'">
          <propertyitem :title="helpertitle[key]" :content="helpercontent[key]">
            <el-select
              v-model="data.options[key]"
              style="width: 100%;"
              size="mini"
            >
              <el-option
                v-for="optionitem in helperdatalist[key]"
                v-bind:key="optionitem.value"
                :value="optionitem.value"
                :label="optionitem.label"
              ></el-option>
            </el-select>
          </propertyitem>
        </template>
        <template v-else-if="helpertype[key] === 'icon'">
          <propertyitem :title="helpertitle[key]" :content="helpercontent[key]">
            <iconedit :value.sync="data.options[key]"></iconedit>
          </propertyitem>
        </template>
        <template v-else-if="helpertype[key] === 'number'">
          <propertyitem :title="helpertitle[key]" :content="helpercontent[key]">
            <el-input-number v-model="data.options[key]"></el-input-number>
          </propertyitem>
        </template>
        <template v-else-if="helpertype[key] === 'switch'">
          <propertyitem :title="helpertitle[key]" :content="helpercontent[key]">
            <a-switch size="small" v-model="data.options[key]" />
          </propertyitem>
        </template>
        <template v-else-if="helpertype[key] === 'selectApi'">
          <propertyitem :title="helpertitle[key]" :content="helpercontent[key]">
            <selectapi
              :apicode="data.options[key]"
              methodType="1"
              :optionsitem="data.options"
            />
          </propertyitem>
        </template>
        <template v-else-if="helpertype[key] === 'buttonlist'">
          <buttonlist
            :title="helpertitle[key]"
            :content="helpercontent[key]"
            :datalist="data.options.buttons"
          />
        </template>
        <template v-else>
          <propertyitem :title="helpertitle[key]" :content="helpercontent[key]">
            <el-input type="text" v-model="data.options[key]" />
          </propertyitem>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import { helper } from '@/components/formdesign/propertyhelpConfig.js'
import propertyitem from '@/components/formdesign/propertyitem.vue'
import buttonlist from '@/components/formdesign/buttonlist.vue'
import optionlist from '@/components/formdesign/optionlist.vue'
import columnslist from '@/components/formdesign/columnslist.vue'
import Layoutitemlist from '@/components/formdesign/Layoutitemlist.vue'
import gridcolumns from '@/components/formdesign/gridcolumnslist.vue'
import panelist from '@/components/formdesign/panelist.vue'
import dynamiclist from '@/components/formdesign/dynamiclist.vue'
import selectapi from '@/components/formdesign/selectapi.vue'
import iconedit from '@/components/formdesign/iconedit.vue'
export default {
  props: ['data', 'select'],
  data() {
    return {
      helperdata: helper,
      helpertitle: null,
      helpercontent: null,
      helpertype: null,
      helperdatalist: null
    }
  },
  components: {
    propertyitem,
    buttonlist,
    optionlist,
    columnslist,
    Layoutitemlist,
    gridcolumns,
    panelist,
    dynamiclist,
    selectapi,
    iconedit
  },
  methods: {
    layerPlaneshowDialog(data) {
      this.$emit('update:select', {})
      this.$emit('update:currentcontroldata', data)
      this.$emit('update:basecontroldata', this.data)
      this.$emit('update:editcontroltype', 2)
      this.selectWidget = data
    },
    buttonEdit(data) {
      this.data = data
      this.selectWidget = data
      this.$emit('update:select', data)
    }
  },
  created() {
    this.helpertitle = {}
    this.helpercontent = {}
    this.helpertype = {}
    this.helperdatalist = {}
    for (const key in this.helperdata) {
      this.helpertitle[key] = this.helperdata[key].title
      this.helpercontent[key] = this.helperdata[key].content
      if (this.helperdata[key].type !== undefined) {
        this.helpertype[key] = this.helperdata[key].type
      }
      if (this.helperdata[key].data !== undefined) {
        this.helperdatalist[key] = this.helperdata[key].data
      }
    }
  }
}
</script>
