<template>
  <el-row>
    <el-col style="min-width:120px;height: 32px;">
      <template v-if="element.type == 'input'">
        <input
          type="text"
          class="form-control"
          v-model="element.options.defaultValue"
          :placeholder="element.options.placeholder"
        />
      </template>
      <template v-else-if="element.type == 'textarea'">
        <textarea
          :maxlength="element.options.dataLength"
          class="form-control multy_textarea"
          :placeholder="element.options.placeholder"
          :rows="element.options.rows"
          v-model="element.options.defaultValue"
        ></textarea>
      </template>
      <template v-else-if="element.type == 'radio'">
        <el-radio-group
          v-model="element.options.defaultValue"
          size="mini"
          style="min-width:150px; height:32px;line-height:30px;overflow:hidden;"
        >
          <el-radio
            style="inline"
            :label="item.value"
            v-for="(item, index) in element.options.options"
            :key="item.value + index"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </template>
      <template v-else-if="element.type == 'checkbox'">
        <el-checkbox-group
          v-model="element.options.defaultValue"
          size="mini"
          style="min-width:150px; height:32px;line-height:32px"
        >
          <el-checkbox
            style="inline"
            :label="item.value"
            v-for="(item, index) in element.options.options"
            :key="item.value + index"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </template>
      <template v-else-if="element.type == 'date'">
        <input
          type="text"
          class="form-control"
          v-model="element.options.defaultValue"
          :placeholder="element.options.placeholder"
        />
        <i
          class="fa fa-calendar"
          aria-hidden="true"
          style="position: absolute;right: 15px;top: 10px;"
        ></i>
      </template>
      <template v-else-if="element.type == 'select'">
        <select
          class="form-control"
          placeholder
          type="select"
          style="-webkit-appearance: none; padding-bottom: 0px;padding-top: 0px;padding-left: 0px;padding-right: 0px;height: 34px;"
        >
          <template v-for="item in element.options.options">
            <option :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </template>
        </select>
        <i
          class="fa fa-caret-down"
          style="position: absolute;right: 15px;top: 10px;"
        ></i>
      </template>
      <template
        v-else-if="
          element.type == 'user' ||
            element.type == 'department' ||
            element.type == 'project' ||
            element.type == 'cost' ||
            element.type == 'choose'
        "
      >
        <input
          type="text"
          class="form-control"
          v-model="element.options.defaultValue"
          :placeholder="element.options.placeholder"
        />
        <i
          class="fa fa-search"
          aria-hidden="true"
          style="position: absolute;right: 10px;top: 10px;"
        ></i>
      </template>
      <template v-else-if="element.type == 'hidden'"></template>
      <template v-else-if="element.type == 'label'"></template>
      <template v-else-if="element.type === 'imgage'">
        <img
          data-v-6c4399d0=""
          src="http://localhost:8080/file/downloadImg?path=AttachmentFile%5C2021-01-11-12-30%5Ca54eb02e-faca-46a4-8262-e8ea6cefa217.jpg"
          width="150px"
          height="80px"
        />
      </template>
      <template v-else-if="element.type === 'rate'">
        <el-rate
          v-model="element.options.defaultValue"
          :readonly="element.options.readonly"
          :disabled="element.options.disabled"
        ></el-rate>
      </template>
      <template v-else-if="element.type === 'inputnumber'">
        <el-input-number
          v-model="element.options.defaultValue"
          :disabled="element.options.disabled"
          :min="element.options.min"
          :max="element.options.max"
          :label="element.options.describe"
          :step="element.options.step"
          :precision="element.options.precision"
        ></el-input-number>
      </template>
      <template v-else-if="element.type === 'timepicker'">
        <a-time-picker
          use12-hours
          :format="element.options.timeformat"
          :disabled="element.options.disabled"
          :minute-step="element.options.minute"
          :second-step="element.options.second"
        />
      </template>
      <template v-if="element.type == 'button'">
        <el-button
          v-for="btn in element.options.buttons"
          style="margin-left:5px;"
          size="mini"
          :key="btn.id"
          plain
        >
          <i :class="btn.options.icon"></i>
          {{ btn.options.labelTitle }}
        </el-button>
      </template>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ['element', 'select', 'index', 'data'],
  components: {},
  data() {
    return {
      selectWidget: this.select
    }
  },
  methods: {},
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  },
  computed: {}
}
</script>
<style>
.el-radio .el-radio__label {
  font-size: 12px;
  padding-left: 5px;
}
</style>
