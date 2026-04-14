<script>
export default {
  data() {
    return {}
  },
  // columnIndex当前列号
  // index当前行号
  props: ['column', 'row', 'index'],
  components: {},
  methods: {},
  computed: {},
  mounted() {},
  render(h) {
    const row = this.row // 传进来的表格行数数据
    const column = this.column.componentInstance // column组件数据
    const $index = this.index
    let param = { row, column, $index }
    return this.column.componentInstance.renderCell.call(this, h, param)
  }
}
</script>
