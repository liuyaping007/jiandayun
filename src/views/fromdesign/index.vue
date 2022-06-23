<template>
  <div class="scenicList-wrapper">
    <a-modal
      :visible="true"
      wrapClassName="ant-modal-centered dialog is-portal-color window-max hiddenoverflow"
      width="100%"
      :zIndex="799"
      :footer="null"
      :bodyStyle="{ padding: '0px' }"
      :closable="false"
    >
      <iframe
        style="display:none"
        ref="buildpublish"
        class="result-wrapper"
        frameborder="0"
        name="buildpublish"
        src="/buildpublish.html"
      />
      <a-layout>
        <a-layout-header>
          <div data-v-9606ef30 class>
            <div data-v-9606ef30 class="top_logo">
              <a-row>
                <a-col :span="3">
                  <span>
                    <img
                      data-v-9606ef30
                      src="/logo.png"
                      style="width: 40px; height: 40px;"
                    /><span
                      style="font-size: 20px;font-weight: bold; font-family: cursive;margin-left: 10px;padding-top: 5px;"
                      >麒峰软件</span
                    ></span
                  >
                  <svg
                    @click="showleftright = !showleftright"
                    data-v-3836a050
                    t="1492500959545"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1691"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="14"
                    height="14"
                    class="top_ioc"
                  >
                    <path
                      data-v-3836a050
                      d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
                      p-id="1692"
                    />
                    <path
                      data-v-3836a050
                      d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
                      p-id="1693"
                    />
                    <path
                      data-v-3836a050
                      d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
                      p-id="1694"
                    />
                  </svg>
                </a-col>
                <a-col :span="17">
                  <a-button @click="preview">预览</a-button>
                  <a-button @click="showcode">查看源码</a-button>
                  <a-button @click="saveform()">保存</a-button>
                  <a-button>保存为模板</a-button>
                  <a-button>另存为</a-button>
                  <a-button>重新加载</a-button>
                  <a-button>加载模板</a-button>
                  <a-button @click="selectfilefun">导入</a-button>
                  <a-button @click="exportForm">导出</a-button>
                  <a-button @click="exportVue">导出Vue</a-button>
                  <a-button @click="clearForm">清空</a-button>
                </a-col>
                <a-col :span="4">
                  <span class="top_title"
                    >表单名称：{{ fromInfo.formName }}</span
                  >
                  <i
                    aria-label="图标: close"
                    class="anticon anticon-close"
                    title="关闭"
                    v-if="false"
                    @click="formdesigndialog = false"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      data-icon="close"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                      class
                    >
                      <path
                        d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                      />
                    </svg>
                  </i>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-layout-header>
        <a-layout v-if="showcodeeditor === false">
          <a-layout-sider v-if="showleftright">
            <tools :data="widgetForm"></tools>
          </a-layout-sider>
          <a-layout-content>
            <template v-if="editcontroltype === 0">
              <el-col
                v-for="(item, index) in fromInfo.layoutitemlist"
                :span="item.span"
                v-bind:key="index"
                style="border: 2px dashed #eee;"
              >
                <widgetForm
                  :data="item.widgetForm"
                  :activePanel.sync="activePanel"
                  :select.sync="widgetFormSelect"
                  :editcontroltype.sync="editcontroltype"
                  :currentcontroldata.sync="currentcontroldata"
                  :basecontroldata.sync="basecontroldata"
                ></widgetForm>
              </el-col>
            </template>
            <template v-else-if="editcontroltype === 1">
              <el-card
                class="box-card"
                :style="{
                  width:
                    dialogData.options.width.indexOf('%') >= 0 ||
                    dialogData.options.width.indexOf('calc') >= 0
                      ? dialogData.options.width
                      : dialogData.options.width + 'px',
                  height:
                    dialogData.options.height.indexOf('%') >= 0 ||
                    dialogData.options.height.indexOf('calc') >= 0
                      ? dialogData.options.height
                      : dialogData.options.height + 'px'
                }"
              >
                <div
                  slot="header"
                  class="clearfix"
                  style="width:100%;height:100%"
                  v-if="dialogData.options.layertype === 'center'"
                >
                  <span>{{ dialogData.options.labelTitle }}</span>
                  <a class="layermend" @click.stop="editcontroltype = 0"></a>
                  <div class="card-bottom">
                    <a-button
                      @click.stop="editcontroltype = 0"
                      style="margin-right:10px"
                      >取消</a-button
                    >
                    <a-button type="primary" @click.stop="editcontroltype = 0"
                      >确定</a-button
                    >
                  </div>
                </div>

                <widgetForm
                  :data="dialogData"
                  :activePanel.sync="activePanel"
                  :select.sync="widgetFormSelect"
                ></widgetForm>
              </el-card>
            </template>
            <template v-else-if="editcontroltype === 2">
              <el-col
                :md="basecontroldata.options.spans * 2"
                :lg="basecontroldata.options.spans * 2"
                style="padding:0px;border: 1px dashed #eee;"
                class="widget-view"
              >
                <el-row>
                  <el-col
                    class="border-content"
                    :style="{
                      padding: '0px',
                      height:
                        basecontroldata.options.rowSpan !== undefined
                          ? basecontroldata.options.rowSpan * 42 + 'px'
                          : ''
                    }"
                  >
                    <draggable
                      class="widget-form-list widget-grid"
                      style="padding-bottom:50px;border:0px solid #e8e8e8;min-height:38px"
                      v-model="currentcontroldata.list"
                      filter="widget-grid-container"
                      v-bind="{
                        group: 'people1',
                        ghostClass: 'ghost',
                        animation: 150
                      }"
                      @end="handleMoveEnd"
                      @add="handleWidgetColAdd($event, currentcontroldata, 1)"
                    >
                      <WidgetFormItem
                        v-for="(el, i) in currentcontroldata.list"
                        :key="i"
                        :element="el"
                        :select.sync="widgetFormSelect"
                        :index="i"
                        :data="currentcontroldata"
                        @editpartlayout="editpartlayout"
                      ></WidgetFormItem>
                    </draggable>
                    <el-button
                      title="关闭"
                      @click.stop="closeedit(basecontroldata)"
                      class="el-icon-close"
                      style="position: absolute;right: 0px;top: -0px;z-index: 100;padding:1px;"
                      plain
                      type="danger"
                    ></el-button>
                    <el-button
                      title="编辑"
                      @click.stop="handleSelectWidget(basecontroldata)"
                      class="el-icon-edit"
                      style="position: absolute;right: 20px;top: 0px;z-index: 100;    padding: 1px;"
                      plain
                      type="danger"
                    ></el-button>
                  </el-col>
                </el-row>
              </el-col>
            </template>
          </a-layout-content>
          <a-layout-sider width="260px" v-if="showleftright">
            <a-tabs type="card">
              <a-tab-pane key="1" tab="控件">
                <widgetConfig
                  :data="widgetFormSelect"
                  :currentcontroldata.sync="currentcontroldata"
                  :basecontroldata.sync="basecontroldata"
                  :editcontroltype.sync="editcontroltype"
                  :select.sync="widgetFormSelect"
                ></widgetConfig>
              </a-tab-pane>
              <a-tab-pane key="2" tab="事件"
                ><eventconfig :controldata="widgetFormSelect"></eventconfig
              ></a-tab-pane>
              <a-tab-pane key="3" tab="表单">
                <formConfig
                  :data="fromInfo"
                  :select.sync="widgetFormSelect"
                  :dialogData.sync="dialogData"
                  :editcontroltype.sync="editcontroltype"
                ></formConfig>
              </a-tab-pane>
            </a-tabs>
          </a-layout-sider>
        </a-layout>
        <a-layout :style="{ display: showcodeeditor ? '' : 'none' }">
          <codeeditor
            ref="codeeditor"
            :formData="formData"
            :h="codeh"
          ></codeeditor>
        </a-layout>
      </a-layout>
      <slot slot="header" />
    </a-modal>
    <input
      type="file"
      class="file"
      style="display:none"
      id="selectfile"
      @change="importForm()"
    />
    <zhlDialog
      title="窗体预览"
      ref="apiconfiginfodialog"
      width="1260px"
      class="my-dialog"
    >
      <iframe
        ref="previewPage"
        class="result-wrapper"
        frameborder="0"
        width="100%"
        style="height:90vh"
        src="/index"
        @load="iframeLoad"
      />
    </zhlDialog>
  </div>
