<template>
  <el-select
    v-model="innerValue"
    class="ext-select"
    v-bind="bindingProps"
    v-on="$listeners"
  >
    <slot name="content">
      <template v-if="showValue">
        <el-option v-for="(option,index) in innerOptions" :key="index" :label="option.label" :value="option.value" class="clearfix">
          <span style="float: left">{{ option.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ option[showValue] || option.value }}</span>
        </el-option>
      </template>
      <template v-else>
        <el-option v-for="(option,index) in innerOptions" :key="index" :label="option.label" :value="option.value" />
      </template>
    </slot>
  </el-select>
</template>

<script>
import { Select } from 'element-ui'
import { getValueType, isObjectArray, camelCaseObject } from '../utils'

export default {
  name: 'ExtSelect',
  components: { ElSelect: Select },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    /* eslint-disable */
    value: {
      required: false
    },
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
    showValue: Boolean
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
        collapseTags: true,
        filterable: true,
        clearable: true,
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
    generateOptions(options) {
      if (!options || !options.length) return []
      if (isObjectArray(options)) {
        const valueType = getValueType(this.value)
        return options.map(option => {
          const value = option[this.innerProps.value]
          const label = option[this.innerProps.label]
          return { label: label, value: valueType(value) }
        })
      } else {
        return options.map(item => Object.assign({ label: item, value: item }))
      }
    }
  }
}
</script>

<style scoped>

</style>
