## ExtTable 表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基础用法

基础的表格展示用法。

:::demo

```html

<template>
  <ext-table :data="data" :columns="columns"/>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄'},
          {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
        ],
        columns: [
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名'},
          {prop: 'address', label: '地址'}
        ]
      }
    }
  }
</script>
```

:::

### 索引列

表格前置索引列。

:::demo

```html

<template>
  <ext-table :data="data" :columns="columns" show-index/>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄'},
          {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
        ],
        columns: [
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名'},
          {prop: 'address', label: '地址'}
        ]
      }
    }
  }
</script>
```

:::

### 多选列

表格前置Checkbox。

:::demo

```html

<template>
  <ext-table :data="data" :columns="columns" selectable/>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄'},
          {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
        ],
        columns: [
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名'},
          {prop: 'address', label: '地址'}
        ]
      }
    }
  }
</script>
```

:::

### 列筛选

通过列选择器控制需要显示的列。

:::demo

```html

<template>
  <ext-table :data="data" :columns="columns" filterable/>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄'},
          {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
        ],
        columns: [
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名'},
          {prop: 'address', label: '地址'}
        ]
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