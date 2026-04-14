<template>
  <div :style="{ height: '100%' }">
    <el-row style="height:100%;overflow:auto;width: 100%;">
      <el-col :md="24" :lg="24" class="left-editor">
        <el-tabs v-model="activeTab" type="card" class="editor-tabs">
          <el-tab-pane name="js">
            <span slot="label">
              <i v-if="activeTab === 'js'" class="el-icon-edit" />
              <i v-else class="el-icon-document" />
              script
            </span>
          </el-tab-pane>
          <el-tab-pane name="html">
            <span slot="label">
              <i v-if="activeTab === 'html'" class="el-icon-edit" />
              <i v-else class="el-icon-document" />
              template
            </span>
          </el-tab-pane>
          <el-tab-pane name="css">
            <span slot="label">
              <i v-if="activeTab === 'css'" class="el-icon-edit" />
              <i v-else class="el-icon-document" />
              css
            </span>
          </el-tab-pane>
        </el-tabs>
        <div
          v-show="activeTab === 'js'"
          id="editorJs"
          ref="editorJs"
          class="tab-editor"
        >
          <monaco
            ref="jscodeedit"
            language="javascript"
            :codeStr="js"
            :height="h"
            @updatecode="updateJsCode"
            :isfootbutton="false"
          ></monaco>
        </div>
        <div
          v-show="activeTab === 'css'"
          ref="editorCss"
          id="editorCss"
          class="tab-editor"
        >
          <monaco
            ref="jscodeedit"
            language="css"
            :codeStr="css"
            :height="h"
            @updatecode="updatecssCode"
            :isfootbutton="false"
          ></monaco>
        </div>
        <div
          v-show="activeTab === 'html'"
          id="editorHtml"
          ref="editorHtml"
          class="tab-editor"
        >
          <monaco
            ref="jscodeedit"
            language="html"
            :codeStr="template"
            :height="h"
            :isfootbutton="false"
          ></monaco>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import monaco from './index.vue'
export default {
  props: ['js', 'template', 'css'],
  data() {
    return {
      activeTab: 'js',

      h: 530,
    }
  },
  methods: {
    updateJsCode(code) {
      this.$emit('update:js', code)
    },
    updatecssCode(code) {
      this.$emit('update:css', code)
    },
    updatehtmlCode() {},
  },
  components: { monaco },
  watch: {},
  created() {
    this.h = document.body.clientHeight - 40
  },
}
</script>
<style lang="scss">
$editorTabsborderColor: #121315;

body,
html {
  margin: 0;
  padding: 0;
  background: #fff;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
}
.el-icon-full-screen {
  position: absolute;
  right: 10px;
  top: 6px;
  font-size: 24px;
  color: #048af7;
  z-index: 1000;
}
input,
textarea {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
}

.editor-tabs {
  background: $editorTabsborderColor;

  .el-tabs__header {
    margin: 0;
    border-bottom-color: $editorTabsborderColor;

    .el-tabs__nav {
      border-color: $editorTabsborderColor;
    }
  }

  .el-tabs__item {
    height: 32px;
    line-height: 32px;
    color: #888a8e;
    border-left: 1px solid $editorTabsborderColor !important;
    background: #363636;
    margin-right: 5px;
    user-select: none;
  }

  .el-tabs__item.is-active {
    background: #1e1e1e;
    border-bottom-color: #1e1e1e !important;
    color: #fff;
  }

  .el-icon-edit {
    color: #f1fa8c;
  }

  .el-icon-document {
    color: #a95812;
  }

  :focus.is-active.is-focus:not(:active) {
    box-shadow: none;
    border-radius: 0;
  }
}

// home
.right-scrollbar {
  .el-scrollbar__view {
    padding: 12px 18px 15px 15px;
  }
}

.el-scrollbar__wrap {
  box-sizing: border-box;
  overflow-x: hidden !important;
  margin-bottom: 0 !important;
}

.center-tabs {
  .el-tabs__header {
    margin-bottom: 0 !important;
  }

  .el-tabs__item {
    width: 50%;
    text-align: center;
  }

  .el-tabs__nav {
    width: 100%;
  }
}

.reg-item {
  padding: 12px 6px;
  background: #f8f8f8;
  position: relative;
  border-radius: 4px;

  .close-btn {
    position: absolute;
    right: -6px;
    top: -6px;
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    color: #fff;
    text-align: center;
    z-index: 1;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background: rgba(210, 23, 23, 0.5);
    }
  }

  & + .reg-item {
    margin-top: 18px;
  }
}
.custom-tree-node {
  width: 100%;
  font-size: 14px;

  .node-operation {
    float: right;
  }

  i[class*='el-icon'] + i[class*='el-icon'] {
    margin-left: 6px;
  }

  .el-icon-plus {
    color: #409eff;
  }

  .el-icon-delete {
    color: #157a0c;
  }
}

.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

.el-upload__tip {
  line-height: 1.2;
}
</style>
<style lang="scss" scoped>
.tab-editor {
  position: absolute;
  top: 33px;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
}
.left-editor {
  position: relative;
  height: 100%;
  background: #1e1e1e;
  overflow: hidden;
}
.setting {
  position: absolute;
  right: 15px;
  top: 3px;
  color: #a9f122;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;
}
.right-preview {
  height: 100%;
  .result-wrapper {
    height: calc(100vh - 33px);
    width: 100%;
    overflow: auto;
    padding: 12px;
    box-sizing: border-box;
  }
}
::v-deep .el-drawer__header {
  display: none;
}
</style>
