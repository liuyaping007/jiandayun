<template>
  <div>
    <div class="ant-table_container">
      <a-table
        bordered
        :data-source="tableData"
        :columns="tableColumns"
        :pagination="false"
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
        :loading="isloading"
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
import { apiComm, ExportExlce } from '@/api/index'
export default {
  name: 'gridlist',
  props: {
    apicode: {
      type: String,
      default: 'kb69sacv5928'
    },
    queryparam: {
      type: Object,
      default: () => {
        return {}
      }
    },
    pagesize: {
      default: () => {
        return 10
      }
    },
    scopedSlots: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      tableData: [],
      pagination: {
        currnet: 1,
        pagesize: this.pagesize,
        total: 0
      },
      tableColumns: [],
      isloading: false
    }
  },
  methods: {
    loadData(pagenum) {
      if (this.isloading) {
        return
      }
      const param = this.queryparam
      param.page = pagenum !== undefined ? pagenum : this.pagination.currentpage
      param.rows = this.pagination.pagesize
      this.isloading = true
      apiComm(this.apicode, param).then(res => {
        this.isloading = false
        if (res.code === 0 && res.success) {
          this.tableColumns = []
          for (let i = 0; i < res.data.columns.length; i++) {
            const item = {
              title: res.data.columns[i].headname,
              dataIndex: res.data.columns[i].bindname,
              align: 'center'
            }
            if (this.scopedSlots.indexOf(res.data.columns[i].bindname) >= 0) {
              item.scopedSlots = {
                customRender: res.data.columns[i].bindname
              }
            }
            this.tableColumns.push(item)
          }
          this.pagination.current = param.page
          this.pagination.total = res.totalcount
          this.tableData = res.data.list
        } else {
          this.$message.error(res.msg)
        }
        this.tableColumns.push({
          title: '操作',
          dataIndex: 'operation',
          width: 150,
          scopedSlots: { customRender: 'operation' },
          align: 'center'
        })
      })
    },
    exportExlce() {
      const param = this.queryparam
      ExportExlce(this.apicode, param).then(res => {
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
    handleTableChange(pagination) {
      this.loadData(pagination)
    },
    showSizeChange(page, pageSize) {
      this.pagination.pageSize = pageSize
      this.loadData(1)
    }
  },
  mounted() {
    this.loadData(1)
  }
}
</script>
<style lang="less">
.ant-table_footer {
  margin-top: 10px;
}
</style>
