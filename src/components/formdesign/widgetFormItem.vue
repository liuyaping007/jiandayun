<template>
  <el-col
    v-if="element.type === 'wmpDetail' || element.type === 'listview'"
    :md="24"
    :lg="24"
    class="widget-view"
    style="padding:0px"
    @click.native.stop="handleSelectWidget(index)"
    :class="{
      active: selectWidget !== null && selectWidget.key === element.key
    }"
  >
    <template v-if="element && element.type === 'wmpDetail'">
      <div
        v-if="element && element.key"
        class="widget-grid-container data-grid widget-grid"
        :class="{
          active: selectWidget !== null && selectWidget.key === element.key
        }"
        :key="element.key"
        style="position: relative;"
        @click.stop="handleSelectWidget(index)"
      >
        <!-- <div
          v-if="element.options.labelTitle"
          class="detail-title nav-tabs-link"
          @click.stop="handleSelectWidget(index)"
        >
          <i class="fa fa-caret-square-o-right"></i>
          <span class="form_info">{{ element.options.labelTitle }}</span>
          <a class="arrow_telescopic shrink"></a>
        </div> -->
        <el-row
          style="padding: 5px 5px;"
          @click.stop="handleSelectWidget(index)"
          v-if="
            element.options.buttons !== undefined &&
              element.options.buttons.length > 0
          "
        >
          <template v-for="btn in element.options.buttons">
            <el-button style="margin-left:5px;" size="mini" :key="btn.id">
              <i :class="btn.options.icon"></i>
              {{ btn.options.labelTitle }}
            </el-button>
          </template>
        </el-row>
        <el-row
          type="flex"
          align="center"
          style="overflow-y:hidden;overflow-x:auto"
        >
          <el-col
            v-if="element.options.enableChoose"
            class="detail-column"
            style="width:40px;line-height: 47px;"
          >
            <div class="label-name" style="padding: 7px;">
              <el-checkbox v-if="element.options.multy"></el-checkbox>
            </div>
            <div class="column-content" style="padding: 7px;">
              <el-checkbox v-if="element.options.multy"></el-checkbox>
              <el-radio v-if="element.options.multy === false"></el-radio>
            </div>
          </el-col>
          <!-- <el-col v-if="element.options.showNo=='true'"
                  class="detail-column"  style="width:80px;line-height: 47px;"
                >
                  <div class="label-name">
                    <span>序号</span>
                  </div>
          </el-col>-->
          <el-col
            :style="{
              width: col.type === 'showno' ? col.width + 'px' : auto
            }"
            v-for="(col, colIndex) in element.options.columns"
            :key="colIndex"
            class="detail-column"
            :class="{
              active: selectWidget !== null && selectWidget.key === col.key
            }"
          >
            <template
              v-if="
                col.type !== 'showno' ||
                  (element.options.showNo && col.type === 'showno')
              "
            >
              <label
                class="label-name"
                @click.stop="handleDetailSelectWidget(index, colIndex)"
                :class="{ required: col.options.required }"
              >
                <span>{{ col.options.labelTitle }}</span>
              </label>
              <div class="column-content">
                <!-- <input type="text" v-model="col.options.defaultValue" name placeholder="请输入"> -->
                <WidgetDetailItem
                  v-if="col.type !== 'showno'"
                  :element="col"
                ></WidgetDetailItem>
                <span v-if="col.type == 'showno'">1</span>
              </div>
            </template>
          </el-col>
        </el-row>
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
    <template v-else-if="element && element.type === 'listview'">
      <div
        v-if="element && element.key"
        class="widget-grid-container data-grid widget-grid"
        :class="{
          active: selectWidget !== null && selectWidget.key === element.key
        }"
        :key="element.key"
        style="position: relative;min-height: 47px;"
        @click.stop="handleSelectWidget(index)"
      >
        <!-- <div
          v-if="element.options.labelTitle"
          class="detail-title nav-tabs-link"
          @click.stop="handleSelectWidget(index)"
        >
          <i class="fa fa-caret-square-o-right"></i>
          <span class="form_info">{{ element.options.labelTitle }}</span>
          <a class="arrow_telescopic shrink"></a>
        </div> -->
        <el-row
          type="flex"
          align="center"
          style="overflow-y:hidden;overflow-x:auto"
          v-if="element.options.columns.length > 0"
        >
          <el-col
            v-if="element.options.enableChoose === 'true'"
            class="detail-column"
            style="width:40px;line-height: 47px;"
          >
            <div class="label-name" style="padding:7px;">
              <!-- <input type="checkbox">   -->
              <el-checkbox
                v-if="element.options.multy === 'true'"
              ></el-checkbox>
              <el-radio v-if="element.options.multy === 'false'"></el-radio>
            </div>
          </el-col>
          <el-col
            v-if="element.options.showNo === 'true'"
            class="detail-column"
            style="width:80px;line-height: 47px;"
          >
            <div class="label-name">
              <span>序号</span>
            </div>
          </el-col>
          <el-col
            v-for="(col, colIndex) in element.options.columns"
            :key="colIndex"
            class="detail-column"
          >
            <label class="label-name">
              <span>{{ col.title }}</span>
            </label>
          </el-col>
        </el-row>
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
  </el-col>
  <el-col
    v-else-if="rowcontrolstr.indexOf(element.type + ',') >= 0"
    :md="element.options.spans * 2"
    :lg="element.options.spans * 2"
    class="widget-view"
    style="padding:0px"
    @click.native.stop="handleSelectWidget(index)"
    :class="{
      active: selectWidget !== null && selectWidget.key === element.key
    }"
  >
    <el-row>
      <el-col
        class="border-content"
        :style="{
          'min-height':
            minheight.indexOf(element.type + ',') >= 0 ? '42px' : '',
          padding: '0px',
          height:
            dynamicheight.indexOf(element.type + ',') >= 0
              ? 'auto'
              : element.options.rowSpan !== undefined
              ? element.options.rowSpan * 42 + 'px'
              : ''
        }"
      >
        <template v-if="element.type === 'tree'">
          <el-tree
            :data="element.options.defaultValue"
            :props="element.options.defaultProps"
          ></el-tree>
        </template>
        <template v-else-if="element.type === 'navmenu'">
          <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4">
              <a href="https://www.ele.me" target="_blank">订单管理</a>
            </el-menu-item>
          </el-menu>
        </template>
        <template v-else-if="element.type === 'partlayout'">
          <draggable
            class="widget-form-list"
            style="border:1px solid #e8e8e8"
            :style="{
              'padding-bottom': element.list.length === 0 ? '38px' : '0px'
            }"
            v-model="element.list"
            filter="widget-grid-container"
            v-bind="{
              group: 'people1',
              ghostClass: 'ghost',
              animation: 150
            }"
            @end="handleMoveEnd"
            @add="handleWidgetColAdd($event, element, 1)"
          >
            <WidgetFormItem
              v-for="(el, i) in element.list"
              :key="el.key"
              :element="el"
              :select.sync="selectWidget"
              :index="i"
              :data="element"
            ></WidgetFormItem>
          </draggable>
          <el-button
            title="拖拽"
            @click.stop="handleSelectWidget(index)"
            class="fa fa-arrows-alt"
            style="position: absolute;left: 0px;top: 0px;z-index: 100;    padding: 1px;"
            plain
            type="danger"
          ></el-button>
        </template>
        <template v-else-if="element.type === 'dynamiclayout'">
          <div v-if="element.options.dynamiclist.length > 0">
            <template v-if="element.options.layouttype === 'dynamic'">
              <WidgetFormItem
                v-for="(el, i) in element.options.dynamiclist[0].list"
                :key="el.key"
                :element="el"
                :select.sync="selectWidget"
                :index="i"
                :data="element"
              ></WidgetFormItem>
            </template>
            <div
              style="position: absolute;
    background: hsla(0,0%,48.2%,.2) !important;
    color:red;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;"
            >
              动态面板
            </div>
          </div>
        </template>
        <template v-else-if="element.type === 'calendar'">
          <el-calendar>
            <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
            <template slot="dateCell" slot-scope="{ date, data }">
              <p :style="{ color: data.isSelected === true ? '#1989FA;' : '' }">
                {{
                  data.day
                    .split('-')
                    .slice(1)
                    .join('-')
                }}
                {{ data.isSelected ? '✔️' : '' }}
              </p>
            </template>
          </el-calendar>
        </template>
        <template v-else-if="element.type === 'imgage'">
          <img
            data-v-6c4399d0=""
            src="http://localhost:8080/file/downloadImg?path=AttachmentFile%5C2021-01-11-12-30%5Ca54eb02e-faca-46a4-8262-e8ea6cefa217.jpg"
            width="150px"
            height="80px"
          />
        </template>
        <template v-else-if="element.type === 'upFilesComp'">
          <upFilesComp></upFilesComp>
        </template>
        <el-button
          title="删除"
          @click.stop="handleWidgetDelete(index)"
          v-if="selectWidget !== null && selectWidget.key === element.key"
          class="el-icon-delete"
          style="position: absolute;right: 5px;bottom: -10px;z-index: 100;padding:5px;"
          circle
          plain
          type="danger"
        ></el-button>
      </el-col>
    </el-row>
  </el-col>

  <el-col
    v-else-if="element.type === 'button'"
    :md="element.options.spans * 2"
    :lg="element.options.spans * 2"
    class="widget-view"
    style="border: 1px solid #ccc;height: 42px; border-right:none;border-top:none;"
    @click.native.stop="handleSelectWidget(index)"
    :class="{
      active: selectWidget !== null && selectWidget.key === element.key
    }"
  >
    <div
      :style="{
        textAlign: element.options.align,
        height: '32px',
        lineHeight: '32px',
        color: '#999'
      }"
    >
      <template v-for="btn in element.options.buttons">
        <el-button style="margin-left:5px;" size="mini" :key="btn.id" plain>
          <i :class="btn.options.icon"></i>
          {{ btn.options.labelTitle }}
        </el-button>
      </template>
    </div>
    <div
      :key="i"
      v-for="(ctrl, i) in element.list"
      style="text-align:center;"
    ></div>
    <el-button
      title="删除"
      @click.stop="handleWidgetDelete(index)"
      v-if="selectWidget !== null && selectWidget.key === element.key"
      class="el-icon-delete"
      style="position: absolute;right: 5px;bottom: -10px;z-index: 100;padding:5px;"
      circle
      plain
      type="danger"
    ></el-button>
  </el-col>
  <el-col
    :md="totalSpans"
    :lg="totalSpans"
    v-else
    class="widget-view"
    style="padding:0px"
    :class="{
      active: selectWidget !== null && selectWidget.key === element.key,
      is_req: element.options.required === true,
      'border-mult':
        element.type === 'textarea' ||
        element.type === 'htmlArea' ||
        element.type === 'editor'
    }"
    @click.native.stop="handleSelectWidget(index)"
  >
    <el-row style="padding-left: 1px;">
      <el-col
        :md="innerLabelSpan"
        :lg="innerLabelSpan"
        v-if="element.options.labelTitle !== ''"
        class="border-title"
        :class="{ required: element.options.required === true }"
        @click.native.stop="handleSelectWidget(index)"
      >
        <i
          class="icon iconfont fa fa-eye-slash"
          v-if="element.type === 'hidden'"
        ></i>
        {{ element.options.labelTitle }}
      </el-col>
      <el-col
        :md="innerCtrlSpan"
        :lg="innerCtrlSpan"
        v-if="element.type !== 'hidden'"
        class="border-content"
        :style="{
          height:
            element.options.rowSpan !== undefined
              ? 42 * element.options.rowSpan + 'px'
              : ''
        }"
      >
        <template v-if="element.type === 'input'">
          <input
            type="text"
            class="form-control"
            v-model="element.options.defaultValue"
            :placeholder="element.options.placeholder"
          />
        </template>
        <template v-else-if="element.type === 'textarea'">
          <textarea
            :maxlength="element.options.dataLength"
            class="form-control multy_textarea"
            :placeholder="element.options.placeholder"
            :rows="element.options.rows"
            v-model="element.options.defaultValue"
          ></textarea>
        </template>

        <template v-else-if="element.type === 'radio'">
          <el-radio-group
            v-model="element.options.defaultValue"
            size="mini"
            style="line-height:32px; display:block;"
          >
            <el-radio
              style="inline"
              :label="item.value"
              v-for="(item, index) in element.options.options"
              :key="item.value + index"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </template>
        <template v-else-if="element.type === 'checkbox'">
          <el-checkbox-group
            v-model="element.options.defaultValue"
            size="mini"
            style="line-height:32px;"
          >
            <el-checkbox
              style="inline"
              :label="item.value"
              v-for="(item, index) in element.options.options"
              :key="item.value + index"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </template>
        <template v-else-if="element.type === 'time'">
          <el-time-picker
            v-model="element.options.defaultValue"
            :is-range="element.options.isRange"
            :placeholder="element.options.placeholder"
            :start-placeholder="element.options.startPlaceholder"
            :end-placeholder="element.options.endPlaceholder"
            :readonly="element.options.readonly"
            :disabled="element.options.disabled"
            :editable="element.options.editable"
            :clearable="element.options.clearable"
            :arrowControl="element.options.arrowControl"
            :style="{ width: element.options.width }"
          ></el-time-picker>
        </template>
        <template v-else-if="element.type === 'date'">
          <template v-if="element.options.modeltype === 'date'">
            <a-date-picker
              @change="onChange"
              v-model="element.options.defaultValue"
              :placeholder="element.options.placeholder"
              :show-time="{
                defaultValue: element.options.isshowtime
                  ? moment('00:00:00', 'HH:mm:ss')
                  : ''
              }"
              :format="element.options.format"
              :disabled="element.options.disabled"
            />
          </template>
          <template v-else-if="element.options.modeltype === 'month'">
            <a-month-picker
              v-model="element.options.defaultValue"
              :placeholder="element.options.placeholder"
              format="yyyy-MM"
              :disabled="element.options.disabled"
            />
          </template>
          <template v-else-if="element.options.modeltype === 'week'">
            <a-week-picker
              v-model="element.options.defaultValue"
              :placeholder="element.options.placeholder"
              :disabled="element.options.disabled"
            />
          </template>
          <template v-else-if="element.options.modeltype === 'range'">
            <a-range-picker
              :placeholder="element.options.placeholder"
              :show-time="{
                hideDisabledOptions: element.options.isshowtime,
                defaultValue: element.options.isshowtime
                  ? [
                      moment('00:00:00', 'HH:mm:ss'),
                      moment('11:59:59', 'HH:mm:ss')
                    ]
                  : []
              }"
              :format="element.options.format"
              style="width:100%"
              :disabled="element.options.disabled"
            />
          </template>
        </template>
        <template v-else-if="element.type === 'select'">
          <el-select
            v-model="element.options.defaultValue"
            :multiple="multiple"
            :placeholder="element.options.placeholder"
            size="small"
            collapse-tags
            style="width: 100%;top:-4px;"
          >
            <el-option
              v-for="item in element.options.options"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </template>
        <template v-else-if="element.type === 'rate'">
          <el-rate
            v-model="element.options.defaultValue"
            :readonly="element.options.readonly"
            :disabled="element.options.disabled"
          ></el-rate>
        </template>
        <template v-else-if="element.type === 'inputnumber'">
          <el-input-number
            v-model="element.options.defaultValue"
            :disabled="element.options.disabled"
            :min="element.options.min"
            :max="element.options.max"
            :label="element.options.describe"
            :step="element.options.step"
            :precision="element.options.precision"
          ></el-input-number>
        </template>
        <template v-else-if="element.type === 'timepicker'">
          <a-time-picker
            use12-hours
            :format="element.options.timeformat"
            :disabled="element.options.disabled"
            :minute-step="element.options.minute"
            :second-step="element.options.second"
          />
        </template>
        <template
          v-else-if="
            element.type === 'user' ||
              element.type === 'choose' ||
              element.type === 'department' ||
              element.type === 'project' ||
              element.type === 'cost'
          "
        >
          <input
            type="text"
            class="form-control"
            v-model="element.options.defaultValue"
            :placeholder="element.options.placeholder"
          />
          <i
            class="fa fa-search"
            aria-hidden="true"
            style="position: absolute;right: 25px;top: 15px;"
          ></i>
        </template>
        <template v-else-if="element.type === 'editor'">
          <Editor :value="element.options.defaultValue"></Editor>
        </template>
        <template v-else-if="element.type === 'hidden'"></template>
        <template v-else-if="element.type === 'blank'">
          <div
            style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;"
          >
            自定义区域
          </div>
        </template>
        <template v-else-if="element.type === 'htmlArea'">
          <div
            style="color: #999;height:auto;"
            v-html="element.options.htmlContent"
          ></div>
        </template>
        <el-button
          title="删除"
          @click.stop="handleWidgetDelete(index)"
          v-if="selectWidget !== null && selectWidget.key === element.key"
          class="el-icon-delete"
          style="position: absolute;right: 5px;bottom: -10px;z-index: 100;padding:5px;"
          circle
          plain
          type="danger"
        ></el-button>
        <el-button
          title="复制"
          @click.stop="handleWidgetClone(index)"
          class="el-icon-circle-plus-outline"
          v-if="selectWidget !== null && selectWidget.key === element.key"
          style="position: absolute;right: 35px;bottom: -10px;z-index: 100;padding:5px;"
          circle
          plain
          type="danger"
        ></el-button>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
