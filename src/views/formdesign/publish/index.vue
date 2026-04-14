<template>
  <div class="publishcontent">
    <div class="leftmenu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="2">
          <i class="el-icon-menu "></i>
          <span slot="title">发布信息</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="configcontent">
      <div class="titlecontent"><i class="el-icon-menu icon"></i>发布信息</div>
      <div class="contentform">
        <ctrltitle title="表单访问地址：">
          <div class="plane">
            <div class="inputplane">
              <el-input v-model="formurl" size="small"></el-input>
            </div>
            <el-tooltip
              class="item"
              effect="dark"
              content="复制链接"
              placement="top-start"
            >
              <div class="f-botton" @click="copycontent(formurl)">
                <i class="fa fa-clone"></i>
              </div>
            </el-tooltip>
            <div class="f-botton">
              <nxnsvgicon class-name="QRCode-icon" icon-class="QRCode" />
              <div ref="qrformurlCodeDiv" class="qrCode"></div>
            </div>
            <el-tooltip
              class="item"
              effect="dark"
              content="查看链接"
              placement="top-start"
            >
              <div class="f-botton" @click="openurl(listurl)">
                <i class="fa fa-eye"></i>
              </div>
            </el-tooltip></div
        ></ctrltitle>

        <ctrltitle title="列表数据访问地址：">
          <div class="plane">
            <div class="inputplane">
              <el-input v-model="listurl" size="small"></el-input>
            </div>
            <el-tooltip
              class="item"
              effect="dark"
              content="复制链接"
              placement="top-start"
            >
              <div class="f-botton" @click="copycontent(listurl)">
                <i class="fa fa-clone"></i>
              </div>
            </el-tooltip>
            <div class="f-botton">
              <nxnsvgicon class-name="QRCode-icon" icon-class="QRCode" />
              <div ref="qrCodeDiv" class="qrCode"></div>
            </div>
            <el-tooltip
              class="item"
              effect="dark"
              content="查看链接"
              placement="top-start"
            >
              <div class="f-botton" @click="openurl(listurl)">
                <i class="fa fa-eye"></i>
              </div>
            </el-tooltip>
          </div>
        </ctrltitle>
      </div>
      <input type="text" id="clipInput" style="display:none" />
    </div>
  </div>
</template>
<script>
import nxnsvgicon from '@/icons/index.vue'
import ctrltitle from '../designmian/ctrltitle.vue'
import QRCode from 'qrcodejs2'
export default {
  components: { ctrltitle, nxnsvgicon },
  data() {
    return {
      formurl:
        'https://xcfljr.aliwork.com/APP_FRYXABU5QZWDL85ZATVG/submission/FORM-RK966E71MCZ4D1FHENL96403SO8K2SMHELI9L0?corpid=dingba5a6ed7a32e908affe93478753d9884',
      listurl:
        'https://xcfljr.aliwork.com/APP_FRYXABU5QZWDL85ZATVG/submission/FORM-RK966E71MCZ4D1FHENL96403SO8K2SMHELI9L0?corpid=dingba5a6ed7a32e908affe93478753d9884',
    }
  },
  methods: {
    bindQRCode(qrCodeDiv, formurl) {
      new QRCode(qrCodeDiv, {
        text: formurl,
        width: 200,
        height: 200,
        colorDark: '#333333', //二维码颜色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      })
    },
    copycontent(copystr) {
      const input = document.querySelector('#clipInput')
      input.value = copystr
      input.select() // 将input选中
      if (document.execCommand('copy')) {
        // 将内容复制到剪贴板，相当于 Ctrl+C
        this.$message.success('复制成功')
      }
    },
    openurl(urlstr) {
      window.open(urlstr)
    },
  },
  mounted() {
    this.bindQRCode(this.$refs.qrCodeDiv, this.formurl)
    this.bindQRCode(this.$refs.qrformurlCodeDiv, this.listurl)
  },
}
</script>
<style scoped>
.publishcontent {
  background-color: #f1f2f3;
  width: 100%;
  height: calc(1080px - 52px);
  display: flex;
}
.publishcontent .leftmenu {
  background-color: #fff;
  border-radius: 8px;
  width: 220px;
  margin: 10px;
}
.publishcontent .configcontent {
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
  width: calc(100% - 240px);
}
.publishcontent .titlecontent {
  line-height: 54px;
  font-size: 16px;
  font-weight: bold;
  padding-left: 52px;
  border-bottom: 1px solid #d9d9d9;
}
.publishcontent .titlecontent .icon {
  font-size: 20px;
  padding-right: 8px;
  position: relative;
  top: 1px;
}
.publishcontent .configcontent .contentform {
  margin: 10px;
  font-size: 14px;
}

.publishcontent .configcontent .contentform >>> .ctrltitle .ctrl-title {
  width: 150px;
}
.publishcontent .configcontent .contentform >>> .ctrltitle .ctrl-content {
  width: calc(100% - 150px);
}
.publishcontent .configcontent .contentform .ctrltitle {
  margin-top: 8px;
  margin-bottom: 8px;
}
.publishcontent .configcontent .contentform .plane {
  display: flex;
}
.publishcontent .configcontent .contentform .inputplane {
  width: 40%;
}
.f-botton {
  width: 32px;
  height: 32px;
  background-color: #fff;
  border-radius: 5px;
  margin: 5px;
  float: left;
  border: 1px solid #e5e6e8;
  position: relative;
}
.f-botton i,
.f-botton svg {
  margin-left: 6px;
  /* margin-top: 0px; */
  position: relative;
  top: -3px;
  font-size: 20px;
}
.f-botton .qrCode {
  position: absolute;
  z-index: 500;
  display: none;
}
.f-botton:hover > .qrCode {
  display: block;
}
</style>
