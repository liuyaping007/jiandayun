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
      width="100vw"
      :modal="true"
      top="0vh"
    >
      <monaco
        ref="fullscreenmonaco"
        :language="language"
        :codeStr="jscode"
        @updatecode="fullscreenupdatecode"
        :opts="opts"
        :updatejscode="updatejscode"
        height="92vh"
        :isfootbutton="false"
      ></monaco>
    </el-dialog>
  </div>
</template>
<script>
import loadMonaco from '@/utils/loadMonaco'
import loadBeautifier from '@/utils/loadBeautifier'
let beautifier
let monaco
export default {
  name: 'monaco',
  props: [
    'updatejscode',
    'opts',
    'codeStr',
    'language',
    'height',
    'isfootbutton',
  ],
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
        language: this.language,
      },
      cheight: '',
      jscode: '',
      monacoEditor: null,
      editorOptions: null,
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
    if (this.codeStr === undefined) {
      this.codeStr = ''
    }
    this.cheight = 'text-align: left;min-height:450px;height: 100%;'
    if (this.height !== undefined) {
      if (isNaN(this.height)) {
        this.cheight = 'text-align: left;height:' + this.height
      } else {
        this.cheight = 'text-align: left;height:' + this.height + 'px'
      }
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
        this.editorOptions = Object.assign(this.defaultOpts, this.opts)
        // 生成编辑器对象
        this.monacoEditor = monaco.editor.create(
          this.$refs.container,
          this.editorOptions
        )
        monaco.languages.registerCompletionItemProvider(this.language, {
          provideCompletionItems: () => {
            return this.hints
          },
        })
        this.monacoEditor.onDidChangeModelContent((e) => {
          this.caretOffset = e.changes[0].rangeOffset
          this.value = this.monacoEditor.getValue()
        })
        switch (this.language) {
          case 'html':
            this.jscode = beautifier.html(this.codeStr)
            break
          case 'css':
            this.jscode = beautifier.css(this.codeStr)
            break
          default:
            this.jscode = beautifier.js(this.codeStr)
            break
        }
        this.setvalue(this.jscode)
        this.$emit('loadInitAfter', this.monacoEditor)
      })
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
    setvalue(jscode) {
      return this.monacoEditor.setValue(jscode)
    },
    fullscreenupdatecode(val) {
      this.monacoEditor.setValue(val)
    },
  },

  watch: {
    codeStr(val) {
      if (val !== this.monacoEditor.getValue()) {
        switch (this.language) {
          case 'html':
            this.jscode = beautifier.html(this.codeStr)
            break
          case 'css':
            this.jscode = beautifier.css(this.codeStr)
            break
          default:
            this.jscode = beautifier.js(this.codeStr)
            break
        }  
        this.setvalue(this.jscode)
      }
    },
    getvalue(val) {
      this.$emit('updatecode', val)
    },
  },
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
.monacoeditorplane >>> .el-dialog__body {
  max-height: inherit;
  overflow-y: hidden;
}
.el-icon-full-screen {
  position: absolute;
  right: 20px;
  top: -2px;
  font-size: 20px;
  color: #048af7;
  z-index: 1000;
}
</style>