/* eslint-disable */
import Draggable from 'vuedraggable'
import WidgetDetailItem from '@/components/formdesign/WidgetDetailItem'
import moment from 'moment'
export default {
  name: 'WidgetFormItem',
  props: ['element', 'select', 'index', 'data'],
  components: { Draggable, WidgetDetailItem },
  data() {
    return {
      selectWidget: this.select,
      clicktime: new Date(),
      rowcontrolstr:
        'tree,navmenu,blank,partlayout,dynamiclayout,calendar,imgage,upFilesComp,', ///占整行的控件
      dynamicheight: 'partlayout,tree,calendar,imgage,upFilesComp,', ///由内部控件撑高度的控件
      minheight: 'partlayout,dynamiclayout,'
    }
  },
  mounted() {},
  methods: {
    moment,
    handleMoveEnd({ newIndex, oldIndex }) {
      console.log('index', newIndex, oldIndex)
    },
    handleWidgetAdd(evt) {
      console.log(evt)
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
          this.data.list.splice(oldIndex, 0, row.list[newIndex])

        row.list.splice(newIndex, 1)

        return false
      }

      console.log('from', item)

      const key =
        Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      const contrloptions = JSON.parse(
        JSON.stringify(row.columns[colIndex].list[newIndex].options)
      )
      this.$set(row.list, newIndex, {
        ...row.list[newIndex],
        options: {
          ...Object.assign({}, contrloptions),
          remoteFunc: 'func_' + key
        },
        key,
        model: row.list[newIndex].type + '_' + key,
        rules: []
      })
      console.log('newItem', row.list[newIndex].type)
      console.log('this.data.list', this.data.list[newIndex])
      const labelId =
        Date.parse(new Date()) / 1000 + '' + Math.ceil(Math.random() * 99999)
      const ctrlId =
        Date.parse(new Date()) / 1000 + '' + Math.ceil(Math.random() * 99999)
      console.log(labelId + '_' + ctrlId)
      if (row.list[newIndex].options.labelId !== undefined) {
        this.$set(
          row.list[newIndex].options,
          'labelId',
          row.list[newIndex].options.labelId + labelId
        )
      }
      if (
        row.list[newIndex].options.labelSpan !== undefined &&
        row.list[newIndex].options.labelSpan === '2' &&
        row.list[newIndex].options.ctrlSpan === '2'
      ) {
        const containerwidthstr = window.getComputedStyle($event.srcElement)
          .width
        const containerwidth = parseInt(containerwidthstr.replace('px', ''))
        if (containerwidth < 400) {
          row.list[newIndex].options.labelSpan = '6'
          row.list[newIndex].options.ctrlSpan = '6'
        }
        if (
          (400 < containerwidth && containerwidth < 700) ||
          containerwidth === 400
        ) {
          row.list[newIndex].options.labelSpan = '2'
          row.list[newIndex].options.ctrlSpan = '4'
        }
      }
      if (row.list[newIndex].options.filed !== undefined) {
        this.$set(row.list[newIndex].options, 'filed', 'filed' + ctrlId)
      }
      if (row.list[newIndex].options.controlId !== undefined) {
        this.$set(
          row.list[newIndex].options,
          'controlId',
          row.list[newIndex].options.controlId + ctrlId
        )
      }
      if (
        row.list[newIndex].type === 'radio' ||
        row.list[newIndex].type === 'checkbox' ||
        row.list[newIndex].type === 'select' ||
        (this.data.list[newIndex] && this.data.list[newIndex].type === 'select')
      ) {
        this.$set(row.list, newIndex, {
          ...row.list[newIndex],
          options: {
            ...row.list[newIndex].options,
            options: row.list[newIndex].options.options.map(item => ({
              ...item
            }))
          }
        })
      } else if (row.list[newIndex].type === 'button') {
        console.log('before', row.list)
        this.$set(row.list, newIndex, {
          ...row.list[newIndex],
          key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999),
          options: {
            ...row.list[newIndex].options
          },
          buttons: row.list[newIndex].options.buttons.map(item => ({
            ...item,
            id:
              'btn_' +
              Date.parse(new Date()) / 1000 +
              '' +
              Math.ceil(Math.random() * 99999)
          }))
        })
        console.log('after', this.data.list[newIndex])
      }
      this.selectWidget = row.list[newIndex]
      console.log('handleWidgetColAdd end', row.list[newIndex].type)
    },
    handleSelectWidget(index) {
      this.selectWidget = this.data.list[index]
    },
    handleWidgetDelete(index) {
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
    },
    handleDetailSelectWidget(index, colIndex) {
      this.selectWidget = this.data.list[index].options.columns[colIndex]
      this.activeControlPanel = 'fieldProperty'
    },
    handleWidgetClone(index) {
      let cloneData = {
        ...this.data.list[index],
        options: { ...this.data.list[index].options },
        key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      }

      const labelId =
        Date.parse(new Date()) / 1000 + '' + Math.ceil(Math.random() * 99999)
      const ctrlId =
        Date.parse(new Date()) / 1000 + '' + Math.ceil(Math.random() * 99999)
      console.log(labelId + '_' + ctrlId)
      if (cloneData.options.labelId !== undefined) {
        cloneData.options.labelId = labelId
      }

      if (cloneData.options.controlId !== undefined) {
        cloneData.options.controlId = ctrlId
      }

      if (
        this.data.list[index].type === 'radio' ||
        this.data.list[index].type === 'checkbox'
      ) {
        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map(item => ({ ...item }))
          }
        }
      }

      this.data.list.splice(index, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.data.list[index + 1]
      })
    },
    editpartlayout(docelement) {
      const date1 = new Date()
      const date3 = date1.getTime() - this.clicktime.getTime()
      console.log(date3)
      if (date3 <= 800) {
        this.$emit('editpartlayout', docelement)
      } else {
        this.selectWidget = docelement
      }
      this.clicktime = date1
    },
    editpartlayout1(docelement) {
      this.$emit('editpartlayout', docelement)
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  },
  computed: {
    totalSpans() {
      return Math.round(
        (parseInt(this.element.options.labelSpan) +
          parseInt(this.element.options.ctrlSpan)) *
          2
      )
    },
    innerLabelSpan() {
      return Math.round(
        (parseInt(this.element.options.labelSpan) /
          (parseInt(this.element.options.labelSpan) +
            parseInt(this.element.options.ctrlSpan))) *
          24
      )
    },
    innerCtrlSpan() {
      return Math.round(
        (parseInt(this.element.options.ctrlSpan) /
          (parseInt(this.element.options.labelSpan) +
            parseInt(this.element.options.ctrlSpan))) *
          24
      )
    },
    ctrlSpan() {
      let span = parseInt(
        this.element.options.span === undefined ? 2 : this.element.options.span
      )
      if (span === 1) {
        span = 2
      }
      return span * 2
    },
    multiple() {
      if (this.element.options) {
        return eval(this.element.options.isMulty)
      }
      return false
    }
  }
}
</script>
