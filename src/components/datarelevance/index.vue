<template>
  <div>
    <el-input
      v-model="datatext"
      :placeholder="'请选择' + filedlist.headname + ''"
      :disabled="true"
      size="small"
      class="input-with-select"
      style="heigth:35px"
    ></el-input>
    <el-button
      type="primary"
      icon="el-icon-search"
      class="selectsearch"
      size="small"
      :disabled="disabled"
      @click="selectsearch"
    ></el-button>
    <zhlDialog
      :title="title"
      ref="selectDialog"
      :width="width"
      class="my-dialog"
    >
      <datalistselect
        :queryparam="querywhere"
        :apicode="gridapicode"
        ref="gridlist"
        @loadafter="gridlistloadafter"
        :scopedSlots="scopedSlots"
      >
        <div slot="operation" slot-scope="scope">
          <a
            class="margin-a"
            href="javascript:;"
            style="margin-right: 5px;"
            @click="selectRow(scope.row)"
            >选择</a
          >
        </div>
      </datalistselect>
    </zhlDialog>
  </div>
</template>
<script>
import { apiComm } from '@/api/index'
import datalistselect from './datalistselect.vue'
export default {
  name: 'datarelevance',
  props: [
    'filedlist',
    'dataid',
    'datalable',
    'apicode',
    'queryparam',
    'title',
    'datarow',
    'disabled',
    'dataqueryparam'
  ],
  data() {
    return {
      gridapicode: '',
      dataapicode: '',
      datatext: '',
      selectdata: {},
      scopedSlots: [],
      dataKey: '',
      querywhere: {},
      width: '1200px'
    }
  },
  components: { datalistselect },
  methods: {
    selectsearch() {
      if (this.$refs.gridlist !== undefined) {
        this.$refs.gridlist.loadwhereconfig()
      }
      this.$refs.selectDialog.visible = true
      this.querywhere =
        typeof this.queryparam === 'function'
          ? this.queryparam(this.datarow)
          : {}
    },
    selectRow(row) {
      this.dataKey = row.fid
      this.selectdata = row
      this.datatext = this.selectdata[this.filedlist.bindname]
      this.$emit(
        'update:dataid',
        this.dataKey === undefined ? this.datatext : this.dataKey
      )
      this.$emit('update:datalable', this.datatext)
      this.$emit('selected', this.selectdata, this.datarow)
      this.$emit('confirm', this.selectdata, this.datarow)
      // this.getdata()
      this.$refs.selectDialog.visible = false
    },
    getdata() {
      this.dataqueryparam =
        this.dataqueryparam === undefined
          ? { fid: this.dataKey }
          : this.dataqueryparam
      apiComm(this.gridapicode, this.dataqueryparam).then(res => {
        if (res.code === 0) {
          this.selectdata = res.data.list[0]
          this.datatext = this.selectdata[this.filedlist.bindname]
          // this.$emit('update:dataid', this.dataKey)
          // this.$emit('update:datalable', this.datatext)
          this.$emit('selected', this.selectdata, this.datarow, true)
          this.$emit('confirm', this.selectdata, this.datarow, true)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    gridlistloadafter() {
      // if (w > 960 && document.body.clientWidth > 960) {
      //   if (document.body.clientWidth > 13000) {
      //     this.width = '1500px'
      //   } else {
      //     this.width = '1200px'
      //   }
      // }
    }
  },
  created() {
    if (this.apicode !== '' && this.apicode !== undefined) {
      this.gridapicode = this.apicode
      this.dataapicode = this.apicode.split('.')[0] + '.getDataInfo'
      this.dataKey = this.dataid
      if (
        this.dataKey !== undefined &&
        this.dataKey !== '' &&
        this.dataKey !== null
      ) {
        this.getdata()
      }
    }
  },
  watch: {
    dataid(val) {
      if (this.dataKey !== val) {
        this.dataKey = val
        this.getdata()
      }
    },
    apicode(val) {
      if (this.gridapicode !== val) {
        this.gridapicode = val
        this.dataapicode = val.split('.')[0] + '.getDataInfo'
      }
    }
  }
}
</script>
<style scoped>
.input-with-select {
  width: calc(100% - 57px);
}
</style>
