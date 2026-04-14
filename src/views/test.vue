<template>
    <div _tmplitem="68" id="mianformplane">
        <el-button @click="code='sdfsdfsdfds'">默认按钮</el-button>
        <barcode :code="code"></barcode>
        <qrcode :code="code"></qrcode>
    </div>
</template>
<script>
import barcode from '@/components/barcode/index.vue'
import qrcode from '@/components/qrcode/index.vue'
export default {
    data() {
        return {
            code: '6931885788995',
        }
    },
    components: {
        barcode,
        qrcode,
    },
}
</script>
<style scoped>
.fr-card-index {
    position: absolute;
    padding-left: 4px;
    padding-right: 6px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 3px;
    background-color: rgba(0, 0, 0, 0.36);
    font-size: 8px;
    color: #fff;
}

.border-title {
    font-size: 16px !important;
    margin-bottom: 5px;
}

.required:before {
    content: '*';
    color: #c80000;
    font-size: 12px;
    vertical-align: top;
    display: inline-block;
    width: 10px;
    height: 10px;
    top: 2px;
    position: absolute;
}

.el-input__inner {
    height: 35px;
    line-height: 35px;
}

.filterbottom {
    margin-top: 8px;
    margin-left: 15px;
    margin-right: 10px;
}

.filterbottom button {
    float: right;
    margin-right: 10px;
    margin-bottom: 20px;
}

@media screen and (min-width: 1024px) {
    .maincontent {
        margin-left: calc((100% - 1024px) / 2);
    }
}

@media screen and (max-width: 1024px) {
    .el-radio {
        width: 100%;
    }

    .el-checkbox {
        width: 100%;
    }

    .buttongroup {
        width: 100%;
    }

    .buttongroup button {
        width: 50%;
    }
}

body {
    overflow-x: hidden;
}

::-webkit-scrollbar {
    width: 10px !important;
    height: 10px !important;
    -webkit-appearance: none;
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    height: 5px;
    border: 1px solid transparent;
    border-top: 0;
    border-bottom: 0;
    border-radius: 6px;
    background-color: #ccc;
    background-clip: padding-box;
}

.focusState {
    position: absolute;
}

.mianfromplane[div1668948328000_32807] .cell {
    display: flex;
    flex-direction: row;
    white-space: nowrap;
}

.mianfromplane[div1668948328000_32807] .el-form-item__label {
    overflow: hidden;
    /*超出部分隐藏*/
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
    white-space: nowrap;
    /*规定段落中的文本不进行换行 */
}

.mianfromplane[div1668948328000_32807] .el-table th.required > div::before {
    background-color: #fff;
}

.clearbottom {
    clear: both;
    height: 50px;
    font-size: 1px;
    line-height: 0px;
}

.footer {
    width: 100%;
    height: 45px;
    position: fixed;
    bottom: 0;
    background: white;
    border-top: 1px solid #dcdfe6;
    left: 0px;
    right: 0px;
}

.footer .item:first-child {
    width: 70%;
}

.footer .item {
    float: left;
    width: 30%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-right: 1px solid #dcdfe6;
}

.footer i {
    font-size: 18px;
    padding: 5px;
}

.ishidetitle .ctrl-title {
    display: none;
}

.ishidetitle .ctrl-content {
    float: left;
    width: 100% !important;
    line-height: 42px;
    margin-left: 0px;
}

.ctrltitle {
    display: flex;
}

.ctrltitle .ctrl-title {
    width: 80px;
    float: left;
    line-height: 42px;
    padding-left: 5px;
}

.ctrltitle .ctrl-content {
    float: left;
    width: calc(100% - 100px);
    line-height: 42px;
}

.fr-card-row {
    width: calc(100% - 33px);
    padding: 8px;
    margin: 8px;
    margin-bottom: 10px;
    border: 1px solid #d7dae2;
    border-radius: 0;
    position: relative;
}

.export-excel-wrapper {
    display: initial;
}

.layouttable {
    width: 100%;
    float: left;
    /* margin-top: 5px; */
}

.layouttable .layouttable-row {
    height: 100%;
    position: relative;
    /* top: 5px;
  margin: 0px 5px; */
    display: flex;
}

.layouttable .layouttable-row .layouttable-item {
    width: 20%;
    height: 100%;
    position: relative;
    float: left;
}

.layouttable .layouttable-row .layouttable-item .formplane {
    border: 0px solid #d9d9d9;
}

@media only screen and (min-width: 1024px) {
    .layouttable-row .layouttable-item {
        width: var(--pcwith) !important;
    }
}

@media only screen and (max-width: 1024px) and (min-width: 767px) {
    .layouttable-row .layouttable-item {
        width: var(--ipadwith) !important;
    }
}

@media only screen and (max-width: 767px) {
    .layouttable-row .layouttable-item {
        width: var(--mobilewith) !important;
    }
}
</style>
