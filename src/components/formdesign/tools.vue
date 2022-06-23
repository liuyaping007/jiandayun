<template>
  <a-collapse accordion>
    <a-collapse-panel
      v-for="(item, index) in controlComponents"
      v-bind:key="index"
      :header="item.title"
      style="padding: 0px;"
    >
      <draggable
        class="tool-draggale"
        :list="item.controls"
        v-bind="item.draggablebind"
        @end="handleMoveEnd"
        @start="handleMoveStart"
        :move="handleMove"
      >
        <a-tag
          color="blue"
          v-for="(controlitem, index) in item.controls"
          :key="index"
        >
          <i
            :class="controlitem.icon"
            style="font-size: 12px;margin-right: 1px;width: 12px;"
          ></i>
          {{ controlitem.name }}
        </a-tag>
      </draggable>
    </a-collapse-panel>
  </a-collapse>
</template>
<script>
import Draggable from 'vuedraggable'
import { controlComponents } from '@/components/formdesign/controlconfig.js'
import '@/styles/font-awesome.min93e3.css'
export default {
  components: {
    Draggable
  },
  props: ['data'],
  data() {
    return { controlComponents }
  },
  methods: {
    handleMoveEnd(evt) {
      console.log('end', evt)
    },
    handleMoveStart() {},
    handleMove(evt, originalEvent) {
      console.log('handleMove', evt.draggedContext)
      let canDrag = true
      if (
        evt.draggedContext.element.type === 'jsPanel' &&
        this.data.list.length > 0
      ) {
        this.data.list.forEach(item => {
          if (item.type === 'jsPanel') {
            console.log('jsPancel is exists.')
            canDrag = false
          }
        })
      }
      console.log('handleMove', this.data.list.length)
      console.log('handleMove1', originalEvent)
      return canDrag
    }
  }
}
</script>
<style lang="less">
.ant-collapse {
  border: 1px solid #d9d9d9;
  font-size: 12px;
}
.ant-collapse > .ant-collapse-item {
}
.ant-collapse-content > .ant-collapse-content-box {
  padding: 3px;
}
.ant-collapse > .ant-collapse-item > .ant-collapse-header {
  position: relative;
  padding: 5px 16px;
  padding-left: 40px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
  cursor: pointer;
  transition: all 0.3s;
}
.ant-tag {
  margin-top: 8px;
  width: 85px;
  display: inline-block;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -icab-text-overflow: ellipsis;
  -khtml-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
}
</style>
<style lang="less" scoped>
.form-edit-widget-label {
  font-size: 12px;
  display: block;
  width: 42%;
  line-height: 26px;
  position: relative;
  float: left;
  left: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 2%;
  color: #333;
  border-radius: 4px;
  border: 1px dashed #d9d9d9;

  &:hover {
    color: #409eff;
    border: 1px dashed #409eff;
  }

  & > a {
    display: block;
    cursor: move;
    background: #f4f6fc;
    border: 1px solid #f4f6fc;

    .icon {
      margin-right: 6px;
      margin-left: 8px;
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
    }

    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
