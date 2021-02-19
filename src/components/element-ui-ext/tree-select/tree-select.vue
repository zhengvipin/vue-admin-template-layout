<template>
  <el-select
    ref="select"
    v-model="showValue"
    class="vab-tree-select"
    clearable
    popper-class="select-tree-popper"
    value-key="id"
    @clear="onClear"
  >
    <el-option :value="innerValue">
      <el-tree
        ref="tree"
        :current-node-key="innerValue"
        :data="innerOptions"
        :props="innerProps"
        v-bind="treeProps"
        @node-click="onNodeClick"
      >
        <template #defalut="{ node }" class="vab-custom-tree-node">
          <span class="vab-tree-item">{{ node.label }}</span>
        </template>
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
import { Select, Option, Tree } from 'element-ui'
import { camelCaseObject } from '../utils'
import { isEmpty, pickBy, isArray } from 'lodash'

const TREE_PROPS = ['nodeKey', 'highlightCurrent', 'defaultExpandAll', 'expandOnClickNode']

export default {
  name: 'ExtTreeSelect',
  components: {
    ElSelect: Select,
    ElOption: Option,
    ElTree: Tree
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
    multiple: Boolean
  },
  data() {
    return {
      showValue: '',//select框展示的文本
      innerOptions: [],//展示数据
      flatOptions: []//扁平化后的数据
    }
  },
  watch: {
    options: {
      handler() {
        this.flatOptions = this.flattenTree(this.options)
        this.innerOptions = this.options
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    attrs() {
      return camelCaseObject(this.$attrs)
    },
    innerProps() {
      return {
        children: 'children',
        label: 'label',
        value: 'value',
        ...this.props
      }
    },
    treeProps() {
      const props = pickBy(this.attrs, (value, key) => TREE_PROPS.indexOf(key) >= 0)
      return {
        highlightCurrent: true,
        defaultExpandedKeys: [],
        ...props
      }
    },
    innerValue: {
      get() {//*** 回显展示文本
        console.log("回显展示文本")
        this.renderValue()
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
    this.initTreeSelect()
  },
  methods: {
    // 扁平化多维数组
    flattenTree(data) {
      const nodes = [];
      const fn = data => {
        data.forEach(node => {
          nodes.push(node)
          if (isArray(node[this.innerProps.children])) fn(node[this.innerProps.children])
          delete node[this.innerProps.children]
        })
      }
      fn([...data])
      return nodes
    },
    // 初始化树形下拉
    renderValue() {
      if (!isEmpty(this.flatOptions)) {
        if (!this.multiple) {
          console.log(this.innerValue)
          // if (this.innerValue) console.log(this.flatOptions.find(d => d[this.innerProps.value] === this.innerValue))
          // if (this.innerValue) this.showValue = (this.flatOptions.find(d => d[this.innerProps.value] === this.innerValue) || {})[this.innerProps.label]
        } else {

        }
      }
      // this.$nextTick(() => {
      //   this.treeProps.defaultExpandedKeys = this.value.split(',') // 设置默认展开
      //   if (!this.multiple) {//单选树
      //     console.log('设置默认选中')
      //     this.$refs.tree.setCurrentKey(this.value) // 设置默认选中
      //   } else {// 多选树
      //     this.$refs.tree.setCheckedKeys(this.treeProps.defaultExpandedKeys)
      //   }
      // })
    },
    // 清除单选树选中
    onClear() {
      this.treeProps.defaultExpandedKeys = []
      this.clearSelected()
      if (!this.multiple) {
        this.showValue = ''
        this.innerValue = ''
        this.$refs.tree.setCurrentKey('') // 设置默认选中
      } else {
        this.showValue = []
        this.innerValue = ''
        this.$refs.tree.setCheckedKeys([])
      }
    },
    /* 清空选中样式 */
    clearSelected() {
      const allNode = this.$refs.tree.$el.querySelectorAll('.el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },
    // 点击叶子节点
    onNodeClick(data, node) {
      // 默认是只有在无子节点才可选中
      if (isEmpty(data[this.innerProps.children])) {
        this.innerValue = data[this.innerProps.value]
        this.showValue = data[this.innerProps.label]
        this.$refs.select.blur()//使 input 失去焦点，并隐藏下拉框
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.select-tree-popper {
  .el-scrollbar {
    .el-scrollbar__view {
      .el-select-dropdown__item {
        height: auto;
        max-height: 274px;
        padding: 0;
        overflow-y: auto;
        line-height: 26px;
      }
    }
  }
}
</style>
