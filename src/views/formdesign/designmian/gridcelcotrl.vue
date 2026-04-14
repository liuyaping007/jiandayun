<template>
  <div>
    <autono
      v-if="element.type === 'autonumber'"
      :BusinessMoudle="element.options.BusinessMoudle"
      :BusinessModuleID="element.options.BusinessModuleID"
      :modelcode="element.options.modelcode"
    ></autono>
    <datarelevance
      v-else-if="element.type === 'datarelevance'"
      :filedlist="element.options.filedList"
      :dataid="element.options.defaultValue"
      :apicode="element.options.sourceApi"
      :title="element.options.title"
    ></datarelevance>
    <cityselector
      v-else-if="element.type === 'cityselector'"
      v-model="element.options.defaultValue"
      :disabled="element.options.disabled"
    ></cityselector>
    <el-input
      v-else-if="element.type === 'input'"
      :placeholder="element.options.placeholder"
      v-model="element.options.defaultValue"
      :show-password="element.options.password"
      :clearable="element.options.clearable"
      :maxlength="element.options.dataLength"
      :prefix="element.options.prefix"
      :suffix="element.options.suffix"
      :suffix-icon="element.options.suffixicon"
      :prefix-icon="element.options.prefixicon"
      :disabled="element.options.disabled"
      :show-word-limit="element.options.showwordlimit"
      :size="element.options.butsize"
    ></el-input>
    <el-input
      v-else-if="element.type === 'textarea'"
      type="textarea"
      :autosize="{
        minRows: element.options.minRows,
        maxRows: element.options.maxRows,
      }"
      :maxlength="element.options.dataLength"
      :placeholder="element.options.placeholder"
      v-model="element.options.defaultValue"
      :show-word-limit="element.options.showwordlimit"
      :disabled="element.options.disabled"
      :clearable="element.options.clearable"
    >
    </el-input>
    <el-switch
      v-else-if="element.type === 'switch'"
      v-model="element.options.defaultValue"
      :active-color="element.options.activecolor"
      :inactive-color="element.options.inactivecolor"
      :disabled="element.options.disabled"
    >
    </el-switch>
    <el-slider
      v-else-if="element.type === 'slider'"
      v-model="element.options.defaultValue"
      :range="element.options.range"
      :disabled="element.options.disabled"
      :max="element.options.max"
      :min="element.options.min"
      :step="element.options.step"
    >
    </el-slider>
    <el-color-picker
      v-else-if="element.type === 'colorpicker'"
      v-model="element.options.defaultValue"
      :disabled="element.options.disabled"
      :size="element.options.butsize"
    >
    </el-color-picker>

    <el-radio-group
      v-else-if="element.type === 'radio'"
      v-model="element.options.defaultValue"
      size="mini"
      style="line-height:30px; "
    >
      <template v-if="element.options.isbutton !== true">
        <el-radio
          style="inline"
          :label="item.value"
          v-for="(item, index) in element.options.options"
          :key="item + index"
          >{{ item }}</el-radio
        >
      </template>
      <template v-else>
        <el-radio-button
          :label="item.value"
          v-for="(item, index) in element.options.options"
          :key="item + index"
          >{{ item }}</el-radio-button
        >
      </template>
    </el-radio-group>
    <el-checkbox-group
      v-else-if="element.type === 'checkbox'"
      v-model="element.options.defaultValue"
      size="mini"
      style="line-height:30px;"
    >
      <template v-if="element.options.isbutton !== true">
        <el-checkbox
          style="inline"
          :label="item.value"
          v-for="(item, index) in element.options.options"
          :key="item + index"
          >{{ item }}</el-checkbox
        >
      </template>
      <template v-else>
        <el-checkbox-button
          style="inline"
          :label="item.value"
          v-for="(item, index) in element.options.options"
          :key="item + index"
          >{{ item }}</el-checkbox-button
        >
      </template>
    </el-checkbox-group>

    <el-time-picker
      v-else-if="element.type === 'time'"
      v-model="element.options.defaultValue"
      :is-range="element.options.isRange"
      :placeholder="element.options.placeholder"
      :start-placeholder="element.options.startPlaceholder"
      :end-placeholder="element.options.endPlaceholder"
      :readonly="element.options.readonly"
      :disabled="element.options.disabled"
      :editable="element.options.editable"
      :clearable="element.options.clearable"
      :arrowControl="element.options.arrowControl"
      style="width: 100%;"
      size="element.options.butsize"
    ></el-time-picker>
    <template v-else-if="element.type === 'date'">
      <template v-if="element.options.modeltype === 'date'">
        <el-date-picker
          v-model="element.options.defaultValue"
          :placeholder="element.options.placeholder"
          :format="element.options.format"
          :disabled="element.options.disabled"
          style="width: 100%;"
          value-format="yyyy-MM-dd"
          size="small"
        />
      </template>
      <template
        v-else-if="
          element.options.modeltype === 'year' ||
            element.options.modeltype === 'week' ||
            element.options.modeltype === 'month'
        "
      >
        <el-date-picker
          v-model="element.options.defaultValue"
          :type="element.options.modeltype"
          format="yyyy"
          :placeholder="element.options.placeholder"
          :disabled="element.options.disabled"
          style="width: 100%;"
          size="small"
        >
        </el-date-picker>
      </template>

      <template v-else-if="element.options.modeltype === 'range'">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :format="element.options.format"
          :disabled="element.options.disabled"
        >
        </el-date-picker>
      </template>
    </template>
    <el-select
      v-else-if="element.type === 'select'"
      v-model="element.options.defaultValue"
      :multiple="element.options.isMulty"
      :placeholder="element.options.placeholder"
      :size="element.options.butsize"
      :clearable="element.options.clearable"
      :filterable="element.options.isSearch"
      :collapse-tags="element.options.collapsetags"
      :allow-create="element.options.allowcreate"
      :default-first-option="element.options.allowcreate"
      style="width: 100%;"
    >
      <el-option
        v-for="item in element.options.options"
        :key="item"
        :value="item"
        :label="item"
      ></el-option>
    </el-select>
    <el-rate
      v-else-if="element.type === 'rate'"
      v-model="element.options.defaultValue"
      :readonly="element.options.readonly"
      :disabled="element.options.disabled"
    ></el-rate>
    <el-input-number
      v-else-if="element.type === 'inputnumber'"
      v-model="element.options.defaultValue"
      :disabled="element.options.disabled"
      :min="element.options.min"
      :max="element.options.max"
      :label="element.options.describe"
      :step="element.options.step"
      :precision="element.options.precision"
    ></el-input-number>
    <el-time-select
      v-else-if="element.type === 'timepicker'"
      v-model="value"
      :picker-options="{
        start: '00:00',
        step: '00:15',
        end: '24:00',
      }"
      placeholder="选择时间"
    >
    </el-time-select>
    <selector
      v-else-if="
        element.type === 'user' ||
          element.type === 'organ' ||
          element.type === 'department' ||
          element.type === 'role'
      "
      :typemode="element.options.typemode"
      :ismulti="false"
    ></selector>
    <htmlcode
      v-else-if="element.type === 'component'"
      :htmlcode="element.options.htmlContent"
    ></htmlcode>
  </div>
</template>
<script>
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
export default {
  props: ['element'],
  components: {
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
  },
}
</script>
<style scoped></style>
