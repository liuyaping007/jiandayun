<template>
  <div class="formconfigure">
    <div class="leftmenu">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">基础配置</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">权限配置</span>
        </el-menu-item>
        <el-menu-item index="4">
          <nxnsvgicon class-name="apiyun-icon" icon-class="apiyun" />
          <span slot="title">保存逻辑</span>
        </el-menu-item>
        <el-menu-item index="4">
          <nxnsvgicon class-name="apiyun-icon" icon-class="apiyun" />
          <span slot="title">列表查询逻辑</span>
        </el-menu-item>
        <el-menu-item index="4">
          <nxnsvgicon class-name="apiyun-icon" icon-class="apiyun" />
          <span slot="title">关联表单</span>
        </el-menu-item>
        <el-menu-item index="4">
          <nxnsvgicon class-name="apiyun-icon" icon-class="apiyun" />
          <span slot="title">关联接口</span>
        </el-menu-item>
        <el-menu-item index="4">
          <nxnsvgicon class-name="apiyun-icon" icon-class="apiyun" />
          <span slot="title">swagger接口</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="configcontent"></div>
  </div>
</template>
<script>
import nxnsvgicon from '@/icons/index.vue'
export default {
  components: { nxnsvgicon },
}
</script>
<style scoped>
.formconfigure {
  background-color: #f1f2f3;
  width: 100%;
  height: calc(1080px - 52px);
  display: flex;
}
.formconfigure .leftmenu {
  background-color: #fff;
  border-radius: 8px;
  width: 220px;
  margin: 10px;
}
.formconfigure .configcontent {
  background-color: #fff;
  border-radius: 10px;
  margin: 10px;
  width: calc(100% - 240px);
}
.formconfigure .svg-icon {
  font-size: 20px;
  color: #909399;
  position: relative;
  top: 2px;
  padding-right: 6px;
}
</style>
