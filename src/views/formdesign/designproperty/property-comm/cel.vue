<script>
export default {
  props: {
    prop: {
      type: String,
      default: ''
    },
    lable: {
      type: String,
      default: ''
    },
    thstyle: {
      type: String,
      default: ''
    },
    tdstyle: {
      type: String,
      default: ''
    },
    w: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      renderCell: {}
    }
  },
  created() {
    this.renderCell = (h, data) => {
      if (this.$scopedSlots.default) {
        const param = { row: data.row, index: data.$index + 1 }
        return h('div', [this.$scopedSlots.default(param)])
      }
      if (data.column.type === 'index') {
        return h('div', data.$index + 1)
      }
      return h('div', data.row[this.prop])
    }
  },
  computed: {
    parent() {
      // 查找父组件
      let parent = this.$parent
      let parentName = parent.$options.componentName
      if (parent) {
        while (parentName !== 'table' && parent.$parent) {
          parent = parent.$parent
          parentName = parent.$options.componentName
        }
      }
      return parent
    }
  },
  render(h) {
    return h('div', '')
  }
}
</script>
