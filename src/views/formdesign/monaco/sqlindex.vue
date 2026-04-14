<template>
  <div class="monacoeditorplane" :style="getContextheight">
    <div ref="container" class="monaco-editor" :style="cheight"></div>
    <div class="footbutton" v-if="isfootbutton !== false">
      <i class="el-icon-document-copy" title="复制" @click="copycontent"></i
      ><i
        class="el-icon-full-screen
"
        title="全屏"
        @click="fullScreen()"
      ></i>
    </div>

    <div class="clearfloat"></div>
    <input type="text" id="clipInput" style="display:none" />
    <el-dialog
      title="全屏编辑"
      :visible.sync="fullScreendialog"
      center
      width="85vw"
      :modal="true"
    >
      <sqlindex
        ref="fullscreenmonaco"
        :codeStr="jscode"
        @updatecode="fullscreenupdatecode"
        :opts="opts"
        :updatejscode="codeStr"
        height="80vh"
        :isfootbutton="false"
      ></sqlindex>
    </el-dialog>
  </div>
</template>
<script>
import loadMonaco from '@/utils/loadMonaco'
import { sqlTip } from './sqlTip.js'
import { apiComm } from '@/api/index'
import loadBeautifier from '@/utils/loadBeautifier'
let monaco
let beautifier
export default {
  name: 'sqlindex',
  props: {
    opts: {
      type: Object,
      default() {
        return {}
      },
    },
    codeStr: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 430,
    },
    tablefild: {
      type: Object,
      default() {
        return {}
      },
    },
    isfootbutton: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      fullScreendialog: false,
      // 主要配置
      defaultOpts: {
        value: '', // 编辑器的值
        theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
        roundedSelection: false, // 右侧不显示编辑器预览框
        autoIndent: true, // 自动缩进
        automaticLayout: true,
        language: 'sql',
      },
      cheight: '',
      jscode: '',
      monacoEditor: null,
      editorOptions: null,
      tablelist: [],
      replacestr: [',', '=', '('],
    }
  },
  computed: {
    getContextheight() {
      if (this.height !== undefined) {
        if (isNaN(this.height)) {
          return 'height:' + this.height
        } else {
          return 'height:' + this.height + 'px'
        }
      }
      return 'height: calc( 100% - 70px);'
    },
    getvalue() {
      if (this.monacoEditor !== null && this.monacoEditor !== undefined) {
        return this.monacoEditor.getValue()
      }
      return ''
    },
  },
  created() {
    this.cheight = 'text-align: left;min-height:450px;height: 100%;'
    if (this.height !== undefined) {
      if (isNaN(this.height)) {
        this.cheight = 'text-align: left;height:' + this.height
      } else {
        this.cheight = 'text-align: left;height:' + this.height + 'px'
      }
    }
    if (this.tablelist.length === 0) {
      apiComm('system.getAlltablename', {}).then((res) => {
        this.tablelist = res.data
      })
    }
    loadBeautifier((btf) => {
      beautifier = btf
    })
    this.$nextTick(() => {
      this.loadInit()
    })
  },
  methods: {
    loadInit() {
      loadMonaco((val) => {
        monaco = val
        // 初始化container的内容，销毁之前生成的编辑器
        this.$refs.container.innerHTML = ''
        this.editorOptions = this.defaultOpts
        // 生成编辑器对象
        this.monacoEditor = monaco.editor.create(
          this.$refs.container,
          this.editorOptions
        )
        this.monacoEditor.addAction({
          id: 'formatDocument', //                                                    菜单项 id
          label: '格式化', //                                                      菜单项名称
          //                                                                          绑定快捷键
          keybindings: [
            monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_F,
          ],
          contextMenuGroupId: 'custom', //                                    所属菜单的分组  //9_cutcopypaste
          run: () => {
            this.monacoEditor.setValue(
              beautifier.html(this.monacoEditor.getValue())
            )
          }, // 点击后执行的操作
        })
        if (monaco.languages.registerCompletionItemProvider !== undefined) {
          monaco.languages.registerCompletionItemProvider('sql', {
            provideCompletionItems: (model, position) => {
              const word = model.getWordUntilPosition(position)
              const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
              }
              const content = model
                .getLineContent(position.lineNumber)
                .substring(0, word.startColumn - 1)
              const contents = this.getcontents(content)
              return {
                suggestions: sqlTip(
                  range,
                  monaco,
                  contents[contents.length - 1],
                  this.tablelist,
                  this.tablefild,
                  model.getValue()
                ),
              }
            },
            triggerCharacters: ['<', '#', '.'],
          })
          // this.monacoEditor.addAction({
          //   id: 'formatDocument', //                                                    菜单项 id
          //   label: '格式化', //                                                      菜单项名称
          //   //                                                                          绑定快捷键
          //   keybindings: [
          //     monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_F
          //   ],
          //   contextMenuGroupId: 'custom', //                                    所属菜单的分组  //9_cutcopypaste
          //   run: () => {

          //   } // 点击后执行的操作
          // })
        }

        this.monacoEditor.onDidChangeModelContent((e) => {
          this.caretOffset = e.changes[0].rangeOffset
          this.value = this.monacoEditor.getValue()
        })
        this.jscode = beautifier.html(this.codeStr)
        this.setvalue(this.jscode)
        this.$emit('loadInitAfter', this.monacoEditor)
      })
    },
    getcontents(content) {
      let contents = content.split(' ')
      for (let idex = 0; idex < this.replacestr.length; idex++) {
        content = content.replace(this.replacestr[idex], '♤')
      }
      if (content.indexOf(',') >= 0) {
        contents = content.split(',')
      }
      return contents
    },
    copycontent() {
      const input = document.querySelector('#clipInput')
      input.value = this.monacoEditor.getValue()
      input.select() // 将input选中
      if (document.execCommand('copy')) {
        // 将内容复制到剪贴板，相当于 Ctrl+C
        this.$message.success('复制成功')
      }
    },
    fullScreen() {
      this.fullScreendialog = true
      this.jscode = this.monacoEditor.getValue()
    },
    setvalue(codeStr) {
      codeStr = beautifier.html(codeStr)
      return this.monacoEditor.setValue(codeStr)
    },
    fullscreenupdatecode(val) {
      this.monacoEditor.setValue(val)
    },
  },
  mounted() {},
}
</script>

<style scoped>
.monacoeditorplane {
  width: 100%;
  height: 100%;
  position: relative;
}
.footbutton {
  position: absolute;
  bottom: 0px;
  right: 20px;
  z-index: 10;
  color: #ffff;
  font-size: 16px;
}
.footbutton i {
  padding: 8px;
  cursor: pointer;
}
.footbutton i:hover {
  color: #1dc5f7;
}
.clearfloat {
  clear: both;
  height: 0;
  font-size: 1px;
  line-height: 0px;
}
.monacoeditorplane >>> .el-dialog {
  margin-top: 3vh !important;
}
</style>
