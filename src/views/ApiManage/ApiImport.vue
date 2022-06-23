<template>
  <section class="app-container">
    <!--工具条-->
    <el-row>
      <el-col :span="6" class="inputform">
        <div>Api名称:</div>
        <el-input
          placeholder="Api名称"
          v-model="queryparam.excelapiname"
        ></el-input>
      </el-col>
      <el-col :span="6" class="inputform">
        <div>ApiCode:</div>
        <el-input placeholder="ApiCode" v-model="queryparam.apicode"></el-input>
      </el-col>

      <el-col :span="6" class="inputform">
        <div>接口说明:</div>
        <el-input
          placeholder="接口说明"
          v-model="queryparam.remarks"
        ></el-input>
      </el-col>
      <el-col :span="6" class="inputform">
        <el-button type="primary" @click="$refs.gridlist.loadData(1)"
          >查询</el-button
        >
        <el-button type="primary">新增</el-button></el-col
      >
    </el-row>
    <gridlist :queryparam="queryparam" apicode="kb68ipuq4736" ref="gridlist">
      <template slot="operation" slot-scope="record">
        <a
          class="margin-a"
          href="javascript:;"
          style="margin-right: 5px;"
          @click="edit(record.row)"
          >修改</a
        >
        <a
          class="margin-a"
          href="javascript:;"
          style="margin-right: 5px;"
          @click="deletefun(record.row)"
          >删除</a
        >
        <a
          class="margin-a"
          href="javascript:;"
          style="margin-right: 5px;"
          @click="SaveAs(record)"
          >另存为</a
        >
      </template>
    </gridlist>
  </section>
</template>
<script>
import gridlist from '@/components/gridlist/index.vue'
export default {
  data() {
    return {
      queryparam: { excelapiname: '', apicode: '', remarks: '' },
      rowdataedit: {}
    }
  },
  components: { gridlist },
  methods: {
    edit(rowitem) {
      this.rowdataedit = rowitem
      this.$refs.apiconfiginfodialog.visible = true
    },
    deletefun(rowitem) {
      console.log(rowitem)
    },
    SaveAs(rowitem) {
      console.log(rowitem)
    }
  },
  mounted() {}
}
</script>
<style scoped>
.inputform div:first-child {
  width: 80px;
  display: inline-block;
  height: 40px;
  margin-top: 10px;
  margin-left: 10px;
}
.inputform .el-input {
  width: calc(100% - 100px);
  float: right;
}
.inputform .el-select {
  width: calc(100% - 100px);
  float: right;
}
.inputform button {
  margin-left: 5px;
  margin-right: 5x;
}
</style>
