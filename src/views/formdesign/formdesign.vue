<template>
  <div class="deigncontent" :class="showcodeeditor === true ? 'showcode' : ''">
    <designtoolbar></designtoolbar>
    <designmian :forminfo.sync="forminfo"></designmian>
    <designproperty></designproperty>
  </div>
</template>
<script>
import designproperty from './designproperty/index.vue'
import designmian from './designmian/index.vue'
import designtoolbar from './designtoolbar/index.vue'
export default {
  data() {
    return {
      forminfo: {
        formName: '',
        formCode: '',
        formDesc: '',
        designType: '/buildquestionnaire.html',
        deviceDesignType: 'pc',
        formid: '',
        queryWhere: [],
        frompower: [],
        ctrls: [],
        fromsavelogic: '',
        headurl: '',
        backgroundurl: '',
        isadapt: true,
        fwidth: 1920,
        fheight: 1080,
        logicList: [],
        dialogwidth: '70%',
        fromTableName: '',
        fromTableFieldRule: 'filed',
        subTableNameRule: 'from_sub',
        subTableNameFieldRule: 'filedsub',
        defaulcelnum: 4,
        defaultwidth: 120,
        parentMenuName: '',
        parentMenuid: '',
        rolelisted: [],
        formIcon: 'design',
        ficontype: 'svg',
      },
    }
  },
  methods: {},
  computed: {
    showcodeeditor() {
      return this.$store.state.formdesignconfig.showcodeeditor
    },
  },
  components: { designproperty, designmian, designtoolbar },
  provide() {
    return {
      changeFromInfo: () => this.forminfo,
      setFromInfo: (val) => (this.forminfo = val),
    }
  },
}
</script>
<style scoped>
.deigncontent {
  width: 100%;
  height: calc(1080px - 52px);
  display: flex;
}
.showcode .designtoolbar {
  display: none;
}
.showcode .designproperty {
  display: none;
}
</style>
