<template>
  <div>
    <a-tabs default-active-key="2" tab-position="left">
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="file" />
          文档
        </span>
        <el-row style="margin-top: 10px;">
          <el-col :span="24">
            <div class="demo-input-suffix">
              <span>请求地址：</span>
              {{ apiconfig.apiUrl }}
            </div></el-col
          ></el-row
        >
        <el-row style="margin-top: 10px;">
          <el-col :span="24">
            <div class="demo-input-suffix">
              <span>Api类型：</span>
              {{ apiconfig.methodTypeName }}
            </div></el-col
          ></el-row
        >
        <el-row style="margin-top: 10px;">
          <el-col :span="24">
            <div class="demo-input-suffix">
              <span>执行Sql：</span>
              {{ apiconfig.sqlContent }}
            </div></el-col
          ></el-row
        >
        <el-row style="margin-top: 10px;">
          <el-col :span="24">
            <div class="demo-input-suffix">
              <span>接口说明：</span>
              {{ apiconfig.remarks }}
            </div></el-col
          ></el-row
        >
        <el-row style="margin-top: 10px;">
          <el-col :span="24">请求参数：</el-col></el-row
        >
        <el-row style="margin-top: 10px;">
          <el-col :span="24">
            <paramedit
              ref="gridparamedit"
              :paramdata="paramconfig"
              :height="250"
              :readonly="true"
            ></paramedit> </el-col
        ></el-row>
        <el-row
          style="margin-top: 10px;"
          v-if="apiconfig.methodType === 'LIST'"
        >
          <el-col :span="24">表格显示：</el-col></el-row
        >
        <el-row
          style="margin-top: 10px;"
          v-if="apiconfig.methodType === 'LIST'"
        >
          <el-col :span="24">
            <a-table
              :data-source="[]"
              :columns="tableColumns"
              border
              :pagination="false"
            >
            </a-table></el-col
        ></el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="24">返回结果：</el-col></el-row
        >
        <el-row style="margin-top: 10px;"></el-row>
      </a-tab-pane>
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="android" />
          调试
        </span>
        <el-row style="margin-top: 10px;">
          <el-col :span="24">请求参数：</el-col></el-row
        >
        <el-row style="margin-top: 10px;">
          <el-col :span="24">
            <monaco
              ref="monaCodeEdit"
              :codeStr="paramjsonsrt"
              @loadInitAfter="loadparamAfter"
              @loadInit="loadmonaCodeEdit"
              language="json"
              :height="200"
            ></monaco>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-button type="success" icon="el-icon-check" @click="SendOk"
            >发送</el-button
          >
          <el-button @click="loadParam">加载参数</el-button>
          <el-button v-if="apiconfig.methodType === 'LIST'" @click="exportExlce"
            >导出</el-button
          >
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :span="24">执行结果：</el-col></el-row
        >
        <el-row style="margin-top: 10px;">
          <el-col :span="24">
            <json-viewer
              :value="executeResult"
              :expand-depth="4"
              copyable
              sort
            ></json-viewer>
          </el-col>
        </el-row>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import monaco from '@/components/monaco/index.vue'
import { getApiConfigById } from '@/api/packageInterface'
import paramedit from './paramedit.vue'
import { apiComm, ExportExlce } from '@/api/test'
import JsonViewer from 'vue-json-viewer'
export default {
  data() {
    return {
      apiconfig: {
        headlist: '',
        paramconfig: '',
        apiUrl: 'comm/apiComm/tappUser.selectUser',
        methodTypeName: '',
        remarks: '',
        sqlContent: ''
      },
      paramjsonsrt: '',
      executeResult: {},
      headlist: [],
      tableColumns: [],
      paramconfig: []
    }
  },
  components: { paramedit, monaco, JsonViewer },
  props: ['apiid'],
  mounted() {
    this.loadInterfaceInfo()
  },
  methods: {
    exportExlce() {
      const paramjson = this.$refs.monaCodeEdit.getvalue()
      if (paramjson === '') {
        this.$message.error('提交参数不能为空！')
        return false
      }
      let param = {}
      try {
        param = JSON.parse(paramjson)
      } catch (ex) {
        this.$message.error('参数不是有效的JSON格式。')
        return false
      }
      ExportExlce(this.apiconfig.callMethodCode, param).then(res => {
        if (res.code !== 0) {
          const blob = new Blob([res.data], {
            type:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
          })
          if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(
              blob,
              this.apiconfig.methodName + '.xls'
            )
          } else {
            const downloadElement = document.createElement('a')
            const href = window.URL.createObjectURL(blob)
            downloadElement.href = href
            downloadElement.download = this.apiconfig.methodName + '.xls'
            document.body.appendChild(downloadElement)
            downloadElement.click()
            document.body.removeChild(downloadElement)
            window.URL.revokeObjectURL(href)
          }
        } else {
          this.executeResult = res
        }
      })
    },
    loadParam() {
      this.$refs.monaCodeEdit.setvalue(
        JSON.stringify(this.$refs.gridparamedit.getdata())
      )
    },
    SendOk() {
      const paramjson = this.$refs.monaCodeEdit.getvalue()
      if (paramjson === '') {
        this.$message.error('提交参数不能为空！')
        return false
      }
      let param = {}
      try {
        param = JSON.parse(paramjson)
      } catch (ex) {
        this.$message.error('参数不是有效的JSON格式。')
        return false
      }
      apiComm(this.apiconfig.callMethodCode, param).then(res => {
        this.executeResult = res
      })
    },
    loadmonaCodeEdit() {
      this.$refs.monaCodeEdit.loadInit()
    },
    loadexecuteResultEdit() {
      this.$refs.executeResultEdit.loadInit()
    },
    loadInterfaceInfo() {
      getApiConfigById(this.apiid).then(res => {
        this.apiconfig = res.data
        if (
          this.apiconfig.headList !== null &&
          this.apiconfig.headList !== undefined &&
          this.apiconfig.headList !== ''
        ) {
          this.headlist = JSON.parse(this.apiconfig.headList)
          for (let i = 0; i < this.headlist.length; i++) {
            const item = {
              title: this.headlist[i].headname,
              dataIndex: this.headlist[i].bindname,
              align: 'center'
            }
            this.tableColumns.push(item)
          }
        }
        if (
          this.apiconfig.paramConfig !== null &&
          this.apiconfig.paramConfig !== undefined &&
          this.apiconfig.paramConfig !== ''
        ) {
          this.paramconfig = JSON.parse(this.apiconfig.paramConfig)
          this.$refs.gridparamedit.loadInit(this.paramconfig)
        }
      })
    },
    loadparamAfter(monacoEditor) {
      monacoEditor.setValue(this.paramjsonsrt)
    },
    loadexecuteResulAfter(monacoEditor) {
      monacoEditor.setValue(this.executeResult)
    }
  },
  watch: {
    apiid() {
      this.loadInterfaceInfo()
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
