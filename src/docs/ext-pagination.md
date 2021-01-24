## ExtPagination 分页

当数据量过多时，使用分页分解数据。

### 基础用法

基础的分页栏展示用法。

:::demo

```html

<template>
  <ext-pagination
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    @pagination-change="paginationChange"
  />
</template>

<script>
  export default {
    data() {
      return {currentPage: 1, pageSize: 10, total: 100}
    },
    methods: {
      paginationChange(currentPage, pageSize) {
        this.$message(JSON.stringify({currentPage, pageSize}))
      }
    }
  }
</script>
```

:::

### ExtPagination Events

| 事件名称 | 说明 | 回调参数 |
|  ----  | ----  |  ----  |
| pagination-chang  | 当 currentPage 或 pageSize 改变时会触发 | currentPage,pageSize |