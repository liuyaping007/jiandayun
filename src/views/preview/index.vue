<template>
    <div>
        <div :id="controlid"></div>
    </div>
</template>
<script>
import Vue from 'vue'
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
import jsonexcel from 'vue-json-excel'
import formplane from '@/components/formplane/index.vue'
import layouttable from '@/components/layouttable/index.vue'
import iconselect from '@/components/iconselect/index.vue'
import barcode from '@/components/barcode/index.vue'
import qrcode from '@/components/qrcode/index.vue'
import fromlable from '@/components/fromlable/index.vue'
export default {
    name: 'previewpage',
    data() {
        return { controlid: '', newhtmlid: '', childcomponent: null }
    },
    props: ['postData', 'propsData', 'designType'],
    mounted() {},
    created() {
        this.controlid =
            'div' +
            Date.parse(new Date()) +
            '_' +
            Math.ceil(Math.random() * 99999)
        this.newhtmlid =
            'div' +
            Date.parse(new Date()) +
            '_' +
            Math.ceil(Math.random() * 99999)
    },
    mounted() {
        this.$nextTick(() => {
            this.previewinit(this.postData)
        })
    },
    computed: {},
    methods: {
        buildLinks(links) {
            let strs = ''
            links.forEach((url) => {
                strs += `<link href="${url}" rel="stylesheet">`
            })
            return strs
        },
        previewinit(event) {
            if (this.newhtmlid === undefined) {
                this.newhtmlid =
                    'div' +
                    Date.parse(new Date()) +
                    '_' +
                    Math.ceil(Math.random() * 99999)
            }
            const $previewApp = document.getElementById(this.controlid)
            const code = event.data
            if (
                code === undefined ||
                code.js === undefined ||
                code.js === null ||
                code.html === undefined ||
                code.html === null
            ) {
                return
            }
            let propsData=this.propsData
            if (event.propsData !== undefined) {
                propsData = event.propsData
            }
            let attrs = ''
            if (propsData !== undefined) {
                this.propsArry = []
                for (let key in propsData) {
                    this.propsArry.push(key)
                    attrs = attrs + ' :' + key + '="propsData.' + key + '" '
                }
            }
            let links = ''
            if (Array.isArray(code.links) && code.links.length > 0) {
                links = this.buildLinks(code.links)
            }
            $previewApp.innerHTML = `${links}<style scoped>${code.css}</style><div id="${this.newhtmlid}" ></div>`
            if (Array.isArray(code.scripts) && code.scripts.length > 0) {
                loadScriptQueue(code.scripts, () => {
                    this.newVue(attrs, code.js, code.html,propsData)
                })
            } else {
                this.newVue(attrs, code.js, code.html,propsData)
            }
        },
        newVue(attrs, main, html,propsData) {
            main = eval(`(${main})`)
            main.components = {
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
                jsonexcel,
                formplane,
                layouttable,
                iconselect,
                barcode,
                qrcode,fromlable
            }
            this.$emit('initFrom', main)
            if (main.props !== undefined && this.propsArry !== undefined) {
                this.propsArry.forEach((ee) => {
                    if (main.props.indexOf(ee) < 0) {
                        main.props.push(ee)
                    }
                })
            } else if (this.propsArry !== undefined) {
                main.props = this.propsArry
            }
            main.template = `<div>${html}</div>`
            // const propsData = this.propsData
            const childvue = new Vue({
                components: {
                    child: main,
                },
                computed: {},
                data() {
                    return {
                        visible: true,
                        propsData: propsData,
                    }
                },
                template: `<div ><child ${attrs} /></div>`,
            }).$mount('#' + this.newhtmlid)
            this.childcomponent = childvue.$children[0]
            if (this.designType !== undefined) {
                this.childcomponent.deviceMode = this.designType
            }
            this.$emit('loadcomplete', this.childcomponent)
        },
    },
    watch: {
        postData: {
            deep: true, //true为进行深度监听,false为不进行深度监听
            handler() {
                this.previewinit(this.postData)
            },
        },
    },
}
</script>
