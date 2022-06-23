<template>
  <div class="wrapper">
    <span class="left-block zhl-bg"></span>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'cardTitle',
  props: {
    title: {
      type: String,
      default() {
        return '标题'
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-content: center;
  height: auto;
  padding-top: 6px;
  background-color: #fff;
  span {
    height: 18px;
    line-height: 18px;
    color: #333;
    font-weight: bold;
  }
  .left-block {
    width: 6px;
    height: 18px;
    margin-right: 6px;
    background-color: #409eff !important;
  }
}
</style>
