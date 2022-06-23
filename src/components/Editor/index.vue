<template>
  <div ref="editorId" style="text-align:left;"></div>
</template>

<script>
import E from 'wangeditor'
import { uploadImg } from '@/api/index'
import { fillUrl } from '../../utils'
/* eslint-disable */
export default {
  name: 'Editor',
  props: {
    //编辑器的id
    editorId: {
      type: String,
      required: true
    },
    //编辑器的内容
    value: {
      type: String,
      default: () => ''
    },
    onChange: {
      type: Function
    },
    editorAttr: ''
  },
  data() {
    return {
      editor: {}
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
    }
  },
  methods: {
    init() {
      this.editor = new E(this.$refs.editorId)
      this.editor.customConfig.uploadImgShowBase64 = true
      this.editor.customConfig.onchange = this._onchange
      this.editor.customConfig.pasteFilterStyle = true
      this.editor.customConfig.customUploadImg = this._customUploadImg
      this.editor.create()
      this.editor.txt.html(this.value)
    },
    _onchange(html) {
      console.log(html)
    },
    async _customUploadImg(files, insert) {
      let file = files[files.length - 1]
      try {
        const formData = new FormData()
        formData.append('imageFile', file)
        const res = await uploadImg(formData)
        if (res.code === 0) {
          insert(fillUrl(res.data.url))
        }
      } catch (err) {
        this.$message.error('图片上传失败!')
      }
    }
  },
  computed: {}
}
</script>

<style scoped lang="less" rel="stylesheet/less"></style>
