<template>
  <div class="layouttable" ref="layouttable" :style="getlayouttablecss()">
    <div class="layouttable-row">
      <div
        class="layouttable-item"
        v-for="(item, index) in itemlist"
        :key="index"
        :style="getwidthcss(item)"
        @click.stop="clickCheckWidget(item)"
        :class="
          selectWidget !== null && selectWidget.model === item.model
            ? 'active'
            : ''
        "
      >
        <div class="layouttable-content">
          <slot :name="item.model"></slot>
        </div>
        <div class="layouttable-tootarl">
          <div style=" display: flex;">
            <div class="layouttable-action title" @click.stop="selectactive()">
              父级
            </div>
            <div
              class="layouttable-action "
              v-if="index !== 0"
              title="向左移"
              @click.stop="leftmove(index)"
            >
              <i class="el-icon-back" />
            </div>
            <div
              class="layouttable-action "
              title="向右移"
              v-if="index !== itemlist.length - 1"
              @click.stop="rigthmove(index)"
            >
              <i class="el-icon-right" />
            </div>
            <div
              class="layouttable-action "
              @click.stop="copyitem(item)"
              title="复制"
            >
              <i class="el-icon-document-copy" />
            </div>
            <div
              class="layouttable-action "
              @click.stop="delitem(item)"
              title="删除"
            >
              <i class="el-icon-delete" />
            </div>
          </div>
        </div>
        <div
          class="layouttable-verticalline"
          v-if="index !== itemlist.length - 1"
          @mousedown.prevent.stop="handleZoom($event, index)"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store'
export default {
  props: ['cellist'],
  data() {
    return {
      height: 100,
      itemlist: [
        { scalewidth: 20, phonescalewidth: 20, ipadscalewidth: 20, id: 'cel1' },
        { scalewidth: 20, phonescalewidth: 20, ipadscalewidth: 20, id: 'cel2' },
        { scalewidth: 20, phonescalewidth: 20, ipadscalewidth: 20, id: 'cel3' },
        { scalewidth: 20, phonescalewidth: 20, ipadscalewidth: 20, id: 'cel4' },
        { scalewidth: 20, phonescalewidth: 20, ipadscalewidth: 20, id: 'cel5' },
      ],
    }
  },
  computed: {
    selectWidget() {
      return this.$store.state.formdesignconfig.selectWidget
    },
  },
  methods: {
    clickCheckWidget(item) {
      store.commit('setselectWidget', item)
    },
    getlayouttablecss() {
      return 'height:' + this.height + '%'
    },
    getwidthcss(item) {
      return 'width:' + this.getCelWidth(item) + '%'
    },
    getCelWidth(item) {
      switch (this.$store.state.formdesignconfig.designType) {
        case 'pc':
          return item.scalewidth
        case 'mobile':
          return item.phonescalewidth
        case 'ipad':
          return item.ipadscalewidth
        default:
          return item.scalewidth
      }
    },
    setCelWidth(item, width) {
      switch (this.$store.state.formdesignconfig.designType) {
        case 'pc':
          item.scalewidth = width
          break
        case 'mobile':
          item.phonescalewidth = width
          break
        case 'ipad':
          item.ipadscalewidth = width
          break
        default:
          item.scalewidth = width
          break
      }
    },
    leftmove(index) {
      if (index > 0) {
        // 点击上箭头，获取当前行下标
        this.itemlist.splice(
          index,
          1,
          ...this.itemlist.splice(index - 1, 1, this.itemlist[index])
        )
        store.commit('setselectWidget', this.itemlist[index - 1])
      }
    },
    rigthmove(index) {
      if (index < this.itemlist.length - 1) {
        this.itemlist.splice(
          index,
          1,
          ...this.itemlist.splice(index + 1, 1, this.itemlist[index])
        )
        store.commit('setselectWidget', this.itemlist[index + 1])
      }
    },
    selectactive() {
      this.$emit('selectlayouttable')
    },
    delitem(item) {
      let idex = this.itemlist.indexOf(item)
      if (idex !== 0) {
        this.itemlist[idex - 1].scalewidth =
          this.itemlist[idex - 1].scalewidth + item.scalewidth
        this.itemlist[idex - 1].phonescalewidth =
          this.itemlist[idex - 1].phonescalewidth + item.phonescalewidth
        this.itemlist[idex - 1].ipadscalewidth =
          this.itemlist[idex - 1].ipadscalewidth + item.ipadscalewidth
      } else {
        this.itemlist[idex + 1].scalewidth =
          this.itemlist[idex + 1].scalewidth + item.scalewidth
        this.itemlist[idex + 1].phonescalewidth =
          this.itemlist[idex + 1].phonescalewidth + item.phonescalewidth
        this.itemlist[idex + 1].ipadscalewidth =
          this.itemlist[idex + 1].ipadscalewidth + item.ipadscalewidth
      }
      this.itemlist.splice(idex, 1)
    },
    copyitem(item) {
      let idex = this.itemlist.indexOf(item)
      let newitem = JSON.parse(JSON.stringify(item))
      newitem.scalewidth = newitem.scalewidth / 2
      newitem.phonescalewidth = newitem.phonescalewidth / 2
      newitem.ipadscalewidth = newitem.ipadscalewidth / 2
      item.scalewidth = item.scalewidth / 2
      item.phonescalewidth = item.phonescalewidth / 2
      item.ipadscalewidth = item.ipadscalewidth / 2
      newitem.model =
        'cel' +
        Date.parse(new Date()) / 1000 +
        '' +
        Math.ceil(Math.random() * 99999)
      newitem.columns = []
      this.itemlist.splice(idex, 0, newitem)
    },
    handleZoom(doc, index) {
      const oldmouseX = doc.clientX
      let $this = this
      let w = $this.$refs.layouttable.offsetWidth
      let oldw = (this.getCelWidth(this.itemlist[index]) * w) / 100
      let oldnextw = (this.getCelWidth(this.itemlist[index + 1]) * w) / 100
      const move = (e) => {
        let nw = oldw + e.clientX - oldmouseX
        let nextw = oldnextw - e.clientX + oldmouseX
        if (nw >= 0 && nextw >= 0) {
          $this.setCelWidth(this.itemlist[index], (nw * 100) / w)
          $this.setCelWidth(this.itemlist[index + 1], (nextw * 100) / w)
          $this.$forceUpdate()
        }
      }
      const up = (e) => {
        document.removeEventListener('mousemove', move, false)
        document.removeEventListener('mouseup', up, false)
      }

      document.addEventListener('mousemove', move, false)
      document.addEventListener('mouseup', up, false)
    },
    handleParentZoom(doc) {
      let oldh = this.height
      let oldmouseY = doc.clientY
      const move = (e) => {
        let mh = e.clientY
        this.height = oldh + mh - oldmouseY
        if (this.height <= 0) {
          this.height = 0
        }
        this.$forceUpdate()
      }
      const up = () => {
        document.removeEventListener('mousemove', move, false)
        document.removeEventListener('mouseup', up, false)
      }

      document.addEventListener('mousemove', move, false)
      document.addEventListener('mouseup', up, false)
    },
  },
  created() {
    if (this.cellist !== undefined) {
      this.itemlist = this.cellist
    }
  },
  watch: {
    cellist: {
      deep: true,
      handler() {
        if (this.cellist !== undefined) {
          this.itemlist = this.cellist
        }
      },
    },
  },
}
</script>
<style scoped>
.layouttable {
  width: 100%;
  float: left;
  /* margin-top: 5px; */
}

