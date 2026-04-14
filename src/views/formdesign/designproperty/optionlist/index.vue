<template>
  <div>
    <el-row v-if="false" style="position:inherit">
      <el-col :span="9" class="propertyborder-title" title="数据类型">
        数据类型
      </el-col>
      <el-col :span="15" class="propertyborder-content">
        <el-radio-group v-model="selectWidget.options.isRemote">
          <el-radio-button :label="true">动态数据</el-radio-button>
          <el-radio-button :label="false">静态数据</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <template v-if="selectWidget.options.isRemote === false">
      <el-col :span="9" class="propertyborder-title" title="选项">
        选项
      </el-col>
      <el-col :span="15" class="propertyborder-content">
        <el-button
          type="button"
          size="mini"
          @click="addbutton"
          style="    float: right; margin-top: 5px;"
        >
          <i class="fa fa-plus"></i>&nbsp;添加
        </el-button>
      </el-col>

      <el-col :span="24" class="widget-config-container">
        <template>
          <draggable
            tag="ul"
            :list="selectWidget.options.options"
            v-bind="{
              group: { name: 'options1' },
              ghostClass: 'ghost',
              handle: '.drag-item',
            }"
            handle=".drag-item"
          >
            <li
              v-for="(item, index) in selectWidget.options.options"
              :key="index"
              style="background: lightgray;padding: 2px;margin-bottom:2px;"
            >
              <!-- <el-input placeholder="栅格值" size="mini" style="width: 100px;" type="number" v-model.number="item.span"></el-input> -->
              <el-radio
                :label="selectWidget.options.options[index]"
                style="margin-right: 20px;"
                v-model="defaultValue"
                @change="radiochange"
              >
                <el-input
                  style="width: 45%;"
                  size="mini"
                  maxlength="50"
                  v-model="selectWidget.options.options[index]"
                ></el-input>
                <!-- <el-input style="width: 35%;" size="mini" maxlength="50" v-model="item.value" v-if="fromInfo.designType !== '/buildquestionnaire.html'"></el-input> -->
                <i
                  class="drag-item"
                  style="font-size: 16px;margin: 0 2px;cursor: move;"
                >
                  <i class="iconfont icon-icon_bars"></i>
                </i>
                <el-button
                  @click="handleButtonRemove(index)"
                  circle
                  plain
                  type="danger"
                  size="mini"
                  icon="el-icon-minus"
                  style="padding: 2px;"
                ></el-button>
                <i
                  class="drag-item fa fa-bars"
                  style="font-size: 16px;margin: 0 5px;cursor: move;"
                ></i>
              </el-radio>
            </li>
          </draggable>
        </template>
      </el-col>
    </template>
    <!-- <template v-else>
      <el-col :span="9" class="propertyborder-title" title="请求地址">
        请求地址
      </el-col>
      <el-col :span="15" class="propertyborder-content">
        <a-input-search
          placeholder="选择API"
          style="width: 100%"
          v-model="sourceName"
          @search="openform"
        />
      </el-col>
      <el-col :span="24" class="propertyborder-content">
        <el-button
          size="small"
          style="width: 100%"
          type="primary"
          @click="openwhereconfig"
          >添加过滤条件</el-button
        >
      </el-col>
      <el-col :span="9" class="propertyborder-title" title="绑定选项字段">
        选项字段
      </el-col>
      <el-col :span="15" class="propertyborder-content">
        <el-select v-model="labelValue" placeholder="请选择">
          <el-option
            v-for="item in selectfiledList"
            :key="item.bindname"
            :label="item.headname"
            :value="item.bindname"
            size="small"
          >
          </el-option>
        </el-select>
      </el-col>
    </template> -->
    <!-- <selectApilist
      ref="selectApilistcontrol"
      @select="confirmSelect"
      :isparamset="false"
      :methodType="1"
    ></selectApilist>
    <zhlDialog
      title="接口条件设置"
      ref="refwhereconfig"
      width="800px"
      class="my-dialog"
    >
      <whereconfig
        :queryfiledlist="paramlist"
        :querywherelist="wherelist"
        @saveinfo="savewherelist"
        @close="$refs.refwhereconfig.visible = false"
        :controlinfo="contdata"
      ></whereconfig>
    </zhlDialog> -->
  </div>
