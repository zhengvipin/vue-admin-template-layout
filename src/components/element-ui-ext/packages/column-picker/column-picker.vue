<template>
  <div class="ext-column-picker">
    <transition name="el-fade-in-linear">
      <el-popover
        v-bind="popoverProps"
      >
        <div>
          <el-checkbox :value="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">全选
          </el-checkbox>
          <el-divider class="ext-column-picker__divider" />
          <el-checkbox-group v-model="innerValue">
            <div v-for="(column,index) in innerColumns" :key="index">
              <el-checkbox :key="index" :label="column.prop" :disabled="column.disabled">
                {{ column.label || column.prop }}
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <el-dropdown slot="reference" class="ext-column-picker__dropdown" :hide-on-click="false" trigger="click">
          <span>显示字段<i class="el-icon-arrow-down el-icon--right" /></span>
          <!-- 记得设置el-dropdown-menu，否则会报错Cannot read property 'disabled' of null -->
          <el-dropdown-menu slot="dropdown" class="ext-column-picker__dropdown-menu" />
        </el-dropdown>
      </el-popover>
    </transition>
  </div>
</template>

<script>
import { Popover, Checkbox, Divider, CheckboxGroup, Dropdown } from 'element-ui'

export default {
  name: 'ExtColumnPicker',
  components: {
    ElPopover: Popover,
    ElCheckbox: Checkbox,
    ElDivider: Divider,
    ElCheckboxGroup: CheckboxGroup,
    ElDropdown: Dropdown
  },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    popoverProps() {
      return {
        placement: 'bottom-start',
        appendToBody: false,
        trigger: 'click'
      }
    },
    innerValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    innerColumns() {
      return [...this.columns]
    },
    indeterminate() {
      return this.innerValue.length > 0 && this.innerValue.length < this.innerColumns.length
    },
    checkAll() {
      return this.innerValue.length > 0 && this.innerValue.length === this.innerColumns.length
    }
  },
  methods: {
    handleCheckAll(boo) {
      this.innerValue = boo && this.innerColumns.map(item => item.prop) || []
    }
  }
}
</script>

<style scoped>
.ext-column-picker__dropdown {
  border: 1px solid #DCDFE6;
  border-radius: 2px;
  padding: 3px 6px;
  cursor: pointer;
}

/*隐藏下拉菜单*/
.ext-column-picker__dropdown-menu{
  display: none !important;
}

.ext-column-picker__dropdown:hover {
  border-color: #000000;
}

::v-deep .ext-column-picker__divider {
  margin: 10px 0;
}
</style>
