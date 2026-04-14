<template>
  <div class="gridlist">
    <div class="celno">
      <div class="head">序号</div>
      <div class="content">1</div>
    </div>
    <div class="divcontainer">
      <draggable
        class="widget-form-list"
        id="widgetlist"
        v-model="element.options.columns"
        v-bind="{
          group: { name: 'basectrl', pull: false },
          ghostClass: 'ghost',
          animation: 150,
        }"
        @add="handleWidgetAdd"
      >
        <gridcel
          v-for="el in element.options.columns"
          :key="el.model"
          :title="el.options.title"
          :labelwidth="el.options.labelwidth"
          :element="el"
          @copyctrl="copyctrl"
          @deletectrl="deletectrl"
        >
          <gridcelcotrl :element="el"></gridcelcotrl>
        </gridcel>
      </draggable>
    </div>
  </div>
</template>
<script>
import basefrom from './basefrom.vue'
import gridcel from './gridcel.vue'
import draggable from 'vuedraggable'
import { getnewid } from '../formcomm.js'
import store from '@/store'
// import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  props: ['element'],
  data() {
    return { forminfo: this.changeFromInfo() }
  },
  created() {
    // document.getElementById('widgetlist').addEventListener('resize', () => {
    //   if (
    //     _this.w !== document.getElementById('widgetlist').clientWidth &&
    //     _this.h !== document.getElementById('widgetlist').clientHeight
    //   ) {
    //     _this.isrowtable = true
    //   } else {
    //     _this.isrowtable = false
    //   }
    // })
  },
  mounted() {},
  computed: {
    SetChangeFromInfo() {
      return this.changeFromInfo()
    },
  },
  watch: {
    SetChangeFromInfo(val) {
      this.forminfo = val
    },
  },
  components: { gridcel, basefrom, draggable },
  methods: {
    handleWidgetAdd(evt) {
      /// 拖拽布局控件添加方法
      const newIndex = evt.newIndex
      if (evt.pullMode === 'clone') {
        let cotrl = JSON.parse(
          JSON.stringify(this.element.options.columns[newIndex])
        )
        const key = getnewid(this.forminfo, cotrl.type)
        cotrl.model = key
        cotrl.key = key
        if (this.element.type === 'listview') {
          cotrl.options.filed = key
        }
        cotrl.options.labelwidth = 150
        this.$set(this.element.options.columns, newIndex, cotrl)
      } else {
        let cotrl = this.element.options.columns[newIndex]
        this.$set(this.element.options.columns, newIndex, cotrl)
      }
      store.commit('setselectWidget', this.element.options.columns[newIndex])
      this.$parent.$forceUpdate()
      var _this = this
      if (
        _this.w !== document.getElementById('widgetlist').clientWidth &&
        _this.h !== document.getElementById('widgetlist').clientHeight
      ) {
        _this.isrowtable = true
      } else {
        _this.isrowtable = false
      }
    },
    copyctrl(evt) {
      let cotrl = JSON.parse(JSON.stringify(evt))
      const key = getnewid(this.forminfo, cotrl.type)
      cotrl.model = key
      cotrl.key = key
      this.element.options.columns.push(cotrl)
      store.commit('setselectWidget', cotrl)
      if (
        _this.w !== document.getElementById('widgetlist').clientWidth &&
        _this.h !== document.getElementById('widgetlist').clientHeight
      ) {
        _this.isrowtable = true
      } else {
        _this.isrowtable = false
      }
    },
    deletectrl(evt) {
      let index = this.element.options.columns.indexOf(evt)
      this.element.options.columns.splice(index, 1)
      if (this.element.options.columns.length > 0) {
        if (index < this.element.options.columns.length) {
          store.commit('setselectWidget', this.element.options.columns[index])
        } else {
          store.commit('setselectWidget', this.element.options.columns[0])
        }
      } else {
        store.commit('setselectWidget', null)
      }
      if (
        _this.w !== document.getElementById('widgetlist').clientWidth &&
        _this.h !== document.getElementById('widgetlist').clientHeight
      ) {
        _this.isrowtable = true
      } else {
        _this.isrowtable = false
      }
    },
  },
  inject: ['changeFromInfo'],
}
</script>
<style scoped>
.gridlist {
  min-width: 100%;
  border-radius: 5px;
  border: 1px solid var(--border-color);
  height: 64px;
}
.celno {
  width: 40px;
  height: 64px;
  float: left;
}
.celno .head {
  width: 100%;
  height: 32px;
  background-color: #fafafa;
  float: left;
  line-height: 32px;
  text-align: center;
}
.celno .head:hover {
  background-color: #f0f0f0;
}
.celno .content {
  width: 100%;
  height: 32px;
  background-color: #fff;
  float: left;
  line-height: 32px;
  text-align: center;
  word-wrap: break-word;
  word-break: normal;
}
.divcontainer {
  height: 73px !important;
  float: left;
  padding-bottom: 0px;
  margin: 0px;
  width: calc(100% - 40px);
  overflow: hidden;
  overflow-x: auto;
}
.gridlist >>> .widget-form-list {
  height: 64px !important;
  float: left;
  padding-bottom: 0px;
  margin: 0px;
  min-width: 100%;
  align-self: baseline;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
}
.gridlist .rowtable {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
