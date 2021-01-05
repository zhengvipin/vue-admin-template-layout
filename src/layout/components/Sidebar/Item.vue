<script>
import Vue from 'vue'

Vue.directive('item-show', {
  inserted: function(el, binding) {
    const { value } = binding
    if (!value) el.parentNode && el.parentNode.removeChild(el)
  }
})

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    badge: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title, badge } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon class='sub-svg-icon' icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(
        <span slot='title'>
          {(title)}
          <el-tag v-item-show={badge} class='sub-el-tag' type='danger' effect='dark'>{(badge)}</el-tag>
        </span>
      )
    }

    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}

.sub-el-icon,.sub-svg-icon{
  margin-right: 6px;
}

.sub-el-tag{
  height: 16px;
  line-height: 16px;
  padding: 0 4px;
  float: right;
}
</style>
