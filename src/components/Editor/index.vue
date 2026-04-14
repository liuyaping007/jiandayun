<template>
  <div ref="editorId" style="text-align:left;border: 1px solid #c9d8db;"></div>
</template>

<script>
import E from 'wangeditor'
import { uploadImg } from '@/api/index'
import { fillUrl } from '@/utils'
/* eslint-disable */
export default {
  name: 'Editor',
  props: {
    //编辑器的内容
    value: {
      type: String,
      default: () => '',
    },
    onChange: {
      type: Function,
    },
    editorAttr: '',
  },
  data() {
    return {
      editor: {},
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.editor = null
  },
  watch: {
    value: function(newValue) {
      this.editor.txt.html(newValue)
    },
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.editor = new E(this.$refs.editorId)
        this.editor.config.uploadImgShowBase64 = true
        this.editor.config.onchange = this._onchange
        this.editor.config.pasteFilterStyle = true
        this.editor.config.customUploadImg = this._customUploadImg
        this.editor.config.zIndex = 50
        this.editor.create()
        this.editor.txt.html(this.value)
      })
    },
    _onchange(html) {
      console.log(html)
      this.$emit('update:value', html)
      // this.value = html
    },
    async _customUploadImg(files, insert) {
      let file = files[files.length - 1]
      try {
        const formData = new FormData()
        formData.append('imageFile', file)
        const res = await uploadImg(formData)
        if (res.code === 0) {
          insert(fillUrl(res.data.url))
        } else {
          this.$message.error(res.msg)
        }
      } catch (err) {
        this.$message.error('图片上传失败!')
      }
    },
  },
  computed: {},
}
</script>

<style>
.w-e-menu {
  float: left;
}
.w-e-toolbar {
  display: block;
}
.w-e-text-container {
  width: 100%;
}
</style>
