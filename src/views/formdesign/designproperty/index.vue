<template>
  <div class="designproperty" :style="withcss" v-if="isshowrigth">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="控件属性" name="first">
        <template v-if="controldata !== null">
          <ctrlproperty
            :options.sync="controldata.options"
            v-if="controldata.options !== undefined"
          ></ctrlproperty>
          <ctrlproperty :options.sync="controldata" v-else></ctrlproperty>
        </template>
      </el-tab-pane>
      <el-tab-pane label="事件" name="second"
        ><template v-if="controldata !== null">
          <eventconfig
            :options.sync="controldata.options"
            v-if="
              controldata.options !== undefined &&
                controldata.options.eventlist !== undefined
            "
          ></eventconfig>
          <eventconfig
            :options.sync="controldata"
            v-else-if="controldata.eventlist !== undefined"
          ></eventconfig>
        </template>
      </el-tab-pane>
      <el-tab-pane label="表单属性" name="third"
        ><formproperty></formproperty
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import eventconfig from './eventconfig/index.vue'
import ctrlproperty from './ctrlproperty/index.vue'
import formproperty from './formproperty/index.vue'
export default {
  computed: {
    isshowrigth() {
      return this.$store.state.formdesignconfig.isrigth
    },
    withcss() {
      return this.$store.state.formdesignconfig.rigth + 'px'
    },
    controldata() {
      return this.$store.state.formdesignconfig.selectWidget
    },
  },
  data() {
    return { activeName: 'first' }
  },

  components: { eventconfig, ctrlproperty, formproperty },
  methods: {
    handleClick() {},
  },
}
</script>
<style scoped>
.designproperty {
  min-width: 324px;
  height: 100%;
  border-left: 1px solid var(--border-color);
  width: 324px;
  float: right;
}
.designproperty >>> .el-tabs {
  margin: 2px;
}
.designproperty >>> .el-tabs__header {
  margin: 0 0 3px !important;
}
</style>
