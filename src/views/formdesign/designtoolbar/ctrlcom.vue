<template>
    <div>
        <template v-for="ctrltype in cotroltype">
            <div v-if="ctrltype.ctrllist" :key="ctrltype.typename" class="collapse-item" :class="activetype === ctrltype.typename ? 'active' : ''">
                <div class="collapse-head" @click="clickcollapse(ctrltype.typename)">
                    <nxnsvgicon :class-name="ctrltype.icontype" :icon-class="ctrltype.icontype" />
                    {{ ctrltype.typename }}
                    <div class="icon " :class="
              activetype === ctrltype.typename
                ? 'el-icon-arrow-down'
                : 'el-icon-arrow-right'
            "></div>
                </div>
                <div class="collapse-content">
                    <draggable class="tool-draggale" :list="ctrltype.ctrllist" v-bind="ctrltype.draggablebind" @end="handleMoveEnd" @start="handleMoveStart" :move="handleMove"><template v-for="controlitem in ctrltype.ctrllist">
                            <el-tag :key="controlitem.type" v-if="
                  controlitem.funshow !== undefined
                    ? controlitem.funshow(forminfo, controlitem)
                    : true
                ">
                                <nxnsvgicon :class-name="controlitem.icon" :icon-class="controlitem.icon"></nxnsvgicon>
                                {{ controlitem.name }}
                            </el-tag>
                        </template>
                    </draggable>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import nxnsvgicon from '@/icons/index.vue'
import draggable from 'vuedraggable'
import { cotroltype } from '../config/controlconfig.js'
export default {
    props: [],
    data() {
        return {
            cotroltype: [],
            activetype: '',
            forminfo: this.changeFromInfo(),
        }
    },
    components: { draggable, nxnsvgicon },
    created() {
        this.cotroltype = cotroltype
        if (this.cotroltype.length > 0) {
            this.activetype = this.cotroltype[0].typename
        }
        this.loadData()
    },
    methods: {
        loadData() {},

        clickcollapse(propertykey) {
            if (this.activetype === propertykey) {
                this.activetype = ''
            } else {
                this.activetype = propertykey
            }
        },
        handleMoveStart() {},
        handleMoveEnd() {},
        handleMove() {},
    },
    computed: {
        SetChangeFromInfo() {
            return this.changeFromInfo()
        },
    },
    watch: {
        SetChangeFromInfo(val) {
            this.forminfo = val
        },
    },
    inject: ['changeFromInfo'],
}
</script>
<style scoped>
.tool-draggale {
    text-align: left;
}
.collapse-item {
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    display: inline-block;
}
.collapse-head {
    line-height: 35px;
    height: 35px;
    font-size: 12px;
    font-weight: 400;
    color: var(--color);
    font-weight: bold;
    text-align: left;
    padding-left: 15px;
}
.collapse-head .svg-icon {
    font-size: 20px;
    position: relative;
    top: 1.5px;
    padding-right: 6px;
}
.active .collapse-head {
    border-bottom: 1px solid var(--border-color);
}
.collapse-head .icon {
    float: right;
    padding-right: 8px;
    padding-top: 13px;
}
.active .collapse-content {
    display: block;
}
.collapse-content {
    width: 100%;
    color: #606266;
    display: none;
    min-height: 60px;
}
.collapse-content .title {
    width: 80px;

    line-height: 28px;
    min-height: 28px;
    word-wrap: break-word; /*强制换行*/
    overflow: hidden; /*超出隐藏*/
    text-overflow: ellipsis; /*隐藏后添加省略号*/
    white-space: nowrap; /*强制不换行*/
    float: left;
}
.collapse-content .context {
    float: left;
    width: calc(100% - 80px);
    min-height: 28px;
    max-height: 28px;
}
.collapse-content .com-context {
    width: 50%;
    float: left;
    margin-top: 3px;
    margin-bottom: 3px;
}
.collapse-content .com-context-row {
    width: 100%;
}
.collapse-content .com-context-row .context {
    max-height: initial;
}
.cotrlcontext-row {
    display: flex;
}

.collapse-content >>> .el-tag {
    margin: 5px;
    width: 45%;
    cursor: pointer;
    background: #fff;
    color: #484848;
    border-color: #e3e6eb;
    line-height: 40px;
    height: 40px;
}
.collapse-content >>> .el-tag i {
    font-size: 14px;
    position: relative;
    padding-right: 3px;
}
</style>
