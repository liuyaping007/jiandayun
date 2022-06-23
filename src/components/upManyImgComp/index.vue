<template>
  <div class="pic-wrap">
    <a-upload
      :customRequest="httpRequest"
      list-type="picture-card"
      :file-list="fileList"
      :beforeUpload="beforeUpload"
      @change="uploadImg"
      @preview="handlePreview"
      :disabled="disabled"
    >
      <div v-if="fileList.length < limit">
        <div v-if="!loading">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            上传
          </div>
        </div>
        <div v-else style="position: relative">
          <a-icon class="change-img" v-if="loading" type="loading" />
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import { uploadImg } from '@/api/index'
import { fillUrl } from '@/utils'

/**
 *属性
 *@fileListArr默认值
 * [{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }]
 *
 *@limit 图片限制的个数
 *方法
 * gainList 获取图片列表
 * gainStatus 获取的图片是否在上传中
 */

export default {
  name: 'upManyImgComp',
  props: {
    fileListArr: {
      type: Array,
      default() {
        return []
      }
    },
    limit: {
      type: Number,
      default: 5
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 5
    },
    fileType: {
      type: String,
      default: 'jpg,jpeg,png'
    },
    // 传B/KB/MB
    sizeUnit: {
      type: String,
      default: 'MB'
    }
  },
  computed: {
    fileTypeArr() {
      const separator = this.fileType.match(/\W/)[0]
      return this.fileType.toLowerCase().split(separator)
    },
    acceptFileType() {
      return this.fileTypeArr.join(',')
    }
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      loading: false,
      fileList: this.fileListArr
      // disabled1: this.disabled
    }
  },
  methods: {
    async handlePreview(file) {
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleCancel() {
      this.previewVisible = false
    },
    async httpRequest(info) {
      const { file } = info
      console.log(info)
      try {
        console.log(info)
        const formData = new FormData()
        formData.append('imageFile', file)

        const res = await uploadImg(formData)
        if (res.code === 0) {
          const imageUrl = fillUrl(res.data.url)
          const { name, uid, size } = res.data
          const obj = { name, uid, size }
          obj.url = imageUrl
          this.fileList.push(obj)
          this.$emit('gainList', this.fileList)
          this.loading = false
          this.$message.success('上传成功')
        }
      } catch (e) {
        console.info('error??', e)
        this.loading = false
        this.$message.error('上传失败')
      }
    },
    beforeUpload(file) {
      // 上传之前
      const suffix = file.name.match(/\.([^.]+)$/)[1].toLowerCase()
      const isTypeArr = this.fileTypeArr.some(item => item === suffix)
      if (!isTypeArr) {
        this.loading = false
        this.$message.error(`请上传${this.fileType}格式的图片!`)
      }
      let isLtSize
      if (this.sizeUnit === 'MB') {
        isLtSize = file.size / 1024 / 1024 < this.size
      } else if (this.sizeUnit === 'KB') {
        isLtSize = file.size / 1024 < this.size
      } else {
        isLtSize = file.size < this.size
      }

      if (!isLtSize) {
        this.loading = false
        this.$message.error(`图片大小不能超过${this.size}${this.sizeUnit}!`)
      }
      return isTypeArr && isLtSize
    },
    uploadImg(info) {
      this.loading = true
      if (info.file.status === 'removed') {
        this.loading = false
        this.fileList = info.fileList
        this.$emit('gainList', this.fileList)
      }
      if (info.file.status === 'done') {
        // console.log(1111)
      }
      if (!info.file.status) {
        this.loading = false
      }
    }
  },
  watch: {
    loading(newValue) {
      this.$emit('gainStatus', newValue)
    },
    fileListArr: {
      handler(val) {
        this.fileList = val
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.pic-wrap {
  .change-img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -5px;
    margin-left: -8px;
  }
  /deep/ .ant-upload-list-item {
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
