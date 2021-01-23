<template>
  <el-button-group
    v-if="group"
    class="ext-toolbar"
    :style="alignStyle"
  >
    <ext-button
      v-for="(button,index) in innerButtons.show"
      :key="index"
      v-bind="button"
    />
    <el-dropdown
      v-if="innerButtons.hide.length>0"
      trigger="click"
      @command="command"
    >
      <el-button>
        更多<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <template v-for="(item,index) in innerButtons.hide">
          <el-dropdown-item
            :key="index"
            v-permission="item.permissions || []"
            :command="item.name"
            v-bind="item"
          >
            {{ item.name }}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </el-button-group>
  <div
    v-else
    class="ext-toolbar"
    :style="alignStyle"
  >
    <ext-button
      v-for="(button,index) in innerButtons.show"
      :key="index"
      v-bind="button"
    />
    <el-dropdown
      v-if="innerButtons.hide.length>0"
      trigger="click"
      @command="command"
    >
      <el-button>
        更多<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <template v-for="(item,index) in innerButtons.hide">
          <el-dropdown-item
            :key="index"
            v-permission="item.permissions || []"
            :command="item.name"
            v-bind="item"
          >
            {{ item.name }}
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { ButtonGroup, Button, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import ExtButton from '../button'
import permission from '../directive/permission'
import { isNil, isEmpty } from 'lodash'

const ALIGN_MAP = {
  left: { justifyContent: 'flex-start', textAlign: 'left' },
  right: { justifyContent: 'flex-end', textAlign: 'right' },
  center: { justifyContent: 'center', textAlign: 'center' }
}

export default {
  name: 'ExtToolbar',
  directives: {
    permission
  },
  components: {
    ExtButton,
    ElButtonGroup: ButtonGroup,
    ElButton: Button,
    ElDropdown: Dropdown,
    ElDropdownMenu: DropdownMenu,
    ElDropdownItem: DropdownItem
  },
  inheritAttrs: false,
  props: {
    buttons: {
      type: Array,
      default() {
        return []
      }
    },
    rights: {
      type: Object,
      default() {
        return {}
      }
    },
    align: {
      type: String,
      validator(value) {
        return ['left', 'center', 'right'].includes(value)
      },
      default: 'left'
    },
    group: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  computed: {
    alignStyle() {
      return ALIGN_MAP[this.align]
    },
    innerButtons() {
      const rightButtons = this.buttons.filter(button => isNil(button.right) || isEmpty(this.rights) || !!this.rights[button.right])
      const buttons = { show: [], hide: [] }
      if (this.limit) {
        rightButtons.forEach((button, index) => index < this.limit ? buttons.show.push(button) : buttons.hide.push(button))
      } else {
        buttons.show = rightButtons
      }
      return buttons
    }
  },
  methods: {
    command(name) {
      const button = this.buttons.find(button => button.name === name)
      // eslint-disable-next-line no-return-assign
      if (button && button.handler) button.handler.call(this, boo => button.loading = boo) //  注意重定向 this 指向
    }
  }
}
</script>

<style lang="scss" scoped>
.ext-toolbar {
  display: flex;
  flex-wrap: nowrap;
}

.ext-toolbar:not(.el-button-group) {
  display: flex;
  flex-wrap: nowrap;

  > .ext-button + .el-dropdown {
    margin-left: 10px;
  }
}
</style>
