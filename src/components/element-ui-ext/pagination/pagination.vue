<template>
  <el-pagination
    class="ext-pagination"
    :current-page.sync="innerCurrentPage"
    :page-size.sync="innerPageSize"
    v-bind="bindingProps"
    v-on="bindingEvents"
  />
</template>

<script>
import { Pagination } from 'element-ui'
import { camelCaseObject } from '../utils'
import { cloneDeep } from 'lodash'

export default {
  name: 'ExtPagination',
  components: { ElPagination: Pagination },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    }
  },
  computed: {
    attrs() {
      return camelCaseObject(this.$attrs)
    },
    innerCurrentPage: {
      get() {
        return this.currentPage
      },
      set(val) {
        this.$emit('update:currentPage', val)
      }
    },
    innerPageSize: {
      get() {
        return this.pageSize
      },
      set(val) {
        this.$emit('update:pageSize', val)
      }
    },
    bindingProps() {
      return {
        pageSize: (this.$elementExt || {}).pageSize || 20,
        pageSizes: (this.$elementExt || {}).pageSizes || [20, 50, 100],
        layout: (this.$elementExt || {}).layout || 'prev, pager, next, jumper, sizes, total',
        ...this.attrs
      }
    },
    bindingEvents() {
      const events = cloneDeep(this.$listeners)
      const currentChange = events['current-change']
      events['current-change'] = (page) => {
        this.innerCurrentPage = page
        this.$emit('pagination-change', page, this.innerPageSize)
        if (currentChange) currentChange(page)
      }
      const sizeChange = events['size-change']
      events['size-change'] = (size) => {
        this.innerPageSize = size
        this.$emit('pagination-change', this.innerCurrentPage, size)
        if (sizeChange) sizeChange(size)
      }
      return events
    }
  }
}
</script>

<style scoped>

</style>
