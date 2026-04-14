<template>
    <img :id="controlid" />
</template>
<script>
import JsBarcode from 'jsbarcode'
export default {
    props: {
        code: {
            type: String,
            default: '',
        },
        h: {
            type: Number,
            default: 60,
        },
    },
    data() {
        return { controlid: '' }
    },
    created() {
        this.controlid =
            'div' +
            Date.parse(new Date()) +
            '_' +
            Math.ceil(Math.random() * 99999)
    },
    mounted() {
        this.$nextTick(() => {
            this.buildJsBarcode()
        })
    },
    methods: {
        buildJsBarcode() {
            const docBarcodeObj = document.getElementById(this.controlid)
            JsBarcode(docBarcodeObj, this.code, {
                format: 'CODE128', //条形码的格式
                width: 1, //线宽
                height: this.h, //条码高度
                lineColor: '#000', //线条颜色
                displayValue: true, //是否显示文字
                margin: 2, //设置条形码周围的空白区域
            })
        },
    },
    watch: {
        code() {
            this.buildJsBarcode()
        },
    },
}
</script>