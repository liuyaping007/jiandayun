<template>
  <div class="app-container" style="padding:0px">
    <el-tabs type="border-card">
      <el-tab-pane v-for="item in fonticonslist" :key="item.title">
        <span slot="label"
          ><i class="el-icon-picture-outline"></i>{{ item.title }}</span
        >
        <div class="iconfon-container pull-height" style="padding:0px">
          <ul class="icon-list">
            <li
              v-for="(icon, index) in item.list"
              v-bind:key="index"
              @click="selectclick(icon.value, 'font')"
            >
              <span>
                <i :class="icon.value"></i
                >{{ icon.label === '' ? icon.value : icon.label }}</span
              >
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { icons } from '@/icons/config.js'
import { iconconfiglist } from '@/icons/iconconfig.js'
export default {
  name: 'iconfont',
  data() {
    return {
      iconslist: icons,
      fonticonslist: iconconfiglist,
    }
  },
  created() {},
  mounted() {},
  props: [],
  methods: {
    selectclick(iconname, icontype) {
      this.$emit('selected', { iconname, icontype })
    },
  },
}
</script>

<style scoped>
.app-container >>> .el-tabs__content {
  max-height: 750px;
  overflow-y: auto;
}
.el-icon-full-screen {
  position: relative;
}
.iconfon-container {
  padding: 15px;
}
.iconfon-container > ul.icon-list {
  margin: 15px auto;
  overflow: hidden;
  list-style: none;
  padding: 0;
  border: 1px solid #eaeefb;
  border-radius: 4px;
}
.iconfon-container .content > ul:not(.timeline) {
  margin: 10px 0;
  padding: 0 0 0 20px;
  font-size: 14px;
  color: #5e6d82;
  line-height: 2em;
}
.icon-list li {
  float: left;
  width: 16.66%;
  text-align: center;
  height: 120px;
  line-height: 120px;
  color: #666;
  font-size: 13px;
  transition: color 0.15s linear;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-right: -1px;
  margin-bottom: -1px;
}
.icon-list li span {
  display: inline-block;
  line-height: normal;
  vertical-align: middle;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  color: #99a9bf;
}
.icon-list li i {
  display: block;
  font-size: 36px !important;
  margin-bottom: 15px;
  color: #606266;
}
.icon-list li .icon-name {
  display: inline-block;
  padding: 0 12px;
  font-size: 12px !important;
  height: 1em;
  color: #606266;
}
.iconfon-explace {
  width: 100%;
}
</style>
