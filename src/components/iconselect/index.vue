<template>
    <div>
        <div class="select-flowicon" @click="dialogVisible = true">
            <span class="item-icon">
                <nxnsvgicon :class-name="(value === '' ? 'el-icon-close' : value) + '-icon'" :icon-class="(value === '' ? 'el-icon-close' : value)" class="svgiconitem" style="    font-size: 20px;"></nxnsvgicon>
            </span>
        </div>
        <el-dialog title="图标选择" :visible.sync="dialogVisible" width="850px" top="3vh">
            <selecticon @selected="selectedicon"></selecticon>
        </el-dialog>
    </div>
</template>
<script>
import selecticon from '@/views/formdesign/designproperty/selecticon/index.vue'
import nxnsvgicon from '@/icons/index.vue'
export default {
    props: ['iconclass'],
    data() {
        return { dialogVisible: false, value: '' }
    },
    created() {
        this.value = this.iconclass
    },
    components: { selecticon, nxnsvgicon },
    methods: {
        openicon() {
            this.dialogVisible = true
        },
        selectedicon(iconobj) {
            this.value = iconobj.iconname
            this.$emit('update:iconclass', this.value)
            this.dialogVisible = false
        },
    },
    watch: {
        iconclass() {
            this.value = this.iconclass
        },
    },
}
</script>
<style scoped>
.select-flowicon {
    display: inline-block;
    box-sizing: border-box;
    height: 40px;
    width: 40px;
    padding: 4px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    font-size: 0;
    position: relative;
    cursor: pointer;
}
.item-icon {
    position: relative;
    display: block;
    box-sizing: border-box;
    border: 1px solid #999;
    border-radius: 2px;
    width: 100%;
    height: 100%;
    text-align: center;
}
.item-icon i {
    font-size: 14px;
    margin-top: 7px;
}
.svgiconitem {
    position: relative;
    top: -3px;
    left: 0px;
}
</style>
