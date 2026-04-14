<template>
  <div>
    <complane>
      <template slot="title">
        <nxnsvgicon
          class-name="logic-icon"
          icon-class="logic"
          class="logic"
        />逻辑配置</template
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
