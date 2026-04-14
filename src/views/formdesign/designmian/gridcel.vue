<template>
  <div
    class="gridcel"
    :style="getstyle"
    @click.stop="clickCheckWidget()"
    :class="
      selectWidget !== null && selectWidget.model == element.model
        ? 'active'
        : ''
    "
  >
    <div class="head">{{ title }}</div>
    <div class="content">
      <gridcelcotrl
        :element="element"
        v-if="element !== undefined"
      ></gridcelcotrl>
    </div>
    <div class="ctrltoolbar">
      <el-button
        title="删除"
        @click.stop="deletectrl()"
        class="toolbaritem "
        circle
        plain
        type="danger"
      >
        <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
        <i class="el-icon-delete"></i>
      </el-button>
      <el-button
        title="复制"
        class="toolbaritem  "
        circle
        plain
        type="danger"
        @click.stop="copyctrl()"
      >
        <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
        <i class="el-icon-document-copy" style="width: 14px;"></i>
      </el-button>
    </div>
  </div>
</template>
<script>
import gridcelcotrl from './gridcelcotrl.vue'
import store from '@/store'
export default {
  props: ['labelwidth', 'title', 'element'],
  computed: {
    getstyle() {
      if (this.labelwidth !== undefined) {
        return `width:${this.labelwidth}px;`
      } else {
        return `width:80px;`
      }
    },
    selectWidget() {
      return this.$store.state.formdesignconfig.selectWidget
    },
  },
  components: { gridcelcotrl },
  methods: {
    copyctrl() {
      this.$emit('copyctrl', this.element)
    },
    deletectrl() {
      this.$confirm('此操作将删除其包含的所有内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$emit('deletectrl', this.element)
        })
        .catch(() => {})
    },
    clickCheckWidget() {
      store.commit('setselectWidget', this.element)
    },
  },
}
</script>
<style scoped>
.gridcel .head {
  width: 100%;
  height: 32px;
  background-color: #fafafa;
  float: left;
  line-height: 32px;
  text-align: center;
}
.gridcel .head:hover {
  background-color: #f0f0f0;
}
.gridcel .content {
  width: 100%;
  height: 32px;
  background-color: #fff;
  float: left;
  line-height: 32px;
  text-align: center;
  word-wrap: break-word;
  word-break: normal;
}
.toolbaritem {
  float: right;
  margin-right: 2px;
  padding: 6px !important;
  margin-left: 0px !important;
}
.ctrltoolbar {
  position: absolute;
  bottom: -11px;
  z-index: 100;
  right: -13px;
  display: none;
}
.gridcel {
  position: relative;
  float: left;
}
.active {
  background-color: #d3e2f1a8;
}
.gridcel:hover,
.active > .ctrltoolbar {
  display: block;
}
</style>
