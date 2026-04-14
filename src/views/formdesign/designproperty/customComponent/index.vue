<template>
  <div>
    <el-button type="success" size="mini" @click="opencustomComponent"
      >vueCode</el-button
    >
    <el-dialog
      title="自定义vue代码"
      :visible.sync="dialogVisible"
      width="1250px"
      top="3vh"
    >
      <monaco
        ref="monacoedit"
        language="html"
        :codeStr="vuecode"
        @loadInitAfter="loadAfter"
        :height="600"
      ></monaco>
      <el-row>
        <div style="float: right;display: inline-block;margin: 5px;">
          <el-button
            @click="savecustomcontent"
            type="primary"
            icon="fa fa-check"
            :plain="false"
            :round="false"
            :circle="false"
            :disabled="false"
          >
            保存
          </el-button>
          <el-button
            style="color:red"
            icon="el-icon-close"
            @click="dialogVisible = false"
            >关闭</el-button
          >
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import monaco from '../../monaco/index.vue'
export default {
  data() {
    return {
      dialogVisible: false,
    }
  },
  props: ['vuecode'],
  components: { monaco },
  methods: {
    loadAfter(monacoEditor) {
      monacoEditor.setValue(this.vuecode)
    },
    savecustomcontent() {
      this.vuecode = this.$refs.monacoedit.getvalue()
      this.$emit('update:customcontent', this.vuecode)
      this.dialogVisible = false
    },
    opencustomComponent() {
      this.dialogVisible = true
    },
  },
}
</script>
