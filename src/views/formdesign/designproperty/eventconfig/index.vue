<template>
  <div class="eventconfig">
    <el-col :span="24" class="propertyborder-title">
      <div class="dropdownmenu  el-icon-arrow-up">
        <span>添加事件</span>
        <div class="submenu">
          <div class="context">
            <div
              class="item"
              v-for="ctrl in controleventlist"
              :key="ctrl.label"
              @click="addevent(ctrl)"
            >
              <i class="fa fa-bolt" /> {{ ctrl.label }}
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="24" class="widget-config-container">
      <propertylist :gridlist="controldata.options.eventlist">
        <listcel prop="text" lable="事件名称" :w="80">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.value"
              placeholder="请输入事件名称"
              size="mini"
            ></el-input>
          </template>
        </listcel>
        <listcel prop="text" lable="操作" :w="20">
          <template slot-scope="scope">
            <div class="optionclass">
              <a class="el-icon-delete" @click="delevent(scope.row)">删除</a>
            </div>
          </template>
        </listcel>
      </propertylist>
    </el-col>
  </div>
</template>
<script>
import { cotorlEventConfig } from '../../config/eventconfig.js'
import propertylist from '../property-comm/desigtable.vue'
import listcel from '../property-comm/cel.vue'
export default {
  props: ['options'],
  data() {
    return {
      isadd: false,
      controleventlist: [],
    }
  },
  components: { propertylist, listcel },
  methods: {
    addevent(ctrl) {
      if (this.controldata.options.eventlist === undefined) {
        this.controldata.options.eventlist = []
      }
      const eventlist = this.controldata.options.eventlist.filter((item) => {
        return item.label === ctrl.label
      })
      if (eventlist === undefined || eventlist.length === 0) {
        this.controldata.options.eventlist.push({
          label: ctrl.label,
          value: ctrl.getfunction(this.controldata),
          content: ctrl.content,
        })
        this.$emit('addevent')
      }
    },
    delevent(row) {
      this.controldata.options.eventlist.splice(
        this.controldata.options.eventlist.indexOf(row),
        1
      )
      this.$forceUpdate()
    },
    handleButtonRemove(index) {
      this.controldata.options.eventlist.splice(index, 1)
    },
    loadEventConfig(val) {
      if (val != null) {
        if (
          this.controldata !== null &&
          this.controldata.options != null &&
          this.controldata.options.eventlist === undefined
        ) {
          this.controldata.options.eventlist = []
        }
        this.isadd = true
        if (cotorlEventConfig[val.type] !== undefined) {
          this.controleventlist = cotorlEventConfig[val.type]
        }
      } else {
        this.isadd = false
      }
    },
  },
  watch: {
    controldata(val) {
      this.loadEventConfig(val)
    },
  },
  mounted() {
    this.loadEventConfig(this.controldata)
    if (
      this.controldata !== null &&
      this.controldata.options != null &&
      this.controldata.options.eventlist === undefined
    ) {
      this.controldata.options.eventlist = []
    }
  },
  computed: {
    controldata() {
      return this.$store.state.formdesignconfig.selectWidget
    },
  },
}
</script>
<style scoped>
.eventconfig {
  height: calc(100vh - 110px);
}
.dropdownmenu {
  float: left;
  padding-left: 10px;
  position: relative;
}
.dropdownmenu span {
  padding-left: 5px;
  font-size: 14px;
  line-height: 28px;
}
.submenu {
  position: absolute;
  top: 12px;
  left: 15px;
  z-index: 5;
  display: none;
}
.submenu .context {
  margin-top: 10px;
  border: 1px solid #d9d9d96e;
  padding: 10px;
  width: 120px;
  background-color: #fff;
  border-radius: 5px;
}
.submenu .context .item {
  line-height: 32px;
  height: 32px;

  border-bottom: 1px solid #d9d9d96e;
  width: 100%;
}
.submenu .context .item i {
  font-size: 14px;
  margin: 5px;
}
.submenu .context .item:last-child {
  border-bottom: 0px solid #d9d9d96e !important;
}
.submenu .context .item:hover {
  color: #fafcfc;
  background-color: #409eff;
}

.dropdownmenu:hover .submenu {
  display: block;
}
.optionclass {
  text-align: center;
}
</style>
