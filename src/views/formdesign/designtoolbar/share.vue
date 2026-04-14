<template>
  <div>
    <complane>
      <template slot="title">
        <i data-v-0bfe654d="" class="fa fa-share-alt"></i>组件共享库</template
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
