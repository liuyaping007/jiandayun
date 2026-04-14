<template>
    <div class="designmian widget-form-container" :style="mianw">
        <input type="file" style="display:none" id="selectfile" ref="selectfile" @change="importForm()" />
        <div class="designtoolbar">
            <el-button-group>
                <el-button @click="previewfun(3)" class="el-icon-video-play">
                    预览</el-button>
                <el-button @click="setshowcodeeditor" class="el-icon-code"><span v-if="showcodeeditor === false">
                        <i class="fa fa-code" />
                        源码 </span><span v-else>
                        <nxnsvgicon class-name="design-icon" icon-class="design" />
                        设计
                    </span></el-button>
                <el-button @click="saveform()" class="fa fa-save" style="    font-size: 14px;">
                    保存
                </el-button>
                <el-button @click="ViewJson()" class="el-icon-view">查看json</el-button>
                <el-button @click="selectfilefun()" class="el-icon-download">导入</el-button>
                <el-button @click="exportForm()" class="el-icon-upload2">导出</el-button>
                <el-button @click="exportVue()" class="el-icon-upload2">导出Vue</el-button>
                <el-button @click="clearForm()" class="el-icon-delete">清空</el-button>
            </el-button-group>
        </div>
        <devicemodel :ctrllenth="forminfo.ctrls.length" v-if="showcodeeditor === false">
            <draggable class="widget-form-list" v-model="forminfo.ctrls" v-bind="{ group: 'layout', ghostClass: 'ghost', animation: 150 }" @add="handleWidgetAdd" :style="forminfo.ctrls.length>0?'':'padding-bottom:100%;'">
                <formlayout v-for="el in forminfo.ctrls" :key="el.model" :element="el" @copyctrl="copyctrl" @deletectrl="deletectrl"></formlayout>
            </draggable>
        </devicemodel>
        <vuecodeeditor v-else :js.sync="jscode" :css.sync="csscode" :template="htmlcode"></vuecodeeditor>
        <iframe ref="buildpublish" name="buildpublish" frameborder="0" src="/buildform/buildpublish.html" class="uploadfile" id="mobile_survey" style="display: none;"></iframe>
        <el-dialog title="查看JSON结构" :visible.sync="viewJsonDialog" center>
            <monaco ref="monacoedit" language="json" :codeStr.sync="formjson" :height="530" :isfootbutton="false" @updatecode="updatecode"></monaco>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="updatebigJson">确 定</el-button> -->
                <el-button @click="viewJsonDialog = false">关闭</el-button>
            </span>
        </el-dialog>
        <el-drawer :visible.sync="previewvisible" direction="btt" size="95%" :with-header="false">
            <vuepreview @preview_close="previewvisible = false" :postData="postData"></vuepreview>
        </el-drawer>
    </div>
