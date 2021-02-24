<template>
  <div :class="classes">
    <div class="ext-search-form__header">
      <div class="ext-search-form__header--left">
        <el-tooltip v-if="type==='icon'" v-show="hasMore" :content="visible?'收起更多查询':'展开更多查询'">
          <el-link type="primary" :underline="false" @click="collapse">
            <i class="el-icon-arrow-up" :class="{'is-active':visible}" />
          </el-link>
        </el-tooltip>
        <transition name="el-fade-in-linear">
          <span v-show="showTips">
            <span>{{ title }}</span>
            <template v-for="(item,index) in checkedItems">
              <el-tooltip :key="index" :content="getValueTip(item, formProps.model[item.prop])" placement="bottom">
                <el-tag
                  :closable="item.closable"
                  @close="resetField(item)"
                >
                  {{ item.label }}
                </el-tag>
              </el-tooltip>
            </template>
          </span>
        </transition>
      </div>
      <div class="ext-search-form__header--right">
        <slot name="buttons">
          <ext-toolbar v-bind="toolbarProps" />
        </slot>
      </div>
    </div>
    <el-card class="ext-search-form__content" shadow="never" :style="wrapStyle">
      <!-- 革命性的进步，解决了插槽多级传递的问题 -->
      <ext-form
        ref="extForm"
        :items="innerItems"
        v-bind="formProps"
        @form-change="formChange"
        @search="$emit('search')"
      >
        <template v-for="item in innerItems">
          <template v-if="item.slotName || item.type==='slot'" :slot="item.slotName || item.prop">
            <slot :name="item.slotName || item.prop" v-bind="item" />
          </template>
        </template>
      </ext-form>
    </el-card>
    <div v-if="type==='text'" v-show="hasMore" class="ext-search-form__more" @click="collapse">
      <i :class="visible?'el-icon-caret-top':'el-icon-caret-bottom'" />
      <span>{{ visible ? '收起更多查询' : '展开更多查询' }}</span>
    </div>
  </div>
</template>

<script>
import { Tooltip, Link, Tag } from 'element-ui'
import ExtToolbar from '../toolbar'
import ExtForm from '../form'
import { camelCaseObject } from '../utils'
import { pickBy, cloneDeep, isNil, isArray } from 'lodash'

const TOOLBAR_PROPS = ['buttons', 'rights', 'group', 'labelWidth', 'limit']
const FORM_PROPS = ['model', 'items', 'gutter', 'labelWidth', 'right', 'top', 'left', 'bottom', 'span', 'gutter']

