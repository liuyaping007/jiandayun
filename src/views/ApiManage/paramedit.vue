<template>
  <div>
    <nx-tree-table
      :data="data"
      :columns="columns"
      border
      :scopedSlots="scopedSlots"
    >
      <span slot="property" slot-scope="scope">
        <template v-if="readonly === true">{{ scope.row.property }}</template>
        <template v-else>
          <el-input
            v-if="scope.row.isfirst !== true"
            v-model="scope.row.property"
            placeholder="请输入属性名称"
            :style="'width:' + (180 - scope.row._level * 20) + 'px'"
          ></el-input>
          <template v-else>{{ scope.row.property }}</template>
        </template>
      </span>
      <div slot="required" slot-scope="scope">
        <el-switch
          v-if="
            scope.row.variabletype !== 'Object' &&
              scope.row.variabletype !== 'Array'
          "
          v-model="scope.row.required"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :disabled="readonly === true"
        >
        </el-switch>
      </div>
      <div slot="paramtype" slot-scope="scope">
        <div
          v-if="
            scope.row.variabletype !== 'Object' &&
              scope.row.variabletype !== 'Array'
          "
        >
          <span v-if="readonly === true">{{ scope.row.paramtype }}</span>
          <el-autocomplete
            v-else
            class="inline-input"
            v-model="scope.row.paramtype"
            :fetch-suggestions="querySearch"
            placeholder="请输入验证模式"
            @select="handleSelect(scope.row)"
          ></el-autocomplete>
        </div>
      </div>
      <div slot="paramname" slot-scope="scope">
        <div v-if="scope.row.isfirst !== true">
          <span v-if="readonly === true">{{ scope.row.paramname }}</span>
          <el-input
            v-else
            placeholder="请输入验证提示"
            v-model="scope.row.paramname"
          ></el-input>
        </div>
      </div>
      <div slot="operation" slot-scope="scope">
        <div v-if="readonly !== true">
          <a
            v-if="
              scope.row.isfirst &&
                (scope.row.property === '$query' ||
                  scope.row.property === '$header')
            "
            class="margin-a"
            href="javascript:;"
            style="margin-right: 5px;"
            @click="addrow(scope.row)"
            >新增</a
          >
          <a-dropdown
            class="margin-a"
            style="margin-right: 5px;"
            v-else-if="
              scope.row.variabletype === 'Object' ||
                scope.row.variabletype === 'Array'
            "
          >
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              新增子项<a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="addchild(scope.row, 'Object')"
                  >Object</a
                >
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="addchild(scope.row, 'Array')"
                  >Array</a
                >
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="addchild(scope.row, '常量')"
                  >常量</a
                >
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <template v-if="scope.row.isfirst">
            <a
              class="margin-a"
              href="javascript:;"
              style="margin-right: 5px;"
              @click="importJson(scope.row)"
              v-if="scope.row.property === 'body'"
              >导入</a
            >
            <a
              class="margin-a"
              href="javascript:;"
              style="margin-right: 5px;"
              @click="clearrow(scope.row)"
              >清空</a
            ></template
          >
          <template v-else>
            <a
              class="margin-a"
              href="javascript:;"
              style="margin-right: 5px;"
              @click="addrow(scope.row)"
              >新增</a
            >
            <a
              class="margin-a"
              href="javascript:;"
              style="margin-right: 5px;"
              @click="delrow(scope.row)"
              >删除</a
            >
          </template>
        </div>
      </div>
    </nx-tree-table>
    <zhlDialog
      title="导入JSON"
      ref="importJSONdialog"
      width="800px"
      class="my-dialog"
    >
      <el-row>
        <monaco
          ref="monaCodeEdit"
          :codeStr="paramjsonsrt"
          @loadInitAfter="loadparamAfter"
          @loadInit="loadmonaCodeEdit"
          language="json"
          :height="300"
        ></monaco>
      </el-row>
      <el-row class="filterbottom">
        <div class="operation">
          <el-button @click="$refs.importJSONdialog.visible = false"
            >关闭</el-button
          >
          <el-button @click="loadParam()">载入参数</el-button>
          <el-button type="primary" @click="confirm()">确定</el-button>
        </div>
      </el-row>
    </zhlDialog>
  </div>
