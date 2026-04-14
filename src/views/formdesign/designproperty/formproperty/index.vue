<template>
  <div>
    <div
      v-for="(comitemlist, propertykey) in showpropertytypeList"
      :key="propertykey"
      class="collapse-item"
    >
      <div class="collapse-head" @click="clickcollapse(propertykey)">
        {{ propertykey }}
        <div
          class="icon "
          :class="
            propertykeyshow === propertykey
              ? 'el-icon-arrow-down'
              : 'el-icon-arrow-right'
          "
        ></div>
      </div>
      <div class="collapse-content" v-if="propertykeyshow === propertykey">
        <template v-for="key in comitemlist">
          <div
            class="com-context"
            v-if="showfun(key)"
            v-bind:key="key"
            :class="propertyhelper[key].classname"
          >
            <div class="title" :title="propertyhelper[key].title">
              {{ propertyhelper[key].title }}
            </div>
            <div class="context">
              <el-input-number
                v-model="options[key]"
                size="mini"
                :min="
                  propertyhelper[key].min === undefined
                    ? -20000
                    : propertyhelper[key].min
                "
                :step="
                  propertyhelper[key].step === undefined
                    ? 1
                    : propertyhelper[key].step
                "
                :max="
                  propertyhelper[key].max === undefined
                    ? 200000000
                    : propertyhelper[key].max
                "
                style="width: 100%;"
                :label="propertyhelper[key].title"
                v-if="propertyhelper[key].type === 'number'"
              ></el-input-number>
              <el-slider
                v-model="options[key]"
                :min="
                  propertyhelper[key].min === undefined
                    ? -20000
                    : propertyhelper[key].min
                "
                :step="
                  propertyhelper[key].step === undefined
                    ? 1
                    : propertyhelper[key].step
                "
                :max="
                  propertyhelper[key].max === undefined
                    ? 200000000
                    : propertyhelper[key].max
                "
                v-else-if="propertyhelper[key].type === 'slider'"
              ></el-slider>
              <uploadimg
                v-else-if="propertyhelper[key].type === 'imgurl'"
                :imgurl.sync="options[key]"
                :title="propertyhelper[key].title"
              ></uploadimg>
              <div
                v-else-if="propertyhelper[key].type === 'color'"
                class="cotrlcontext-row"
              >
                <el-input
                  v-model="options[key]"
                  size="mini"
                  placeholder="背景颜色"
                ></el-input>
                <el-color-picker
                  v-model="options[key]"
                  size="mini"
                  show-alpha
                ></el-color-picker>
              </div>
              <el-switch
                v-model="options[key]"
                v-else-if="propertyhelper[key].type === 'switch'"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
                v-model="options[key]"
                v-else-if="propertyhelper[key].type === 'textarea'"
              >
              </el-input>
              <el-select
                v-model="options[key]"
                style="width: 100%;"
                size="mini"
                v-else-if="propertyhelper[key].type === 'select'"
              >
                <el-option
                  v-for="optionitem in propertyhelper[key].data"
                  v-bind:key="key + optionitem.value"
                  :value="optionitem.value"
                  :label="optionitem.label"
                ></el-option>
              </el-select>
              <el-select
                v-model="options[key]"
                style="width: 100%;"
                size="mini"
                v-else-if="propertyhelper[key].type === 'selectanimation'"
              >
                <el-option
                  v-for="optionitem in animationlist"
                  v-bind:key="optionitem.value"
                  :value="optionitem.value"
                  :label="optionitem.name"
                ></el-option>
              </el-select>
              <el-input
                v-model="options[key]"
                size="mini"
                placeholder="请输入内容"
                v-else
              ></el-input>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import uploadimg from '../property-comm/uploadimg.vue'
import { helper, propertytype } from '../../config/propertyhelpConfig.js'
export default {
  data() {
    return {
      showpropertytypeList: {},
      propertyhelper: null,
      propertykeyshow: '基本设置',
      forminfo: this.changeFromInfo(),
    }
  },
  computed: {
    SetChangeFromInfo() {
      return this.changeFromInfo()
    },
  },
  components: { uploadimg },
  created() {
    this.propertyhelper = helper
    this.loadData()
  },
  methods: {
    loadData() {
      console.log('fsdf')
      if (this.forminfo !== null) {
        propertytype.forEach((res) => {
          this.showpropertytypeList[res] = []
        })
        for (const key in this.forminfo) {
          if (this.propertyhelper[key] !== undefined) {
            if (
              this.propertyhelper[key].propertytype !== '' &&
              this.propertyhelper[key].propertytype !== undefined &&
              this.propertyhelper[key].propertytype !== null
            ) {
              this.showpropertytypeList[
                this.propertyhelper[key].propertytype
              ].push(key)
            } else {
              this.showpropertytypeList['其它'].push(key)
            }
          }
        }
        propertytype.forEach((res) => {
          if (this.showpropertytypeList[res].length === 0) {
            delete this.showpropertytypeList[res]
          }
        })
      }
    },
    showfun(itemkey) {
      if (this.propertyhelper[itemkey].showfun === undefined) {
        return true
      }
      return this.propertyhelper[itemkey].showfun(
        this.$parent,
        this.activectrl,
        itemkey
      )
    },
    clickcollapse(propertykey) {
      if (this.propertykeyshow === propertykey) {
        this.propertykeyshow = ''
      } else {
        this.propertykeyshow = propertykey
      }
    },
  },
  watch: {
    SetChangeFromInfo(val) {
      this.forminfo = val
      this.loadData()
    },
  },
  inject: ['changeFromInfo'],
}
</script>
<style scoped>
.collapse-item {
  border-top: 1px solid #34343480;
  width: 100%;
  border-bottom: 1px solid #34343480;
  display: inline-block;
}
.collapse-head {
  line-height: 35px;
  height: 35px;
  font-size: 12px;
  font-weight: 400;
  color: #606266;
  font-weight: bold;
  text-align: left;
  padding-left: 15px;
}
.collapse-head .icon {
  float: right;
  padding-right: 8px;
  padding-top: 13px;
}
.collapse-content {
  width: 100%;
  color: #606266;
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
.collapse-item >>> .el-slider__runway {
  height: 3px;
}
.collapse-item >>> .el-slider__bar {
  height: 3px;
}
.collapse-item >>> .el-slider__button-wrapper {
  height: 13px;
  width: 13px;
  top: -6px;
}
.collapse-item >>> .el-slider__button {
  height: 11px;
  width: 11px;
}
.cotrlcontext-row {
  display: flex;
}
</style>
