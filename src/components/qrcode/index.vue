<template>
    <div ref="qrCodeDiv" class="qrCode"></div>
</template>
<script>
import QRCode from 'qrcodejs2'
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
        w: {
            type: Number,
            default: 60,
        },
        colorDark: {
            type: String,
            default: '#333333',
        },
        colorLight: {
            type: String,
            default: '#ffffff',
        },
    },
    data() {
        return {}
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            this.bindQRCode()
        })
    },
    methods: {
        bindQRCode() {
            this.$refs.qrCodeDiv.innerHTML = ''
            new QRCode(this.$refs.qrCodeDiv, {
                text: this.code,
                width: this.w,
                height: this.h,
                colorDark: this.colorDark, //二维码颜色
                colorLight: this.colorLight, //二维码背景色
                correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
            })
        },
    },
    watch: {
        code() {
            this.bindQRCode()
        },
    },
}
</script>