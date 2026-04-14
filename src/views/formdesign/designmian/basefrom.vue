<template>
    <el-col :lg="getSpan" class="formitem" :class="
      selectWidget !== null && selectWidget.model == element.model
        ? 'active'
        : ''
    ">
        <div class="content" @click.stop="clickCheckWidget()">
            <template v-if="element.type === 'imgage'">
                <el-image :src="element.options.defaultValue" :style="getimagecss" :title="element.options.describe">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </template>

            <template v-else-if="element.type === 'gridlist'">
                <gridlist :element="element"></gridlist>
            </template>
            <template v-else-if="element.type === 'listview'">
                <gridlist :element="element"></gridlist>
            </template>
            <template v-else-if="element.type === 'upFilesComp'">
                <upfilescomp v-if="element.options.uptype === 'file'"></upfilescomp>
                <upimgcomp v-else-if="element.options.uptype === 'img'"></upimgcomp>
                <upmanyimgcomp v-else-if="element.options.uptype === 'arryimg'"></upmanyimgcomp>
            </template>
            <el-carousel v-if="element.type === 'carouselimg'" indicator-position="outside">
                <el-carousel-item v-for="(item, index) in element.options.imglist" :key="index">
                    <img :src="item" style="width: 100%;height: 100%;" />
                </el-carousel-item>
            </el-carousel>
            <template v-else-if="element.type === 'button'">
                <template v-for="btn in element.options.buttons">
                    <el-button style="padding: 9px;" :type="btn.options.butType" :size="btn.options.butsize" :icon="btn.options.icon" :key="btn.id" @click.stop="clickSelectedWidget(btn)" :plain="btn.options.isplain" :round="btn.options.isround" :circle="btn.options.iscircle" :disabled="btn.options.disabled" @dblclick.native.stop="handleBuildBtnEvent(btn)">
                        {{ btn.options.title }}
                    </el-button>
                </template></template>
            <ctrltitle v-else-if="element.type === 'fromlable'" :title="element.options.title" :istitle="element.options.istitle">{{ element.options.defaultValue }}</ctrltitle>
            <ctrltitle v-else-if="element.type === 'hidden'" :title="element.options.title" :istitle="element.options.istitle">{{ element.options.defaultValue }}</ctrltitle>
            <ctrltitle v-else-if="element.type === 'autonumber'" :title="element.options.title" :istitle="element.options.istitle">
                <autono :BusinessMoudle="element.options.BusinessMoudle" :BusinessModuleID="element.options.BusinessModuleID" :modelcode="element.options.modelcode"></autono>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'datarelevance'" :title="element.options.title" :istitle="element.options.istitle">
                <datarelevance :filedlist="element.options.filedList" :dataid="element.options.defaultValue" :apicode="element.options.sourceApi" :title="element.options.title"></datarelevance>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'cityselector'" :title="element.options.title" :istitle="element.options.istitle">
                <cityselector v-model="element.options.defaultValue" :disabled="element.options.disabled"></cityselector>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'input'" :title="element.options.title" :istitle="element.options.istitle">
                <el-input :placeholder="element.options.placeholder" v-model="element.options.defaultValue" :show-password="element.options.password" :clearable="element.options.clearable" :maxlength="element.options.dataLength" :prefix="element.options.prefix" :suffix="element.options.suffix" :suffix-icon="element.options.suffixicon" :prefix-icon="element.options.prefixicon" :disabled="element.options.disabled" :show-word-limit="element.options.showwordlimit" :size="element.options.butsize"></el-input>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'occupy'" :istitle="false">

            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'divider'" :istitle="false">
                <el-divider :content-position=" element.options.contentposition">{{ element.options.defaultValue }}</el-divider>
            </ctrltitle>  
            <ctrltitle v-else-if="element.type === 'iconselect'" :istitle="false">
                <iconselect :iconclass.sync="element.options.defaultValue"></iconselect>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'describe'" :istitle="false">{{ element.options.defaultValue }}</ctrltitle>
            <ctrltitle v-else-if="element.type === 'fromlink'" :istitle="false">
                <el-link :type="element.options.linktype" :href="element.options.defaultValue" :target="element.options.target" :disabled="element.options.disabled" :underline="element.options.underline" :icon="element.options.icon">{{element.options.title}}</el-link>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'barcode'" :title="element.options.title" :istitle="element.options.istitle">
                <barcode :code="element.options.defaultValue" :h="element.options.h"></barcode>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'qrcode'" :title="element.options.title" :istitle="element.options.istitle">
                <qrcode :code="element.options.defaultValue" :h="element.options.h" :w="element.options.w" :colorDark="element.options.colorDark" :colorLight="element.options.colorLight"></qrcode>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'textarea'" :title="element.options.title" :istitle="element.options.istitle">
                <el-input type="textarea" :autosize="{
            minRows: element.options.minRows,
            maxRows: element.options.maxRows,
          }" :maxlength="element.options.dataLength" :placeholder="element.options.placeholder" v-model="element.options.defaultValue" :show-word-limit="element.options.showwordlimit" :disabled="element.options.disabled" :clearable="element.options.clearable">
                </el-input>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'switch'" :title="element.options.title" :istitle="element.options.istitle">
                <el-switch v-model="element.options.defaultValue" :active-color="element.options.activecolor" :inactive-color="element.options.inactivecolor" :disabled="element.options.disabled">
                </el-switch>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'slider'" :title="element.options.title" :istitle="element.options.istitle">
                <el-slider v-model="element.options.defaultValue" :range="element.options.range" :disabled="element.options.disabled" :max="element.options.max" :min="element.options.min" :step="element.options.step">
                </el-slider>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'colorpicker'" :title="element.options.title" :istitle="element.options.istitle">
                <el-color-picker v-model="element.options.defaultValue" :disabled="element.options.disabled" :size="element.options.butsize">
                </el-color-picker>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'avatar'" :title="element.options.title" :istitle="element.options.istitle">
                <el-avatar :size="element.options.butsize" :src="element.options.defaultValue" :disabled="element.options.disabled" :fit="element.options.fit" :shape="element.options.shape"></el-avatar>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'radio'" :title="element.options.title" :istitle="element.options.istitle">
                <el-radio-group v-model="element.options.defaultValue" size="mini" style="line-height:30px; ">
                    <template v-if="element.options.isbutton !== true">
                        <el-radio style="inline" :label="item.value" v-for="(item, index) in element.options.options" :key="item + index">{{ item }}</el-radio>
                    </template>
                    <template v-else>
                        <el-radio-button :label="item.value" v-for="(item, index) in element.options.options" :key="item + index">{{ item }}</el-radio-button>
                    </template>
                </el-radio-group>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'checkbox'" :title="element.options.title" :istitle="element.options.istitle">
                <el-checkbox-group v-model="element.options.defaultValue" size="mini" style="line-height:30px;">
                    <template v-if="element.options.isbutton !== true">
                        <el-checkbox style="inline" :label="item.value" v-for="(item, index) in element.options.options" :key="item + index">{{ item }}</el-checkbox>
                    </template>
                    <template v-else>
                        <el-checkbox-button style="inline" :label="item.value" v-for="(item, index) in element.options.options" :key="item + index">{{ item }}</el-checkbox-button>
                    </template>
                </el-checkbox-group>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'signname'" :title="element.options.title" :istitle="element.options.istitle">
                <signname :vheight="element.options.height" />
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'locationmap'" :title="element.options.title" :istitle="element.options.istitle">
                <locationmap :resultImg="element.options.defaultValue" />
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'time'" :title="element.options.title" :istitle="element.options.istitle">
                <el-time-picker v-model="element.options.defaultValue" :is-range="element.options.isRange" :placeholder="element.options.placeholder" :start-placeholder="element.options.startPlaceholder" :end-placeholder="element.options.endPlaceholder" :readonly="element.options.readonly" :disabled="element.options.disabled" :editable="element.options.editable" :clearable="element.options.clearable" :arrowControl="element.options.arrowControl" style="width: 100%;" size="element.options.butsize"></el-time-picker>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'date'" :title="element.options.title" :istitle="element.options.istitle">
                <template v-if="element.options.modeltype === 'date'">
                    <el-date-picker v-model="element.options.defaultValue" :placeholder="element.options.placeholder" :format="element.options.format" :disabled="element.options.disabled" style="width: 100%;" value-format="yyyy-MM-dd" size="small" />
                </template>
                <template v-else-if="
            element.options.modeltype === 'year' ||
              element.options.modeltype === 'week' ||
              element.options.modeltype === 'month'
          ">
                    <el-date-picker v-model="element.options.defaultValue" :type="element.options.modeltype" format="yyyy" :placeholder="element.options.placeholder" :disabled="element.options.disabled" style="width: 100%;" size="small">
                    </el-date-picker>
                </template>

                <template v-else-if="element.options.modeltype === 'range'">
                    <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :format="element.options.format" :disabled="element.options.disabled">
                    </el-date-picker> </template>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'select'" :title="element.options.title" :istitle="element.options.istitle">
                <el-select v-model="element.options.defaultValue" :multiple="element.options.isMulty" :placeholder="element.options.placeholder" :size="element.options.butsize" :clearable="element.options.clearable" :filterable="element.options.isSearch" :collapse-tags="element.options.collapsetags" :allow-create="element.options.allowcreate" :default-first-option="element.options.allowcreate" style="width: 100%;">
                    <el-option v-for="item in element.options.options" :key="item" :value="item" :label="item"></el-option> </el-select>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'rate'" :title="element.options.title" :istitle="element.options.istitle">
                <el-rate v-model="element.options.defaultValue" :readonly="element.options.readonly" :disabled="element.options.disabled"></el-rate>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'inputnumber'" :title="element.options.title" :istitle="element.options.istitle">
                <el-input-number v-model="element.options.defaultValue" :disabled="element.options.disabled" :min="element.options.min" :max="element.options.max" :label="element.options.describe" :step="element.options.step" :precision="element.options.precision" controls-position="right" :size="element.options.butsize"></el-input-number>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'timepicker'" :title="element.options.title" :istitle="element.options.istitle">
                <el-time-select v-model="value" :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
          }" placeholder="选择时间">
                </el-time-select>
            </ctrltitle>
            <ctrltitle v-else-if="
          element.type === 'user' ||
            element.type === 'organ' ||
            element.type === 'department' ||
            element.type === 'role'
        " :istitle="element.options.istitle" :title="element.options.title">
                <selector :typemode="element.options.typemode" :ismulti="false"></selector>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'editor'" :title="element.options.title" :istitle="element.options.istitle">
                <editor :value="element.options.defaultValue"></editor>
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'component'" :title="element.options.title" :istitle="element.options.istitle">自定义vue代码无法显示
            </ctrltitle>
            <ctrltitle v-else-if="element.type === 'blank'" :title="element.options.title" :istitle="element.options.istitle">
            </ctrltitle>
        </div>
        <div class="ctrltoolbar">
            <el-button title="删除" @click.stop="deletectrl()" class="toolbaritem " circle plain type="danger">
                <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
                <i class="el-icon-delete"></i>
            </el-button>
            <el-button title="复制" class="toolbaritem  " circle plain type="danger" @click.stop="copyctrl()">
                <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
                <i class="el-icon-document-copy" style="width: 14px;"></i>
            </el-button>
            <el-button title="保存为常用控件" @click.stop="savectrl()" class="toolbaritem fa fa-save" circle plain type="danger"></el-button>
            <el-button title="添加事件" class="toolbaritem  " circle plain type="danger" @click.stop="addevent()">
                <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
                <i class="fa fa-bolt" style="width: 14px;"></i>
            </el-button>
        </div>
    </el-col>
