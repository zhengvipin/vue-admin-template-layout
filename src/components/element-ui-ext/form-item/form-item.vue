<template>
  <el-form-item
    class="ext-form-item"
    :class="{'ext-inline-error':inlineError}"
    v-bind="bindingLabelProps"
  >
    <template #label>
      <slot name="label" />
    </template>
    <slot>
      <el-input
        v-if="isInput"
        v-model="innerValue"
        class="ext-form-item__content"
        :type="type"
        v-bind="bindingProps"
        v-on="bindingEvents"
        @keyup.enter.native="$emit('enter')"
      />
      <el-input-number
        v-else-if="type === 'number'"
        v-model="innerValue"
        class="ext-form-item__content"
        :controls-position="bindingProps.controlsPosition || 'right'"
        v-bind="bindingProps"
        v-on="bindingEvents"
        @keyup.enter.native="$emit('enter')"
      />
      <ext-select
        v-else-if="type === 'select'"
        v-model="innerValue"
        class="ext-form-item__content"
        v-bind="bindingProps"
        v-on="bindingEvents"
      />
      <el-date-picker
        v-else-if="isDatePicker"
        v-model="innerValue"
        class="ext-form-item__content"
        :type="type"
        v-bind="bindingProps"
        v-on="bindingEvents"
      />
      <ext-time-picker
        v-else-if="isTimePicker"
        v-model="innerValue"
        class="ext-form-item__content"
        :type="type"
        v-bind="bindingProps"
        v-on="bindingEvents"
      />
      <ext-radio
        v-else-if="type === 'radio'"
        v-model="innerValue"
        class="ext-form-item__content"
        v-bind="bindingProps"
        v-on="bindingEvents"
      />
      <ext-checkbox
        v-else-if="type === 'checkbox'"
        v-model="innerValue"
        class="ext-form-item__content"
        v-bind="bindingProps"
        v-on="bindingEvents"
      />
      <el-switch
        v-else-if="type === 'switch'"
        v-model="innerValue"
        class="ext-form-item__content"
        v-bind="bindingProps"
        v-on="bindingEvents"
      />
      <el-slider
        v-else-if="type === 'slider'"
        v-model="innerValue"
        class="ext-form-item__content"
        v-bind="bindingProps"
        v-on="bindingEvents"
      />
      <el-rate
        v-else-if="type === 'rate'"
        v-model="innerValue"
        class="ext-form-item__content"
        v-bind="bindingProps"
        v-on="bindingEvents"
      />
      <el-cascader
        v-else-if="type === 'cascader'"
        v-model="innerValue"
        class="ext-form-item__content"
        v-bind="bindingProps"
        v-on="bindingEvents"
      />
      <span v-else class="ext-form-item__content" v-html="innerValue" />
    </slot>
  </el-form-item>
</template>

<script>
import { Cascader, DatePicker, FormItem, Input, InputNumber, Rate, Slider, Switch } from 'element-ui'
import ExtSelect from '../select'
import ExtRadio from '../radio'
import ExtCheckbox from '../checkbox'
import ExtTimePicker from '../time-picker'
import { camelCaseObject } from '../utils'
import { pickBy, cloneDeep, isArray, find, keys } from 'lodash'

const LABEL_PROPS = ['prop', 'label', 'label-width', 'labelWidth', 'required', 'rules', 'inline-message', 'inlineMessage']
const FORM_ITEM_EVENTS = ['change', 'blur', 'focus', 'clear', 'visible-change', 'remove-tag', 'expand-change', 'input', 'enter'] // todo：这里是硬编码，后续自定义属性不要和这里冲突

