<template>
  <div>
    <a-input-search
      placeholder="选择API"
      style="width: 80%"
      v-model="apicode"
      @search="openform"
    />
    <zhlDialog
      title="接口选择"
      ref="selectApilist"
      width="1060px"
      class="my-dialog"
    >
      <el-row>
        <el-col :span="8" class="inputform">
          <div>包名:</div>
          <el-input placeholder="包名" v-model="queryparam.pagename"></el-input>
        </el-col>
        <el-col :span="8" class="inputform">
          <div>包名称:</div>
          <el-input
            placeholder="包名称"
            v-model="queryparam.description"
          ></el-input>
        </el-col>
        <el-col :span="8" class="inputform">
          <div>方法名:</div>
          <el-input
            placeholder="方法名"
            v-model="queryparam.methodcode"
          ></el-input>
        </el-col>
        <el-col :span="8" class="inputform">
          <div>方法名称:</div>
          <el-input
            placeholder="方法名称"
            v-model="queryparam.methodname"
          ></el-input>
        </el-col>
        <el-col :span="16" class="inputform">
          <el-button type="primary" @click="$refs.gridlist.loadData(1)"
            >查询</el-button
          >
        </el-col>
      </el-row>
      <gridlist
        :queryparam="queryparam"
        apicode="tappUser.queryApiList"
        ref="gridlist"
        :scopedSlots="scopedSlots"
      >
        <div slot="method_type" slot-scope="record">
          {{
            record.row.method_type !== null
              ? methodtype[record.row.method_type]
              : ''
          }}
        </div>
        <template slot="operation" slot-scope="record">
          <a
            class="margin-a"
            href="javascript:;"
            style="margin-right: 5px;"
            @click="selectApi(record.row)"
            >选择</a
          >
        </template>
      </gridlist>
    </zhlDialog>
  </div>
</template>
<script>
export default {
  props: ['apicode', 'methodType', 'optionsitem'],
  data() {
    return {
      queryparam: {
        pagename: undefined,
        description: undefined,
        methodcode: undefined,
        methodname: undefined,
        methodtype: this.methodType
      },
      methodtype: ['', '列表Api', '查询Api', '操作Api', '对象Api'],
      scopedSlots: ['method_type']
    }
  },
  methods: {
    selectApi(rows) {
      this.optionsitem.sourceApi = rows.call_method_code
      this.apicode = rows.call_method_code
      this.$refs.selectApilist.visible = false
    },
    openform() {
      this.$refs.selectApilist.visible = true
    }
  }
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
