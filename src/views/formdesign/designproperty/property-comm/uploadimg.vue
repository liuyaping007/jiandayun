<template>
  <div>
    <el-input
      v-model="imgurl"
      size="mini"
      :placeholder="title"
      @input="input"
      @change="inputimg()"
    ></el-input>
    <el-upload
      class="avatar-uploader"
      :action="uploadurl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img
        v-if="imageurl !== '' && imageurl !== undefined"
        :src="imageurl"
        class="avatar"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  props: ['imgurl', 'title'],
  data() {
    return { uploadurl: '', imageurl: '' }
  },
  created() {
    this.uploadurl = this.$transformUrl('/ui/common/uploadfile', true)
    this.imageurl = this.imgurl
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.imgurl = this.$transformUrl(res.data.url, true)
        this.$emit('update:imgurl', this.$transformUrl(res.data.url, true))
        this.$emit('input')
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    inputimg() {
      if (this.imgurl === '') {
        this.$emit('update:imgurl', '')
      }
    },
    input() {
      this.$emit('input')
    }
  }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px solid black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/* .page-config-wp >>> .el-upload:hover {
  border: 1px solid #07d1f5 !important;
} */
.avatar-uploader .el-upload:hover {
  border: 1px solid #07d1f5 !important;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid black;
}
.avatar-uploader-icon:hover {
  border: 1px solid #07d1f5 !important;
}
.avatar {
  width: 178px;
  height: 138px;
  display: block;
}
</style>
