<template>
  <div style=" width: 100%;  height: 100%;">
    <div class="devicetype">
      <el-radio-group v-model="designType" size="medium">
        <el-radio-button label="pc"
          ><nxnsvgicon
            class-name="PC-icon"
            icon-class="PC"
          />电脑</el-radio-button
        >
        <el-radio-button label="ipad">
          <nxnsvgicon
            class-name="iPad-icon"
            icon-class="iPad"
          />ipad</el-radio-button
        >
        <el-radio-button label="mobile"
          ><nxnsvgicon
            class-name="phone-icon"
            icon-class="phone"
          />手机</el-radio-button
        >
      </el-radio-group>
    </div>
    <div class="preview_close" @click="preview_close()">
      <i class="fa fa-close"></i>
    </div>
    <div class="ipad" v-if="designType === 'ipad'">
      <div class="outeripad">
        <div class="ipadbody">
          <div class="ipadscreen">
            <iframe
              ref="iframepreview"
              name="iframepreview"
              frameborder="0"
              :src="hrefurl + '?deviceMode=ipad'"
              width="100%"
              height="100%"
              id="mobile_survey"
              @load="loadframeData()"
            ></iframe>
          </div>
          <div class="ipadcamera"></div>
          <div class="ipadhomebutton"></div>
        </div>
      </div>
    </div>
    <div v-else-if="designType === 'pc'" class="pc">
      <iframe
        ref="iframepreview"
        name="iframepreview"
        frameborder="0"
        :src="hrefurl + '?deviceMode=pc'"
        width="100%"
        height="100%"
        id="mobile_survey"
        @load="loadframeData()"
      ></iframe>
    </div>
    <div class="mobile" v-else>
      <div class="content">
        <iframe
          ref="iframepreview"
          name="iframepreview"
          frameborder="0"
          :src="hrefurl + '?deviceMode=Mobile'"
          width="100%"
          height="100%"
          id="mobile_survey"
          @load="loadframeData()"
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import nxnsvgicon from '@/icons/index.vue'
export default {
  props: ['postData'],
  data() {
    return { designType: 'mobile', hrefurl: '' }
  },
  created() {
    const routeData = this.$router.resolve({
      path: '/temporarypreview', //跳转目标窗口的地址
      query: {},
    })
    this.hrefurl = routeData.href
  },
  components: { nxnsvgicon },
  methods: {
    preview_close() {
      this.$emit('preview_close')
    },
    loadframeData() {
      if (
        this.$refs.iframepreview !== null &&
        this.$refs.iframepreview !== undefined
      ) {
        this.$refs.iframepreview.contentWindow.postMessage(
          this.postData,
          location.origin
        )
      }
    },
  },
  watch: {
    postData() {
      this.loadframeData()
    },
  },
}
</script>
<style scoped>
.devicetype {
  width: 100%;
  position: relative;
  height: 42px;
  text-align: center;
}
.devicetype >>> .svg-icon {
  font-size: 20px;
  padding-right: 4px;
  position: relative;
  top: 2px;
}
.pc {
  width: calc(100% - 26px);
  height: 92%;
  margin: 16px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #ccced3;
  overflow: hidden;
}
.pc .widget-empty {
  top: 41%;
  text-align: center;
  position: absolute;
  font-size: 25px;
  width: 500px;
  left: 40%;
}
.mobile {
  transition: all 0.2s ease-in-out;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
  width: 450px;
  height: 910px;
  background-image: url(../img/iPhoneX_model.png);
  background-size: cover;
  box-sizing: border-box;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 30px;
  position: relative;
  display: flex;
}
.mobile > .content {
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 100px);
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 50px;
  overflow: hidden;
}
.mobile .widget-empty {
  top: 35%;
  text-align: center;
  position: absolute;
  font-size: 25px;
  color: darkgrey;
  width: 364px;
  left: 10%;
}
.preview_close {
  position: absolute;
  right: 20px;
  top: 10px;
  cursor: pointer;
}
.preview_close i {
  font-size: 20px;
  color: red;
}
.ipad {
  transition: all 0.2s ease-in-out;
  margin-left: 21%;
  margin-right: 25%;
  margin-top: 7px;
}

.ipad .outeripad {
  position: absolute;
  background-color: #d6d1d1;
  height: 910px;
  width: 990px;
  border-radius: 15px;
}
.ipad .ipadbody {
  position: absolute;
  background-color: #fafafa;
  /* height: 250px;
  width: 190px; */
  height: 906.3px;
  width: 988px;
  border-radius: 20px;
  margin-top: 1px;
  margin-left: 1px;
}
.ipad .ipadscreen {
  position: absolute;
  border: 1px solid #d9d9d9;
  height: 804px;
  width: 955px;
  margin-top: 36px;
  margin-left: 15px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
}
.ipad .ipadcamera {
  position: absolute;
  background-color: #000;
  height: 14px;
  width: 15px;
  border-radius: 14px;
  margin-top: 10px;
  margin-left: 48%;
}
.ipad .ipadhomebutton {
  position: absolute;
  background-color: #fff;
  height: 35px;
  width: 50px;
  border-radius: 15px;
  border: 2px solid #bdb5b5;
  margin-top: 854px;
  margin-left: 48%;
}
.ipad .widget-empty {
  top: 35%;
  text-align: center;
  position: absolute;
  font-size: 25px;
  color: darkgrey;
  width: 400px;
  left: 20%;
}
</style>
