<template>
  <div v-loading="delayLoading" class="ext-table">
    <ext-column-picker
      v-if="filterable"
      v-show="columnPickerVisible"
      v-model="showColumns"
      :columns="columns"
      @mouseover.native="mouseover"
      @mouseout.native="mouseout"
    />
    <transition name="el-fade-in">
      <el-table
        v-if="delayVisible"
        ref="elTable"
        :data="innerValue"
        v-bind="tableProps"
        @mouseover.native="mouseover"
        @mouseout.native="mouseout"
        v-on="tableEvents"
      >
        <el-table-column v-if="selectable" v-bind="selectionProps" />
        <el-table-column v-if="showIndex" v-bind="indexProps" />
        <template v-for="(column, index) in innerColumns">
          <template v-if="!!!column.hidden">
            <template v-if="column.slotted || column.slotName">
              <slot :name="column.slotName || column.prop" v-bind="column" />
            </template>
            <el-table-column v-else :key="index" v-bind="column" />
          </template>
        </template>
        <slot />
      </el-table>
    </transition>
    <ext-pagination
      v-if="pageable"
      :key="paginationKey"
      ref="extPagination"
      :total="innerTotal"
      v-bind="paginationProps"
      @pagination-change="paginationChange"
    />
  </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'
import ExtPagination from '../pagination'
import ExtColumnPicker from '../column-picker'
import { camelCaseObject, transEnumName } from '../utils'
import { pickBy, isNil } from 'lodash'

const DEFAULT_VALUE = '--'
const PAGINATION_PROPS = ['small', 'background', 'pageSize', 'currentPage', 'total', 'pageCount', 'layout', 'pageSizes', 'prevText', 'nextText', 'hideOnSinglePage']

