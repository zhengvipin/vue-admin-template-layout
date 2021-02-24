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
          {date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄', sex: 1},
          {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄', sex: 1},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', sex: 1},
        ],
        columns: [
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名'},
          {prop: 'address', label: '地址'},
          {prop: 'sex', label: '性别', enumKey: 'sex'},
        ]
      }
    }
  }
</script>
```

:::

### 文字提示

当内容过长被隐藏时显示tooltip。

:::demo 列的`show-overflow-tooltip`属性优先级高于表格。

```html

<template>
  <ext-table :data="data" :columns="columns" show-overflow-tooltip/>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄', sex: 1},
          {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄', sex: 1},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', sex: 1},
        ],
        columns: [
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名'},
          {prop: 'address', label: '地址', width: 140},
          {prop: 'sex', label: '性别', enumKey: 'sex'},
        ]
      }
    }
  }
</script>
```

:::

### 前端分页

当表格数据超过一屏，且总量不大时，可以选择前端分页。

:::demo 要开启分页，首要要将`pageable`属性设置为`true`。

```html

<template>
  <ext-table :data="data" :columns="columns" pageable :current-page="currentPage" :page-size="pageSize"
             :page-sizes="pageSizes"/>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄', sex: 1},
          {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄', sex: 1},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', sex: 1},
        ],
        columns: [
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名'},
          {prop: 'address', label: '地址'},
          {prop: 'sex', label: '性别', enumKey: 'sex'},
        ],
        currentPage: 1,
        pageSize: 1,
        pageSizes: [1, 2, 3]
      }
    }
  }
</script>
```

:::

### 后端分页

当表格数据庞大，不适合一次性请求全部数据时，可以采用后端分页。

:::demo 后端分页要同时将`pageable`和`server-side`属性设置为`true`。

```html

<template>
  <ext-table :data="data" :total="total" :columns="columns" pageable server-side :current-page="currentPage"
             :page-size="pageSize" :page-sizes="pageSizes" @pagination-change="paginationChange"/>
</template>

<script>
  export default {
    data() {
      return {
        data: [],
        columns: [
          {prop: 'id', label: 'ID'},
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名'},
          {prop: 'address', label: '地址'}
        ],
        currentPage: 1,
        pageSize: 1,
        pageSizes: [1, 2, 3],
        total: 0
      }
    },
    mounted() {
      this.loadAsyncData(this.currentPage, this.pageSize)
    },
    methods: {
      loadAsyncData(currentPage, pageSize) {
        setTimeout(() => {
          const start = (currentPage - 1) * pageSize
          const end = currentPage * pageSize
          const data = []
          for (let i = start; i < end; i++) {
            data.push({id: i + 1, date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'})
          }
          this.data = data
          this.total = 18
        }, 500)
      },
      paginationChange(currentPage, pageSize) {
        // todo
        this.loadAsyncData(currentPage, pageSize)
      }
    }
  }
</script>
```

:::

### 自定义列模块

自定义列的显示内容，可组合其他组件使用。

:::demo

```html

<template>
  <ext-table :data="data" :columns="columns">
    <template #name="props">
      <el-table-column v-bind="props">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名：{{ scope.row.name }}</p>
            <p>住址：{{ scope.row.address }}</p>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </template>
    <template #operate="props">
      <el-table-column v-bind="props">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </template>
  </ext-table>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄', sex: 1},
          {date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄', sex: 1},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', sex: 1},
        ],
        columns: [
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名', slotted: true},
          {prop: 'address', label: '地址'},
          {prop: 'sex', label: '性别', enumKey: 'sex'},
          {prop: 'operate', label: '操作', slotted: true},
        ]
      }
    },
    methods:{
      handleEdit(index,row){
          console.log(index)
          console.log(row)
      },
      handleDel(index,row){
        console.log(index)
        console.log(row)
      }
    }
  }
</script>
```
:::

### ExtTable Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  |  ----  | ----  |  ----  |
| value/v-model | 绑定值，当前页的数据 | Array | - | - |
| data | 显示的数据 | Array | - | - |
| columns | 列对象数组，列对象参数请参考ElTableColumn | Array | - | - |
| pageable | 开启分页栏 | Boolean | - | false |
| selectable | 多选列 | Boolean | - | false |
| showIndex | 索引列 | Boolean | - | false |
| serverSide | 开启服务端分页 | Boolean | - | false |
| filterable | 列筛选 | Boolean | - | false |
| crossPageSelect | 跨页选，开启时务必同时设置表格的row-key属性 | Boolean | - | false |
| showOverflowTooltip | 当内容过长被隐藏时显示提示 | Boolean | - | false |
| multiple | selectable为true时，是否支持多选 | Boolean | - | true |

### ExtTable Events

| 事件名称 | 说明 | 回调参数 |
|  ----  | ----  |  ----  |
| pagination-chang  | 当 currentPage 或 pageSize 改变时会触发 | currentPage,pageSize |

### ExtTable Slot

| name | 说明 |
|  ----  | ----  |
| -  | 表格后置内容 |
| [prop]  | 自定义列的内容，参数为该列在 columns 中定义的对象 |