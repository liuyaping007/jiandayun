<template>
  <div>
    <el-col :span="9" class="propertyborder-title">
      <a-tooltip>
        <template slot="title">{{ content }}</template>
        {{ title }}
      </a-tooltip>
    </el-col>
    <el-col :span="15" class="propertyborder-content">
      <span
        class="el-dropdown-link"
        @click="addbutton"
        style="padding-top:5px;padding-bottom:5px;cursor:pointer;"
      >
        <i class="fa fa-plus"></i>&nbsp;添加字段
      </span>
      <span
        class="el-dropdown-link"
        @click="loadfiled"
        style="padding-top:5px;padding-bottom:5px;cursor:pointer;"
      >
        <i class="fa fa-plus"></i>&nbsp;加载字段
      </span>
    </el-col>
    <el-col :span="24" class="widget-config-container">
      <template>
        <draggable
          tag="ul"
          :list="datalist"
          v-bind="{
            group: { name: 'options1' },
            ghostClass: 'ghost',
            handle: '.drag-item'
          }"
          handle=".drag-item"
        >
          <li style="background: lightgray;padding: 2px;margin-bottom:2px;">
            <div style="display:inline-block;width:60%;padding-left:10px;">
              <label style="width:65px;float:left">表头</label>
              <label style="width:65px;float:left;margin-left: 5px;"
                >绑定字段</label
              >
            </div>
            <label>操作</label>
          </li>
          <li
            v-for="(item, index) in datalist"
            :key="index"
            style="background: lightgray;padding: 2px;margin-bottom:2px;"
          >
            <!-- <el-input placeholder="栅格值" size="mini" style="width: 100px;" type="number" v-model.number="item.span"></el-input> -->
            <div style="display:inline-block;width:60%;padding-left:10px;">
              <input v-model="item.title" style="width:65px;float:left" />
              <input
                v-model="item.dataIndex"
                style="width:65px;float:left;margin-left: 5px;"
              />
            </div>
            <el-button
              circle
              plain
              type="danger"
              size="mini"
              icon="fa fa-bolt"
              :key="index"
              @click="showJSDialog(index)"
              style="padding: 4px;margin-left: 5px;width:22px;"
            ></el-button>
            <el-button
              @click="handleButtonRemove(index)"
              circle
              plain
              type="danger"
              size="mini"
              icon="el-icon-minus"
              style="padding: 4px;margin-left: 5px;"
            ></el-button>
            <i
              class="drag-item fa fa-bars"
              style="font-size: 16px;margin: 0 5px;cursor: move;"
            ></i>
          </li>
        </draggable>
      </template>
    </el-col>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { getListHeadCell } from '@/api/index'
export default {
  props: ['title', 'content', 'datalist', 'widgetdata'],
  data() {
    return {
      selectwidgetdata: this.widgetdata
    }
  },
  components: { draggable },
  methods: {
    addbutton() {
      const index = this.datalist.length + 1
      this.datalist.push({
        title: '字段' + index,
        dataIndex: ''
      })
    },
    loadfiled() {
      if (this.selectwidgetdata.options.sourceApi === '') {
        this.$message.error('请选择数据源API')
        return
      }
      this.datalist.length = 0
      getListHeadCell(this.selectwidgetdata.options.sourceApi).then(res => {
        if (res.code === 0 && res.success) {
          for (let i = 0; i < res.data.length; i++) {
            this.datalist.push({
              title: res.data[i].headname,
              dataIndex: res.data[i].bindname
            })
          }
        }
      })
      this.datalist.push({
        title: '操作',
        dataIndex: 'operation'
      })
    },
    handleButtonRemove(index) {
      this.datalist.splice(index, 1)
    },
    showJSDialog(index) {
      console.log(index)
    }
  }
}
</script>
<style scoped lang="less">
.propertyborder-title {
  height: 42px;
  line-height: 42px;
  padding-left: 3px;
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
}

.propertyborder-content {
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
  padding-right: 3px;
  padding-left: 3px;
  padding-top: 4px;
  padding-bottom: 4px;
  height: 42px;
}
.widget-config-container {
  position: relative;

  .el-header {
    border-bottom: solid 2px #e4e7ed;
    padding: 0px;
  }

  .column-setting .el-form-item__label {
    float: none;
    display: inline-block;
    text-align: left;
    padding: 0 0 2px;
  }

  .config-content {
    border-left: solid 1px #e6e6e6;

    .el-form-item__label {
      padding: 0;
      font-weight: 500;
      float: none;
    }

    .el-form-item {
      /*border-bottom: solid 1px #e1e1e1;
            margin-bottom: 0px;*/
      margin: 5px;
    }
  }

  .ghost {
    background: #fff;
    border: 1px dashed #409eff;

    &::after {
      background: #fff;
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li.ghost {
    list-style: none;
    font-size: 0;
    display: block;
    position: relative;
  }
}
</style>
