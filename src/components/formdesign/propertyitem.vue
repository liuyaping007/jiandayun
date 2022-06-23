<template>
  <div>
    <el-col :span="9" class="propertyborder-title">
      <a-tooltip>
        <template slot="title">{{content}}</template>
        {{title}}
      </a-tooltip>
    </el-col>
    <el-col :span="15" class="propertyborder-content">
      <slot></slot>
    </el-col>
  </div>
</template>
<script>
export default {
  props: ['title', 'content'],
  data() {
    return {}
  }
}
</script>
<style scoped>
.propertyborder-title {
  height: 42px;
  line-height: 42px;
  padding-left: 3px;
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
}

.propertyborder-content {
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
  padding-right: 3px;
  padding-left: 3px;
  padding-top: 4px;
  padding-bottom: 4px;
  height: 42px;
}
</style>
