<template>
  <div style="line-height: 30px;" class="autonotext">
    {{ autocode }}
  </div>
</template>
<script>
import { ApiGetProcinstNumber } from '@/api/tappPorcessins'
export default {
  name: 'autono',
  props: ['BusinessMoudle', 'BusinessModuleID', 'modelcode'],
  data() {
    return {
      param: {
        BusinessMoudle: this.BusinessMoudle,
        BusinessModuleID: this.BusinessModuleID
      },
      autocode: ''
    }
  },
  methods: {
    getmodelcode() {
      ApiGetProcinstNumber(this.param).then(res => {
        if (res.code === 0) {
          this.autocode = res.data
          this.$emit('update:modelcode', this.autocode)
          this.$emit('loadData', this.autocode)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  created() {
    this.autocode = this.modelcode
  },
  watch: {
    autocode(val) {
      if (this.modelcode !== val) {
        this.$emit('update:modelcode', val)
      }
    },
    modelcode(val) {
      if (this.autocode !== val) {
        this.autocode = val
      }
    }
  }
}
</script>
