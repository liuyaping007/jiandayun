<template>
  <div class="kylindeign" :style="css">
    <designhead></designhead>
    <formdesign v-if="designStep === 'form'"></formdesign>
    <formconfigure v-else-if="designStep === 'formconfigure'"> </formconfigure>
    <formdesign v-else-if="designStep === 'list'"></formdesign>
    <publish v-else></publish>
  </div>
</template>
<script>
import designhead from './designhead/index.vue'
import formdesign from './formdesign.vue'
import formconfigure from './formconfigure/index.vue'
import publish from './publish/index.vue'
export default {
  data() {
    return {
      css: '',
    }
  },
  computed: {
    designStep() {
      return this.$store.state.formdesignconfig.designStep
    },
  },
  created() {
    let $this = this
    window.addEventListener('resize', () => {
      $this.css = 'transform: scale(' + document.body.clientWidth / 1920 + ');'
    })
    this.css = 'transform: scale(' + document.body.clientWidth / 1920 + ');'
  },
  components: { designhead, formdesign, formconfigure, publish },
}
</script>
<style scoped>
.kylindeign {
  overflow: hidden;
  transform-origin: left top;
  width: 1920px;
  height: 1080px;
  transform: scale(1);
  position: fixed;
}
</style>
