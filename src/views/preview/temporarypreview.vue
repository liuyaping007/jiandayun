<template>
  <div v-if="postData !== null">
    <previewpage
      ref="previewPagemain"
      :postData="postData"
      :propsData="propsData"
      :designType="designType"
    ></previewpage>
  </div>
</template>
<script>
import previewpage from './index.vue'
export default {
  data() {
    return {
      postData: null,
      propsData: {},
      designType: '',
    }
  },
  methods: {
    init(event) {
      this.postData = event.data
      this.designType = this.$route.query.deviceMode
    },
  },
  components: { previewpage },
  created() {
    window.addEventListener('message', this.init)
  },
}
</script>
