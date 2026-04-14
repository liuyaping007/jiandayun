<template>
  <div class="complane">
    <div class="complane-header">
      <span class="formplane-title"> <slot name="title"></slot></span>
    </div>
    <div class="complane-content"><slot name="content"></slot></div>
  </div>
</template>
<script>
import nxnsvgicon from '@/icons/index.vue'
export default {
  components: { nxnsvgicon },
}
</script>
<style scoped>
.complane {
  border: 1px solid #d9d9d9;
  width: calc(100% - 2px);
  height: 100%;
  min-height: 42px;
  border-radius: 4px;
  border-top: 0px;
  border-right: 0px;
  border-bottom: 1px solid #d9d9d9;
}
.formplane-title i,
.formplane-title svg {
  margin: 5px;
  font-size: 20px;
  margin-top: 8px;
  position: relative;
  float: left;
  color: var(--color);
}
.complane-header {
  line-height: 38px;
  border-bottom: 1px solid #ccced3;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: bold;
  padding-left: 10px;
}
.complane-content {
  margin-left: 11px;
  height: 871px;
  overflow-y: auto;
}
.complane-header span {
  border-radius: 4px;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.complane-header i {
  padding-right: 5px;
}
.complane-header .complane-rigth {
  float: right;
  padding-right: 15px;
}
</style>
