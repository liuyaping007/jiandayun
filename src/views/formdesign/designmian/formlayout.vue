<template>
  <el-col
    :lg="getSpan"
    class="formitem"
    :class="
      selectWidget !== null && selectWidget.model == element.model
        ? 'active'
        : ''
    "
  >
    <div class="content" @click.stop="clickCheckWidget(element)">
      <template v-if="element.type === 'gridPanel'">
        <formplane :ctrldata="element.options" :element="element"></formplane
      ></template>
      <template v-else-if="element.type === 'tabs'">
        <el-tabs  >
          <el-tab-pane
            :label="tab.title"
            v-for="tab in element.options.planelist"
            :key="tab.model"
          >
            <span slot="label" class="tab-title"
              ><i :class="tab.icon"></i>{{ tab.title }}
            </span>
            <div @click.stop="clickCheckWidget(tab)">
              <formplane :ctrldata="tab" :element="element"></formplane>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template v-else-if="element.type === 'collapse'">
        <el-collapse>
          <el-collapse-item
            :label="tab.title"
            v-for="tab in element.options.planelist"
            :key="tab.model"
          >
            <span slot="title" class="collapse-title">
              <i :class="tab.icon"></i>{{ tab.title }}
            </span>
            <div @click.stop="clickCheckWidget(tab)">
              <formplane :ctrldata="tab" :element="element"></formplane>
            </div>
          </el-collapse-item>
        </el-collapse>
      </template>
      <template v-else-if="element.type === 'layouttable'">
        <layouttable
          :previewmodel="'pc'"
          :cellist="element.options.planelist"
          :w="element.options.w"
          @selectlayouttable="clickCheckWidget(element)"
        >
          <formplane
            v-for="cel in element.options.planelist"
            :key="cel.model"
            :slot="cel.model"
            :element="element"
            :ctrldata="cel"
          ></formplane>
        </layouttable>
      </template>
      <template v-else-if="element.type === 'stepslayout'">
        <el-steps :active="0" finish-status="success">
          <el-step
            :title="cel.title"
            v-for="cel in element.options.planelist"
            :key="cel.model"
          >
            <formplane :ctrldata="cel" :element="element"></formplane
          ></el-step>
        </el-steps>
      </template>
    </div>
    <div class="ctrltoolbar">
      <el-button
        title="删除"
        @click.stop="deletectrl()"
        class="toolbaritem widget-action-delete"
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
      <el-button
        title="保存为常用控件"
        @click.stop="savectrl()"
        class="toolbaritem fa fa-save"
        circle
        plain
        type="danger"
      ></el-button>

      <el-button
        title="添加事件"
        class="toolbaritem widget-action-delete "
        circle
        plain
        type="danger"
        @click.stop="addevent()"
      >
        <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
        <i class="fa fa-bolt" style="width: 14px;"></i>
      </el-button>
    </div>
  </el-col>
</template>
<script>
import formplane from './formplane.vue'
import store from '@/store'
import layouttable from '@/components/layouttable/index.vue'
import { fast_build_event } from '../config/fromcomm.js'
export default {
  props: ['element'],
  data() {
    return {}
  },
  computed: {
    selectWidget() {
      return this.$store.state.formdesignconfig.selectWidget
    },
    getSpan() {
      switch (this.$store.state.formdesignconfig.designType) {
        case 'pc':
          return this.element.options.lg

        case 'pad':
          return this.element.options.md

        case 'mobile':
          return this.element.options.xs

        default:
          return this.element.options.lg
      }
    },
  },
  components: { formplane, layouttable },
  methods: {
    savectrl() {},
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
    addevent() {
      fast_build_event(this)
    },
    clickCheckWidget(element) {
      store.commit('setselectWidget', element)
    },
  },
}
</script>
<style scoped>
.formitem {
  min-height: 42px;
  position: relative;
  margin-bottom: 5px;
}
.formitem .content {
  min-height: 42px;
}
.formitem .content >>> .el-tabs {
  border: 1px solid #d9d9d9;
}
.formitem .content >>> .el-collapse {
  border: 1px solid #d9d9d9;
}
.tab-title i {
  margin: 5px;
  font-size: 20px;
  margin-top: 10px;
  position: relative;
  float: left;
}
.collapse-title i {
  margin: 5px;
  font-size: 20px;
  margin-top: 12px;
  position: relative;
  float: left;
}
.toolbaritem {
  float: right;
  margin-right: 2px;
  padding: 6px !important;
  margin-left: 0px !important;
}
.ctrltoolbar {
  position: absolute;
  bottom: -15px;
  z-index: 100;
  right: 5px;
  display: none;
}
.active {
  background-color: #d3e2f1a8;
}
.formitem:hover,
.active > .ctrltoolbar {
  display: block;
}
</style>
