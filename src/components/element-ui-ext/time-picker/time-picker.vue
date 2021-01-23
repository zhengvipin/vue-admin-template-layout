<template>
  <el-time-select
    v-if="timeSelect"
    v-model="innerValue"
    class="ext-time-picker"
    v-bind="bindingProps"
    v-on="$listeners"
  />
  <el-time-picker
    v-else
    v-model="innerValue"
    class="ext-time-picker"
    v-bind="bindingProps"
    v-on="$listeners"
  />
</template>

<script>
import { TimePicker, TimeSelect } from 'element-ui'
import { camelCaseObject } from '../utils'

export default {
  name: 'ExtTimePicker',
  components: {
    ElTimePicker: TimePicker,
    ElTimeSelect: TimeSelect
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    /* eslint-disable */
    value: [String, Date, Array],
    timeSelect: Boolean
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
    bindingProps() {
      return {
        ...this.attrs
      }
    }
  }
}
</script>

<style scoped>

</style>
