<template>
  <div>
    <div class="hide">
      <slot></slot>
    </div>
    <div class="listhead" v-if="isheadshow">
      <div
        v-for="(item, columnindex) in getcolumns"
        :key="columnindex"
        class="th"
        :style="defaultcss + item.componentOptions.propsData.thstyle"
      >
        <div class="title">{{ item.componentOptions.propsData.lable }}</div>
      </div>
    </div>
    <div
      class="listrow"
      v-for="(row, index) in griddata"
      :key="index"
      @click="clickrow(row)"
    >
      <listtd
        v-for="(column, columnindex) in getcolumns"
        :key="columnindex"
        :column="column"
        :row="row"
        :index="index"
        :style="defaultcss + column.componentOptions.propsData.tdstyle"
        class="td"
      ></listtd>
    </div>
  </div>
</template>
<script>
import listtd from './td.vue'
export default {
  props: {
    gridlist: {
      type: Array,
      default() {
        return []
      },
    },
    isheadshow: {
      type: Boolean,
      default() {
        return true
      },
    },
  },
  data() {
    return { columns: [], defaultcss: '' }
  },
  components: { listtd },
  computed: {
    getcolumns() {
      let columnslist = []
      let cortorllist = this.$slots.default
      if (cortorllist !== undefined && cortorllist !== null) {
        let sumw = 0
        cortorllist.forEach((ee) => {
          if (
            ee.componentOptions !== undefined &&
            ee.componentOptions.tag === 'listcel'
          ) {
            sumw = sumw + ee.componentOptions.propsData.w
            columnslist.push(ee)
          }
        })

        return columnslist
      }
      return columnslist
    },
    griddata() {
      if (this.gridlist === undefined || this.gridlist === null) {
        return []
      }
      return this.gridlist
    },
  },
  methods: {
    clickrow(row) {
      this.$emit('clickrow', row)
    },
  },
  created() {
    this.defaultcss = 'width:' + 100 / this.getcolumns.length + '%;'
  },
  mounted() {},
}
</script>
<style scoped>
.listhead {
  margin: 5px;
  margin-top: 15px;
  margin-bottom: 0px;
  display: flex;
  background-color: #8799a3;
  line-height: 35px;
  height: 35px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
}
.listhead .th {
  border-right: 1px solid #a1a1a5;
  padding-right: 10px;
}
.listhead .th .title {
  text-align: center;
}
.listhead .th:last-child {
  border-right-width: 0px;
}
.listrow {
  display: flex;
  line-height: 35px;
  height: 35px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
}
.listrow .td {
  /* border-right: 1px solid #68686b; */
  /* padding-right: 15px; */
}
.listrow:hover {
  background-color: #d2f1f080 !important;
}
.listrow .td:last-child {
  border-right-width: 0px;
}
.listrow:nth-child(odd) {
  background-color: #f0f0f0;
}
.listrow:nth-child(even) {
  background-color: #e7ebed;
}
</style>
