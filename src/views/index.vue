<template>
  <div id="previewApp"></div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {}
  }
}
</script>
<style>
.border-title {
  height: 42px;
  line-height: 42px;
  padding-left: 15px;

  border-top: none;
  border-right: none;
}

.border-content {
  border-top: none;
  border-right: none;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 0px;
  padding-bottom: 4px;
  height: 42px;
}

.border-mult .border-content {
  padding-top: 4px;
  height: auto;
  border-bottom: none;
}

.border-mult .border-title {
  height: auto;
  border-bottom: none;
  border-left: none;
  margin-left: -2px;
}
.required:before {
  content: '*';
  color: #c80000;
  font-size: 12px;
  vertical-align: top;
  display: inline-block;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 2px;
  margin-left: -9px;
}
.el-input__inner{
    height: 35px;
    line-height: 35px;
}
</style>