</template>
<script>
import vuecodeeditor from '../monaco/vuecodeeditor.vue'
import devicemodel from './devicemodel.vue'
import formlayout from './formlayout.vue'
import draggable from 'vuedraggable'
import { getnewid } from '../formcomm.js'
import monaco from '../monaco/index.vue'
import nxnsvgicon from '@/icons/index.vue'
import store from '@/store'
import FileSaver from 'file-saver'
import vuepreview from './vuepreview.vue'
import configs from '@/configs/index.js'
import loadBeautifier from '@/utils/loadBeautifier'
let beautifier
export default {
    props: ['forminfo'],
    components: {
        draggable,
        formlayout,
        devicemodel,
        monaco,
        nxnsvgicon,
        vuecodeeditor,
        vuepreview,
    },
    computed: {
        mianw() {
            if (this.$store.state.formdesignconfig.showcodeeditor) {
                return 'width:100%'
            } else {
                let w = 0
                if (this.$store.state.formdesignconfig.isleft2) {
                    w = w + this.$store.state.formdesignconfig.left2
                }
                if (this.$store.state.formdesignconfig.isrigth) {
                    w = w + this.$store.state.formdesignconfig.rigth
                }
                return 'width:' + (1920 - 54 - w) + 'px'
            }
        },

        showcodeeditor() {
            return this.$store.state.formdesignconfig.showcodeeditor
        },
    },
    created() {
        this.$event['buildhtmlcode'] = this.buildhtmlcode
        loadBeautifier((btf) => {
            beautifier = btf
        })
    },
    data() {
        return {
            formjson: '',
            viewJsonDialog: false,
            jscode: '',
            csscode: '',
            htmlcode: '',
            syscss: '',
            buildframe: null,
            previewvisible: false,
            postData: {
                data: { js: '', html: '', links: [], css: '' },
                propsData: [],
            },
        }
    },
    methods: {
        setshowcodeeditor() {
            if (this.$store.state.formdesignconfig.showcodeeditor === false) {
                this.buildcode()
            }
            store.commit(
                'setshowcodeeditor',
                !this.$store.state.formdesignconfig.showcodeeditor
            )
        },
        buildhtmlcode() {
            store.commit('setshowcodeeditor', true)
            this.buildcode()
        },
        buildcode() {
            let buildObject =
                window.frames.buildpublish.buildcodeObj.buildpubish({
                    formInfo: this.forminfo,
                    jscode: this.jscode,
                    csscode: this.csscode,
                })
            if (buildObject.code < 0) {
                this.$mssage.error(buildObject.msg)
            }
            this.syscss = buildObject.syscss
            // console.log( buildObject.htmlcode);
            this.htmlcode = buildObject.htmlcode
            this.jscode = buildObject.jscode
            this.csscode = buildObject.csscode
        },
        handleWidgetAdd(evt) {
            /// 拖拽布局控件添加方法
            const newIndex = evt.newIndex
            if (evt.pullMode === 'clone') {
                let cotrl = JSON.parse(
                    JSON.stringify(this.forminfo.ctrls[newIndex])
                )
                const key = getnewid(this.forminfo, cotrl.type)
                cotrl.model = key
                cotrl.key = key
                if (
                    cotrl.options !== undefined &&
                    cotrl.options.planelist !== undefined
                ) {
                    cotrl.options.planelist.forEach((ee) => {
                        ee.model = getnewid(this.forminfo, 'item')
                    })
                }
                this.$set(this.forminfo.ctrls, newIndex, cotrl)
            } else {
                let cotrl = this.forminfo.ctrls[newIndex]
                this.$set(this.forminfo.ctrls, newIndex, cotrl)
            }
            store.commit('setselectWidget', this.forminfo.ctrls[newIndex])
            this.$parent.$forceUpdate()
        },
        handleWidgetColAdd() {},
        copyctrl(evt) {
            let cotrljson = JSON.stringify(evt)
            const result = kylinjson.kylinjson({
                path: '$..model',
                json: evt,
                key: configs.keycode,
            })
            result.forEach((ee) => {
                cotrljson = cotrljson.replaceAll(
                    ee,
                    getnewid(this.$parent.forminfo, ee.split('_')[0])
                )
            })
            let cotrl = JSON.parse(cotrljson)
            this.forminfo.ctrls.push(cotrl)
        },
        deletectrl(evt) {
            let index = this.forminfo.ctrls.indexOf(evt)
            this.forminfo.ctrls.splice(this.forminfo.ctrls.indexOf(evt), 1)
            if (this.forminfo.ctrls.length > 0) {
                if (index < this.forminfo.ctrls.length) {
                    store.commit('setselectWidget', this.forminfo.ctrls[index])
                } else {
                    store.commit('setselectWidget', this.forminfo.ctrls[0])
                }
            } else {
                store.commit('setselectWidget', null)
            }
        },
        saveform() {},
        previewfun() {
            this.buildcode()
            this.postData = { data: {}, propsData: [] }
            this.postData.data.js = this.jscode.replace('export default', '')
            this.postData.data.html = beautifier.html(this.htmlcode)
            this.postData.data.css = beautifier.css(this.csscode + this.syscss)
            this.previewvisible = true
        },
        ViewJson() {
            this.formjson = JSON.stringify(this.$parent.forminfo)
            this.viewJsonDialog = true
        },
        updatecode() {
            this.formjson = JSON.stringify(this.$parent.forminfo)
        },
        selectfilefun() {
            document.getElementById('selectfile').click()
        },
        clearForm() {
            this.$parent.forminfo.ctrls = []
            this.$parent.$forceUpdate()
            // this.formData.html = ''
            // this.formData.js = ''
            // this.formData.css = ''
            // this.editcontroltype = 0
            // if (this.$refs.codeeditor !== undefined) {
            //   this.$refs.codeeditor.setValue('js', '')
            //   this.$refs.codeeditor.setValue('css', '')
            //   this.$refs.codeeditor.setValue('html', '')
            // }
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
            reader.onload = function () {
                const formid = _this.$parent.forminfo.formid
                const fromdata = JSON.parse(reader.result)
                _this.$parent.forminfo = fromdata.fromInfo
                _this.fromInfo.formid = formid
                _this.formData.js = beautifier.js(fromdata.js)
                _this.formData.css = beautifier.js(fromdata.css)
                if (_this.$refs.codeeditor !== undefined) {
                    _this.$refs.codeeditor.setValue('js', _this.formData.js)
                    _this.$refs.codeeditor.setValue('css', _this.formData.css)
                }
                _this.$forceUpdate()
            }
            reader.readAsText(fileSelect) //注意读取中文的是用这个编码，不是utf-8
            this.$refs.selectfile.value = null
        },
        exportForm() {
            const data = JSON.stringify(this.$parent.forminfo)
            const blob = new Blob([data], { type: '' })
            const filename =
                this.$parent.forminfo.formName !== ''
                    ? this.$parent.forminfo.formName
                    : 'form'
            // const textStr = 'aaaaa,bbbbbbb,cccccc'
            FileSaver.saveAs(blob, filename + '.json')
        },
        exportVue() {
            this.buildcode()
            let codestr = ''
            codestr =
                `${this.htmlcode}<script> import Vue from 'vue'
import autono from '@/components/autono/index.vue'
import cityselector from '@/components/cityselector/index.vue'
import datarelevance from '@/components/datarelevance/index.vue'
import editor from '@/components/Editor/index.vue'
import locationmap from '@/components/locationmap/index.vue'
import queryrelevance from '@/components/queryrelevance/index.vue'
import signname from '@/components/signname/index.vue'
import upfilescomp from '@/components/upfilescomp/index.vue'
import upimgcomp from '@/components/upimgcomp/index.vue'
import upmanyimgcomp from '@/components/upmanyimgcomp/index.vue'
import * as XLSX from 'xlsx'
import jsonexcel from 'vue-json-excel'
import formplane from '@/components/formplane/index.vue'
import layouttable from '@/components/layouttable/index.vue'
${this.jscode} </` + 'script>'
            codestr = this.insertStr(
                codestr,
                codestr.lastIndexOf('}'),
                `,components:{  autono,
        cityselector,
        datarelevance,
        editor,
        locationmap,
        queryrelevance,
        signname,
        upfilescomp,
        upimgcomp,
        upmanyimgcomp,
        jsonexcel,
        formplane,
        layouttable}`
            )
            codestr = codestr + ''
            codestr =
                codestr +
                '<style scoped>' +
                this.syscss +
                this.csscode +
                '</style>'

            const data = beautifier.html(codestr)
            const blob = new Blob([data], { type: '' })
            const filename = 'newform'
            // const textStr = 'aaaaa,bbbbbbb,cccccc'
            FileSaver.saveAs(blob, filename + '.vue')
        },
        insertStr(source, start, newStr) {
            return source.slice(0, start) + newStr + source.slice(start)
        },
    },
}
</script>
<style scoped>
.designmian {
    float: left;
    height: 100%;
    background-color: #8799a3;
}
.designmian .content {
    clear: both;
    overflow: hidden;
}
.ghost {
    float: left;
}
.designtoolbar {
    height: 52px;
    background-color: #fff;
}
.designtoolbar >>> .el-button-group {
    float: right;
    margin: 5px;
}
.designtoolbar >>> .el-button span {
    padding-left: 5px;
}
</style>
<style lang="less">
.widget-form-container {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .widget-form-list {
        height: calc(100% - 60px);
        padding-bottom: 50px;
        margin: 5px;
        text-align: left;
        clear: both;
        overflow: hidden;
        overflow-y: auto;
        // border: 2px dashed rgb(238, 238, 238);
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
                background: #eff5fd;
                div {
                    background: #eff5fd;
                }

                span {
                    background: #eff5fd;
                }
            }
        }

        .widget-action-delete {
            right: 20px;
            bottom: 0px;
            z-index: 1009;
        }

        .widget-action-clone {
            right: 70px;
            bottom: 0px;
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
            background: #eff5fd;

            div {
                background: #eff5fd;
            }

            span {
                background: #eff5fd;
            }

            label {
                background: #eff5fd;
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
        min-height: 42px;
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
