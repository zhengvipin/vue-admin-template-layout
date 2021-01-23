<template>
  <el-checkbox-group
    v-model="innerValue"
    class="ext-checkbox"
    v-bind="bindingProps"
    v-on="$listeners"
  >
    <slot name="content">
      <template v-if="showButton">
        <el-checkbox-button v-for="(option,index) in innerOptions" :key="index" v-bind="option">
          {{ option.text }}
        </el-checkbox-button>
      </template>
      <template v-else>
        <el-checkbox v-for="(option,index) in innerOptions" :key="index" v-bind="option">
          {{ option.text }}
        </el-checkbox>
      </template>
    </slot>
  </el-checkbox-group>
</template>

<script>
import { Checkbox, CheckboxButton, CheckboxGroup } from 'element-ui'
import { getValueType, isObjectArray, camelCaseObject } from '../utils'

export default {
  name: 'ExtCheckbox',
  components: {
    ElCheckbox: Checkbox,
    ElCheckboxButton: CheckboxButton,
    ElCheckboxGroup: CheckboxGroup
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: Array,
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
    // eslint-disable-next-line vue/require-default-prop
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
    // 注意：el-checkbox 选中状态的值的属性是 label
    generateOptions: function(options) {
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
.ext-checkbox {
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
}
</style>
