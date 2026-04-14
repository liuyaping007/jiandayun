<template>
  <div v-loading="isloading" class="datarelevance">
    <div>
      <el-row class="inputform">
        <el-form ref="form" :model="queryparam" label-width="80px">
          <el-col
            :xs="24"
            :md="12"
            :lg="8"
            v-for="(item, index) in querywhere"
            :key="item.property"
            class="celclass"
          >
            <el-form-item :label="item.paramname" v-if="index < 3 || ismore">
              <input
                type="text"
                class="inputtext"
                v-model="queryparam[item.property]"
              />
              <!-- <queryitem
                :contentval.sync="queryparam[item.property]"
              ></queryitem> -->
            </el-form-item>
            <div
              v-if="index === 2 && ismore === false"
              class="more"
              @click="ismore = true"
            >
              更多条件
            </div>
            <div
              v-if="index === querywhere.length - 1 && ismore === true"
              class="more"
              @click="ismore = false"
            >
              收缩条件
            </div>
          </el-col>
        </el-form>
      </el-row>
      <el-row class="buttonplane">
        <el-col :span="24">
          <el-button
            type="primary "
            size="small"
            @click="loadData(1)"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-button
            @click="Resetfromdata()"
            size="small"
            icon="el-icon-refresh"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="ant-table_container">
      <a-table
        bordered
        :data-source="tableData"
        :columns="tableColumns"
        :pagination="false"
        :scroll="{ x: width }"
      >
        <div
          v-for="item in scopedSlots"
          v-bind:key="item"
          :slot="item"
          slot-scope="text, record"
        >
          <slot :name="item" :text="text" :row="record"></slot>
        </div>

        <div slot="operation" slot-scope="text, record">
          <slot name="operation" :text="text" :row="record"></slot>
        </div>
      </a-table>
    </div>
    <div class="ant-table_footer">
      <a-pagination
        v-model="pagination.currnet"
        :default-current="1"
        :total="pagination.total"
        show-quick-jumper
        @change="handleTableChange"
        @showSizeChange="showSizeChange"
        :pageSize="pagination.pagesize"
        show-size-changer
      />
    </div>
  </div>
</template>
<script>
import { getApiConfigByCallMethodCode } from '@/api/packageInterface.js'

import { apiComm } from '@/api/index'
// import queryitem from './queryitem.vue'
export default {
  name: 'gridlist',
  props: {
    apicode: {
      type: String,
      default: 'kb69sacv5928',
    },
    queryparam: {
      type: Object,
      default: () => {
        return {}
      },
    },
    pagesize: {
      default: () => {
        return 10
      },
    },
    scopedSlots: {
      type: Array,
      default: () => {
        return []
      },
    },
    headfiled: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      tableData: [],
      pagination: {
        currnet: 1,
        pagesize: this.pagesize,
        total: 0,
      },
      tableColumns: [],
      isloading: false,
      width: 2000,
      querywhere: [],
      ismore: false,
    }
  },
  components: {},
  created() {},
  methods: {
    loadData(pagenum) {
      const param = this.queryparam
      param.page = pagenum !== undefined ? pagenum : this.pagination.currentpage
      param.rows = this.pagination.pagesize
      this.isloading = true
      apiComm(this.apicode, param).then((res) => {
        this.isloading = false
        if (res.code === 0 && res.success) {
          if (this.headfiled !== undefined && this.headfiled.length > 0) {
            this.tableColumns = this.headfiled
          } else {
            this.tableColumns = []
          }
          for (let i = 0; i < res.data.columns.length; i++) {
            const item = {
              title: res.data.columns[i].headname,
              dataIndex: res.data.columns[i].bindname,
              align: 'center',
            }
            if (this.scopedSlots.indexOf(res.data.columns[i].bindname) >= 0) {
              item.scopedSlots = {
                customRender: res.data.columns[i].bindname,
              }
            }
            if (!(this.headfiled !== undefined && this.headfiled.length > 0)) {
              this.tableColumns.push(item)
            }
          }
          this.pagination.currnet = param.page
          this.pagination.total = res.totalcount
          this.tableData = res.data.list
        } else {
          this.$message.error(res.msg)
        }
        this.tableColumns.push({
          title: '操作',
          dataIndex: 'operation',
          width: 200,
          scopedSlots: { customRender: 'operation' },
          align: 'center',
          fixed: 'right',
        })
        this.width = this.tableColumns.length * 150
        this.$emit('loadafter', this.width)
      })
    },
    handleTableChange(pagination) {
      this.loadData(pagination)
    },
    showSizeChange(page, pageSize) {
      this.pagination.pageSize = pageSize
      this.loadData(1)
    },
    Resetfromdata() {
      this.querywhere.forEach((ee) => {
        this.queryparam[ee.property] = ''
      })
      this.$forceUpdate()
    },
    addfrom() {},
    loadwhereconfig() {
      this.querywhere = []
      if (this.apicode !== '') {
        getApiConfigByCallMethodCode(this.apicode).then((res) => {
          if (res.code === 0) {
            let paramlist = JSON.parse(res.data.paramConfig)
            paramlist.forEach((ee) => {
              if (ee.property === 'body') {
                ee.children.forEach((ee) => {
                  if (this.queryparam[ee.property] === undefined) {
                    this.queryparam[ee.property] = ''
                    this.querywhere.push(ee)
                  }
                })
              }
            })
          } else {
            this.$message.error(res.msg)
          }
          this.loadData(1)
        })
      }
    },
  },
  mounted() {
    this.loadwhereconfig()
  },
  watch: {
    // apicode() {
    //   this.loadwhereconfig()
    // }
  },
}
</script>
<style lang="less">
.ant-table_footer {
  margin-top: 10px;
}
</style>
<style scoped>
.ant-table_container >>> td {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.datarelevance >>> .el-form-item__label {
  white-space: nowrap;
}
.more {
  position: absolute;
  right: 0px;
  top: 37px;
  color: #103ff3;
  text-decoration: underline;
  cursor: pointer;
}
.celclass {
  position: relative;
}
.inputtext {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 35px;
  line-height: 35px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
</style>
