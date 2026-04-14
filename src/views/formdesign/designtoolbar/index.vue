<template>
  <div
    class="designtoolbar "
    :style="withcss"
    :class="isshowrigth === true ? '' : '-hide'"
  >
    <!-- <div class="toolbartype"></div>
    <div
      class="toolbarcontent"
      :style="withcss"
      v-if="isshowrigth === true"
    ></div> -->
    <el-tabs tab-position="left">
      <el-tab-pane label="组件">
        <div slot="label" @click="clicktab('组件')">
          <nxnsvgicon
            class-name="ctrlcom-icon"
            icon-class="ctrlcom"
            class="ctrlcom"
          />
          <div class="com-tab-title">组件</div>
        </div>
        <ctrlcom></ctrlcom>
      </el-tab-pane>
      <el-tab-pane label="共享">
        <div slot="label" @click="clicktab('共享组件')">
          <i class="fa fa-share-alt" />
          <div class="com-tab-title">共享</div>
        </div>
        <share></share>
      </el-tab-pane>
      <el-tab-pane label="逻辑">
        <div slot="label" @click="clicktab('逻辑')">
          <nxnsvgicon
            class-name="logic-icon"
            icon-class="logic"
            class="logic"
          />
          <div class="com-tab-title">逻辑</div>
        </div>
        <logic></logic>
      </el-tab-pane>
      <el-tab-pane label="主题">
        <div slot="label" @click="clicktab('主题')">
          <nxnsvgicon
            class-name="theme-icon"
            icon-class="theme"
            class="theme"
          />
          <div class="com-tab-title">主题</div>
        </div>
        <theme></theme>
      </el-tab-pane>
      <el-tab-pane label="模板">
        <div slot="label" @click="clicktab('组件')">
          <nxnsvgicon
            class-name="template-icon"
            icon-class="template"
            class="template fontsize26"
          />
          <div class="com-tab-title">模板</div>
        </div>
        <ctrltemplate></ctrltemplate>
      </el-tab-pane>
      <el-tab-pane label="帮助">
        <div slot="label" @click="clicktab('帮助')">
          <nxnsvgicon
            class-name="help-icon"
            icon-class="help"
            class="help fontsize26"
          />
          <div class="com-tab-title">帮助</div>
        </div>
        <helper></helper>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import nxnsvgicon from '@/icons/index.vue'
import ctrlcom from './ctrlcom.vue'
import store from '@/store'
import theme from './theme.vue'
import share from './share.vue'
import logic from './logic.vue'
import ctrltemplate from './ctrltemplate.vue'
import helper from './helper.vue'
export default {
  computed: {
    isshowrigth() {
      return this.$store.state.formdesignconfig.isleft2
    },
    withcss() {
      return (
        this.$store.state.formdesignconfig.left2 +
        this.$store.state.formdesignconfig.left1 +
        'px'
      )
    },
  },
  components: {
    ctrlcom,
    nxnsvgicon,
    theme,
    helper,
    logic,
    share,
    ctrltemplate,
  },
  methods: {
    clicktab() {
      if (this.$store.state.formdesignconfig.isleft2 === false) {
        store.commit('setIsleft2')
      }
    },
  },
}
</script>
<style scoped>
.designtoolbar {
  height: 100%;
  float: left;
  border-right: 1px solid var(--border-color);
}

.designtoolbar >>> .el-tabs--left .el-tabs__active-bar.is-left,
.designtoolbar >>> .el-tabs--left .el-tabs__nav-wrap.is-left::after {
  /* right: 0; */
  left: 1px;
  width: 3px;
}
.designtoolbar >>> .el-tabs__nav-wrap {
}
.designtoolbar >>> .el-tabs__item {
  height: 60px;
  padding: 0px 0px;
  padding-top: 8px;
  color: var(--color);
}

.designtoolbar >>> .el-tabs--left .el-tabs__header.is-left {
  margin-right: 0px;
}
.designtoolbar >>> .el-tabs__item.is-active {
  color: #409eff;
  background-color: #ffff;
}
.designtoolbar >>> .el-tabs__item i {
  margin-left: 8px;
  margin-right: 16px;
  font-size: 24px;
  display: block;
  margin-bottom: 4px;
}
.designtoolbar >>> .el-tabs__item svg {
  margin-left: 12px;
  margin-right: 12px;
  font-size: 24px;
  display: block;
}
.fontsize26 {
  font-size: 24px !important;
  margin-bottom: 4px !important;
}
.-hide >>> .el-tabs__content {
  display: none;
}
.designtoolbar >>> .el-tabs__header {
  background-color: #eff3fc5e;
}
.designtoolbar >>> .el-tabs {
  height: 100%;
}
.designtoolbar >>> .el-tabs__content {
  width: 276px;
}
.com-tab-title {
  font-size: 12px;
  text-align: center;
  line-height: 19px;
  width: 100%;
}
</style>
