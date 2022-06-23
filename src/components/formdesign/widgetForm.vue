<template>
  <div class="widget-form-container">
    <el-form size="small" label-position="left" label-width="100px">
      <draggable
        class="widget-form-list"
        v-model="data.list"
        v-bind="{ group: 'people', ghostClass: 'ghostpanel', animation: 150 }"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
        :move="onMove"
        @mousemove="test"
        style="padding-bottom:50px;"
      >
        <template v-for="(element, index) in data.list">
          <template v-if="element && element.type == 'gridPanel'">
            <div
              v-if="element && element.key"
              class="widget-grid-container data-grid widget-grid"
              :class="{
                active: selectWidget !== null && selectWidget.key == element.key
              }"
              :key="element.key"
              style="position: relative;"
            >
              <div
                v-if="element.options.labelTitle"
                class="detail-title nav-tabs-link"
                @click.stop="handleSelectWidget(index)"
              >
                <i class="fa fa-caret-square-o-right"></i>
                <span class="form_info">{{ element.options.labelTitle }}</span>
                <a class="arrow_telescopic shrink"></a>
              </div>
              <el-row
                type="flex"
                :gutter="element.options.gutter ? element.options.gutter : 0"
                :justify="element.options.justify"
                :align="element.options.align"
              >
                <el-col
                  v-for="(col, colIndex) in element.columns"
                  :key="colIndex"
                  :span="col.span ? col.span : 0"
                  @click.native.stop="handleSelectWidget(index)"
                >
                  <div style="border: 1px dashed #999;">
                    <el-row
                      style="border: 1px solid #ccc;border-top: none;border-left: none;border-bottom: none;"
                    >
                      <draggable
                        class="widget-form-list"
                        style
                        v-model="col.list"
                        filter="widget-grid-container"
                        v-bind="{
                          group: 'people1',
                          ghostClass: 'ghost',
                          animation: 150
                        }"
                        @end="handleMoveEnd"
                        @add="handleWidgetColAdd($event, element, colIndex)"
                      >
                        <widget-form-item
                          v-for="(el, i) in col.list"
                          :key="el.key"
                          :element="el"
                          :select.sync="selectWidget"
                          :index="i"
                          :data="col"
                          @editpartlayout="editpartlayout"
                        ></widget-form-item>
                      </draggable>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
              <el-button
                title="删除"
                style="bottom: -20px;"
                @click.stop="handleWidgetDelete(index)"
                class="widget-action-delete"
                v-if="selectWidget !== null && selectWidget.key == element.key"
                circle
                plain
                type="danger"
              >
                <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
                <i class="el-icon-delete"></i>
              </el-button>
            </div>
          </template>
          <template v-else-if="element.type === 'tabs'">
            <div
              v-if="element && element.key"
              class="widget-grid-container data-grid widget-grid"
              :class="{ active: selectWidget.key == element.key }"
              :key="element.key"
              @click="handleSelectWidget(index)"
              style="position: relative;"
            >
              <el-tabs>
                <el-tab-pane
                  v-for="tabel in element.options.panelist"
                  :key="tabel.name"
                  :label="tabel.title"
                  :name="tabel.name"
                >
                  <el-row type="flex">
                    <el-col
                      v-for="(col, colIndex) in tabel.columns"
                      :key="colIndex"
                      :span="col.span ? col.span : 0"
                      @click.native.stop="handleSelectWidget(index)"
                    >
                      <div style="border: 1px dashed #999;">
                        <el-row
                          style="border: 1px solid #ccc;border-top: none;border-left: none;border-bottom: none;"
                        >
                          <draggable
                            class="widget-form-list"
                            style
                            v-model="col.list"
                            filter="widget-grid-container"
                            v-bind="{
                              group: 'people1',
                              ghostClass: 'ghost',
                              animation: 150
                            }"
                            @end="handleMoveEnd"
                            @add="handleWidgetColAdd($event, tabel, colIndex)"
                          >
                            <widget-form-item
                              v-for="(el, i) in col.list"
                              :key="el.key"
                              :element="el"
                              :select.sync="selectWidget"
                              :index="i"
                              :data="col"
                              @editpartlayout="editpartlayout"
                            ></widget-form-item>
                          </draggable>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
              <el-button
                title="删除"
                style="bottom: -20px;"
                @click.stop="handleWidgetDelete(index)"
                class="widget-action-delete"
                v-if="selectWidget !== null && selectWidget.key === element.key"
                circle
                plain
                type="danger"
              >
                <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
                <i class="el-icon-delete"></i>
              </el-button>
            </div>
          </template>
          <template v-else-if="element.type === 'collapse'">
            <div
              v-if="element && element.key"
              class="widget-grid-container data-grid widget-grid"
              :class="{
                active:
                  selectWidget !== null && selectWidget.key === element.key
              }"
              :key="element.key"
              @click="handleSelectWidget(index)"
              style="position: relative;"
            >
              <a-collapse>
                <a-collapse-panel
                  v-for="(coolapse, index) in element.options.panelist"
                  :key="index"
                  :header="coolapse.title"
                >
                  <el-row type="flex">
                    <el-col
                      v-for="(col, colIndex) in coolapse.columns"
                      :key="colIndex"
                      :span="col.span ? col.span : 0"
                      @click.native.stop="handleSelectWidget(index)"
                    >
                      <div style="border: 1px dashed #999;">
                        <el-row
                          style="border: 1px solid #ccc;border-top: none;border-left: none;border-bottom: none;"
                        >
                          <draggable
                            class="widget-form-list"
                            style
                            v-model="col.list"
                            filter="widget-grid-container"
                            v-bind="{
                              group: 'people1',
                              ghostClass: 'ghost',
                              animation: 150
                            }"
                            @end="handleMoveEnd"
                            @add="
                              handleWidgetColAdd($event, coolapse, colIndex)
                            "
                          >
                            <widget-form-item
                              v-for="(el, i) in col.list"
                              :key="el.key"
                              :element="el"
                              :select.sync="selectWidget"
                              :index="i"
                              :data="col"
                              @editpartlayout="editpartlayout"
                            ></widget-form-item>
                          </draggable>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </a-collapse-panel>
              </a-collapse>
              <el-button
                title="删除"
                style="bottom: -20px;"
                @click.stop="handleWidgetDelete(index)"
                class="widget-action-delete"
                v-if="selectWidget !== null && selectWidget.key === element.key"
                circle
                plain
                type="danger"
              >
                <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
                <i class="el-icon-delete"></i>
              </el-button>
            </div>
          </template>
          <template v-else-if="element && element.type == 'freelayout'">
            <div :key="index">fdsfdsfds</div>
          </template>
          <template v-else-if="element">
            <widget-form-item
              v-if="element && element.key"
              :key="element.key"
              :element="element"
              :select.sync="selectWidget"
              :index="index"
              :data="data"
              @editpartlayout="editpartlayout"
            ></widget-form-item>
          </template>
        </template>
      </draggable>
    </el-form>
  </div>
