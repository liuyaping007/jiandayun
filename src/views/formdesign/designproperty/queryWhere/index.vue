<template>
  <div>
    <el-button type="success" size="small" @click="openqueryWhere"
      >过滤条件设置</el-button
    >
    <zhlDialog
      title="查询列表接口过滤条件设置"
      ref="queryWheredialog"
      width="1060px"
      class="my-dialog"
    >
      <div class="whereconfigplane">
        <div class="trhead">
          <div class="tdhead filedwidth1">条件字段</div>
          <div class="tdhead filedwidth">
            查询方式
          </div>
          <div class="tdhead filedwidth">
            条件类型
          </div>
          <div class="tdhead filedwidth1">
            条件值
          </div>
          <div class="tdhead operatewidth">
            操作
          </div>
          <div class="clearfloat"></div>
        </div>
        <div class="tr" v-for="(item, index) in datalist" :key="index">
          <div class="td filedwidth1">
            <div class="tdcontext">
              <el-select v-model="item.filed" placeholder="请选择">
                <el-option
                  v-for="item in fromVariableList"
                  :key="item.value"
                  :label="item.title"
                  :value="item.value"
                  size="small"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="td filedwidth">
            <div class="tdcontext">
              <el-select
                v-model="item.opt"
                placeholder="请选择"
                @change="item.value = ''"
              >
                <el-option
                  v-for="item in optlist"
                  :key="item.value"
                  :label="item"
                  :value="item"
                  size="small"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="td filedwidth">
            <div class="tdcontext">
              <el-select
                v-model="item.variabletype"
                placeholder="请选择"
                @change="item.value = ''"
              >
                <el-option
                  v-for="item in variabletype"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value"
                  size="small"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="td filedwidth1">
            <div class="tdcontext">
              <el-input
                v-model="item.value"
                placeholder="请输入自定义"
                v-if="item.variabletype === 2"
              ></el-input>
              <el-input
                v-model="item.value"
                placeholder="请输入url变量参数名"
                v-else-if="item.variabletype === 3"
              ></el-input>
              <el-select
                v-model="item.value"
                placeholder="请选择"
                v-if="item.variabletype === 4"
              >
                <el-option
                  v-for="item in currentVariable"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value"
                  size="small"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="td operatewidth">
            <i
              class="el-icon-delete"
              @click="delrow(item)"
              style="    font-size: 18px;color:red;
    padding-top: 5px;"
            ></i>
          </div>
          <div class="clearfloat"></div>
        </div>
        <div class="addclass" @click="addrow">
          <i class="el-icon-plus"></i>添加条件
        </div>
      </div>
      <div style="text-align: right;">
        <el-button type="primary" @click="saveinfo" icon="el-icon-check"
          >保存</el-button
        >
        <el-button @click="close" icon="el-icon-close">关闭</el-button>
      </div>
    </zhlDialog>
  </div>
</template>
<script>
import { findFromVariable } from '@/components/formdesign/findfrom.js'
export default {
  props: ['querydata'],
  data() {
    return {
      datalist: [],
      variabletype: [
        { value: 2, lable: '自定义变量' },
        { value: 3, lable: 'url变量' },
        { value: 4, lable: '当前环境变量' },
      ],
      currentVariable: [
        { value: '$user.userId', lable: '当前用户ID' },
        { value: '$user.userName', lable: '用户名称' },
        { value: '$user.realaname', lable: '用户真实名称' },
        { value: '$user.deptcode', lable: '部门编码' },
        { value: '$user.organcode', lable: '机构编码' },
        { value: '$user.organname', lable: '机构名称' },
        { value: '$user.deptname', lable: '部门名称' },
        { value: '$user.deptid', lable: '部门ID' },
        { value: '$user.organid', lable: '机构ID' },
        { value: '$user.phone', lable: '手机号码' },
      ],
      optlist: [
        '=',
        '>',
        '>=',
        '<',
        '<=',
        '!=',
        'like',
        'like%',
        '%like',
        'in',
      ],
      fromVariableList: [],
      fromInfo: this.changeFromInfo(),
    }
  },
  methods: {
    addrow() {
      this.datalist.push({ filed: '', value: '', variabletype: 2, opt: '=' })
    },
    delrow(item) {
      this.datalist.splice(this.datalist.indexOf(item), 1)
    },
    openqueryWhere() {
      if (this.querydata !== undefined) {
        this.datalist = JSON.parse(JSON.stringify(this.querydata))
      }
      this.fromVariableList = findFromVariable(
        this.fromInfo,
        undefined,
        undefined
      )
      this.fromVariableList.push({ value: 'fcreationdate', title: '创建时间' })
      this.fromVariableList.push({ value: 'fcreateby', title: '创建人Id' })
      this.fromVariableList.push({
        value: 'fcreatebyname',
        title: '创建人名称',
      })
      this.fromVariableList.push({
        value: 'flastupdatedate',
        title: '最后修改时间',
      })
      this.fromVariableList.push({
        value: 'flastupdateby',
        title: '最后修改人',
      })
      this.fromVariableList.push({
        value: 'flastupdatebyname',
        title: '最后修改人名称',
      })
      this.fromVariableList.push({ value: 'organcode', title: '组织机构' })
      this.$refs.queryWheredialog.visible = true
    },
    saveinfo() {
      let index = 0
      let ischeck = true
      this.datalist.forEach((ee) => {
        if (ee.filed === '') {
          this.$message.error('第' + index + '行条件字段不能为空')
          ischeck = false
          return
        }
        if (ee.value === '') {
          this.$message.error('第' + index + '行条件值不能为空')
          ischeck = false
          return
        }
        index++
      })
      if (ischeck === true) {
        this.$emit('update:querydata', this.datalist)
        this.$refs.queryWheredialog.visible = false
      }
    },
    close() {
      this.$refs.queryWheredialog.visible = false
    },
  },
  created() {},
  computed: {
    SetChangeFromInfo() {
      return this.changeFromInfo()
    },
  },
  watch: {
    SetChangeFromInfo(val) {
      this.fromInfo = val
    },
  },
  inject: ['changeFromInfo'],
}
</script>

<style scoped>
.whereconfigplane {
  height: 400px;
}
.trhead {
  width: 100%;
  float: left;
}
.trhead .tdhead {
  border: 1px solid #ccc;
  border-left: none;
  border-top: none;
  text-align: center;
  height: 40px;
  white-space: nowrap;
  padding-top: 5px;
  text-align: center;
  float: left;
  background-color: #f5f5f5;
}
.filedwidth {
  width: 150px;
}
.filedwidth1 {
  width: 250px;
}
.operatewidth {
  width: 60px;
}
.tr {
  width: 100%;
  float: left;
}
.td {
  border: 1px solid #ccc;
  border-left: none;
  border-top: none;
  text-align: center;
  height: 50px;
  padding-top: 5px;
  text-align: center;
  white-space: nowrap;
  float: left;
}
.tdcontext {
  margin-left: 5px;
  margin-right: 5px;
}
.clearfloat {
  clear: both;
  height: 0;
  font-size: 1px;
  line-height: 0px;
}
.addclass {
  padding: 8px;
  color: #409eff;
  cursor: pointer;
}
</style>