</template>
<script>
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
import ctrltitle from './ctrltitle.vue'
import gridlist from './gridlist.vue'
import barcode from '@/components/barcode/index.vue'
import qrcode from '@/components/qrcode/index.vue'
import store from '@/store'
import { fast_build_event } from '../config/fromcomm.js'
import iconselect from '@/components/iconselect/index.vue'
export default {
    props: ['element'],
    data() {
        return {}
    },

    computed: {
        selectWidget() {
            return this.$store.state.formdesignconfig.selectWidget
        },
        getSpan() {
            switch (this.$store.state.formdesignconfig.designType) {
                case 'pc':
                    return this.element.options.lg

                case 'ipad':
                    return this.element.options.md

                case 'mobile':
                    return this.element.options.xs

                default:
                    return this.element.options.lg
            }
        },
        getimagecss() {
            let cssstr = ''
            if (this.element.options.width !== undefined) {
                cssstr = cssstr + ' width:' + this.element.options.width + 'px;'
            }
            if (this.element.options.height !== undefined) {
                cssstr =
                    cssstr + ' height:' + this.element.options.height + 'px;'
            }
            return cssstr
        },
    },
    components: {
        barcode,
        qrcode,
        ctrltitle,
        autono,
        cityselector,
        datarelevance,
        editor,
        locationmap,
        queryrelevance,
        signname,
        upfilescomp,
        upimgcomp,
        upmanyimgcomp,
        gridlist,
        iconselect,
    },
    methods: {
        savectrl() {},
        copyctrl() {
            this.$emit('copyctrl', this.element)
        },
        deletectrl() {
            this.$confirm('此操作将删除其包含的所有内容, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.$emit('deletectrl', this.element)
                })
                .catch(() => {})
        },
        addevent() {
            fast_build_event(this)
        },
        clickCheckWidget() {
            store.commit('setselectWidget', this.element)
        },
        clickSelectedWidget(item) {
            store.commit('setselectWidget', item)
        },
    },
}
</script>
<style scoped>
.formitem {
    min-height: 42px;
    position: relative;
    margin-bottom: 1px;
    margin-top: 1px;
}
.formitem .content {
    min-height: 42px;
    clear: both;
    overflow: hidden;
}
.formitem .content >>> .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 14px;
}
.formitem .content >>> .image-slot i {
    font-size: 24px !important;
}
.toolbaritem {
    float: right;
    margin-right: 2px;
    padding: 6px !important;
    margin-left: 0px !important;
}
.ctrltoolbar {
    position: absolute;
    bottom: -15px;
    z-index: 100;
    right: 5px;
    display: none;
}
.active {
    background-color: #d3e2f1a8;
}
.formitem:hover,
.active > .ctrltoolbar {
    display: block;
}
</style>