</template>
<script>
/* eslint-disable */
import FileSaver from 'file-saver'
import tools from '@/components/formdesign/tools'
import widgetForm from '@/components/formdesign/widgetForm'
import widgetConfig from '@/components/formdesign/widgetConfig'
import formConfig from '@/components/formdesign/formConfig.vue'
import Draggable from 'vuedraggable'
import WidgetFormItem from '@/components/formdesign/widgetFormItem'
import eventconfig from '@/components/formdesign/eventconfig'
import codeeditor from '@/components/formdesign/codeeditor'
import { saveFromInfo, getFromInfo } from '@/api/tappfrom.js'
import { apiComm } from '@/api/index.js'
export default {
  data() {
    return {
      formdesigndialog: false,
      showleftright: true,
      fromInfo: {
        formName: '',
        formDesc: '',
        formid: '',
        layoutitemlist: [
          {
            span: 24,
            name: '布局面板',
            widgetForm: {
              list: [
                {
                  type: 'gridPanel',
                  name: '模块控件',
                  icon: 'el-icon-s-grid',
                  title: '模块控件',
                  isShowSpanSetting: true,
                  columns: [
                    {
                      span: 24,
                      list: []
                    }
                  ],
                  options: {
                    idPrefix: 'pnl_',
                    controlId: 1619397967174,
                    tagattr: ''
                  },
                  key: '1619397872000_64694',
                  model: 'gridPanel_1619397872000_74317'
                }
              ]
            }
          }
        ],
        layerlist: []
      },
      widgetForm: {
        list: []
      },
      codeh: 600,
      selectWidget: null,
      activePanel: 'formProperty',
      widgetFormSelect: null,
      editcontroltype: 0, ///等于0 代表编辑表单 1 编辑弹出层，2代表编辑局部模块
      dialogData: null,
      currentcontroldata: null,
      basecontroldata: null,
      formData: { html: '', js: '', css: '' },
      showcodeeditor: false,
      queryparam: { fromname: '' },
      scopedSlots: []
    }
  },
  components: {
    tools,
    widgetForm,
    widgetConfig,
    formConfig,
    WidgetFormItem,
    Draggable,
    codeeditor,
    eventconfig
  },
  methods: {
    handleMoveEnd(evt) {
      console.log('end', evt)
    },
    editpartlayout(docelement) {
      ///this.currentcontroldata = docelement
    },
    selectfilefun() {
      document.getElementById('selectfile').click()
    },
    importForm() {
      if (document.querySelector('input[type=file]').files.length === 0) {
        return
      }
      let fileSelect = document.querySelector('input[type=file]').files[0] //找到文件上传的元素
      let reader = new FileReader()
      if (typeof FileReader === 'undefined') {
        console.log('您的浏览器不支持FileReader接口')
        return
      }
      const _this = this
      reader.onload = function() {
        const fromdata = JSON.parse(reader.result)
        _this.fromInfo = fromdata.fromInfo

        _this.$forceUpdate()
      }
      reader.readAsText(fileSelect) //注意读取中文的是用这个编码，不是utf-8
    },
    exportForm() {
      const data = JSON.stringify({
        fromInfo: this.fromInfo,
        js: this.$refs.codeeditor.getEditorValue('js'),
        css: this.$refs.codeeditor.getEditorValue('css')
      })
      const blob = new Blob([data], { type: '' })
      const filename =
        this.fromInfo.formName !== '' ? this.fromInfo.formName : 'from'
      // const textStr = 'aaaaa,bbbbbbb,cccccc'
      FileSaver.saveAs(blob, filename + '.json')
    },
    clearForm() {
      this.fromInfo.layerlist = []
      this.fromInfo.layoutitemlist = [
        {
          span: 24,
          name: '布局面板',
          widgetForm: {
            list: [
              {
                type: 'gridPanel',
                name: '模块控件',
                icon: 'el-icon-s-grid',
                title: '模块控件',
                isShowSpanSetting: true,
                columns: [
                  {
                    span: 24,
                    list: []
                  }
                ],
                options: {
                  idPrefix: 'pnl_',
                  controlId: 1619397967174,
                  tagattr: ''
                },
                key: '1619397872000_64694',
                model: 'gridPanel_1619397872000_74317'
              }
            ]
          }
        }
      ]
      this.formData.html = ''
      this.formData.js = ''
      this.formData.css = ''
      this.$refs.codeeditor.setValue('js', '')
      this.$refs.codeeditor.setValue('css', '')
      this.$refs.codeeditor.setValue('html', '')
    },
    closeedit(data) {
      this.editcontroltype = 0
      this.widgetFormSelect = data
      this.showcodeeditor = false
    },
    handleSelectWidget(data) {
      this.widgetFormSelect = data
    },
    saveform() {
      const buildObject = window.frames.buildpublish.buildpubish(
        this.fromInfo,
        this.$refs.codeeditor.getEditorValue('js')
      )
      this.formData.html = buildObject.htmlcode
      this.formData.js = buildObject.jscode
      this.formData.css = this.$refs.codeeditor.getEditorValue('css')
      const fromdatainfo = {
        id: this.fromInfo.formid,
        fromName: this.fromInfo.formName,
        fremarks: this.fromInfo.formDesc,
        fromcontent: JSON.stringify(this.formData),
        fromdesignjson: JSON.stringify(this.fromInfo)
      }
      if (this.fromInfo.fromName === '') {
        this.$message.error(`表单名称不能为空！`)
        return
      }
      saveFromInfo(fromdatainfo).then(res => {
        this.$message.success(`保存成功！`)
        this.formdesigndialog = false
        this.$refs.gridlist.loadData(1)
      })
    },
    loadfromInfo(fromid) {
      getFromInfo(fromid).then(res => {
        this.fromInfo = JSON.parse(res.data.fromdesignjson)
        let fromcontent = JSON.parse(res.data.fromcontent)
        this.formData.js = fromcontent.js
        this.formData.css = fromcontent.css
        this.formData.html = fromcontent.html
        this.fromInfo.formid = res.data.fid
        if (this.showcodeeditor) {
          this.$refs.codeeditor.setValue('js', this.formData.js)
          this.$refs.codeeditor.setValue('css', this.formData.css)
          this.$refs.codeeditor.setValue('html', this.formData.html)
        }
      })
    },
    handleWidgetColAdd($event, row, colIndex) {
      console.log('handleWidgetColAdd', $event, row, colIndex)
      let newIndex = $event.newIndex
      const oldIndex = $event.oldIndex
      if (newIndex >= row.list.length) {
        newIndex = row.list.length - 1
      }
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

      this.$set(row.list, newIndex, {
        ...row.list[newIndex],
        options: {
          ...Object.assign({}, row.list[newIndex].options),
          remoteFunc: 'func_' + key
        },
        key,
        model: row.list[newIndex].type + '_' + key,
        rules: []
      })
      console.log('newItem', row.list[newIndex].type)
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
        row.list[newIndex].type === 'select'
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
          buttons: row.list[newIndex].buttons.map(item => ({
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
      //  this.selectWidget = row.list[newIndex]
      this.widgetFormSelect = row.list[newIndex]
      console.log('handleWidgetColAdd end', row.list[newIndex].type)
    },
    showcode() {
      if (this.showcodeeditor === true) {
        this.showcodeeditor = false
        return
      }
      const buildObject = window.frames.buildpublish.buildpubish(
        this.fromInfo,
        this.$refs.codeeditor.getEditorValue('js')
      )
      this.formData.html = buildObject.htmlcode
      this.formData.js = buildObject.jscode
      this.showcodeeditor
        ? (this.showcodeeditor = false)
        : (this.showcodeeditor = true)
      if (this.showcodeeditor) {
        this.$refs.codeeditor.loadInit()
      }
    },
    iframeLoad() {
      if (
        this.$refs.previewPage.contentWindow !== null &&
        this.$refs.previewPage.contentWindow !== undefined
      ) {
        this.runCode()
      }
    },
    runCode() {
      const jsCodeStr = this.formData.js
      try {
        const postData = {
          type: 'refreshFrame',
          data: {
            generateConf: {
              fileName: '测试',
              type: 'file'
            },
            html: this.formData.html,
            js: jsCodeStr.replace('export default', ''),
            css: this.formData.css,
            scripts: [],
            links: []
          }
        }
        this.$refs.previewPage.contentWindow.postMessage(
          postData,
          location.origin
        )
      } catch (err) {
        this.$message.error(`js错误：${err}`)
        console.error(err)
      }
    },
    preview() {
      const buildObject = window.frames.buildpublish.buildpubish(
        this.fromInfo,
        this.$refs.codeeditor.getEditorValue('js')
      )
      this.formData.html = buildObject.htmlcode
      this.formData.js = buildObject.jscode
      this.$refs.apiconfiginfodialog.visible = true
    },
    getfromContext() {
      const buildObject = window.frames.buildpublish.buildpubish(
        this.fromInfo,
        this.$refs.codeeditor.getEditorValue('js')
      )
      this.formData.html = buildObject.htmlcode
      this.formData.js = buildObject.jscode
      this.formData.css = this.$refs.codeeditor.getEditorValue('css')
      let formvuecode = this.formData.html
      formvuecode =
        formvuecode + '<' + 'script>' + this.formData.js + '</' + 'script>'
      formvuecode =
        formvuecode +
        '<' +
        'style>' +
        (this.formData.css === undefined ? '' : this.formData.css) +
        '</style>'
      return formvuecode
    },
    exportVue() {
      const formvuecode = this.getfromContext()
      const blob = new Blob([formvuecode], { type: '' })
      const filename =
        this.fromInfo.formName !== '' ? this.fromInfo.formName : 'from'
      // const textStr = 'aaaaa,bbbbbbb,cccccc'
      FileSaver.saveAs(blob, filename + '.vue')
    },
    deletefun(row) {
      apiComm('tappFrom.delfrom', { fid: row.FID }).then(res => {
        $refs.gridlist.loadData(1)
      })
    },
    editfrom(row) {
      this.formdesigndialog = true
      this.loadfromInfo(row.FID)
    },
    liulanfrom(row) {
      apiComm('tappFrom.getFromContent', { fid: row.FID }).then(res => {
        let fromcontent = JSON.parse(res.data[0].fromcontent)
        this.formData.js = fromcontent.js
        this.formData.css = fromcontent.css
        this.formData.html = fromcontent.html
        this.$refs.apiconfiginfodialog.visible = true
      })
    },
    addfrom() {
      this.formdesigndialog = true
      this.formData = { html: '', js: '', css: '' }
      this.fromInfo = {
        formName: '',
        formDesc: '',
        formid: '',
        layoutitemlist: [
          {
            span: 24,
            name: '布局面板',
            widgetForm: {
              list: [
                {
                  type: 'gridPanel',
                  name: '模块控件',
                  icon: 'el-icon-s-grid',
                  title: '模块控件',
                  isShowSpanSetting: true,
                  columns: [
                    {
                      span: 24,
                      list: []
                    }
                  ],
                  options: {
                    idPrefix: 'pnl_',
                    controlId: 1619397967174,
                    tagattr: ''
                  },
                  key: '1619397872000_64694',
                  model: 'gridPanel_1619397872000_74317'
                }
              ]
            }
          }
        ],
        layerlist: []
      }
    }
  },
  watch: {
    editcontroltype: {
      handler(val) {},
      deep: true
    }
  },
  mounted() {
    const h =
      document.documentElement.clientHeight || document.body.clientHeight
    this.codeh = h - 60
    this.addfrom()
  }
}
</script>
<style>
.hiddenoverflow {
  overflow: hidden;
}

.ant-tabs-tabpane {
  border-bottom: 1px solid #ccc;
}
.ant-tabs-bar {
  margin-bottom: 5px;
}
.el-radio-group {
  line-height: 32px;
}
.form-control,
.single-line {
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 1px;
  color: inherit;
  display: block;
  padding: 6px 12px;
  -webkit-transition: border-color 0.15s ease-in-out 0s,
    box-shadow 0.15s ease-in-out 0s;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  width: 100%;
  font-size: 12px;
}

.required:before {
  content: '*';
  color: #c80000;
  font-size: 12px;
  vertical-align: top;
  display: inline-block;
  width: 10px;
  height: 10px;
  position: absolute;
  top: 2px;
  margin-left: -9px;
}
.label-name.required:before {
  top: auto;
  margin-top: 2px;
}
.el-input__inner {
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  background-image: none;
  color: inherit;
  display: block;
  -webkit-transition: border-color 0.15s ease-in-out 0s,
    box-shadow 0.15s ease-in-out 0s;
  -webkit-transition: border-color 0.15s ease-in-out 0s,
    -webkit-box-shadow 0.15s ease-in-out 0s;
  transition: border-color 0.15s ease-in-out 0s,
    -webkit-box-shadow 0.15s ease-in-out 0s;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s,
    -webkit-box-shadow 0.15s ease-in-out 0s;
  width: 100%;
  font-size: 12px;
  border-radius: 0;
}
.el-input__suffix {
  right: 0px;
  line-height: 32px;
}

.el-switch__label * {
  font-size: 12px;
}
.border-title {
  height: 42px;
  line-height: 42px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
}

.border-content {
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 4px;
  padding-bottom: 4px;
  height: 42px;
}

.border-mult .border-content {
  height: auto;
  border-bottom: none;
}

.border-mult {
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc !important;
  border-left: 2px solid #ccc !important;
}

.border-mult .border-title {
  height: auto;
  border-bottom: none;
  border-left: none;
  margin-left: -2px;
}
</style>
<style scoped>
.el-card.box-card .el-card__header {
}

.el-card.box-card {
  height: 490px;
  top: 0px;
  position: absolute;
  width: 808px;
  z-index: 100;
  top: 58px;
}
.el-card.box-card .el-card__header {
  margin: 0;
  height: 46px;
  font-size: 18px;
  font-weight: 400;
  background-color: #f5f5f5;
  color: #409eff !important;
  border-bottom: 1px solid #ddd;
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
.propertyborder-title {
  height: 42px;
  line-height: 42px;
  padding-left: 3px;
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
}

.propertyborder-content {
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
  padding-right: 3px;
  padding-left: 3px;
  padding-top: 4px;
  padding-bottom: 4px;
  height: 42px;
}

.components-list .tool-draggale {
  padding-left: 15px;
  text-align: center;
}
.top_logo {
  margin-top: -10px;
}
.top_ioc {
  cursor: pointer;
  margin-left: 10px;
  margin-top: 10px;
}
.top_logo button {
  margin-left: 5px;
}
.top_title {
  font-size: 14px;
  font-weight: bold;
}
.top_logo .anticon-close {
  float: right;
  padding-top: 15px;
  padding-right: 5px;
  cursor: pointer;
}
.top_logo .anticon-close svg {
  color: red;
  font-size: 16px;
  font-weight: bold;
}

.ant-layout-header {
  background: white;
  height: 56px;

  padding: 0px;
}
.ant-layout-sider {
  background: white;
  height: calc(100vh - 60px);
  border: 1px solid #ebeef5;
}
.ant-layout {
  background: white;
}
.ant-layout-content {
  height: calc(100vh - 60px);
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}
</style>
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
        background: #d3e2f1 !important;
        div {
          background: #d3e2f1 !important;
        }

        span {
          background: #d3e2f1 !important;
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
      background: #d3e2f1 !important;

      div {
        background: #d3e2f1 !important;
      }

      span {
        background: #d3e2f1 !important;
      }

      button {
        background: #d3e2f1 !important;
      }

      label {
        background: #d3e2f1 !important;
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
<style scoped>
.inputform div:first-child {
  width: 80px;
  display: inline-block;
  height: 40px;
  margin-top: 10px;
  margin-left: 10px;
}
.inputform .el-input {
  width: calc(100% - 100px);
  float: right;
}
.inputform .el-select {
  width: calc(100% - 100px);
  float: right;
}
.inputform button {
  margin-left: 5px;
  margin-right: 5x;
}
</style>