export default {
  name: 'ExtFormItem',
  components: {
    ElFormItem: FormItem,
    ElInput: Input,
    ElInputNumber: InputNumber,
    ElDatePicker: DatePicker,
    ElSwitch: Switch,
    ElSlider: Slider,
    ElRate: Rate,
    ElCascader: Cascader,
    ExtSelect,
    ExtRadio,
    ExtCheckbox,
    ExtTimePicker
  },
  inheritAttrs: false,
  props: {
    /* eslint-disable */
    type: String,
    value: {required: false},
    // 事件作为属性绑定
    events: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否展示label，配合ExtSearchForm组件使用
    showLabel: {
      type: Boolean,
      default: true
    },
    // 是否行内展示校验信息
    inlineError: {
      type: Boolean,
      default: false
    },
    // 配合ExtForm组件使用，标识是否作为ExtForm的子组件存在
    formItem: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const datePickerOptions = {
      shortcuts: [{
        text: '今天',
        onClick(picker) {
          picker.$emit('pick', new Date())
        }
      }, {
        text: '昨天',
        onClick(picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', date)
        }
      }, {
        text: '一周前',
        onClick(picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', date)
        }
      }]
    }
    const daterangePickerOptions = {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }]
    }
    return {
      defaultPickerOptions: {
        date: datePickerOptions,
        week: datePickerOptions,
        datetime: datePickerOptions,
        datetimerange: daterangePickerOptions,
        daterange: daterangePickerOptions,
        monthrange: daterangePickerOptions
      },
      defaultProps: {
        input: {},
        textarea: {
          resize: 'none'
        },
        password: {},
        number: {},
        year: {
          placeholder: '选择年份',
          valueFormat: 'yyyy'
        },
        month: {
          placeholder: '选择月份',
          valueFormat: 'yyyy-MM'
        },
        date: {
          placeholder: '选择日期',
          valueFormat: 'yyyy-MM-dd'
        },
        dates: {
          placeholder: '选择日期',
          valueFormat: 'yyyy-MM-dd'
        },
        week: {
          placeholder: '选择周数'
        },
        datetime: {
          placeholder: '选择时间',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        datetimerange: {
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          rangeSeparator: '~',
          align: 'right',
          valueFormat: 'yyyy-MM-dd HH:mm:ss'
        },
        daterange: {
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          rangeSeparator: '~',
          align: 'right',
          valueFormat: 'yyyy-MM-dd'
        },
        monthrange: {
          startPlaceholder: '开始月份',
          endPlaceholder: '结束月份',
          rangeSeparator: '~',
          align: 'right',
          valueFormat: 'yyyy-MM'
        },
        time: {
          placeholder: '选择时间',
          valueFormat: 'HH:mm:ss'
        },
        timerange: {
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          rangeSeparator: '~',
          align: 'right',
          valueFormat: 'HH:mm:ss',
          isRange: true,
          arrowControl: true
        },
        radio: {},
        checkbox: {},
        switch: {
          activeText: '是',
          inactiveText: '否'
        },
        slider: {},
        rate: {},
        cascader: {}
      }
    }
  },
  computed: {
    attrs() {
      return camelCaseObject(this.$attrs)
    },
    listeners() {
      return camelCaseObject(this.$listeners)
    },
    innerValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    labelProps() {
      return pickBy(this.attrs, (value, key) => LABEL_PROPS.indexOf(key) >= 0)
    },
    innerProps() {
      return pickBy(this.attrs, (value, key) => LABEL_PROPS.indexOf(key) < 0)
    },
    isInput() {
      return ['input', 'textarea', 'password'].includes(this.type)
    },
    isTimePicker() {
      return ['time', 'timerange'].includes(this.type)
    },
    isDatePicker() {
      return ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange', 'monthrange'].includes(this.type)
    },
    bindingLabelProps() {
      const props = cloneDeep(this.labelProps)
      // 合并校验规则
      const {required, rules, label} = props
      const requiredRule = {required: true, message: label + '不能为空', trigger: 'change'}
      if (required) {
        if (rules) {
          if (isArray(rules)) {
            if (!find(rules, {required: true})) rules.push(requiredRule)
          } else {
            if (!rules.required) props.rules = [rules, requiredRule]
          }
        } else {
          props.rules = requiredRule
        }
        props.required = false
        props.disabled = false
      }
      // 是否展示label
      if (!this.showLabel) props.label = undefined
      return props
    },
    bindingProps() {
      const props = {
        ...this.defaultProps[this.type],
        clearable: true,
        ...this.innerProps
      }
      if (this.formItem && props['enumKey']) delete props['enumKey'] // 作为ExtForm的子组件时，剔除传入的enumKey
      if (props.readonly || props.disabled) props.disabled = true // 统一转换只读属性
      if (this.isDatePicker) props.pickerOptions = Object.assign({}, this.defaultPickerOptions[this.type], props.pickerOptions)
      return props
    },
    bindingEvents() {
      const events = {...this.$listeners}
      FORM_ITEM_EVENTS.filter(d => keys(this.$attrs).indexOf(d) > 0).forEach(d => events[d] = this.$attrs[d].bind(this))//fixme：这里巧用 bind 改变指向但是不直接调用
      return events
    }
  }
}
</script>

<style lang="scss" scoped>
.ext-form-item {
  .ext-form-item__content {
    width: 100% !important;

    // number组件初始隐藏加减控件，hover才显示
    &.el-input-number {
      ::v-deep .el-input-number__decrease, ::v-deep .el-input-number__increase {
        opacity: 0;
        -webkit-transition: opacity .2s ease-in-out;
        transition: opacity .2s ease-in-out;
      }

      &:hover {
        ::v-deep .el-input-number__decrease, ::v-deep .el-input-number__increase {
          opacity: 1;
        }
      }
    }
  }

  &.ext-inline-error {
    margin-bottom: 12px;

    .ext-form-item__content {
      // 调整错误提示出现位置，改为内联展示
      ::v-deep ~ .el-form-item__error {
        font-size: 10px;
        -webkit-transform: scale(0.8);
        top: 9px;
        left: unset !important;
        right: 30px !important;
        opacity: 1;
        transition: opacity ease-in-out 0.6s;

        &:hover {
          opacity: 0;
        }
      }

      // hover隐藏错误提示
      &:hover {
        ::v-deep ~ .el-form-item__error {
          opacity: 0;
        }
      }
    }

    // todo: 需要校验
    //::v-deep .el-form-item__content {
    //  .el-form-item__error {
    //    font-size: 10px;
    //    -webkit-transform: scale(0.8);
    //    top: 9px;
    //    left: unset !important;
    //    right: 30px !important;
    //    opacity: 1;
    //    transition: opacity ease-in-out 0.6s;
    //
    //    &:hover {
    //      opacity: 0;
    //    }
    //  }
    //
    //  // hover隐藏错误提示
    //  &:hover {
    //    ::v-deep ~ .el-form-item__error {
    //      opacity: 0;
    //    }
    //  }
    //}
  }
}

</style>
