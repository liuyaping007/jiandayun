<template>
  <div>
    <span class="ant-input-search ant-input-affix-wrapper" data-v-a1ccd506=""
      ><input
        v-model="icon"
        type="text"
        readonly="readonly"
        class="ant-input"/><span class="ant-input-suffix" @click="selectIcon"
        ><i
          aria-label="图标: search"
          tabindex="-1"
          class="anticon anticon-search ant-input-search-icon"
          ><svg
            viewBox="64 64 896 896"
            data-icon="search"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            class=""
          >
            <path
              d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
            ></path></svg></i></span
    ></span>
    <zhlDialog
      title="图标选择"
      ref="selectIcondialog"
      width="860px"
      class="my-dialog"
    >
      <selecticons @selected="selectconfirm"></selecticons>
    </zhlDialog>
  </div>
</template>
<script>
import selecticons from '@/views/Manage/icons.vue'
export default {
  props: ['value'],
  data() {
    return {
      icon: this.value
    }
  },
  components: { selecticons },
  methods: {
    selectIcon() {
      this.$refs.selectIcondialog.visible = true
    },
    selectconfirm(iconname) {
      this.icon = iconname
      this.$emit('update:value', iconname)
      this.$refs.selectIcondialog.visible = false
    }
  }
}
</script>
