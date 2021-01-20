<template>
  <div class="ext-form">
    <el-form
      v-if="bindingProps.inline"
      ref="elForm"
      :style="style"
      :model="model"
      v-bind="bindingProps"
      v-on="$listeners"
    >
      <template v-for="(multiItem,multiIndex) in multiItems">
        <el-collapse
          v-if="multiItem.hasCollapse"
          :key="multiIndex"
          v-model="activeNames"
          class="ext-form__collapse"
        >
          <el-collapse-item :name="multiIndex" class="ext-form__collapse-item">
            <template slot="title">
              <el-alert
                v-if="multiItem.type==='divider'"
                class="ext-form__divider"
                :type="multiItem.theme || 'success'"
                :effect="multiItem.effect || 'light'"
                :closable="false"
              >
                <i v-if="multiItem.icon" class="el-alert__icon" :class="multiItem.icon" />
                <span>{{ multiItem.label }}</span>
              </el-alert>
            </template>
            <template v-for="(item,index) in multiItem.data">
              <template v-if="!item.hidden">
                <slot v-if="item.slotName || item.type==='slot'" :name="item.slotName || item.prop" v-bind="item" />
                <ext-form-item
                  v-else-if="item.numberValue"
                  :key="index"
                  :ref="item.prop"
                  v-model.number="model[item.prop]"
                  form-item
                  v-bind="item"
                  v-on="getItemEvents(item)"
                />
                <ext-form-item
                  v-else
                  :key="index"
                  :ref="item.prop"
                  v-model="model[item.prop]"
                  form-item
                  v-bind="item"
                  v-on="getItemEvents(item)"
                />
              </template>
            </template>
          </el-collapse-item>
        </el-collapse>
        <template v-for="(item,index) in multiItem.data" v-else>
          <template v-if="!item.hidden">
            <slot v-if="item.slotName || item.type==='slot'" :name="item.slotName || item.prop" v-bind="item" />
            <ext-form-item
              v-else-if="item.numberValue"
              :key="index"
              :ref="item.prop"
              v-model.number="model[item.prop]"
              form-item
              v-bind="item"
              v-on="getItemEvents(item)"
            />
            <ext-form-item
              v-else
              :key="index"
              :ref="item.prop"
              v-model="model[item.prop]"
              form-item
              v-bind="item"
              v-on="getItemEvents(item)"
            />
          </template>
        </template>
      </template>
      <slot />
    </el-form>
    <el-row v-else :gutter="gutter" justify="space-between">
      <el-form
        ref="elForm"
        v-resize:debounce.50.initial="resize"
        :style="style"
        :model="model"
        v-bind="bindingProps"
        v-on="$listeners"
      >
        <template v-for="(multiItem,multiIndex) in multiItems">
          <el-collapse
            v-if="multiItem.hasCollapse"
            :key="multiIndex"
            v-model="activeNames"
            class="ext-form__collapse"
          >
            <el-collapse-item :name="multiIndex" class="ext-form__collapse-item">
              <template slot="title">
                <el-alert
                  v-if="multiItem.type==='divider'"
                  class="ext-form__divider"
                  :type="multiItem.theme || 'success'"
                  :effect="multiItem.effect || 'light'"
                  :closable="false"
                >
                  <i v-if="multiItem.icon" class="el-alert__icon" :class="multiItem.icon" />
                  <span>{{ multiItem.label }}</span>
                </el-alert>
              </template>
              <template v-for="(item,index) in multiItem.data">
                <el-col v-if="!item.hidden" :key="index" :span="item.span || innerSpan">
                  <slot v-if="item.slotName || item.type==='slot'" :name="item.slotName || item.prop" v-bind="item" />
                  <ext-form-item
                    v-else-if="item.numberValue"
                    :ref="item.prop"
                    v-model.number="model[item.prop]"
                    form-item
                    v-bind="item"
                    v-on="getItemEvents(item)"
                  />
                  <ext-form-item
                    v-else
                    :ref="item.prop"
                    v-model="model[item.prop]"
                    form-item
                    v-bind="item"
                    v-on="getItemEvents(item)"
                  />
                </el-col>
              </template>
            </el-collapse-item>
          </el-collapse>
          <template v-for="(item,index) in multiItem.data" v-else>
            <el-col v-if="!item.hidden" :key="index" :span="item.span || innerSpan">
              <slot v-if="item.slotName || item.type==='slot'" :name="item.slotName || item.prop" v-bind="item" />
              <ext-form-item
                v-else-if="item.numberValue"
                :ref="item.prop"
                v-model.number="model[item.prop]"
                form-item
                v-bind="item"
                v-on="getItemEvents(item)"
              />
              <ext-form-item
                v-else
                :ref="item.prop"
                v-model="model[item.prop]"
                form-item
                v-bind="item"
                v-on="getItemEvents(item)"
              />
            </el-col>
          </template>
        </template>
        <slot />
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { Row, Col, Form, Collapse, CollapseItem, Alert } from 'element-ui'
import ExtFormItem from '../form-item'
import { camelCaseObject } from '../utils'
import resize from 'vue-resize-directive'
import { sum, cloneDeep, isNil, isArray } from 'lodash'

