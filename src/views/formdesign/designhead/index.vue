<template>
    <div class="designhead">
        <div class="logo">
            <img :src="logourl" />
            <div class="title">{{ sitetitle }}</div>
        </div>
        <div class="leftbotton">
            <div class="bottonitem" title="组件" :class="isshowleft === true ? 'active' : ''" @click="showcomm()">
                <nxnsvgicon class-name="ctrlcom-icon" icon-class="ctrlcom" class="ctrlcom" />
            </div>
            <div title="属性" class="bottonitem" :class="isshowrigth === true ? 'active' : ''" @click="showproperty()">
                <nxnsvgicon class-name="property-icon" icon-class="property" class="property" />
            </div>
            <div title="PC模式设计" class="bottonitem" @click="setdesignType('pc')" :class="designType === 'pc' ? 'active' : ''">
                <nxnsvgicon class-name="PC-icon" icon-class="PC" />
            </div>
            <div title="iPad模式设计" class="bottonitem" @click="setdesignType('ipad')" :class="designType === 'ipad' ? 'active' : ''">
                <nxnsvgicon class-name="iPad-icon" icon-class="iPad" />
            </div>
            <div title="手机模式设计" class="bottonitem" @click="setdesignType('mobile')" :class="designType === 'mobile' ? 'active' : ''">
                <nxnsvgicon class-name="phone-icon" icon-class="phone" />
            </div>
            <div title="全屏" class="bottonitem" @click="fullscreen()">
                <nxnsvgicon class-name="fullscreen-icon" icon-class="fullscreen" v-if="isfullscreen" />
                <nxnsvgicon class-name="cancelfullscreen-icon" icon-class="cancelfullscreen" v-else />
            </div>
        </div>

        <div class="middlehead">
            <div class="item" :class="designStep === 'form' ? 'active' : ''" @click="setdesignStep('form')">
                <i class="el-icon-document"></i>表单设计
                <div class="line"></div>
            </div>
            <div class="item" :class="designStep === 'formconfigure' ? 'active' : ''" @click="setdesignStep('formconfigure')">
                <i class="el-icon-setting"></i>页面设置
                <div class="line"></div>
            </div>
            <div class="item" :class="designStep === 'list' ? 'active' : ''" @click="setdesignStep('list')">
                <i class="el-icon-s-grid"></i>列表设计
                <div class="line"></div>
            </div>
            <div class="item" :class="designStep === 'publish' ? 'active' : ''" @click="setdesignStep('publish')">
                <i class="el-icon-position"></i>页面发布
                <div class="line"></div>
            </div>
        </div>
        <div class="fromtitle">HR流程表单</div>
    </div>
</template>
<script>
import config from '@/configs/index.js'
import store from '@/store'
import nxnsvgicon from '@/icons/index.vue'
export default {
    data() {
        return {
            sitetitle: config.title,
            logourl: config.logo,
            isfullscreen: false,
        }
    },
    components: { nxnsvgicon },
    computed: {
        isshowleft() {
            return this.$store.state.formdesignconfig.isleft2
        },
        isshowrigth() {
            return this.$store.state.formdesignconfig.isrigth
        },
        designType() {
            return this.$store.state.formdesignconfig.designType
        },

        designStep() {
            return this.$store.state.formdesignconfig.designStep
        },
    },
    methods: {
        showcomm() {
            store.commit('setIsleft2')
        },
        showproperty() {
            store.commit('setIsRigth')
        },
        setdesignType(typestr) {
            store.commit('setdesignType', typestr)
        },
        setdesignStep(typestr) {
            store.commit('setdesignStep', typestr)
        },
        fullscreen() {
            this.isfullscreen = !this.isfullscreen
            let isFull =
                document.mozFullScreen ||
                document.fullScreen ||
                document.webkitIsFullScreen ||
                document.webkitFullScreen ||
                document.msFullScreen
            if (!isFull) {
                // documentElement 属性以一个元素对象返回一个文档的文档元素
                var el = document.documentElement
                el.requestFullscreen ||
                el.mozRequestFullScreen ||
                el.webkitRequestFullscreen ||
                el.msRequestFullScreen
                    ? el.requestFullscreen() ||
                      el.mozRequestFullScreen() ||
                      el.webkitRequestFullscreen() ||
                      el.msRequestFullscreen()
                    : null
            } else {
                var exitMethod =
                    document.cancelFullScreen ||
                    document.webkitCancelFullScreen ||
                    document.mozCancelFullScreen ||
                    document.exitFullScreen
                if (exitMethod) {
                    exitMethod.call(document)
                } else if (typeof window.ActiveXObject !== 'undefined') {
                    var wscript = new window.ActiveXObject('WScript.Shell')
                    if (wscript != null) {
                        wscript.SendKeys('{F11}')
                    }
                }
            }
        },
    },
}
</script>
<style scoped>
.designhead {
    height: 51px;
    width: 100%;
    border-bottom: 1px solid #d9d9d9;
}
.middlehead {
    float: left;
    font-size: 16px;
    font-weight: bold;
    font-family: cursive;
    line-height: 51px;
    padding-left: 380px;
    display: flex;
}
.middlehead .item {
    width: 120px;
    text-align: left;
    line-height: 48px;
    cursor: pointer;
}
.middlehead .line {
    display: none;
    width: 88px;
    height: 2px;
    background-color: #0081ff;
    position: relative;
    bottom: 8px;
    left: 3px;
}
.middlehead .active .line,
.middlehead .item:hover .line {
    display: block;
}
.middlehead .item i {
    font-size: 24px;
    position: relative;
    top: 12px;
    padding-right: 5px;
    float: left;
}
.designhead .logo {
    width: 200px;
    float: left;
}
.designhead .leftbotton {
    float: left;
    width: 250px;
}
.ctrlcom {
    width: 23px !important;
    height: 23px !important;
}
.designhead .leftbotton svg {
    width: 20px;
    height: 20px;
    margin: 1.8px;
}

.designhead .fromtitle {
    float: right;
    min-width: 200px;
    font-weight: bold;
    font-family: cursive;
    text-align: left;
    font-size: 18px;
    line-height: 25px;
    border-bottom: 1px solid #d9d9d9;
    padding-top: 12px;
    padding-left: 6px;
    max-width: 200px;
    padding-right: 10px;
    margin-right: 88px;
}

.bottonitem:hover,
.bottonitem.active {
    background-color: #40a9ffba;
    color: white;
    border-radius: 3px;
}
.designhead .logo img {
    width: 35px;
    height: 35px;
    margin: 5px;
    float: left;
}
.designhead .logo .title {
    font-size: 20px;
    font-weight: bold;
    font-family: cursive;
    margin-left: 10px;
    line-height: 51px;
    color: var(--color);
}
.bottonitem {
    float: left;
    width: 26px;
    height: 26px;
    margin: 2px;
    margin-top: 10px;
    cursor: pointer;
}
.leftbotton >>> .svg-icon {
    margin-top: 4px;
    margin-left: 4px;
}
</style>
