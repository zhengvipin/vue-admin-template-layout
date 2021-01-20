<template>
  <el-radio-group
    v-model="innerValue"
    class="ext-radio"
    v-bind="bindingProps"
    v-on="$listeners"
  >
    <slot name="content">
      <template v-if="showButton">
        <el-radio-button v-for="(option,index) in innerOptions" :key="index" v-bind="options">
          {{ option.text }}
        </el-radio-button>
      </template>
      <template v-else>
        <el-radio v-for="(option,index) in innerOptions" :key="index" v-bind="options">
          {{ option.text }}
        </el-radio>
      </template>
    </slot>
  </el-radio-group>
</template>

<script>
import { Radio, RadioButton, RadioGroup } from 'element-ui'
import { getValueType, isObjectArray, camelCaseObject } from '../utils'

export default {
  name: 'ExtRadio',
  components: {
    ElRadio: Radio,
    ElRadioButton: RadioButton,
    ElRadioGroup: RadioGroup
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    /* eslint-disable */
    value: [String, Number, Boolean],
    options: {
      type: Array,
      default() {
        return []
      }
    },
    props: {
      type: Object,
      default() {
        return {}
      }
    },
    enumKey: String,
    showButton: Boolean
  },
  data() {
    return {
      innerOptions: []
    }
  },
  computed: {
    attrs() {
      return camelCaseObject(this.$attrs)
    },
    innerValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    innerProps() {
      return { label: 'label', value: 'value', ...this.props }
    },
    bindingProps() {
      return {
        ...this.attrs
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.innerOptions = this.generateOptions(this.options)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    if (this.enumKey && (!this.options || !this.options.length)) {
      if (this.$getEnumList) {
        this.$getEnumList([this.enumKey]).then(response => {
          this.innerOptions = this.generateOptions(response[this.enumKey] || [])
        })
      }
    }
  },
  methods: {
    // 注意：el-radio 选中状态的值的属性是 label
    generateOptions(options) {
      if (!options || !options.length) return []
      if (isObjectArray(options)) {
        const valueType = getValueType(this.value)
        return options.map(option => {
          const value = option[this.innerProps.value]
          const label = option[this.innerProps.label]
          return { text: label, label: valueType(value) }
        })
      } else {
        return options.map(item => Object.assign({ text: item, label: item }))
      }
    }
  }
}
</script>

<style scoped>

</style>