</template>
<script>
import monaco from '@/components/monaco/index.vue'
import nxTreeTable from '@/components/nx-tree-table'
export default {
  name: 'treeTableDemo',
  components: { nxTreeTable, monaco },
  props: ['readonly', 'paramdata'],
  data() {
    return {
      scopedSlots: [
        'property',
        'required',
        'paramtype',
        'paramname',
        'operation'
      ],
      columns: [
        {
          text: '参数名称',
          value: 'property',
          width: 200
        },
        {
          text: '参数类型',
          value: 'variabletype',
          width: 70
        },
        {
          text: '是否必填',
          value: 'required',
          width: 70
        },
        {
          text: '验证类型',
          value: 'paramtype'
        },
        {
          text: '验证提示',
          value: 'paramname'
        },
        {
          text: '操作',
          value: 'operation'
        }
      ],
      data: [
        {
          property: 'body',
          required: false,
          paramtype: '',
          paramname: 'Post参数',
          variabletype: 'Object',
          children: [],
          isfirst: true
        },
        {
          property: '$query',
          required: false,
          paramtype: '',
          paramname: 'URL参数',
          variabletype: 'Object',
          children: [],
          isfirst: true
        },
        {
          property: '$header',
          required: false,
          paramtype: '',
          paramname: 'header头部参数',
          variabletype: 'Object',
          children: [],
          isfirst: true
        }
      ],
      paramjsonsrt: '',
      checkedRow: {}
    }
  },
  methods: {
    getJSONStr() {
      let cache = []
      const str = JSON.stringify(this.data, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return
          }
          // Store value in our collection
          cache.push(value)
        }
        return value
      })
      cache = null
      return str
    },
    getdata() {
      const dataparam = {}
      for (let i = 0; i < this.data.length; i++) {
        const item = this.data[i]
        if (item.variabletype === 'Object') {
          dataparam[item.property] = this.getchilddata(item.children)
        } else if (item.variabletype === 'Array') {
          dataparam[item.property].push(this.getchilddata(item.children))
        } else {
          dataparam[item.property] = ''
        }
      }
      return dataparam
    },
    getchilddata(datalist) {
      const dataparam = {}
      for (let i = 0; i < datalist.length; i++) {
        const item = datalist[i]
        if (item.variabletype === 'Object') {
          dataparam[item.property] = this.getchilddata(item.children)
        } else if (item.variabletype === 'Array') {
          dataparam[item.property] = []
          dataparam[item.property].push(this.getchilddata(item.children))
        } else {
          dataparam[item.property] = ''
        }
      }
      return dataparam
    },
    addchild(rowobj, variabletypestr) {
      rowobj.children.push({
        property: '',
        required: false,
        paramtype: '',
        paramname: '',
        variabletype: variabletypestr,
        children: [],
        isfirst: false
      })
    },
    addrow(rowdata) {
      if (rowdata.parent !== null && rowdata.parent !== undefined) {
        rowdata.parent.children.push({
          property: '',
          required: false,
          paramtype: '',
          paramname: '',
          variabletype: '常量',
          children: [],
          isfirst: false
        })
      } else {
        rowdata.children.push({
          property: '',
          required: false,
          paramtype: '',
          paramname: '',
          variabletype: '常量',
          children: [],
          isfirst: false
        })
      }
    },
    delrow(rowdata) {
      if (rowdata.children.length === 0 || rowdata.variabletype === '常量') {
        rowdata.parent.children.splice(
          rowdata.parent.children.indexOf(rowdata),
          1
        )
      }
    },
    clearrow(rowobj) {
      rowobj.children = []
    },
    importJson(rowdata) {
      this.checkedRow = rowdata
      this.paramjsonsrt = ''
      this.$refs.importJSONdialog.visible = true
    },
    loadAll() {
      return [
        { value: 'V_INTEGER', name: '整数' },
        { value: 'V_Z_INDEX', name: '正整数' },
        { value: 'V_NEGATIVE_INTEGER', name: '负数' },
        { value: 'V_FLOAT', name: '浮点数' },
        { value: 'V_POSTTIVE_FLOAT', name: '正浮点数' },
        { value: 'V_NEGATIVE_FLOAT', name: '负浮点数' },
        { value: 'V_UNPOSITIVE_FLOAT', name: '非负浮点数（正浮点数 + 0）' },
        { value: 'V_UN_NEGATIVE_FLOAT', name: '非正浮点数（负浮点数 + 0）' },
        { value: 'V_EMAIL', name: '邮件' },
        { value: 'V_COLOR', name: '颜色' },
        { value: 'V_URL', name: 'url' },
        { value: 'V_CHINESE', name: '仅中文' },
        { value: 'V_ASCII', name: '仅ACSII字符' },
        { value: 'V_ZIPCODE', name: '邮编' },
        { value: 'V_MOBILE', name: '手机' },
        { value: 'V_IP4', name: 'ip地址' },
        { value: 'V_PICTURE', anameddress: '图片' },
        { value: 'V_RAR', name: '压缩文件' },
        { value: 'V_DATE', name: '日期' },
        { value: 'V_QQ_NUMBER', name: 'QQ号码' },
        {
          value: 'V_TEL',
          name: '电话号码的函数(包括验证国内区号,国际区号,分机号)'
        },
        { value: 'V_LETTER', name: '字母' },
        { value: 'V_LETTER_U', name: '大写字母' },
        { value: 'V_LETTER_I', name: '小写字母' },
        { value: 'V_IDCARD', name: '身份证' },
        { value: 'V_PASSWORD_REG', name: '验证密码(数字和英文同时存在)' },
        { value: 'V_PASSWORD_LENGTH', name: '验证密码长度(6-18位)' },
        { value: 'V_TWO＿POINT', name: '验证两位数' }
      ]
    },
    loadParam() {
      const param = { json: '' }
      this.$emit('loadParm', param)
      this.paramjsonsrt = param.json
      this.$refs.monaCodeEdit.setvalue(this.paramjsonsrt)
    },
    handleSelect(row) {
      const restaurants = this.loadAll()
      for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].value === row.paramtype) {
          row.description = restaurants[i].name
          continue
        }
      }
    },
    querySearch(queryString, cb) {
      const restaurants = this.loadAll()
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadparamAfter(monacoEditor) {
      monacoEditor.setValue(this.paramjsonsrt)
    },
    loadmonaCodeEdit() {
      this.$refs.monaCodeEdit.loadInit()
    },
    confirm() {
      const paramjson = this.$refs.monaCodeEdit.getvalue()
      if (paramjson === '') {
        this.$message.error('导入JSON不能为空！')
        return false
      }
      let param = {}
      try {
        param = JSON.parse(paramjson)
      } catch (ex) {
        this.$message.error('导入JSON不是有效的JSON格式。')
        return false
      }

      if (param instanceof Array) {
        this.checkedRow.children = this.assemblyArryData(param[0])
      } else if (param instanceof Object) {
        this.checkedRow.children = this.assemblyObjectData(param)
      }
      this.$refs.importJSONdialog.visible = false
    },
    assemblyObjectData(dataobj) {
      const dataArrylist = []
      for (const keystr in dataobj) {
        if (dataobj[keystr] instanceof Array) {
          const itemdata = {
            property: keystr,
            required: false,
            paramtype: '',
            paramname: '',
            variabletype: 'Array',
            children: [],
            isfirst: false
          }
          itemdata.children = this.assemblyObjectData(dataobj[keystr][0])
          dataArrylist.push(itemdata)
        } else if (dataobj[keystr] instanceof Object) {
          const itemdata = {
            property: keystr,
            required: false,
            paramtype: '',
            paramname: '',
            variabletype: 'Object',
            children: [],
            isfirst: false
          }
          itemdata.children = this.assemblyObjectData(dataobj[keystr])
          dataArrylist.push(itemdata)
        } else {
          dataArrylist.push({
            property: keystr,
            required: false,
            paramtype: '',
            paramname: '',
            variabletype: '常量',
            children: [],
            isfirst: false
          })
        }
      }
      return dataArrylist
    },
    loadInit(datalist) {
      if (datalist !== null && datalist !== undefined && datalist.length > 0) {
        this.data = datalist
      }
    }
  },
  mounted() {
    if (
      this.paramdata !== null &&
      this.paramdata !== undefined &&
      this.paramdata.length > 0
    ) {
      this.data = this.paramdata
    }
  }
}
</script>
<style scoped>
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
