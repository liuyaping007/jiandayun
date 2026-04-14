<template>
  <div>
    <el-col :span="9" class="propertyborder-title" :title="content">
      {{ title }}
    </el-col>
    <el-col :span="15" class="propertyborder-content">
      <el-button
        type="button"
        size="mini"
        @click="addbutton"
        style="padding-top:5px;padding-bottom:5px;"
      >
        <i class="fa fa-plus"></i>&nbsp;添加按钮
      </el-button>
    </el-col>
    <el-col :span="24" class="widget-config-container">
      <draggable
        tag="ul"
        :list="buttonlist"
        v-bind="{
          group: { name: 'options1' },
          ghostClass: 'ghost',
          handle: '.drag-item',
        }"
        handle=".drag-item"
      >
        <li
          v-for="(item, index) in buttonlist"
          :key="index"
          style="background: lightgray;padding: 2px;margin-bottom:2px;"
        >
          <!-- <el-input placeholder="栅格值" size="mini" style="width: 100px;" type="number" v-model.number="item.span"></el-input> -->
          <div style="display:inline-block;width:60%;padding-left:10px;">
            <i
              :class="item.options.icon"
              slot="reference"
              style="font-size:12px;margin-right:5px;width:10px;"
              @click="clickicon(item)"
            ></i>
            <input v-model="item.options.title" style="width:80px" />
          </div>
          <el-button
            circle
            plain
            type="danger"
            size="mini"
            icon="el-icon-edit"
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
    </el-col>
    <el-dialog
      title="图标选择"
      :visible.sync="dialogVisible"
      width="850px"
      top="3vh"
    >
      <selecticon @selected="selectconfirm"></selecticon>
    </el-dialog>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import selecticon from '../selecticon/index.vue'
export default {
  props: ['title', 'content', 'datalist'],
  data() {
    return {
      dialogVisible: false,
      selectItem: {},
      buttonlist: [],
    }
  },
  components: { draggable, selecticon },
  created() {
    this.buttonlist = this.datalist
  },
  methods: {
    addbutton() {
      const index = this.buttonlist.length + 1
      this.buttonlist.push({
        name: '按钮',
        isShowCheck: true,
        isShowSpanSetting: true,
        layout: 'inline',
        id: 'btn_' + Date.parse(new Date()) + Math.ceil(Math.random() * 99999),
        eventlist: [],
        options: {
          labelTitle: '按钮' + index,
          butType: '',
          icon: 'fa fa-plus',
          tagattr: '',
          butsize: 'small',
          isplain: false,
          isround: false,
          disabled: false,
          iscircle: false,
        },
      })
    },
    handleButtonRemove(index) {
      this.datalist.splice(index, 1)
    },
    showJSDialog(index) {
      this.$parent.buttonEdit(this.buttonlist[index])
    },
    clickicon(item) {
      this.selectItem = item
      this.dialogVisible = true
    },
    selectconfirm(icon) {
      this.selectItem.options.icon = icon.iconname
      this.dialogVisible = false
    },
  },
  watch: {
    datalist() {
      this.buttonlist = this.datalist
    },
  },
}
</script>
<style scoped lang="less">
.propertyborder-title {
  height: 36px;
  line-height: 36px;
  padding-left: 3px;
  border-top: none;
  border-right: none;
}

.propertyborder-content {
  border-top: none;
  border-right: none;
  padding-right: 3px;
  padding-left: 3px;
  padding-top: 4px;
  padding-bottom: 4px;
  height: 36px;
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