</template>
<script>
/* eslint-disable */
import Draggable from 'vuedraggable'
import WidgetFormItem from '@/components/formdesign/widgetFormItem'
export default {
  components: {
    Draggable,
    WidgetFormItem
  },
  props: ['data', 'select', 'activePanel'],
  data() {
    return {
      selectWidget: this.select,
      activeControlPanel: this.activePanel
      // dialogData: this.select
    }
  },
  mounted() {
    document.body.ondrop = this.ondrop(event)
  },
  methods: {
    ondrop(event) {
      const isFirefox =
        navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isFirefox) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    handleMoveEnd({ newIndex, oldIndex }) {
      console.log('index', newIndex, oldIndex)
    },
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index]
      this.activeControlPanel = 'fieldProperty'
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    handleDetailSelectWidget(index, colIndex) {
      this.selectWidget = this.data.list[index].columns[colIndex]
      this.activeControlPanel = 'fieldProperty'
    },

    handleWidgetAdd(evt) {
      console.log('handleWidgetAdd', evt)
      const newIndex = evt.newIndex
      const key =
        Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      this.$set(this.data.list, newIndex, {
        ...this.data.list[newIndex],
        options: {
          ...Object.assign({}, this.data.list[newIndex].options),
          remoteFunc: 'func_' + key
        },
        key,
        model: this.data.list[newIndex].type + '_' + key,
        rules: []
      })
      if (
        this.data.list[newIndex].options.labelSpan !== undefined &&
        this.data.list[newIndex].options.labelSpan === '2' &&
        this.data.list[newIndex].options.ctrlSpan === '2'
      ) {
        const containerwidthstr = window.getComputedStyle($event.srcElement)
          .width
        const containerwidth = parseInt(containerwidthstr.replace('px', ''))
        if (containerwidth < 400) {
          this.data.list[newIndex].options.labelSpan = '6'
          this.data.list[newIndex].options.ctrlSpan = '6'
        }
        if (
          (400 < containerwidth && containerwidth < 700) ||
          containerwidth === 400
        ) {
          this.data.list[newIndex].options.labelSpan = '2'
          this.data.list[newIndex].options.ctrlSpan = '4'
        }
      }
      if (
        this.data.list[newIndex].type === 'radio' ||
        this.data.list[newIndex].type === 'checkbox' ||
        this.data.list[newIndex].type === 'select'
      ) {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            options: this.data.list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        })
      }

      if (this.data.list[newIndex].type === 'gridPanel') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999),
          columns: this.data.list[newIndex].columns.map(item => ({
            ...item
          })),
          options: {
            ...this.data.list[newIndex].options,
            controlId: Date.parse(new Date()) + Math.ceil(Math.random() * 99999)
          }
        })
      } else if (this.data.list[newIndex].type === 'wmpDetail') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          columns: this.data.list[newIndex].columns.map(item => ({
            ...item,
            options: {
              ...item.options
            }
          })),
          key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999),
          buttons: this.data.list[newIndex].buttons.map(item => ({
            ...item
          })),
          options: {
            ...this.data.list[newIndex].options,
            controlId: Date.parse(new Date()) + Math.ceil(Math.random() * 99999)
          }
        })
      } else if (this.data.list[newIndex].type === 'listview') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999),
          columns: [],
          options: {
            ...this.data.list[newIndex].options,
            controlId: Date.parse(new Date()) + Math.ceil(Math.random() * 99999)
          }
        })
      } else if (this.data.list[newIndex].type === 'dialog') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999),
          list: [],
          options: {
            ...this.data.list[newIndex].options,
            controlId: Date.parse(new Date()) + Math.ceil(Math.random() * 99999)
          }
        })
      } else if (this.data.list[newIndex].type === 'attachment') {
        this.$set(this.data.list, newIndex, {
          ...this.data.list[newIndex],
          options: {
            ...this.data.list[newIndex].options,
            controlId: Date.parse(new Date()) + Math.ceil(Math.random() * 99999)
          }
        })
      }

      this.selectWidget = this.data.list[newIndex]
    },
    handleWidgetColAdd($event, row, colIndex) {
      console.log('handleWidgetColAdd', $event, row, colIndex)
      const newIndex = $event.newIndex
      const oldIndex = $event.oldIndex
      const item = $event.item
      console.log('handleWidgetColAdd newIndex', newIndex)
      console.log('handleWidgetColAdd oldIndex', oldIndex)
      if (item.className.indexOf('data-grid') >= 0) {
        item.tagName === 'DIV' &&
          this.data.list.splice(
            oldIndex,
            0,
            row.columns[colIndex].list[newIndex]
          )

        row.columns[colIndex].list.splice(newIndex, 1)

        return false
      }

      console.log('from', item)

      const key =
        Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      const contrloptions = JSON.parse(
        JSON.stringify(row.columns[colIndex].list[newIndex].options)
      )
      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...Object.assign({}, contrloptions),
          remoteFunc: 'func_' + key
        },
        key,
        model: row.columns[colIndex].list[newIndex].type + '_' + key,
        rules: []
      })
      console.log('newItem', row.columns[colIndex].list[newIndex].type)
      console.log('this.data.list', this.data.list[newIndex])
      const labelId =
        Date.parse(new Date()) / 1000 + '' + Math.ceil(Math.random() * 99999)
      const ctrlId =
        Date.parse(new Date()) / 1000 + '' + Math.ceil(Math.random() * 99999)
      console.log(labelId + '_' + ctrlId)
      if (row.columns[colIndex].list[newIndex].options.labelId !== undefined) {
        this.$set(
          row.columns[colIndex].list[newIndex].options,
          'labelId',
          row.columns[colIndex].list[newIndex].options.labelId + labelId
        )
      }
      if (row.columns[colIndex].list[newIndex].options.filed !== undefined) {
        this.$set(
          row.columns[colIndex].list[newIndex].options,
          'filed',
          'filed' + ctrlId
        )
      }
      if (
        row.columns[colIndex].list[newIndex].options.controlId !== undefined
      ) {
        this.$set(
          row.columns[colIndex].list[newIndex].options,
          'controlId',
          row.columns[colIndex].list[newIndex].options.controlId + ctrlId
        )
      }
      // if (row.columns[colIndex].list[newIndex].options.columns !== undefined) {
      //   this.$set(
      //     row.columns[colIndex].list[newIndex].options,
      //     'columns',
      //     Object.assign(
      //       {},
      //       row.columns[colIndex].list[newIndex].options.columns
      //     )
      //   )
      // }
      console.log(
        'row.columns[colIndex].list[newIndex].options.labelId:',
        row.columns[colIndex].list[newIndex].options.labelId
      )
      console.log(
        'row.columns[colIndex].list[newIndex].options.controlId:',
        row.columns[colIndex].list[newIndex].options.controlId
      )

      if (
        row.columns[colIndex].list[newIndex].type === 'radio' ||
        row.columns[colIndex].list[newIndex].type === 'checkbox' ||
        row.columns[colIndex].list[newIndex].type === 'select' ||
        (this.data.list[newIndex] && this.data.list[newIndex].type === 'select')
      ) {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            options: row.columns[colIndex].list[newIndex].options.options.map(
              item => ({
                ...item
              })
            )
          }
        })
      } else if (row.columns[colIndex].list[newIndex].type === 'button') {
        console.log('before', row.columns[colIndex].list)
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999),
          options: {
            ...row.columns[colIndex].list[newIndex].options
          },
          buttons: row.columns[colIndex].list[newIndex].options.buttons.map(
            item => ({
              ...item,
              id:
                'btn_' +
                Date.parse(new Date()) / 1000 +
                '' +
                Math.ceil(Math.random() * 99999)
            })
          )
        })
        console.log('after', this.data.list[newIndex])
      } else if (
        row.columns[colIndex].list[newIndex].type === 'dynamiclayout'
      ) {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            dynamiclist: row.columns[colIndex].list[
              newIndex
            ].options.dynamiclist.map(item => ({
              ...item
            }))
          }
        })
      }
      this.selectWidget = row.columns[colIndex].list[newIndex]
      console.log(
        'handleWidgetColAdd end',
        row.columns[colIndex].list[newIndex].type
      )
    },
    handleWidgetGridColAdd($event, row, colIndex) {
      console.log('handleWidgetGridColAdd', $event, row, colIndex)
      const newIndex = $event.newIndex
      const oldIndex = $event.oldIndex
      const item = $event.item
      if (row.columns[colIndex].list.length > 1) {
        return false
      }
      if (item.className.indexOf('data-gridview') >= 0) {
        item.tagName === 'DIV' &&
          this.data.list.splice(
            oldIndex,
            0,
            row.columns[colIndex].list[newIndex]
          )

        row.columns[colIndex].list.splice(newIndex, 1)

        return false
      }

      console.log('from', item)

      const key =
        Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

      this.$set(row.columns[colIndex].list, newIndex, {
        ...row.columns[colIndex].list[newIndex],
        options: {
          ...Object.assign({}, row.columns[colIndex].list[newIndex].options),
          remoteFunc: 'func_' + key
        },
        key,
        model: row.columns[colIndex].list[newIndex].type + '_' + key,
        rules: []
      })

      if (
        row.columns[colIndex].list[newIndex].type === 'radio' ||
        row.columns[colIndex].list[newIndex].type === 'checkbox' ||
        this.data.list[newIndex].type === 'select'
      ) {
        this.$set(row.columns[colIndex].list, newIndex, {
          ...row.columns[colIndex].list[newIndex],
          options: {
            ...row.columns[colIndex].list[newIndex].options,
            options: row.columns[colIndex].list[newIndex].options.options.map(
              item => ({
                ...item
              })
            )
          }
        })
      }

      this.selectWidget = row.columns[colIndex].list[newIndex]
    },
    test(df, tet, ete) {
      console.log(df, tet, ete)
    },
    handleWidgetDelete(index) {
      this.$confirm('此操作将删除其包含的所有内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.data.list.length - 1 === index) {
            if (index === 0) {
              this.selectWidget = {}
            } else {
              this.selectWidget = this.data.list[index - 1]
            }
          } else {
            this.selectWidget = this.data.list[index + 1]
          }

          this.$nextTick(() => {
            this.data.list.splice(index, 1)
          })
        })
        .catch(() => {})
    },
    editpartlayout(docelement) {
      this.$emit('update:select', docelement)
      this.$emit('update:basecontroldata', docelement)
      this.$emit('update:currentcontroldata', docelement)
      this.$emit('update:editcontroltype', 2)
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    activePanel(val) {
      this.activeControlPanel = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
        this.$emit('update:activePanel', 'fieldProperty')
      },
      deep: true
    }
  }
}
</script>
<style lang="less">
.widget-form-container {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .widget-form-list {
    height: 100%;
    padding-bottom: 50px;
    clear: both;
    overflow: hidden;
    border: 2px dashed rgb(238, 238, 238);
    .widget-view {
      padding: 5px 10px 18px;
      margin: 0;
      position: relative;
      border: none;
      // border-left: 5px solid transparent;
      // height:44px;
      &.is_req {
        .el-form-item__label::before {
          content: '*';
          color: #f56c6c;
          margin-right: 4px;
        }
      }

      &:after {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        display: block;
        z-index: 1001;
      }

      &:hover {
        background: #ecf5ff;
      }

      &.active {
        background: #eff5fd !important;
        div {
          background: #eff5fd !important;
        }

        span {
          background: #eff5fd !important;
        }
      }
    }

    .widget-action-delete {
      position: absolute;
      right: 20px;
      bottom: -35px;
      z-index: 1009;
    }

    .widget-action-clone {
      position: absolute;
      right: 70px;
      bottom: -35px;
      z-index: 1009;
    }
  }

  .widget-grid {
    //background: #F4F6FC;
    position: relative;
    border-left: 0px solid transparent;
    // padding: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
    /*border-top: 1px solid #ccc;*/
    border-left: 1px solid #ccc;

    &.active {
      background: #eff5fd !important;

      div {
        background: #eff5fd !important;
      }

      span {
        background: #eff5fd !important;
      }

      button {
        background: #eff5fd !important;
      }

      label {
        background: #eff5fd !important;
      }
    }
  }

  .widget-grid-container {
    &.ghost {
      &::after {
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        display: block;
        z-index: 10;
        content: '';
      }
    }
  }

  input {
    height: 32px;
  }

  .ghost {
    background: #fff;
    border: 1px dashed #409eff;
    float: left;
    height: 32px;
    box-sizing: border-box;

    &::after {
      background: #fff;
    }
  }

  .ghostpanel {
    background: #fff;
    border: 1px dashed #409eff;
    height: 100%;
    box-sizing: border-box;

    &::after {
      background: #fff;
    }
  }

  li.ghostpanel {
    height: 30px;
    list-style: none;
    font-size: 0;
  }

  li.ghost {
    height: 30px;
    list-style: none;
    font-size: 0;
  }
}
</style>
<style>
.detail-title {
  width: 100%;
  padding-left: 8px;
  height: 35px;
  line-height: 35px;
  background-color: #eaeaea;
  padding-right: 10px;
  position: relative;
  border-bottom: 1px solid #ccc;
}
.nav-tabs-link .fa-caret-square-o-right {
  font-size: 14px;
  color: #990000;
}
span.form_info {
  padding-left: 2px;
  font-weight: 600;
  color: #990000;
}
.nav-tabs-link a.arrow_telescopic.shrink {
  background-size: 16px 16px;
}
.nav-tabs-link a.arrow_telescopic {
  float: right;
  display: block;
  width: 34px;
  height: 34px;
}
.label-name {
  white-space: nowrap;
  line-height: 0;
  margin: 0;
  padding: 15px;
  background: #f5f5f5;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid transparent;
  display: block;
  cursor: pointer;
  text-align: center;
  margin-right: 1px;
  height: 31px;
}

