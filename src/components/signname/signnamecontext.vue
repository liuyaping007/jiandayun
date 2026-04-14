<template>
  <div
    class="signnamecontext"
    :style="{ height: pheight }"
    @click="isshow = false"
  >
    <div v-if="resultImg === '' || resultImg === undefined">
      <vue-esign
        style="background: #f7f8fa;
    border: 1px solid #eaeaea;"
        ref="esign"
        :width="440"
        :height="191"
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
        :bgColor.sync="bgColor"
      />
      <span class="content" v-if="isshow === true">请在此处签名</span>
    </div>
    <img :src="resultImg" width="100%" v-else />
    <div
      class="save-signature"
      v-if="resultImg === '' || resultImg === undefined"
    >
      完成签名后，请点击【完成】按钮

      <el-button
        type="success"
        icon="el-icon-check"
        size="mini"
        @click="handleGenerate"
        >完成</el-button
      >
      <el-button size="mini" icon="el-icon-refresh" @click="handleReset"
        >清空</el-button
      >
    </div>
  </div>
</template>
<script>
import vueEsign from 'vue-esign'
import { uploadImg } from '@/api/index'
import { fillUrl } from '@/utils'
export default {
  props: ['vheight', 'signimg'],
  components: { vueEsign },
  data() {
    return {
      pheight: this.vheight === undefined ? 191 : this.vheight,
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: this.signimg,
      isCrop: false,
      isshow: true
    }
  },
  methods: {
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(',')

      let mime = arr[0].match(/:(.*?);/)[1]

      let bstr = atob(arr[1])

      let n = bstr.length

      let u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], filename, {
        type: mime
      })
    },
    handleReset() {
      this.isshow = false
      this.$refs.esign.reset()
    },
    handleGenerate() {
      this.$refs.esign
        .generate()
        .then(res => {
          let file = this.dataURLtoFile(res, '数字签名.png')
          const formData = new FormData()
          formData.append('imageFile', file)
          uploadImg(formData).then(res => {
            if (res.code === 0) {
              const imageUrl = fillUrl(res.data.url)
              this.resultImg = imageUrl
              this.$emit('savesignimg', imageUrl)
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(err => {
          alert(err) // 画布没有签字时会执行这里 'Not Signned'
        })
    }
  },
  created() {},
  watch: {
    vheight(val) {
      this.pheight = val === undefined ? 191 : val
    },
    signimg(val) {
      this.resultImg = val
    }
  }
}
</script>
<style scoped>
.signnamecontext {
  width: 440px;
  position: relative;
}
.content {
  position: absolute;
  top: 90px;
  left: 150px;
  min-width: 100px;
}
.save-signature {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #fff;
  border: 1px solid #eaeaea;
  border-top: none;
  color: #aaa;
  font-size: 12px;
  padding: 0 10px;
  box-sizing: border-box;
}
.save-signature button {
  float: right;
  margin-top: 5px;
  margin-right: 5px;
}
</style>
