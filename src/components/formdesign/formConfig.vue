<template>
  <div>
    <div v-for="(item,key)  in data" v-bind:key="key">
      <template v-if="helpertitle[key]!==undefined">
        <template v-if="helpertype[key]==='layoutitemlist'">
          <Layoutitemlist
            :title="helpertitle[key]"
            :content="helpercontent[key]"
            :datalist="data[key]"
          />
        </template>
        <template v-else-if="helpertype[key]==='layerlist'">
          <layerlist :title="helpertitle[key]" :content="helpercontent[key]" :datalist="data[key]" />
        </template>
        <template v-else-if="helpertype[key]==='select'">
          <propertyitem :title="helpertitle[key]" :content="helpercontent[key]">
            <el-select v-model="data[key]" style="width: 100%;" size="mini">
              <el-option
                v-for="optionitem in helperdatalist[key]"
                v-bind:key="optionitem.value"
                :value="optionitem.value"
                :label="optionitem.label"
              ></el-option>
            </el-select>
          </propertyitem>
        </template>
        <template v-else-if="helpertype[key]==='number'">
          <propertyitem :title="helpertitle[key]" :content="helpercontent[key]">
            <el-input-number v-model="data[key]"></el-input-number>
          </propertyitem>
        </template>
        <template v-else-if="helpertype[key]==='switch'">
          <propertyitem :title="helpertitle[key]" :content="helpercontent[key]">
            <a-switch size="small" v-model="data[key]" />
          </propertyitem>
        </template>
        <template v-else>
          <propertyitem :title="helpertitle[key]" :content="helpercontent[key]">
            <el-input type="text" v-model="data[key]" />
          </propertyitem>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import { helper } from '@/components/formdesign/propertyhelpConfig.js'
import propertyitem from '@/components/formdesign/propertyitem.vue'
import Layoutitemlist from '@/components/formdesign/Layoutitemlist.vue'
import layerlist from '@/components/formdesign/layerlist.vue'
export default {
  props: ['data', 'select', 'editcontroltype'],
  data() {
    return {
      helperdata: helper,
      helpertitle: null,
      helpercontent: null,
      helpertype: null,
      helperdatalist: null,
      selectWidget: this.select
    }
  },
  components: {
    propertyitem,
    Layoutitemlist,
    layerlist
  },
  methods: {
    layerPlaneshowDialog(data) {
      this.$emit('update:select', data)
      this.$emit('update:dialogData', data)
      this.$emit('update:editcontroltype', 1)
      this.selectWidget = data
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
<style scoped>
.propertyborder-title {
  height: 42px;
  line-height: 42px;
  padding-left: 3px;
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
}

.propertyborder-content {
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
  padding-right: 3px;
  padding-left: 3px;
  padding-top: 4px;
  padding-bottom: 4px;
  height: 42px;
}
</style>
