<template>
  <div>
    <el-col :span="9" class="propertyborder-title" :title="content">
      {{ title }}
    </el-col>
    <el-col :span="15" class="propertyborder-content">
      <el-dropdown @command="addColumn">
        <span class="el-dropdown-link">
          添加字段<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <div v-for="(ctrl, index) in defaultrules" :key="index">
            <el-dropdown-item :command="{ ctrl, index: 0 }">{{
              ctrl.label
            }}</el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col :span="24" class="widget-config-container">
      <template>
        <ul>
          <li style="background: lightgray;padding: 2px;margin-bottom:2px;">
            <div style="display:inline-block;width:80%;padding-left:10px;">
              <label style="width:65px;float:left">表达式</label>
              <label style="width:105px;float:left;margin-left: 5px;"
                >提示内容</label
              >
            </div>
            <label>操作</label>
          </li>
        </ul>
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
            <div style="display:inline-block;width:80%;padding-left:10px;">
              <input v-model="item.pattern" style="width:65px;float:left" />
              <input
                v-model="item.message"
                style="width:105px;float:left;margin-left: 5px;"
              />
            </div>

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
export default {
  props: ['title', 'content', 'datalist'],
  data() {
    return {
      defaultrules: [
        { pattern: '', message: '', label: '自定义验证' },
        {
          pattern:
            '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$',
          message: '手机号码有误！',
          label: '手机号码',
        },
        {
          pattern:
            '^\\\\w+([-+.]\\\\w+)*@\\\\w+([-.]\\\\w+)*\\\\.\\\\w+([-.]\\\\w+)*$',
          message: 'Email有误！',
          label: 'Email验证',
        },
        {
          pattern: '^http://([\\\\w-]+\\\\.)+[\\\\w-]+(/[\\\\w-./?%&=]*)?$',
          message: 'URL有误！',
          label: 'URL验证',
        },
        {
          pattern: '^\\\\d{15}|\\\\d{18}$',
          message: '身份证有误！',
          label: '身份证',
        },
        {
          pattern: '\\\\d{3}-\\\\d{8}|\\\\d{4}-\\\\d{7}',
          message: '电话号码有误！',
          label: '电话号码',
        },
        {
          pattern: '^[1-9][0-9]*$',
          message: '金钱有误！',
          label: '金钱验证',
        },
        {
          pattern: '[1-9][0-9]{4,}',
          message: 'QQ号有误！',
          label: 'QQ号验证',
        },
        {
          pattern: '[1-9]\\d{5}(?!\\d)',
          message: '邮政编码有误！',
          label: '邮政编码验证',
        },
        {
          pattern:
            '((?:(?:25[0-5]|2[0-4]\\\\d|[01]?\\\\d?\\d)\\\\.){3}(?:25[0-5]|2[0-4]\\\\d|[01]?\\\\d?\\\\d))',
          message: 'IP地址有误！',
          label: 'IP地址验证',
        },
        {
          pattern: '^[\\u4e00-\\u9fa5]{0,}$',
          message: '只能输入汉字！',
          label: '汉字验证',
        },
      ],
    }
  },
  methods: {
    addColumn(ctrl) {
      const index = this.datalist.length + 1
      this.datalist.splice(index, 0, JSON.parse(JSON.stringify(ctrl.ctrl)))
    },
    handleButtonRemove(index) {
      this.datalist.splice(index, 1)
    },
  },
  components: { draggable },
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
  text-align: right;
}
.widget-config-container {
  position: relative;
  max-height: 210px;
  overflow-y: auto;
  overflow-x: hidden;
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
