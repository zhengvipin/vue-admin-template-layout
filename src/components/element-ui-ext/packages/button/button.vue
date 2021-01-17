<template>
  <el-button
    v-permission="permissions"
    class="ext-button"
    v-bind="bindingProps"
    v-on="bindingEvents"
  >
    <slot>{{ name }}</slot>
  </el-button>
</template>

<script>
import { Button } from 'element-ui'
import { camelCaseObject } from '../utils'

export default {
  name: 'ExtButton',
  components: { ElButton: Button },
  props: {
    /* eslint-disable */
    name: String,
    handler: Function,
    permissions: {
      type: Array,
      default() {
        return []
      }
    },
    preventDefault: {
      type: Boolean,
      default: true
    },
    stopPropagation: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    attrs() {
      return camelCaseObject(this.$attrs)
    },
    bindingProps() {
      return {
        loading: this.loading,
        ...this.attrs
      }
    },
    bindingEvents() {
      const events = { ...this.$listeners }
      const hdlClick = events['click']
      events['click'] = (e) => {
        if (this.preventDefault) e.preventDefault()
        if (this.stopPropagation) e.stopPropagation()
        if (hdlClick) {
          hdlClick((boo) => this.loading = boo)
        } else if (this.handler) this.handler((boo) => this.loading = boo)
      }
      return events
    }
  }
}
</script>

<style scoped>

</style>
