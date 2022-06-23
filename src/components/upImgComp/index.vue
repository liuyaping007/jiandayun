<template>
  <div class="pic-wrap">
    <a-upload
      name="image"
      :customRequest="httpRequest"
      listType="picture-card"
      :showUploadList="false"
      :beforeUpload="beforeUpload"
      @change="uploadImg"
      :disabled="disabled1"
    >
      <div v-if="imgData" style="position: relative">
        <img :src="imgData" alt="avatar" :class="loading ? 'up-bc' : ''" />
        <a-icon class="change-img" v-if="loading" type="loading" />
      </div>
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>
  </div>
</template>

<script>
import { uploadImg } from '@/api/index'
import { fillUrl } from '@/utils'

/**
 * props
 * imgUrl:默认路径
 *  {
   uid: '-1',
   name: 'image.png',
   status: 'done',
   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
     }
 * 方法
 * gainList 获取图片列表
 * gainStatus 获取的图片是否在上传中
 **/
export default {
  name: 'upImgComp',
  props: {
    imgUrl: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgData: '',
      loading: false,
      disabled1: this.disabled
    }
  },
  watch: {
    imgUrl: {
      handler(newValue) {
        this.imgData = newValue.url
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async httpRequest(info) {
      const { file } = info
      console.log(info)
      try {
        const formData = new FormData()
        formData.append('imageFile', file)
        const res = await uploadImg(formData)
        if (res.code === 0) {
          const imageUrl = fillUrl(res.data.url)
          const { name, uid, size } = res.data
          const obj = { name, uid, size }
          obj.url = imageUrl
          this.fileList.push(obj)
          this.$emit('gainList', obj)
          this.loading = false
          this.$message.success('上传成功')
        }
      } catch (e) {
        console.log(e)
        this.loading = false
      }
    },
    beforeUpload(file) {
      // 上传之前
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG) {
        this.loading = false
        this.$message.error('请上传jpg/jpep/png格式的图片!')
      }
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.loading = false
        this.$message.error('图片大小不能超过5M!')
      }
      return isJPG && isLt2M
    },
    uploadImg(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pic-wrap {
  /deep/ .change-img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -5px;
    margin-left: -8px;
  }
  /deep/ .ant-upload {
    padding: 0;
  }
  img {
    width: 100px;
    height: 100px;
  }
  .up-bc {
    opacity: 0.5;
  }
}
</style>
