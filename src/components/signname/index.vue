<template>
  <div class="signname">
    <div v-if="signnameMode === 'pc'">
      <signnamecontext
        :signimg.sync="signimgurl"
        @savesignimg="savesignimg"
      ></signnamecontext>
    </div>
    <div v-else class="Mobile" @click="mobilesignname">
      <div v-if="signimgurl === '' || signimgurl === undefined" class="text">
        <i class="el-icon-edit"></i>点击开始签名
      </div>
      <img :src="signimgurl" width="100%" v-else />
    </div>
    <el-drawer
      title="电子签名"
      :visible.sync="drawer"
      :direction="direction"
      size="300px"
      class="Mobiledrawer"
    >
      <signnamecontext
        :signimg.sync="signimgurl"
        ref="drawersignname"
        @savesignimg="savesignimg"
      ></signnamecontext>
    </el-drawer>
  </div>
</template>
<script>
import signnamecontext from './signnamecontext.vue'
export default {
  name: 'signname',
  props: ['vheight', 'signimg'],
  components: { signnamecontext },
  data() {
    return {
      signimgurl: '',
      drawer: false,
      direction: 'btt',
      signnameMode: 'pc'
    }
  },
  methods: {
    setsignnameMode() {
      const docWidth = document.body.clientWidth
      if (docWidth < 600) {
        this.signnameMode = 'Mobile'
      } else {
        this.signnameMode = 'pc'
      }
    },
    mobilesignname() {
      if (this.signimgurl === '') {
        this.drawer = true
      }
    },
    savesignimg(imgurl) {
      this.signimgurl = imgurl
      this.$emit('update:signimg', imgurl)
      this.drawer = false
    }
  },
  created() {
    window.addEventListener('resize', () => {
      this.setsignnameMode()
    })
    this.setsignnameMode()
    if (
      this.signimg !== undefined &&
      this.signimg !== null &&
      this.signimg !== ''
    ) {
      this.signimgurl = this.signimg
    }
  },
  watch: {
    signimg(val) {
      this.signimgurl = val
    }
  }
}
</script>
<style scoped>
.signname >>> .el-drawer__header {
  margin-bottom: 12px;
  padding: 10px 10px 0;
}
.signname >>> :focus {
  outline: 0;
}
.Mobiledrawer >>> .signnamecontext {
  margin-left: auto;
  margin-right: auto;
}
.Mobiledrawer >>> .content {
  display: none;
}
.Mobile {
  background: #f7f8fa;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin: 8px;
  height: 151px;
  font-size: 12px;
  color: #616161;
  cursor: pointer;
}
.Mobile .text {
  text-align: center;
  margin-top: 22%;
}
</style>
