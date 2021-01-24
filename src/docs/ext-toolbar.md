## ExtToolbar 工具栏

一组按钮形成工具栏

### 基础用法

基础的工具栏展示用法。

:::demo

```html

<template>
  <ext-toolbar :buttons="buttons"/>
</template>

<script>
  export default {
    data() {
      return {
        buttons: [
          {
            name: '新增',
            type: 'success',
            icon: 'el-icon-circle-plus-outline'
          },
          {
            name: '修改',
            type: 'warning',
            icon: 'el-icon-edit'
          },
          {
            name: '删除',
            type: 'danger',
            icon: 'el-icon-delete'
          },
          {
            name: '查询',
            type: 'primary',
            icon: 'el-icon-search'
          }
        ],
      }
    }
  }
</script>
```

:::

### 隐藏状态

rights属性控制按钮显隐。

:::demo

```html

<template>
  <ext-toolbar :buttons="buttons" :rights="rights"/>
</template>

<script>
  export default {
    data() {
      return {
        buttons: [
          {
            name: '新增',
            type: 'success',
            right: 'addRight',
            icon: 'el-icon-circle-plus-outline'
          },
          {
            name: '修改',
            type: 'warning',
            icon: 'el-icon-edit',
            disabled: true
          },
          {
            name: '删除',
            type: 'danger',
            right: 'delRight',
            icon: 'el-icon-delete'
          },
          {
            name: '查询',
            type: 'primary',
            icon: 'el-icon-search'
          }
        ],
        rights: {
          addRight: true,
          delRight: false
        }
      }
    }
  }
</script>
```

:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo

```html

<template>
  <ext-toolbar :buttons="buttons" group/>
</template>

<script>
  export default {
    data() {
      return {
        buttons: [
          {
            name: '新增',
            type: 'success',
            icon: 'el-icon-circle-plus-outline'
          },
          {
            name: '修改',
            type: 'warning',
            icon: 'el-icon-edit'
          },
          {
            name: '删除',
            type: 'danger',
            icon: 'el-icon-delete'
          },
          {
            name: '查询',
            type: 'primary',
            icon: 'el-icon-search'
          }
        ],
      }
    }
  }
</script>
```

:::

### 更多按钮

limit属性控制直接展现的按钮的数量，其余按钮以“更多”形式展现。

:::demo

```html

<template>
  <ext-toolbar :buttons="buttons" :limit="2"/>
</template>

<script>
  export default {
    data() {
      return {
        buttons: [
          {
            name: '新增',
            type: 'success',
            icon: 'el-icon-circle-plus-outline'
          },
          {
            name: '修改',
            type: 'warning',
            icon: 'el-icon-edit'
          },
          {
            name: '删除',
            type: 'danger',
            icon: 'el-icon-delete'
          },
          {
            name: '查询',
            type: 'primary',
            icon: 'el-icon-search'
          }
        ],
      }
    }
  }
</script>
```

:::

### 属性事件

支持以属性形式绑定点击事件。

:::demo

```html

<template>
  <ext-toolbar :buttons="buttons"/>
</template>

<script>
  export default {
    data() {
      return {
        buttons: [
          {
            name: '新增',
            type: 'success',
            handler: function () {
              this.$message('add')
            },
            icon: 'el-icon-circle-plus-outline'
          },
          {
            name: '修改',
            type: 'warning',
            handler: function () {
              this.$message('edit')
            },
            icon: 'el-icon-edit'
          },
          {
            name: '删除',
            type: 'danger',
            handler() {
              this.$message('del')
            },
            icon: 'el-icon-delete'
          },
          {
            name: '查询',
            type: 'primary',
            handler(done) {
              done(true)
              setTimeout(function () {
                done(false)
              }, 1000)
            },
            icon: 'el-icon-search'
          }
        ]
      }
    }
  }
</script>
```

:::

### ExtToolbar Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  |  ----  | ----  |  ----  |
| buttons | 按钮对象数组，按钮的参数详情请参考 ExtButton | Array | - | - |
| rights | 权限对象，配合按钮对象中的 right 属性使用，权限对象中对应的属性值为 true 表示显示，false 表示隐藏 | Object | - | - |
| group | 按钮组形式 | Boolean | - | false |
| limit | 以“更多”形式展示索引大于等于 limit 的按钮 | Number | - | 0 |
| align | 对齐方式 | String | left/center/right | left |