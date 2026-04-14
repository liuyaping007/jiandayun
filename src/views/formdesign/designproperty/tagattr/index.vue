<template>
  <div>
    <el-button type="success" size="mini" @click="opencustomComponent"
      >属性设置</el-button
    >
    <el-dialog
      title="自定义属性设置"
      :visible.sync="dialogVisible"
      width="850px"
      top="3vh"
    >
      <div class="whereconfigplane">
        <div class="trhead">
          <div class="tdhead filedwidth1">属性名</div>
          <div class="tdhead filedwidth">
            属性值
          </div>
          <div class="tdhead operatewidth">
            操作
          </div>
          <div class="clearfloat"></div>
        </div>
        <div class="tr" v-for="(item, index) in datalist" :key="index">
          <div class="td filedwidth1">
            <div class="tdcontext">
              <el-input
                v-model="item.name"
                placeholder="请输入自定义属性名"
              ></el-input>
            </div>
          </div>
          <div class="td filedwidth">
            <div class="tdcontext">
              <el-input
                v-model="item.value"
                placeholder="请输入自定义属性值"
              ></el-input>
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
          <i class="el-icon-plus"></i>添加自定义属性
        </div>
      </div>
      <div style="text-align: right;">
        <el-button type="primary" @click="savetagattrinfo" icon="el-icon-check"
          >保存</el-button
        >
        <el-button @click="close" icon="el-icon-close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['tagattrdata'],
  methods: {
    addrow() {
      this.datalist.push({
        name: '',
        value: '',
      })
    },
    delrow(item) {
      this.datalist.splice(this.datalist.indexOf(item), 1)
    },
    savetagattrinfo() {
      let attrstr = ''
      for (let i = 0; i < this.datalist.length; i++) {
        if (this.datalist[i].name === '') {
          this.$message.error('第' + (i + 1) + '行自定义属性名不能为空！')
          return
        }
        attrstr =
          attrstr +
          ' ' +
          this.datalist[i].name +
          '="' +
          this.datalist[i].value +
          '"'
      }

      console.log(attrstr)
      this.$emit('update:tagattrdata', attrstr)
      this.dialogVisible = false
    },
    close() {
      this.dialogVisible = false
    },
    loadInit() {
      this.datalist = []
      if (this.tagattrdata !== undefined) {
        const regex = new RegExp(
          '([\u4e00-\u9fa5a_A-Za-z0-9].*?("|\')\\s)',
          'g'
        )
        const resultList = this.tagattrdata.match(regex)
        if (resultList != null) {
          for (let i = 0; i < resultList.length; i++) {
            const rowitem = resultList[i].split('=')
            this.datalist.push({
              name: rowitem[0],
              value: rowitem[1].replaceAll('"', '').trim(),
            })
          }
        }
      }
    },
    opencustomComponent() {
      this.loadInit()
      this.dialogVisible = true
    },
  },
  data() {
    return { datalist: [], dialogVisible: false }
  },
  mounted() {},
}
</script>
<style scoped>
.whereconfigplane {
  height: 400px;
  max-height: 400px;
  overflow: hidden;
  overflow-y: auto;
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
