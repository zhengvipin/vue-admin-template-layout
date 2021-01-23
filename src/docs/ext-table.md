:::demo 在`ext-checkbox`元素中定义`v-model`绑定变量，注意绑定变量需要是`Array`类型。

```html

<template>
  <ext-button @click="visible=true">开窗</ext-button>
  <ext-dialog :visible.sync="visible">
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">
        <ext-table :data="data" :columns="columns" :page-size="10" :page-sizes="[10,20,30]" pageable/>
      </el-tab-pane>
      <el-tab-pane label="配置管理">
        <ext-table :data="data" :columns="columns" :page-size="10" :page-sizes="[10,20,30]" pageable/>
      </el-tab-pane>
      <el-tab-pane label="角色管理">
        <ext-table :data="data" :columns="columns" :page-size="10" :page-sizes="[10,20,30]" pageable/>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿">
        <ext-table :data="data" :columns="columns" :page-size="10" :page-sizes="[10,20,30]" pageable/>
      </el-tab-pane>
    </el-tabs>
  </ext-dialog>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        columns: [
          {prop: 'id', label: 'ID'},
          {prop: 'date', label: '日期'},
          {prop: 'name', label: '姓名'},
          {prop: 'address', label: '地址'}
        ],
        data: [
          {id: 1, date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄'},
          {id: 2, date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄'}
        ]
      }
    }
  }
</script>
```

:::