export default {
  name: 'ExtForm',
  directives: { resize },
  components: {
    ElRow: Row,
    ElCol: Col,
    ElForm: Form,
    ElCollapse: Collapse,
    ElCollapseItem: CollapseItem,
    ElAlert: Alert,
    ExtFormItem
  },
  inheritAttrs: false,
  props: {
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    right: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    span: {
      type: Number,
      default: 0
    },
    gutter: {
      type: Number,
      default: 10
    },
    readonly: Boolean
  },
  data() {
    return {
      elForm: null,
      innerSpan: 0,
      activeNames: [],
      multiItems: []
    }
  },
  computed: {
    attrs() {
      return camelCaseObject(this.$attrs)
    },
    style() {
      return {
        marginTop: this.top + 'px',
        marginRight: this.right + 'px',
        marginBottom: this.bottom + 'px',
        marginLeft: this.left + 'px'
      }
    },
    bindingProps() {
      return {
        labelSuffix: ':',
        labelWidth: 'auto',
        rules: {},
        ...this.attrs
      }
    }
  },
  watch: {
    span: {
      handler(val) {
        this.innerSpan = (val < 1 || val > 24) && 24 || val
        this.emitFormChange()
      },
      immediate: true // 初始化就要实例化innerSpan
    },
    items: {
      handler() {
        const items = cloneDeep(this.items) // 不要改变入参对象
        this.getWholeEnums(items)
        const dividerArr = this.getDividerArr(items)
        this.rebuildItems(items, dividerArr)
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.elForm = this.$refs.elForm
  },
  methods: {
    /**
     * 宽度自适应
     */
    resize() {
      if ((this.span < 1 || this.span > 24) && this.elForm) {
        const width = this.elForm.$el.clientWidth
        if (width <= 768) {
          this.innerSpan = 24
        } else if (width <= 1024) {
          this.innerSpan = 12
        } else if (width <= 1600) {
          this.innerSpan = 8
        } else if (width <= 1920) {
          this.innerSpan = 6
        } else {
          this.innerSpan = 4
        }
      }
      this.emitFormChange()
    },
    /**
     * 宽度自适应后通知父节点
     */
    emitFormChange() {
      const spanArr = this.items.map(item => item.span || this.innerSpan || 0)
      const hasMore = sum(spanArr) > 24
      this.$emit('form-change', hasMore)
    },
    /**
     * 全量请求枚举
     * @param items 表单项
     */
    getWholeEnums(items) {
      const keys = items.filter(item => !!item.enumKey).map(item => item.enumKey)
      if (keys.length) {
        if (this.$getEnumList) {
          this.$getEnumList(keys).then(response => {
            items.forEach(item => {
              const enumValue = response[item.enumKey] || []
              if (item.enumKey) item.data = enumValue
            })
            this.$forceUpdate() // 强制更新一次dom，避免枚举渲染失败
          })
        }
      }
    },
    /**
     * 获取分隔栏索引簇
     * @param items 表单项
     * @returns {[]}
     */
    getDividerArr(items) {
      const indexArr = []
      items.forEach((item, index) => {
        // 1.1 存储分隔符索引
        if (item.type === 'divider') indexArr.push(index)
        // 1.2 切换表单只读状态
        item.readonly = isNil(item.readonly) ? this.readonly : item.readonly
        // 1.3 合并校验规则
        const formItemRules = this.bindingProps.rules[item.prop]
        const itemRules = item.rules
        if (formItemRules) {
          if (!itemRules) {
            item.rules = formItemRules
          } else {
            const arrayRules = isArray(formItemRules) && formItemRules || itemRules
            const objectRule = Array.isArray(formItemRules) && itemRules || formItemRules
            item.rules = [...arrayRules, objectRule]
          }
        }
      })
      return indexArr
    },
    /**
     * 重构表单项
     * @param items 表单项
     * @param dividerArr 分隔栏索引簇
     */
    rebuildItems(items, dividerArr) {
      let multiItems = []
      if (dividerArr.length) {
        // 首项补位
        if (dividerArr[0] !== 0) dividerArr.unshift(0)
        // 尾项补缺
        if (dividerArr[dividerArr.length - 1] !== items.length) dividerArr.push(items.length)
        // 组装item
        let current = 0
        while (current < dividerArr.length - 1) {
          const startIndex = dividerArr[current]
          const endIndex = dividerArr[current + 1]
          const hasCollapse = items[startIndex].type === 'divider'
          const resultMap = {
            ...(hasCollapse && items[startIndex] || {}),
            hasCollapse: hasCollapse,
            data: items.slice(hasCollapse && startIndex + 1 || startIndex, endIndex)
          }
          multiItems.push(resultMap)
          current++
        }
      } else {
        multiItems = [{ hasCollapse: false, data: items }]
      }
      this.multiItems = multiItems
      this.activeNames = multiItems.map((item, index) => index)
    },
    getItemEvents(item) {
      const events = cloneDeep(item.events || {}) // 内部封装就好，不要改变items
      const handleEnter = events.enter
      // 配合 ExtSearchForm 实现 Enter 搜索
      events.enter = () => {
        this.$emit('search')
        if (handleEnter) handleEnter.call(this)
      }
      return events
    }
  }
}
</script>

<style lang="scss" scoped>
.ext-form {
  overflow: hidden;
  width: 100%;

  .el-form {
    display: -webkit-flex;
    flex-wrap: wrap;

    .ext-form__collapse {
      width: 100%;
      border: none;

      ::v-deep .el-collapse-item__content {
        display: -webkit-flex;
        flex-wrap: wrap;
        padding-bottom: 0;
      }

      .ext-form__collapse-item {
        ::v-deep .el-collapse-item__header {
          height: unset !important;
          line-height: unset !important;
          width: 100%;

          .ext-form__divider {
            margin-right: -20px;
            margin-bottom: 10px;

            &:not(:first-child) {
              margin-top: 10px;
            }

            ::v-deep .el-alert__description {
              i, span {
                font-size: 13px;
              }
            }
          }

          ::v-deep .el-collapse-item__arrow {
            margin-top: -6px !important;
            z-index: 9999;
          }
        }

        ::v-deep .el-alert {
          padding: 8px;

          ::v-deep .el-alert__description {
            margin: 0 !important;
          }
        }
      }
    }
  }
}
</style>