.label-name .el-radio {
  line-height: 1;
}
.column-content {
  text-align: center;
  line-height: 42px;
  width: 100%;
  padding: 4px 15px;
}
.detail-column {
  padding: 0;
  min-height: 60px;
  float: left;
  border-bottom: 1px solid transparent;
  border-right: 1px solid #ccc;
  border-left: none;
  position: relative;
}

.detail-column.active {
  background: #d3e2f1 !important;
}
.detail-column.active .label-name {
  background: #d3e2f1 !important;
}
.el-row.el-row--flex {
  border-top: 1px solid #ccc;
}

.layermend {
  position: absolute;
  right: 12px;
  top: 8px;
  width: 30px;
  height: 30px;
  border: 0;
  font-weight: 400;
  background: 0 0;
  cursor: pointer;
  -webkit-appearance: none;
  outline: none;
}
.layermend::after,
.layermend::before {
  position: absolute;
  right: 5px;
  top: 14px;
  content: '';
  width: 15px;
  height: 2px;
  background-color: red;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  border-radius: 3px;
}
.layermend::after {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
.el-card .el-card__body {
  padding: 0px;
  height: 400px;
  overflow-y: auto;
}
</style>
<style scoped>
.el-card.box-card {
  height: 490px;
  top: 0px;
  position: absolute;
  width: 808px;
  z-index: 100;
}
.el-card.box-card .el-card__header {
  margin: 0;
  height: 46px;
  font-size: 18px;
  font-weight: 400;
  border-bottom: 1px solid #ddd;
  background: #c80000;
  color: #fff;
  text-align: center;
}
.el-card__header span {
  font-size: 15px;
  line-height: 10px;
}
.card-bottom {
  height: 40px;
  position: absolute;
  bottom: 0px;
  width: 100%;
  left: 0px;
  line-height: 40px;
  border-top: 1px solid #ccc;
  text-align: right;
  padding-right: 20px;
}
</style>
