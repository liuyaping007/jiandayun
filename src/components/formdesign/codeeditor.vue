<template>
  <div>
    <div :style="{ height: h + 'px' }">
      <el-row style="height:100%;overflow:auto">
        <el-col :md="24" :lg="24" class="left-editor">
          <el-tabs v-model="activeTab" type="card" class="editor-tabs">
            <el-tab-pane name="html">
              <span slot="label">
                <i v-if="activeTab === 'html'" class="el-icon-edit" />
                <i v-else class="el-icon-document" />
                template
              </span>
            </el-tab-pane>
            <el-tab-pane name="js">
              <span slot="label">
                <i v-if="activeTab === 'js'" class="el-icon-edit" />
                <i v-else class="el-icon-document" />
                script
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
            v-show="activeTab === 'html'"
            id="editorHtml"
            ref="editorHtml"
            class="tab-editor"
          />
          <div
            v-show="activeTab === 'js'"
            id="editorJs"
            ref="editorJs"
            class="tab-editor"
          />
          <div
            v-show="activeTab === 'css'"
            ref="editorCss"
            id="editorCss"
            class="tab-editor"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import loadMonaco from '@/utils/loadMonaco'
let monaco
const mode = {
  html: 'html',
  js: 'javascript',
  css: 'css'
}
export default {
  props: ['formData', 'generateConf', 'h'],
  data() {
    return {
      activeTab: 'html',
      htmlCode: '',
      jsCode: '',
      cssCode: '',
      editorObj: {
        html: null,
        js: null,
        css: null
      }
    }
  },
  methods: {
    loadInit() {
      this.htmlCode = this.formData.html
      this.jsCode = this.formData.js
      this.cssCode = this.formData.css
      loadMonaco(val => {
        monaco = val
        this.setEditorValue(this.$refs.editorHtml, 'html', this.htmlCode)
        this.setEditorValue(this.$refs.editorJs, 'js', this.jsCode)
        this.setEditorValue(this.$refs.editorCss, 'css', this.cssCode)
      })
    },
    insertContent(textstr) {
      if (this.editorObj.js != null) {
        const selection = this.editorObj.js.getSelection()
        const rangeobj = new monaco.Range(
          selection.startLineNumber,
          selection.startColumn,
          selection.endLineNumber,
          selection.endColumn
        )
        const id = { major: 1, minor: 1 }
        const op = {
          identifier: id,
          range: rangeobj,
          text: textstr,
          forceMoveMarkers: true
        }
        this.editorObj.js.executeEdits(this.root, [op])
        this.editorObj.js.focus()
      }
    },
    setEditorValue(contorl, type, codeStr) {
      if (this.editorObj[type]) {
        this.editorObj[type].setValue(codeStr)
      } else {
        this.editorObj[type] = monaco.editor.create(contorl, {
          value: codeStr,
          theme: 'vs-dark',
          language: mode[type],
          automaticLayout: true
        })
        if (type === 'js') {
          this.editorObj[type].addAction({
            id: 'formatDocument', //                                                    菜单项 id
            label: '格式化', //                                                      菜单项名称
            //                                                                          绑定快捷键
            keybindings: [
              monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_F
            ],
            contextMenuGroupId: 'formatDocument', //                                    所属菜单的分组  //9_cutcopypaste
            run: () => {
              console.log('fdsfds')
            } // 点击后执行的操作
          })
          this.editorObj[type].addAction({
            id: 'addApi', //                                                    菜单项 id
            label: '快速添加Api', //                                                      菜单项名称                                                                       绑定快捷键
            keybindings: [
              monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_J
            ],
            contextMenuGroupId: 'formatDocument', //                                    所属菜单的分组  //9_cutcopypaste
            run: () => {
              console.log('fdsfds')
            } // 点击后执行的操作
          })
          this.editorObj[type].languages.registerCompletionItemProvider('$', {
            provideCompletionItems: () => {
              return [
                {
                  label: '显示的提示名称',
                  kind: this.editorObj[type].languages.CompletionItemKind
                    .Function,
                  insertText: '选择后粘贴到编辑器中的文字' // 此项没有的话，默认是label值
                }
              ]
            }
          })
          // this.editorObj[type].onMouseDown(e => {
          //   console.log('onMouseDown')
          //   console.log(e)
          // })
          // this.editorObj[type].onDidChangeModelContent(e => {
          //   console.log(e)
          // })
        }
      }
      // ctrl + s 刷新
      // editorObj[type].onKeyDown(e => {
      //   if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
      //     this.runCode();
      //   }
      // });
    },
    setValue(type, codeStr) {
      this.editorObj[type].setValue(codeStr)
    },
    getEditorValue(type) {
      if (this.editorObj[type] !== null && this.editorObj[type] !== undefined) {
        return this.editorObj[type].getValue()
      }
    },
    onClose() {}
  },
  created() {}
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

.action-bar {
  & .el-button + .el-button {
    margin-left: 15px;
  }

  & i {
    font-size: 20px;
    vertical-align: middle;
    position: relative;
    top: -1px;
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
