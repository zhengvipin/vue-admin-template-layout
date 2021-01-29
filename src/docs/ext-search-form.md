## ExtSearchForm 查询表单

由输入框、选择器、单选框、多选框等控件组成，用以做数据筛选

### 基础用法

快速渲染一般表单。

:::demo

```html

<template>
  <ext-search-form :model="model" :items="items" :span="12"/>
</template>

<script>
  export default {
    data() {
      return {
        model: {},
        items: [
          {type: 'input', prop: 'input', label: '输入框'},
          {type: 'number', prop: 'number', label: '计数器'},
          {type: 'date', prop: 'date', label: '日期选择器'},
          {type: 'time', prop: 'time', label: '时间选择器'},
          {type: 'textarea', prop: 'textarea', label: '文本域', span: 24}
        ],
      }
    }
  }
</script>
```

:::

### 更多模式

支持icon/text两种模式。

:::demo

```html

<template>
  <ext-search-form :model="model" :items="items" :span="12" type="text"/>
</template>

<script>
  export default {
    data() {
      return {
        model: {},
        items: [
          {type: 'input', prop: 'input', label: '输入框'},
          {type: 'number', prop: 'number', label: '计数器'},
          {type: 'date', prop: 'date', label: '日期选择器'},
          {type: 'time', prop: 'time', label: '时间选择器'},
          {type: 'textarea', prop: 'textarea', label: '文本域', span: 24}
        ],
      }
    }
  }
</script>
```

:::

### 无标题状态

label属性为不可见状态。

:::demo

```html

<template>
  <ext-search-form :model="model" :items="items" :span="12" :show-label="false"/>
</template>

<script>
  export default {
    data() {
      return {
        model: {},
        items: [
          {type: 'input', prop: 'input', label: '输入框'},
          {type: 'number', prop: 'number', label: '计数器'},
          {type: 'date', prop: 'date', label: '日期选择器'},
          {type: 'time', prop: 'time', label: '时间选择器'},
          {type: 'textarea', prop: 'textarea', label: '文本域', span: 24}
        ],
      }
    }
  }
</script>
```

:::

### 工具栏

渲染功能按钮。

:::demo

```html

<template>
  <ext-search-form :model="model" :items="items" :span="12" :buttons="buttons" @search="handleSearch"/>
</template>

<script>
  export default {
    data() {
      return {
        model: {},
        items: [
          {type: 'input', prop: 'input', label: '输入框'},
          {type: 'number', prop: 'number', label: '计数器'},
          {type: 'date', prop: 'date', label: '日期选择器'},
          {type: 'time', prop: 'time', label: '时间选择器'},
          {type: 'textarea', prop: 'textarea', label: '文本域', span: 24}
        ],
        buttons: [{
          name: '新增',
          type: 'success',
          handler: function () {
            this.$message('add')
          },
          icon: 'el-icon-circle-plus-outline'
        }, {
          name: '修改',
          type: 'warning',
          handler: function () {
            this.$message('edit')
          },
          icon: 'el-icon-edit',
          disabled: true
        }, {
          name: '删除',
          type: 'danger',
          handler() {
            this.$message('del')
          },
          icon: 'el-icon-delete'
        }, {
          name: '查询',
          type: 'primary',
          handler(done) {
            done(true)
            setTimeout(function () {
              done(false)
            }, 1000)
          },
          icon: 'el-icon-search'
        }]
      }
    },
    methods: {
      handleSearch() {
        this.$message(JSON.stringify(this.model))
      }
    }
  }
</script>
```

:::

### ExtSearchForm Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  |  ----  | ----  |  ----  |
| model | 表单数据对象 | Object | - | - |
| items | 表单项对象数组，表单项对象参数请参考 ExtFormItem | Array | - | - |
| buttons | 按钮对象数组，按钮的参数详情请参考ExtButton | Array | - | - |
| type | 更多模式 | String | - | icon |
| showLabel | 是否展示标题 | Boolean | - | true |
| maxHeight | 更多内容区最大高度 | String | - | 0 |

### ExtSearchForm Events

| 事件名称 | 说明 | 回调参数 |
|  ----  | ----  |  ----  | 
| search | input/number 类型表单项 enter 键入时会触发 | - |