export default {
  name: 'ExtSearchForm',
  components: {
    ElTooltip: Tooltip,
    ElLink: Link,
    ElTag: Tag,
    ExtToolbar,
    ExtForm
  },
  inheritAttrs: false,
  props: {
    /* eslint-disable */
    maxHeight: String,
    title: {
      type: String,
      default: '查询条件：'
    },
    type: {
      type: String,
      validator(val) {
        return ['text', 'icon'].includes(val)
      },
      default: 'icon'
    },
    size: String,
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      overflow: 'hidden',
      visible: false,
      innerItems: [],
      hasMore: false,
      showTips: false,
      innerHeight: 0
    }
  },
  computed: {
    searchSize() {
      return this.size || (this.$ELEMENT || {}).size || 'default'
    },
    innerMinHeight() {
      return {default: 40, medium: 36, small: 32, mini: 28}[this.searchSize] + 20 + 20 + 'px'
    },
    innerMaxHeight() {
      return ({default: 40, medium: 36, small: 32, mini: 28}[this.searchSize] + 20) * 2 + 20 - 2 + 'px'
    },
    classes() {
      return `ext-search-form ext-search-form--${this.searchSize}`
    },
    attrs() {
      return camelCaseObject(this.$attrs)
    },
    toolbarProps() {
      return pickBy(this.attrs, (value, key) => TOOLBAR_PROPS.indexOf(key) >= 0)
    },
    formProps() {
      const props = pickBy(this.attrs, (value, key) => FORM_PROPS.indexOf(key) >= 0)
      if (!this.showLabel) props.labelWidth = '0'
      if (!props.model) props.model = {}
      if (!props.items) props.items = []
      return props
    },
    wrapStyle() {
      return {
        overflow: this.overflow,
        height: this.innerHeight || this.innerMinHeight
      }
    },
    checkedItems() {
      return this.innerItems.filter(item => item.prop && this.formProps.model[item.prop] && (this.formProps.model[item.prop].length === undefined || this.formProps.model[item.prop].length > 0))
    }
  },
  watch: {
    'formProps.items': {
      handler() {
        const items = cloneDeep(this.formProps.items)
        // 查询表单不需要校验
        items.forEach(item => {
          delete item['required']
          delete item['rules']
          if (isNil(item.closable)) item.closable = true
          if (!this.showLabel) {
            item.showLabel = false
            item.placeholder = item.label
          }
        })
        this.innerItems = items
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    formChange(hasMore) {
      this.hasMore = hasMore
      this.showTips = hasMore
    },
    getValueTip(item, value) {
      const isArray = Array.isArray(value)
      if (this.isRange(item) && value.length > 0) {
        return value[0] + '~' + value[1]
      }
      if (Array.isArray(item.data)) {
        return item.data
          .filter(op => isArray && value.includes(op.value || op.id || op.label) || value === (op.value || op.id || op.label))
          .map(op => op.name || op.text || op.label || op.value || op.id).join(',')
      }
      if (item.type === 'switch') {
        return value === (item.activeValue || true) ? (item.activeText || '是') : (item.inactiveText || '否')
      }
      return isArray && value.join(',') || String(value || '')
    },
    resetField(item) {
      this.formProps.model[item.prop] = isArray(this.formProps.model[item.prop]) ? [] : undefined
    },
    isRange(item) {
      return ['datetimerange', 'daterange', 'monthrange', 'timerange'].includes(item.type)
    },
    collapse() {
      this.visible = !this.visible
      if (this.visible) {
        this.innerHeight = this.maxHeight || this.innerMaxHeight
        setTimeout(() => this.overflow = 'auto', 500)
      } else {
        if (this.$refs.extForm.$el.parentNode.parentNode.scrollTop > 0) this.$refs.extForm.$el.parentNode.parentNode.scrollTop = 0
        this.innerHeight = this.innerMinHeight
        this.overflow = 'hidden'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ext-search-form {

  .ext-search-form__header {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: #409eff;
    background-color: #f4f4f5;
    padding: 0 12px;

    .ext-search-form__header--left {
      flex-grow: 1;
      justify-content: flex-start;

      .el-icon-arrow-up {
        transform: rotate(-180deg);
        transition: ease-in 0.3s;

        &.is-active {
          transform: rotate(0deg);
          transition: ease-in 0.3s;
        }
      }

      .el-tag + .el-tag {
        margin-left: 8px;
      }
    }

    .ext-search-form__header--right {
      align-items: center;
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;

      .ext-toolbar {
        align-items: center;
        flex-wrap: wrap;

        ::v-deep .ext-button {
          margin-top: 3px;
          margin-bottom: 3px;
        }
      }
    }
  }

  .ext-search-form__content {
    border-radius: 0;
    transition: height linear .2s;
    border: 1px solid #F2F6FC;
  }

  /*收起/展开操作栏 */
  .ext-search-form__more {
    height: 30px;
    box-sizing: border-box;
    border: 1px solid #eaeefb;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    background-color: #fff;
    color: #409eff;
    box-shadow: 0 2px 3px rgba(187, 187, 187, .5);
    cursor: pointer;

    i {
      font-size: 16px;
      line-height: 30px;
      transition: .3s
    }

    &:hover {
      background-color: #f9fafc;

      i {
        transform: translateX(-10px)
      }
    }

    > span {
      font-size: 14px;
      line-height: 30px;
      transition: .3s;
      display: inline-block
    }
  }
}

.ext-search-form--default {
  .ext-search-form__header {
    .ext-search-form__header--left {
      line-height: 45px;
    }
  }
}

.ext-search-form--medium {
  .ext-search-form__header {
    .ext-search-form__header--left {
      line-height: 41px;
    }
  }
}

.ext-search-form--small {
  .ext-search-form__header {
    .ext-search-form__header--left {
      line-height: 38px;
    }
  }
}

.ext-search-form--mini {
  .ext-search-form__header {
    .ext-search-form__header--left {
      line-height: 32px;
    }
  }
}
</style>
