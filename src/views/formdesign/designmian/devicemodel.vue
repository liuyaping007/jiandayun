<template>
  <div style=" width: 100%;  height: 100%;display: flex;">
    <div class="ipad" v-if="designType === 'ipad'">
      <div class="outeripad">
        <div class="ipadbody">
          <div class="ipadscreen"><slot></slot></div>
          <div class="ipadcamera"></div>
          <div class="ipadhomebutton"></div>
          <div v-if="ctrllenth === 0" class="widget-empty">
            从左侧组件栏，先将布局控件拖入该区域，基础组件和平台组件只能拖入布局组件容器中。
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="designType === 'pc'" class="pc">
      <slot></slot>
      <div v-if="ctrllenth === 0" class="widget-empty">
        从左侧组件栏，先将布局控件拖入该区域，基础组件和平台组件只能拖入布局组件容器中。
      </div>
    </div>
    <div class="mobile" v-else>
      <div class="content">
        <slot></slot>
        <div v-if="ctrllenth === 0" class="widget-empty">
          从左侧组件栏，先将布局控件拖入该区域，基础组件和平台组件只能拖入布局组件容器中。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['ctrllenth'],
  data() {
    return {}
  },
  computed: {
    designType() {
      return this.$store.state.formdesignconfig.designType
    },
  },
}
</script>
<style scoped>
.pc {
  width: calc(100% - 26px);
  height: 92%;
  margin: 16px;
  border-radius: 8px;
  background-color: #fff;
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

.ipad {
  transition: all 0.2s ease-in-out;
  margin-left: 12%;
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
