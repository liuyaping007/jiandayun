<template>
  <div>
    <complane>
      <template slot="title">
        <nxnsvgicon
          class-name="template-icon"
          icon-class="template"
          class="template"
        />模板选择</template
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
