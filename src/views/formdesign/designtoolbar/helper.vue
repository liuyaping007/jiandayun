<template>
  <div>
    <complane>
      <template slot="title">
        <nxnsvgicon
          class-name="help-icon"
          icon-class="help"
          class="help fontsize26"
        />帮助文档</template
      >
      <template slot="content"> </template>
    </complane>
  </div>
</template>
<script>
import nxnsvgicon from '@/icons/index.vue'
import complane from './complane.vue'
export default {
  components: { complane, nxnsvgicon },
}
</script>
