<template>
  <div
    class="formplane widget-grid-container"
    :class="ishide === true && ctrldata.istitle !== false ? 'contenthide' : ''"
  >
    <div
      class="plane-header"
      @click="ishide = !ishide"
      v-if="element.type === 'gridPanel' && ctrldata.istitle !== false"
    >
      <span class="formplane-title"
        ><i :class="ctrldata.icon"></i>{{ ctrldata.title }}</span
      >
      <div class="plane-rigth">
        <i class="el-icon-arrow-down" v-if="ishide === false"></i>
        <i class="el-icon-arrow-right" v-if="ishide === true"></i>
      </div>
    </div>
    <draggable
      class="widget-form-list"
      v-model="ctrldata.columns"
      v-bind="{
        group: { name: 'basectrl' },
        ghostClass: 'ghost',
        animation: 150,
      }"
      @add="handleWidgetAdd"
    >
      <basefrom
        v-for="el in ctrldata.columns"
        :key="el.model"
        :element="el"
        @copyctrl="copyctrl"
        @deletectrl="deletectrl"
      ></basefrom>
    </draggable>
  </div>
</template>
<script>
import basefrom from './basefrom.vue';
import draggable from 'vuedraggable';
import { getnewid } from '../formcomm.js';
import store from '@/store';
import configs from '@/configs/index.js';
export default {
  props: ['ctrldata', 'element'],
  components: { draggable, basefrom },
  data() {
    return { forminfo: this.changeFromInfo(), ishide: false };
  },
  computed: {
    SetChangeFromInfo() {
      return this.changeFromInfo();
    },
  },
  created() {},

  watch: {
    SetChangeFromInfo(val) {
      this.forminfo = val;
    },
  },
  methods: {
    handleWidgetAdd(evt) {
      /// 拖拽布局控件添加方法
      const newIndex = evt.newIndex;
      if (evt.pullMode === 'clone') {
        let cotrl = JSON.parse(JSON.stringify(this.ctrldata.columns[newIndex]));
        const key = getnewid(this.forminfo, cotrl.type);
        cotrl.model = key;
        cotrl.key = key;
        if (this.element.type === 'layouttable') {
          cotrl.options.lg = 24;
          cotrl.options.md = 24;
          cotrl.options.xs = 24;
          // cotrl.options.istitle = false
        }
        if (cotrl.options.filed !== undefined) {
          cotrl.options.filed = key;
        }
        if (cotrl.options.controlId !== undefined) {
          cotrl.options.controlId = key;
        }
        this.$set(this.ctrldata.columns, newIndex, cotrl);
      } else {
        let cotrl = this.ctrldata.columns[newIndex];
        this.$set(this.ctrldata.columns, newIndex, cotrl);
      }
      store.commit('setselectWidget', this.ctrldata.columns[newIndex]);
      this.$parent.$forceUpdate();
    },
    handleWidgetColAdd() {},
    copyctrl(evt) {
      let cotrljson = JSON.stringify(evt);
      const result = kylinjson.kylinjson({
        path: '$..model',
        json: evt,
        key: configs.keycode,
      });
      result.forEach((ee) => {
        cotrljson = cotrljson.replaceAll(
          ee,
          getnewid(this.forminfo, ee.split('_')[0])
        );
      });
      let cotrl = JSON.parse(cotrljson);
      this.ctrldata.columns.push(cotrl);
      store.commit('setselectWidget', cotrl);
    },
    deletectrl(evt) {
      let index = this.ctrldata.columns.indexOf(evt);
      this.ctrldata.columns.splice(index, 1);
      if (this.ctrldata.columns.length > 0) {
        if (index < this.ctrldata.columns.length) {
          store.commit('setselectWidget', this.ctrldata.columns[index]);
        } else {
          store.commit('setselectWidget', this.ctrldata.columns[0]);
        }
      } else {
        store.commit('setselectWidget', null);
      }
    },
  },
  inject: ['changeFromInfo'],
};
</script>

<style scoped>
.formplane {
  border: 1px solid #d9d9d9;
  width: calc(100% - 2px);
  height: 100%;
  min-height: 42px;
  border-radius: 4px;
}
.contenthide >>> .widget-form-list {
  display: none;
}
.formplane-title i {
  margin: 5px;
  font-size: 20px;
  margin-top: 8px;
  position: relative;
  float: left;
}
.plane-header {
  line-height: 38px;
  border-bottom: 1px solid #ccced3;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: bold;
  padding-left: 20px;
}
.plane-header span {
  border-radius: 4px;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.plane-header i {
  padding-right: 5px;
}
.plane-header .plane-rigth {
  float: right;
  padding-right: 15px;
}
</style>
