<template>
  <div>
    <el-upload
      :action="uploadurl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imageurl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['imgurl'],
  data() {
    return { uploadurl: '', imageurl: '', dialogVisible: false }
  },
  created() {
    // this.uploadurl = this.$transformUrl('/ui/common/uploadfile', true)
    this.imageurl = this.imgurl
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.imageurl = this.$transformUrl(res.data.url, true)
        this.$emit('update:imgurl', this.imageurl)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 png,jpeg 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleRemove() {
      this.imageurl = ''
    },
    handlePictureCardPreview() {
      this.dialogVisible = true
    },
  },
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
