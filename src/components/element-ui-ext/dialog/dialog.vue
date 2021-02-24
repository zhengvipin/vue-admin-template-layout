<template>
  <el-dialog
    v-el-drag-dialog
    class="ext-dialog"
    :visible.sync="innerVisible"
    v-bind="bindingProps"
    v-on="$listeners"
  >
    <div
      v-if="title || $slots.title"
      slot="title"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div
      v-if="$slots.footer"
      slot="footer"
    >
      <slot name="footer" />
    </div>
    <slot />
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui'
import elDragDialog from '../directive/el-drag-dialog'

export default {
  name: 'ExtDialog',
  directives: {
    elDragDialog
  },
  components: { ElDialog: Dialog },
  props: {
    /* eslint-disable */
    visible: Boolean,
    title: String
  },
  computed: {
    bindingProps() {
      const props = {
        appendToBody: true,
        lockScroll: false,
        ...this.$attrs
      }
      if (!this.title && !this.$slots.title) props.showClose = false
      return props
    },
    innerVisible: {
      get() {
        return this.visible
      },
      set(boo) {
        this.$emit('update:visible', boo)
      }
    }
  }
}
</script>

<style scoped>

</style>