.layouttable .layouttable-row {
  height: 100%;
  border: 1px solid #4294ff;
  position: relative;
  /* top: 5px;
  margin: 0px 5px; */
  display: flex;
}

.layouttable-verticalline {
  width: 5px;
  height: 30%;
  border: 1px solid #4294ff;
  background-color: #4294ff;
  right: 0px;
  position: absolute;
  top: 50%;
  min-height: 20px;
  max-height: 80px;
  transform: translateY(-50%);
  cursor: w-resize;
  display: none;
}
.layouttable-horizontalline {
  width: 30%;
  height: 5px;
  border: 1px solid #4294ff;
  background-color: #4294ff;
  bottom: 0px;
  position: absolute;
  left: 50%;
  min-width: 20px;
  max-width: 80px;
  transform: translateX(-50%);
  cursor: s-resize;
  display: none;
}
.layouttable .layouttable-row .layouttable-item {
  width: 20%;
  height: 100%;
  position: relative;
  float: left;
  border: 1px dotted #4294ff;
}
.layouttable .layouttable-content {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: inline-block;
  overflow-x: hidden;
}
.layouttable .layouttable-row .layouttable-item .layouttable-tootarl {
  position: absolute;
  bottom: -0px;
  width: 100%;
  height: 20px;
  min-width: 110px;
  display: none;
  cursor: pointer;
  z-index: 1211;
}
.layouttable
  .layouttable-row
  .layouttable-item
  .layouttable-tootarl
  .layouttable-action {
  width: 20px;
  height: 20px;
  color: #fff;
  margin: 0;
  display: inline-block;
  vertical-align: middle;
  background-color: #f56c6c;

  float: right;
}
.layouttable-action i {
  padding-top: 4px;
}
.layouttable
  .layouttable-row
  .layouttable-item
  .layouttable-tootarl
  .layouttable-action.title {
  font-size: 8px;
  width: 30px;
  float: left;
}

.layouttable-item.active .layouttable-tootarl {
  display: block !important;
}
.layouttable .layouttable-row .layouttable-item:hover .layouttable-verticalline,
.layouttable
  .layouttable-row
  .layouttable-item:active
  .layouttable-verticalline,
.layouttable
  .layouttable-row
  .layouttable-item:hover
  .layouttable-horizontalline,
.layouttable
  .layouttable-row
  .layouttable-item:active
  .layouttable-horizontalline,
.layouttable-verticalline:hover {
  display: block !important;
}
.layouttable:hover .layouttable-horizontalline,
.layouttable:active .layouttable-horizontalline {
  display: block;
}
</style>
