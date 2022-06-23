<template>
  <div ref="container" class="monaco-editor" :style="cheight"></div>
</template>
<script>
import loadMonaco from '@/utils/loadMonaco'
let monaco
export default {
  props: {
    opts: {
      type: Object,
      default() {
        return {}
      }
    },
    codeStr: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'sql'
    },
    height: {
      type: Number,
      default: 430
    }
  },
  data() {
    return {
      // 主要配置
      defaultOpts: {
        value: '', // 编辑器的值
        theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
        roundedSelection: false, // 右侧不显示编辑器预览框
        autoIndent: true, // 自动缩进
        automaticLayout: true,
        language: this.language
      },
      cheight: '',
      monacoEditor: null,
      editorOptions: null
    }
  },
  created() {
    this.cheight = 'height:' + this.height + 'px'
  },
  methods: {
    loadInit() {
      loadMonaco(val => {
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
          }
        })
        this.monacoEditor.onDidChangeModelContent(e => {
          this.caretOffset = e.changes[0].rangeOffset
          this.value = this.monacoEditor.getValue()
        })
        this.$emit('loadInitAfter', this.monacoEditor)
      })
    },
    getvalue() {
      if (this.monacoEditor !== null && this.monacoEditor !== undefined) {
        return this.monacoEditor.getValue()
      }
    },
    setvalue(codeStr) {
      return this.monacoEditor.setValue(codeStr)
    }
  },
  mounted() {
    this.$emit('loadInit', this.codeStr)
  }
}
</script>
