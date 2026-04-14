<template>
  <div>
    <div style="padding: 2px 15px;"><i class="fa fa-database" style="color: darkorange;margin-right: 5px;"></i>{{querytitle}}</div>
  </div>
</template>
<script>
export default {
  name: 'queryrelevance',
  props: ['title'],
  data () {
    return {
      selectdata: {},
      querytitle: this.title === undefined || this.title === '' ? '关联查询组件' : this.title
    }
  },
  methods: {
    loadData (data) {
      this.selectdata = data
      this.$emit('selected', this.selectdata)
    }
  },
  watch: {
    title (val) {
      this.querytitle = val === undefined || val === '' ? '关联查询组件' : val
    }
  }

}
</script>
<style  scoped>
.input-with-select {
  width: calc(100% - 57px);
}
</style>
