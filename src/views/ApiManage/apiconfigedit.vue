<template>
  <div>
    <a-tabs default-active-key="1" style="min-height:550px" tab-position="left">
      <a-tab-pane key="1" tab="基本信息">
        <el-row
          ><el-col :span="8" class="inputform">
            <span>Api名称:</span>
            <a-input
              placeholder="Api名称"
              v-model="queryparam.apiname"
            ></a-input>
          </el-col>
          <el-col :span="8" class="inputform">
            <span>ApiCode:</span>
            <a-input
              placeholder="ApiCode"
              v-model="queryparam.apicode"
              @input="accountInput"
            ></a-input>
          </el-col>
          <el-col :span="8" class="inputform">
            <span>Api类型:</span>
            <a-select v-model="queryparam.apitype" placeholder="Api类型">
              <a-select-option
                v-for="item in options"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}
              </a-select-option>
            </a-select>
          </el-col></el-row
        >
        <el-row v-if="queryparam.apitype === 'IMPORT'" style="margin-top:10px"
          ><el-col :span="8" class="inputform">
            <span>xls模板:</span>
            <a-button type="dashed" icon="upload">
              上传
            </a-button>
          </el-col>

          <el-col :span="8" class="inputform">
            <div style="margin-left:10px;margin-top: 5px;">
              {{ xlstemplate.xlsurl }}
            </div>
          </el-col>
          <el-col :span="8" class="inputform">
            <span>开始行数:</span>
            <a-input
              placeholder="开始行数"
              v-model="xlstemplate.rownum"
            ></a-input> </el-col
        ></el-row>
        <el-row v-if="queryparam.apitype === 'IMPORT'" style="margin-top:10px">
          <el-col :span="24" style="color:red">
            *开始行数提示：sheet页如有多页，数据导入开始行请用"-"隔开。例：1-2-1。不输入，默认都是第一行</el-col
          ></el-row
        >
        <el-row>
          <el-col :span="24">
            <monaco
              ref="monacoedit"
              language="sql"
              :codeStr="queryparam.sqlcontent"
              @loadInitAfter="loadAfter"
            ></monaco>
          </el-col>
          <el-col :span="24" class="inputform">
            <div>接口说明:</div>
            <a-textarea
              v-model="queryparam.remarks"
              placeholder="接口说明"
              :auto-size="{ minRows: 2, maxRows: 3 }"
            />
          </el-col>
        </el-row>
      </a-tab-pane>
      <a-tab-pane key="2" tab="参数设置">
        <paramedit
          ref="gridparamedit"
          :paramdata="paramconfig"
          @loadParm="loadParamJson"
        ></paramedit>
      </a-tab-pane>
      <a-tab-pane key="7" tab="模板验证" v-if="queryparam.apitype === 'IMPORT'">
      </a-tab-pane>
      <a-tab-pane key="3" tab="列头设置" v-if="queryparam.apitype === 'LIST'">
        <a-button-group>
          <a-button @click="loadcel()">
            加载列头
          </a-button>
          <a-button @click="addcel()">
            添加
          </a-button>
        </a-button-group>
        <el-table :data="headlist" border height="450">
          <el-table-column label="列头名称">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入内容"
                v-model="scope.row.headname"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="绑定字段">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入内容"
                v-model="scope.row.bindname"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <a
                class="margin-a"
                href="javascript:;"
                style="margin-right: 5px;"
                @click="del(scope.row)"
                >删除</a
              >
              <a
                class="margin-a"
                href="javascript:;"
                style="margin-right: 5px;"
                v-if="scope.$index !== 0"
                @click="move(scope.$index, scope.$index - 1)"
                >上移</a
              >
              <a
                class="margin-a"
                href="javascript:;"
                style="margin-right: 5px;"
                @click="move(scope.$index, scope.$index + 1)"
                v-if="headlist.length !== scope.$index + 1"
                >下移</a
              >
              <a
                class="margin-a"
                href="javascript:;"
                style="margin-right: 5px;"
                @click="move(scope.$index, 0)"
                v-if="scope.$index !== 0"
                >置顶</a
              >
              <a
                class="margin-a"
                href="javascript:;"
                style="margin-right: 5px;"
                @click="move(scope.$index, data.length - 1)"
                v-if="headlist.length !== scope.$index + 1"
                >置底</a
              >
            </template>
          </el-table-column>
        </el-table>
      </a-tab-pane>
      <a-tab-pane key="4" tab="测试">
        <a-button-group>
          <a-button @click="loadAllParamJson()">
            加载参数
          </a-button>
          <a-button @click="ExecuteApi()">
            执行
          </a-button>
        </a-button-group>
        <el-row style="margin-top: 10px;">
          <el-col :span="24">
            <a-textarea
              v-model="paramjsonsrt"
              placeholder="输入JSON参数"
              :auto-size="{ minRows: 5, maxRows: 5 }"
            />
          </el-col>
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
      <a-tab-pane key="6" tab="结果说明"> </a-tab-pane>
      <a-tab-pane key="5" tab="帮助">
        <a-tag
          color="green"
          v-for="item in help"
          v-bind:key="item"
          @dblclick="getSelectText"
        >
          {{ item }}
        </a-tag>
      </a-tab-pane>
    </a-tabs>
    <el-row class="filterbottom">
      <div class="operation">
        <el-button @click="close()">关闭</el-button>
        <el-button type="primary" @click="confirm()">确定</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