export default {
  name: 'ExtTable',
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ExtPagination,
    ExtColumnPicker
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
    data: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      },
      required: true
    },
    selectable: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    pageable: {
      type: Boolean,
      default: false
    },
    // 是否开启服务端分页
    serverSide: {
      type: Boolean,
      default: false
    },
    // 是否支持跨页
    crossPageSelect: {
      type: Boolean,
      default: false
    },
    // 是否支持列筛选
    filterable: Boolean,
    // 当内容过长被隐藏时显示 tooltip
    showOverflowTooltip: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      delayVisible: false, // 延迟渲染标识，配合异步枚举使用
      delayLoading: true, // 优化延迟渲染效果，配合 delayVisible 使用，可设置为 false
      elTable: null,
      innerValue: [],
      innerColumns: [],
      showColumns: [], // 需要展示的列名簇
      current: null, // 当前选中行
      selection: [], // 当前页选中的行
      columnPickerVisible: false, // 是否显示列筛选器
      columnPickerStyle: { top: 0, left: 0 },
      innerTotal: 0, // 总页数
      paginationKey: 19921004
    }
  },
  computed: {
    attrs() {
      return camelCaseObject(this.$attrs)
    },
    listeners() {
      return this.$listeners
    },
    paginationProps() {
      const props = pickBy(this.attrs, (value, key) => PAGINATION_PROPS.indexOf(key) >= 0)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (!isNil(props.total)) this.innerTotal = props.total
      return {
        currentPage: 1,
        pageSize: 20,
        pageSizes: [20, 50, 100],
        layout: 'prev, pager, next, jumper, sizes, total',
        // background: true,
        small: false,
        align: 'right',
        // hideOnSinglePage: true,
        ...props
      }
    },
    selectionProps() {
      return {
        type: 'selection',
        key: -2,
        width: '50',
        align: 'center',
        headerAlign: 'center',
        fixed: true,
        reserveSelection: this.crossPageSelect
      }
    },
    indexProps() {
      return {
        type: 'index',
        key: -1,
        width: '50',
        label: '序号',
        align: 'center',
        headerAlign: 'center',
        fixed: 'left'
      }
    },
    tableProps() {
      return {
        border: true,
        headerCellClassName: 'ext-table-check-all ' + (this.multiple ? '' : 'ext-table-check-all--hidden'),
        style: { width: '100%' },
        ...this.attrs
      }
    },
    tableEvents() {
      const events = { ...this.$listeners }
      // 重定义currentChange和selectionChange事件，内部存储当前选中/勾选行数据
      const currentChange = events['current-change']
      events['current-change'] = (currentRow, oldCurrentRow) => {
        this.current = currentRow
        if (currentChange) currentChange(currentRow, oldCurrentRow)
      }
      const selectionChange = events['selection-change']
      events['selection-change'] = (selection) => {
        this.selection = selection
        if (selectionChange) selectionChange(selection)
      }
      const select = events['select']
      events['select'] = (selection, row) => {
        if (!this.multiple && selection.length > 1) {
          this.elTable.clearSelection()
          this.elTable.toggleRowSelection(row, true)
          this.selection = [row]
          if (select) select([row], row)
        } else {
          this.selection = selection
          if (select) select(selection, row)
        }
      }
      return events
    },
    innerCrossPageSelect() {
      if (this.crossPageSelect) {
        if (!this.attrs.rowKey) throw new Error('翻页选择需要设置row-key属性！')
        return true
      }
      return false
    }
  },
  watch: {
    columns: {
      handler() {
        const columns = [...this.columns]
        this.getWholeEnums(columns)
        this.rebuildColumns(columns)
        // 默认展示全部列
        if (this.filterable) this.showColumns = columns.filter(column => !column.hidden).map(column => column.prop)
      },
      deep: true,
      immediate: true
    },
    innerTotal() {
      this.paginationKey = new Date().getTime()
    },
    data: {
      handler() {
        // 前端分页时tableData做内部逻辑处理
        if (this.pageable && !this.serverSide) {
          this.innerTotal = this.data.length
          const start = (this.paginationProps.currentPage - 1) * this.paginationProps.pageSize
          const end = this.paginationProps.currentPage * this.paginationProps.pageSize
          this.innerValue = this.data.slice(start, end)
        } else {
          this.innerValue = this.data
        }
      },
      deep: true,
      immediate: true
    },
    innerValue: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true,
      immediate: true
    },
    showColumns: {
      handler() {
        this.innerColumns.forEach((column) => {
          column.hidden = !(this.showColumns.indexOf(column.prop) >= 0)
          this.$nextTick(() => this.elTable.doLayout())
        })
      },
      deep: true
    }
  },
  mounted() {
    this.elTable = this.$refs.elTable
  },
  methods: {
    getWholeEnums(columns) {
      const keys = columns.filter(item => !!item.enumKey).map(item => item.enumKey)
      if (keys.length && this.$getEnumList) {
        this.$getEnumList(keys).then(response => {
          columns.forEach(column => {
            if (column.enumKey && !column.formatter) {
              const enumValue = response[column.enumKey] || []
              column.formatter = (row, col, val) => {
                if (isNil(val)) return DEFAULT_VALUE
                return transEnumName(enumValue, val, DEFAULT_VALUE)
              }
            }
          })
          this.innerColumns = columns
          this.delayVisible = true
          this.delayLoading = false
        }).catch(() => {
          this.delayVisible = true
          this.delayLoading = false
        })
      } else {
        this.delayVisible = true
        this.delayLoading = false
      }
    },
    rebuildColumns(columns) {
      columns.forEach(column => {
        if (isNil(column.showOverflowTooltip)) column.showOverflowTooltip = this.showOverflowTooltip
      })
      this.innerColumns = columns
    },
    // 获取勾选项
    getSelection() {
      return this.selection
    },
    // 获取选中行
    getCurrent() {
      return this.current
    },
    paginationChange(page, size) {
      if (!this.serverSide) {
        const start = (page - 1) * size
        const end = page * size
        this.innerValue = this.data.slice(start, end)
      }
      this.$emit('pagination-change', page, size)
    },
    mouseover() {
      this.columnPickerVisible = true
    },
    mouseout() {
      if (this.showColumns.length > 0) this.columnPickerVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.ext-table {
  position: relative;

  .ext-column-picker {
    z-index: 19800;
    position: absolute;
    left: 6px;
    top: -12px;
  }

  .ext-pagination {
    padding: 3px 12px;
    border-left: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;
    border-bottom: 1px solid #EBEEF5;
  }

  // 表头背景色
  ::v-deep .ext-table-check-all {
    background-color: #DCDFE6 !important;
  }

  ::v-deep .ext-table-check-all--hidden > .cell > .el-checkbox {
    display: none;
  }
}
</style>
