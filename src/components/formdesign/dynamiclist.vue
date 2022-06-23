<template>
  <div>
    <el-col :span="9" class="propertyborder-title">
      <a-tooltip>
        <template slot="title">{{content}}</template>
        {{title}}
      </a-tooltip>
    </el-col>
    <el-col :span="15" class="propertyborder-content">
      <el-button
        type="button"
        size="mini"
        @click="addbutton"
        style="padding-top:5px;padding-bottom:5px;"
      >
        <i class="fa fa-plus"></i>&nbsp;添加面板
      </el-button>
    </el-col>
    <el-col :span="24" class="widget-config-container">
      <template>
        <draggable
          tag="ul"
          :list="datalist"
          v-bind="{
              group: { name: 'options1' },
              ghostClass: 'ghost',
              handle: '.drag-item',
            }"
          handle=".drag-item"
        >
          <li
            v-for="(item, index) in datalist"
            :key="index"
            style="background: lightgray;padding: 2px;margin-bottom:2px;"
          >
            <!-- <el-input placeholder="栅格值" size="mini" style="width: 100px;" type="number" v-model.number="item.span"></el-input> -->
            <div style="display:inline-block;width:60%;padding-left:10px;">
              <input v-model="item.options.title" style="width:80px" />
            </div>
            <el-button
              circle
              plain
              type="danger"
              size="mini"
              icon="el-icon-edit"
              :key="index"
              @click="dynamicplaneedit(index)"
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
            <i class="drag-item fa fa-bars" style="font-size: 16px;margin: 0 5px;cursor: move;"></i>
          </li>
        </draggable>
      </template>
    </el-col>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  props: ['title', 'content', 'datalist'],
  data() {
    return {}
  },
  components: { draggable },
  methods: {
    addbutton() {
      const index = this.datalist.length + 1
      this.datalist.push({
        list: [],
        options: {
          name:
            'dynamicplane' +
            Date.parse(new Date()) +
            Math.ceil(Math.random() * 99999),
          title: '面板' + index
        }
      })
    },
    handleButtonRemove(index) {
      this.datalist.splice(index, 1)
    },
    dynamicplaneedit(index) {
      this.$parent.layerPlaneshowDialog(this.datalist[index])
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