import monaco from '@/components/monaco/index.vue'
import paramedit from './paramedit.vue'
import { getApiConfigById, saveApiConfigInfo } from '@/api/packageInterface'
import { getEnumDic } from '@/api/index'
import { TestExecuteApi, getApiFieldNames } from '@/api/test'
import JsonViewer from 'vue-json-viewer'
const paramjson = {}
export default {
  props: ['apiId', 'pageId'],
  data() {
    return {
      options: [
        { value: 'LIST', label: '列表Api' },
        { value: 'QUERY', label: '查询Api' },
        { value: 'OPERATE', label: '操作Api' },
        { value: 'FOROBJECT', label: '对象Api' }
      ],
      queryparam: {
        apiname: '',
        apicode: '',
        apitype: '',
        sqlcontent: '',
        remarks: '',
        fid: '',
        headlist: '',
        paramconfig: ''
      },
      xlstemplate: {
        rownum: '1',
        xlsurl: '用户信息导入.xls',
        jsonparam: '{}'
      },
      headlist: [],
      paramconfig: [],
      paramjsonsrt: '',
      help: [
        '<if test=""></if>',
        '$newid',
        '$index',
        '<sql test="" param=""></sql>',
        '<where></where>',
        '<for test="" forname=""></for>',
        'select DISTINCT  *from table where 字段=字段 group by 字段 order by  字段',
        'insert into table() values()',
        'CONCAT(s1,s2，...) 字符串相加',
        'REPLACE(s,s1,s2) 替换字符',
        'date_format(日期,%Y-%m-%d);字符串转日期',
        'CONVERT(字符串,SIGNED);',
        'CAST(字符串 AS SIGNED);字符串转数字',
        '$user.userId;当前用户登录ID',
        '$user.userName;当前用户名称',
        '$user.realaname;用户真实名称',
        '$user.deptcode;部门编码',
        '$user.deptname;当前部门名称',
        '$user.organcode;当前机构编码',
        '$user.organname;当前机构名称',
        '$user.deptid;当前部门ID',
        '$user.organid;当前机构ID',
        '$user.phone;手机号',
        '$user.avatar;当前头像',
        '$query.参数名称;获取url参数',
        '$header.参数名称;获取header参数'
      ],
      executeResult: {},
      executeheadlist: [],
      specialParam: ['$newid', '$user', '$query', '$header']
    }
  },
  created() {
    getEnumDic('ApiTypeEnum').then(res => {
      this.options = res.data
    })
  },
  components: { monaco, paramedit, JsonViewer },
  methods: {
    close() {
      this.$emit('close')
    },
    accountInput(e) {
      const valstr = e.target.value
      const codeReg = new RegExp('[A-Za-z]+')
      const len = valstr.length
      let str = ''
      for (let i = 0; i < len; i++) {
        if (codeReg.test(valstr[i])) {
          str = str + valstr[i]
        }
      }
      e.target.value = str
      this.queryparam.apicode = str
    },
    confirm() {
      const saveApiConfigReq = {
        methodName: this.queryparam.apiname,
        remarks: this.queryparam.remarks,
        methodType: this.queryparam.apitype,
        methodCode: this.queryparam.apicode,
        paramConfig:
          this.$refs.gridparamedit === undefined
            ? this.queryparam.paramconfig
            : this.$refs.gridparamedit.getJSONStr(),
        headList: JSON.stringify(this.headlist),
        pageId: this.pageId,
        sqlContent: this.$refs.monacoedit.getvalue()
      }
      if (saveApiConfigReq.sqlContent === '') {
        this.$message.error('执行sql不能为空！')
        return false
      }
      if (saveApiConfigReq.methodName === '') {
        this.$message.error('Api名称不能为空！')
        return false
      }
      if (saveApiConfigReq.methodCode === '') {
        this.$message.error('ApiCode不能为空！')
        return false
      }
      if (saveApiConfigReq.methodType === '') {
        this.$message.error('Api类型不能为空！')
        return false
      }
      saveApiConfigInfo(saveApiConfigReq).then(res => {
        this.$emit('confirm', res)
      })
    },
    loadAfter(monacoEditor) {
      monacoEditor.setValue(this.queryparam.sqlcontent)
    },
    addcel() {
      this.headlist.push({ headname: '', bindname: '' })
    },
    loadcel() {
      const param = { sqlcontent: '', paramjsonsrt: {} }
      param.sqlcontent = this.$refs.monacoedit.getvalue()
      if (param.sqlcontent === '') {
        this.$message.error('执行sql不能为空！')
        return false
      }
      if (this.paramjsonsrt === '') {
        param.paramjsonsrt = this.$refs.gridparamedit.getdata()
      } else {
        param.paramjsonsrt = JSON.parse(this.paramjsonsrt)
      }
      getApiFieldNames(param).then(res => {
        if (res.code !== 0) {
          this.$message.error(res.msg)
          this.paramjsonsrt = param.paramjsonsrt
        } else {
          res.data.forEach(e => {
            const index = this.headlist.findIndex(item => {
              if (item.bindname === e) {
                return true
              }
            })
            if (index === -1) {
              this.headlist.push({ headname: '', bindname: e })
            }
          })
        }
      })
    },
    del(rowdata) {
      this.headlist.splice(this.headlist.indexOf(rowdata), 1)
    },
    move(oldindex, newindex) {
      const tempOption = this.headlist[newindex]
      this.$set(this.headlist, newindex, this.headlist[oldindex])
      this.$set(this.headlist, oldindex, tempOption)
    },
    ExecuteApi() {
      this.queryparam.sqlcontent = this.$refs.monacoedit.getvalue()
      if (this.queryparam.sqlcontent === '') {
        this.$message.error('执行sql不能为空！')
        return false
      }
      if (this.paramjsonsrt === '') {
        this.$message.error('参数不能为空！')
        return false
      }
      const param = { sqlcontent: this.queryparam.sqlcontent, paramjsonsrt: {} }
      try {
        param.paramjsonsrt = JSON.parse(this.paramjsonsrt)
      } catch (ex) {
        this.$message.error('参数格式不正确！不是正确的Json格式')
        return false
      }
      TestExecuteApi(param).then(res => {
        this.executeResult = res
      })
    },
    loadAllParamJson() {
      if (this.$refs.gridparamedit === undefined) {
        this.$message.success('请查看参数设置！')
      } else {
        this.paramjsonsrt = JSON.stringify(this.$refs.gridparamedit.getdata())
      }
    },
    getSelectText(e) {
      if (document.body.createTextRange) {
        // IE兼容
        const range = document.body.createTextRange()
        range.moveToElementText(e.target)
        range.select()
      } else {
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(e.target)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    },
    loadParamJson(param) {
      const result = this.$refs.monacoedit.getvalue().match(/#{([^}]*)}/g)
      eval('paramjson = {}')
      if (result != null) {
        for (let i = 0; i < result.length; ++i) {
          const strResult = result[i]
          const fieldname = strResult.replace('#{', '').replace('}', '')
          let isBool = true
          this.specialParam.forEach(ee => {
            if (fieldname.indexOf(ee) >= 0) {
              isBool = false
            }
          })
          if (isBool === false) {
            continue
          }
          let str = 'paramjson'
          const fieldArry = fieldname.split('.')
          for (let i = 0; i < fieldArry.length; i++) {
            str = this.getjosnstr(fieldArry[i], i === fieldArry.length - 1, str)
            if (str === '') {
              break
            }
          }
        }
        param.json = JSON.stringify(paramjson)
      } else {
        param.json = '{}'
      }
    },
    getjosnstr(fieldname, islast, str) {
      if (fieldname.indexOf('[$index') > 0) {
        if (fieldname.split('[') > 2 || fieldname.split(']') > 2) {
          this.$message.error('' + str + '.' + fieldname + '参数配置错误')
          str = ''
        }
        const fielditem = fieldname.substring(0, fieldname.indexOf('['))
        if (islast) {
          eval(
            'if(' +
              str +
              '.' +
              fielditem +
              '==null || ' +
              str +
              '.' +
              fielditem +
              '==undefined){' +
              str +
              '.' +
              fielditem +
              '=[];' +
              str +
              '.' +
              fielditem +
              '[0]=""}'
          )
          str = str + '.' + fielditem + '[0]'
        } else {
          eval(
            'if(' +
              str +
              '.' +
              fielditem +
              '==null || ' +
              str +
              '.' +
              fielditem +
              '==undefined){' +
              str +
              '.' +
              fielditem +
              '=[];' +
              str +
              '.' +
              fielditem +
              '[0]={}}'
          )
          str = str + '.' + fielditem + '[0]'
        }
      } else if (islast) {
        eval(str + '.' + fieldname + '=""')
        str = str + '.' + fieldname
      } else {
        eval(
          'if(' +
            str +
            '.' +
            fieldname +
            '==null || ' +
            str +
            '.' +
            fieldname +
            '==undefined){ ' +
            str +
            '.' +
            fieldname +
            '={}}'
        )
        str = str + '.' + fieldname
      }
      return str
    },
    loadData() {
      if (this.apiId !== -1 && this.apiId !== undefined) {
        getApiConfigById(this.apiId).then(res => {
          this.queryparam.apicode = res.data.methodCode
          this.queryparam.apiname = res.data.methodName
          this.queryparam.apitype = res.data.methodType
          this.queryparam.sqlcontent = res.data.sqlContent
          this.queryparam.remarks = res.data.remarks
          this.queryparam.headlist = res.data.headList
          this.queryparam.paramconfig = res.data.paramConfig
          if (
            this.queryparam.headlist !== null &&
            this.queryparam.headlist !== undefined &&
            this.queryparam.headlist !== ''
          ) {
            this.headlist = JSON.parse(this.queryparam.headlist)
          }
          if (
            this.queryparam.paramconfig !== null &&
            this.queryparam.paramconfig !== undefined &&
            this.queryparam.paramconfig !== ''
          ) {
            this.paramconfig = JSON.parse(this.queryparam.paramconfig)
          }
          this.$refs.monacoedit.loadInit()
        })
      } else {
        this.$refs.monacoedit.loadInit()
      }
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>
.ant-tag {
  margin: 5px;
}
.inputform span:first-child {
  width: 80px;
  display: inline-block;
  margin-top: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
}

.inputform .ant-select {
  width: calc(100% - 100px);
  float: right;
}
.inputform textarea {
  margin-top: 5px;
  width: calc(100% - 100px);
  float: right;
}
.inputform .ant-input {
  width: calc(100% - 100px);
  float: right;
}
.inputform .ant-input-group-wrapper {
  width: calc(100% - 100px);
  float: right;
}
.inputform button {
  margin-left: 5px;
  margin-right: 5x;
}
.filterbottom {
  margin-top: 8px;
  margin-left: 15px;
  margin-right: 10px;
}
.filterbottom button {
  float: right;
  margin-right: 10px;
  margin-bottom: 20px;
}
</style>
