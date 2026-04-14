<template>
  <div
    class="formplane widget-grid-container"
    :class="ishide === true ? 'contenthide' : ''"
  >
    <div
      class="plane-header"
      @click="ishide = !ishide"
      v-if="istitle !== false"
    >
      <span class="formplane-title"><i :class="icon"></i>{{ title }}</span>
      <div class="plane-rigth">
        <i class="el-icon-arrow-down" v-if="ishide === false"></i>
        <i class="el-icon-arrow-right" v-if="ishide === true"></i>
      </div>
    </div>
    <div class="formplane-content"><slot /></div>
  </div>
</template>
<script>
export default {
  props: ['istitle', 'icon', 'title'],
  data() {
    return { ishide: false }
  },
}
</script>
<style scoped>
.formplane {
  border: 1px solid #d9d9d9;
  width: calc(100% - 12px);
  height: 100%;
  min-height: 42px;
  border-radius: 4px;
  margin: 5px;
}
.formplane .formplane-content {
  height: calc(100% - 60px);
  /* padding-bottom: 50px; */
  margin: 5px;
  text-align: left;
  clear: both;
  overflow: hidden;
  overflow-y: auto;
}
.contenthide .formplane-content {
  display: none;
}
.formplane-title i {
  margin: 5px;
  font-size: 20px;
  margin-top: 8px;
  position: relative;
  float: left;
}
.plane-header {
  line-height: 38px;
  border-bottom: 1px solid #ccced3;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: bold;
  padding-left: 20px;
}
.plane-header span {
  border-radius: 4px;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.plane-header i {
  padding-right: 5px;
}
.plane-header .plane-rigth {
  float: right;
  padding-right: 15px;
}
</style>
