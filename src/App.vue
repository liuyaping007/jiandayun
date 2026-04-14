<template>
  <div id="app" :style="css">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return { css: "" }
  },
  created() {},
}
</script>
<style>
#app {
  font-family: Helvetica, sans-serif;
}
body {
  display: block;
  margin: 0px;
  font-size: 12px;
  color: var(--color);
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: rgb(213, 209, 209);
  margin-right: 5px;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 3px rgb(126, 125, 125);
  background-color: rgb(126, 125, 125);
}
</style>
