<template>
  <div>
    <el-input
      placeholder="请输入内容"
      v-model="value"
      @focus="openicon()"
      size="mini"
    >
      <i
        slot="suffix"
        @click="openicon()"
        class="el-input__icon el-icon-search"
      ></i>
    </el-input>

    <el-dialog
      title="图标选择"
      :visible.sync="dialogVisible"
      width="850px"
      top="3vh"
    >
      <selecticon @selected="selectedicon"></selecticon>
    </el-dialog>
  </div>
</template>
<script>
import selecticon from '../selecticon/index.vue'
export default {
  props: ['val'],
  data() {
    return { dialogVisible: false, value: '' }
  },
  created() {
    this.value = this.val
  },
  components: { selecticon },
  methods: {
    openicon() {
      this.dialogVisible = true
    },
    selectedicon(iconobj) {
      this.value = iconobj.iconname
      this.$emit('update:val', this.value)
      this.dialogVisible = false
    },
  },
  watch: {
    val() {
      this.value = this.val
    },
  },
}
</script>