</template>
<script>
/* eslint-disable */
import draggable from 'vuedraggable'
export default {
  props: ['defaultValue'],
  data() {
    return {
      sourceName: '',
      sourceApi: '',
      labelValue: '',
      sourceApiId: '',
      sourcetype: '',
      paramlist: [],
      selectfiledList: [],
      fromInfo: this.changeFromInfo(),
      wherelist: [],
    }
  },
  components: { draggable },
  methods: {
    addbutton() {
      const index =
        this.$store.state.formdesignconfig.selectWidget.options.options.length +
        1
      this.$store.state.formdesignconfig.selectWidget.options.options.push(
        '选项' + index
      )
    },
    handleButtonRemove(index) {
      this.$store.state.formdesignconfig.selectWidget.options.options.splice(
        index,
        1
      )
    },
    openform() {
      this.$refs.selectApilistcontrol.openform()
    },
    confirmSelect(source) {
      if (this.sourceApi !== source.sourceApi) {
        this.sourceApi = source.sourceApi
        this.sourceName = source.sourceName
        this.type = source.type
        this.labelValue = ''
        this.wherelist = []
        this.loadsourcinfo()
      }
    },
    loadsourcinfo() {
      this.selectfiledList = []
      this.paramlist = []
      getApiConfigByCallMethodCode(this.sourceApi).then((res) => {
        if (res.code === 0) {
          this.selectfiledList = JSON.parse(res.data.headList)
          this.paramlist = JSON.parse(res.data.paramConfig)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    openwhereconfig() {
      if (this.sourceApi !== '' && this.selectfiledList.length > 0) {
        this.$refs.refwhereconfig.visible = true
      } else {
        this.$message.error('请先选择请求地址')
      }
    },
    savewherelist(querywherelist) {
      this.wherelist = querywherelist
      this.$refs.refwhereconfig.visible = false
    },
    radiochange() {
      this.$store.state.formdesignconfig.selectWidget.options.defaultValue = this.defaultValue
    },
  },
  computed: {
    selectWidget() {
      return this.$store.state.formdesignconfig.selectWidget
    },
    SetChangeFromInfo() {
      return this.changeFromInfo()
    },
  },
  created() {
    this.sourceName = this.$store.state.formdesignconfig.selectWidget.options.sourceName
    this.sourceApi = this.$store.state.formdesignconfig.selectWidget.options.sourceApi
    this.sourcetype = this.$store.state.formdesignconfig.selectWidget.options.sourcetype
    this.labelValue = this.$store.state.formdesignconfig.selectWidget.options.labelValue
    this.wherelist = this.$store.state.formdesignconfig.selectWidget.options.wherelist
    if (this.sourceApi !== '') {
      this.loadsourcinfo()
    }
  },
  watch: {
    sourcetype(val) {
      this.$store.state.formdesignconfig.selectWidget.options.sourcetype = val
    },
    sourceApi(newvalue) {
      this.$store.state.formdesignconfig.selectWidget.options.sourceApi = newvalue
      this.$store.state.formdesignconfig.selectWidget.options.sourceName = this.sourceName
    },
    labelValue(newvalue) {
      this.$store.state.formdesignconfig.selectWidget.options.labelValue = newvalue
    },
    wherelist(newvalue) {
      this.$store.state.formdesignconfig.selectWidget.options.wherelist = newvalue
    },
    SetChangeFromInfo(val) {
      this.fromInfo = val
    },
  },
  inject: ['changeFromInfo'],
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
/deep/ .el-radio-button__inner {
  padding: 10px 10px;
  font-size: 12px;
}
.widget-config-container {
  position: relative;
  max-height: 210px;
  overflow-y: ;
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
