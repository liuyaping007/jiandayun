<template>
  <div class="theme">
    <div class="theme-header">
      <span class="formplane-title"
        ><i class="fa fa-dashboard"></i>主题选择</span
      >
    </div>
    <div class="theme-content">
      <div class="style_select">
        <div class="style_select_tit"><span>风格</span></div>
        <div class="style_select_cot choose_theme_tag" data-key="style">
          <p
            v-for="(item, index) in titlist"
            :key="index"
            :data-value="item.value"
            @click="
              selecttit = item.value
              themesearch(1)
            "
            :class="selecttit === item.value ? 'selected' : ''"
          >
            {{ item.label }}
          </p>
        </div>
      </div>
      <div class="color_select">
        <div class="color_select_tit"><span>颜色</span></div>
        <div class="color_select_cot choose_theme_tag" data-key="color">
          <p
            class=""
            data-index="0"
            v-for="(item, index) in colorlist"
            :key="index"
            :data-value="item"
            @click="
              selectcolor = item
              themesearch(1)
            "
            :class="selectcolor === item ? 'selected' : ''"
          >
            <i :style="{ 'background-color': item }" v-if="item !== ''"></i>
            {{ item === '' ? '全部' : '' }}
          </p>
        </div>
      </div>
      <div class="pic_select choose_theme_tag" data-key="pic">
        <p
          v-for="(item, index) in themeconfiglist"
          :key="index"
          @click="selectthemeEvent(item)"
          :class="selecttheme === item ? 'selected' : ''"
        >
          <img :src="item.themeioc" />
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { themeconfig } from '../config/themeconfig.js'
export default {
  data() {
    return {
      colorlist: [
        '',
        '#804000',
        '#EAEAEA',
        '#484848',
        '#7464FF',
        '#2672FF',
        '#00BF6F',
        '#F8E71C',
        '#FF6D56',
      ],
      titlist: [
        { value: '', label: '全部' },
        { value: 'school', label: '校园' },
        { value: 'commerce', label: '商务' },
        { value: 'scenery', label: '风景' },
        { value: 'parent_child', label: '亲子' },
        { value: 'catering', label: '餐饮' },
        { value: 'occupation', label: '职业' },
        { value: 'festival', label: '节日' },
        { value: 'fangyi', label: '防疫' },
        { value: 'others', label: '其他' },
      ],
      themeconfiglist: themeconfig,
      selecttit: '',
      selecttheme: null,
      selectcolor: '',
    }
  },
  methods: {
    selectthemeEvent(item) {
      this.selecttheme = item
    },
    themesearch(page) {
      this.themeconfiglist = []
      for (let i = 0; i < themeconfig.length; i++) {
        let isbool = true
        if (
          this.selecttit === '' ||
          themeconfig[i].typestyle === this.selecttit
        ) {
          isbool = true
        } else {
          isbool = false
        }
        if (
          isbool === true &&
          (this.selectcolor === '' ||
            themeconfig[i].typecolor === this.selectcolor)
        ) {
          isbool = true
        } else {
          isbool = false
        }
        if (isbool === true) {
          this.themeconfiglist.push(themeconfig[i])
        }
      }
      this.themePage.total = this.themeconfiglist.length
      this.themeconfiglist = this.pagination(page, 12, this.themeconfiglist)
    },
    pagination(pageNo, pageSize, array) {
      const offset = (pageNo - 1) * pageSize
      return offset + pageSize >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + pageSize)
    },
    themeclear() {
      this.selecttheme = null
    },
  },
}
</script>
<style scoped>
.theme {
  border: 1px solid #d9d9d9;
  width: calc(100% - 2px);
  height: 100%;
  min-height: 42px;
  border-radius: 4px;
  border-top: 0px;
  border-right: 0px;
  border-bottom: 1px solid #d9d9d9;
}
.formplane-title i {
  margin: 5px;
  font-size: 20px;
  margin-top: 8px;
  position: relative;
  float: left;
}
.theme-header {
  line-height: 38px;
  border-bottom: 1px solid #ccced3;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: bold;
  padding-left: 10px;
}
.theme-content {
  margin-left: 11px;
  height: 871px;
  overflow-y: auto;
}
.theme-header span {
  border-radius: 4px;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.theme-header i {
  padding-right: 5px;
}
.theme-header .theme-rigth {
  float: right;
  padding-right: 15px;
}

.theme_select {
  font-size: 16px;
  color: #484848;
  margin: 10px;
}
.style_select {
  padding-top: 18px;
  font-size: 0;
  position: relative;
}
.color_select {
  display: flex;
  position: relative;
}
.style_select .style_select_tit,
.color_select .color_select_tit {
  display: inline-block;
  position: absolute;
  margin-top: 5px;
}
.style_select span,
.color_select span {
  margin-right: 7px;
  font-size: 13px;
  color: #707070;
  line-height: 14px;
}
.style_select .style_select_cot,
.color_select .color_select_cot {
  margin-left: 32px;
}
.style_select p,
.style_select .all,
.color_select .all {
  display: inline-block;
  padding: 5px 9px;
  border: 1px solid #eaeaea;
  font-size: 12px;
  color: #707070;
  line-height: 12px;
  border-radius: 2px;
  margin: 0 2px 4px 0;
  cursor: pointer;
}
.color_select p:nth-child(1) {
  padding-top: 7px;
}
.color_select p i {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 2px;
}
.color_select p {
  display: inline-block;
  border: 1px solid #eaeaea;
  padding: 2px;
  border-radius: 2px;
  margin-bottom: 4px;
  margin-right: 2px;
  cursor: pointer;
  margin-top: 2px;
}
.pic_select {
  padding-top: 4px;
  font-size: 0;
  line-height: 0;
}
.pic_select p {
  display: inline-block;
  width: 80px;
  height: 80px;
  background-color: #f3f5f6;
  margin: 0 4px 4px 0;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.pic_select p img {
  display: inline-block;
  width: 80px;
  height: 80px;
  border: 1px solid transparent;
  box-sizing: border-box;
}
.pic_select p:after {
  content: '';
  background: url(../../../assets/mobile_theme_active.png);
  background-size: 18px;
  width: 18px;
  height: 18px;
  position: absolute;
  top: 4px;
  right: 4px;
  display: none;
}
.style_select .selected,
.color_select .selected {
  color: #2672ff !important;
  border: 1px solid #2672ff !important;
}
.pic_select p.selected:after {
  display: block;
}
</style>
