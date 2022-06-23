<template>
  <div class="pic-wrap">
    <a-upload
      :customRequest="httpRequest"
      :file-list="fileList"
      :beforeUpload="beforeUpload"
      @change="uploadImg"
    >
      <div v-if="fileList.length < limit">
        <a-button :loading="loading" :disabled="loading">
          <a-icon type="upload" />
          上传
        </a-button>
      </div>
    </a-upload>
  </div>
</template>

<script>
import { uploadImg } from '@/api/index'
import { fillUrl } from '@/utils'

/**
 *属性
 *@fileList默认值
 * [{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }]
 *
 *@limit 文件限制的个数
 *方法
 * gainList 获取文件列表
 * gainStatus 获取的文件是否在上传中
 */

export default {
  name: 'upFilesComp',
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
    }
  },
  data() {
    return {
      loading: false,
      fileList: this.fileListArr
    }
  },
  methods: {
    async httpRequest(info) {
      const { file } = info
      try {
        const formData = new FormData()
        formData.append('imageFile', file)
        const res = await uploadImg(formData)
        if (res.code === 0) {
          const imageUrl = fillUrl(res.data.url)
          const { name, uid, size } = res.data
          const obj = {
            name,
            uid,
            size
          }
          obj.url = imageUrl
          this.fileList.push(obj)
          this.$emit('gainList', this.fileList)
          this.loading = false
          this.$message.success('上传成功')
        }
      } catch (e) {
        // console.info('error??', e)
        this.loading = false
        this.$message.error('上传失败')
      }
    },
    beforeUpload(file) {
      const isFile =
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword' ||
        file.type === 'application/pdf' ||
        file.type === 'text/plain' ||
        file.type === 'application/vnd.ms-excel' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'text/x-setext' ||
        file.type === 'application/x-earthtime'
      if (!isFile) {
        this.loading = false
        this.$message.error(
          '请上传txt/doc/xls/docx/xlsx/jpg/jpeg/png/pdf/et格式的文件!'
        )
      }
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.loading = false
        this.$message.error('文件大小不能超过5M!')
      }
      console.log(isFile, isLt2M)
      return isFile && isLt2M
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
    fileListArr: {
      handler(val) {
        this.fileList = val
        this.$forceUpdate()
      },
      deep: true
    },
    loading(newValue) {
      this.$emit('gainStatus', newValue)
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
  /deep/ .ant-upload {
    padding: 0;
  }
  img {
    width: 100px;
    height: auto;
  }
  .up-bc {
    opacity: 0.5;
  }
}
</style>
