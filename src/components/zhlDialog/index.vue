<template>
  <a-modal
    :title="oTitle"
    :visible="visible"
    v-if="visible"
    :width="width"
    :zIndex="801"
    :bodyStyle="{ top }"
    :wrapClassName="wrapClassName"
    centered
    :footer="null"
    @click.native="windowSwitch"
    @cancel="closed"
  >
    <div class="dialog-tools">
      <i
        style="font-size: 14px;"
        class="zht-icon-sami-select is-portal-color"
        title="最小化"
        @click.stop="windowSwitch"
      />
      <i
        :class="
          windowMax
            ? 'zht-icon-icon--1 is-portal-color'
            : 'zht-icon-icon-- is-portal-color'
        "
        @click="windowMax = !windowMax"
      ></i>
    </div>
    <slot />
    <slot name="footer" />
  </a-modal>
</template>

<script>
export default {
  name: 'zhlDialog',
  props: {
    width: {
      type: String,
      default: '70%'
    },
    title: {
      type: String,
      default: '标题'
    },
    top: {
      type: String,
      default: '70px'
    }
  },
  computed: {
    wrapClassName() {
      // {'dialog': true, 'window-max': windowMax, 'window-min': windowMin}
      let wrapClassName = 'dialog is-portal-color'
      if (this.windowMax) wrapClassName += ' window-max'
      if (this.windowMin) wrapClassName += ' window-min'
      return wrapClassName
    }
  },
  data() {
    return {
      windowMin: false,
      windowMax: false,
      oTitle: '',
      visible: false,
      show: null
    }
  },
  watch: {
    title: {
      handler() {
        this.oTitle = this.title
      },
      immediate: true
    },
    show() {
      if (this.show !== null) {
        this.visible = this.show
        if (this.windowMin) this.windowMin = false
        this.$emit('opend')
      }
      this.show = null
    }
  },
  methods: {
    setTitle(title) {
      this.oTitle = title
    },
    closed(e) {
      if (
        e &&
        typeof e.target.className === 'string' &&
        e.target.className.indexOf('window-min') !== -1
      ) {
        // 放大
        this.windowMin = !this.windowMin
        return
      }
      this.show = false
      this.$emit('close')
    },
    windowSwitch({ target }) {
      // console.log(target.className, this.windowMin)
      if (
        (typeof target.className === 'string' &&
          target.className.indexOf('zht-icon-sami-select') !== -1) ||
        this.windowMin
      ) {
        this.windowMin = !this.windowMin
      }
    }
  }
}
</script>

<style lang="less">
@media screen and (max-width: 500px) {
  .ant-modal {
    width: 100% !important;
  }
}

.ant-modal {
  min-width: 350px;
  /deep/ .ant-modal-close-x {
    width: 30px;
    height: 42px;
    margin-right: 14px;
    line-height: 42px;
    i {
      font-size: 14px;
    }
  }
}

.dialog {
  transition: all 0.3s;
  &.window-min {
    position: fixed;
    z-index: 10000;
    top: auto;
    left: auto;
    bottom: 35px;
    right: 40px;
    width: 100px;
    height: 60px;
    overflow: hidden;
    box-shadow: 0 0 10px #ccc;
    opacity: 0.7;
    background: #fff;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
    & + div,
    & > div {
      display: none;
    }
    &:after {
      content: '弹出框';
      position: absolute;
      left: 0;
      top: 0;
      width: 100px;
      height: 20px;
      line-height: 20px;
      background: #f5f5f5;
      font-size: 12px;
      text-align: center;
      color: #999;
    }
    &:before {
      content: '点击还原';
      position: absolute;
      width: 100px;
      top: 33px;
      left: 0;
      font-size: 12px;
      text-align: center;
    }
  }
  &.window-max {
    background: #fff;
    .ant-modal {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      box-shadow: none;
      .ant-modal-content {
        height: 100%;
      }
    }
  }
  .ant-modal-header {
    background: #f5f5f5;
    padding: 10px 0 9px !important;
    border-bottom: 1px solid #eee;
    .ant-modal-title {
      text-align: center;
    }
  }
  .dialog-tools {
    position: absolute;
    right: 47px;
    top: 14px;
    font-size: 14px;
    display: flex;
    align-items: center;
    width: 42px;
    height: 17px;
    i {
      cursor: pointer;
      color: #0a76a4;
    }
    .zht-icon-sami-select {
      font-size: 17px;
      margin: 0 13px 0 0;
    }
  }
}
</style>
