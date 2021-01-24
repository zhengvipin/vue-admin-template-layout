## ExtCheckbox 多选框

一组备选项中进行多选

### 基础用法

基础的多选框列表展示用法。

:::demo 在`ext-checkbox`元素中定义`v-model`绑定变量，注意绑定变量需要是`Array`类型。

```html

<template>
  <ext-checkbox v-model="value" :options="options"/>
</template>

<script>
  export default {
    data() {
      return {
        value: [1],
        options: [
          {value: 1, label: '奶茶三兄弟'},
          {value: 2, label: '金桔柠檬茶'},
          {value: 3, label: '芒果益菌多'},
          {value: 4, label: '布丁巧克力'},
          {value: 5, label: '焦糖玛奇朵'}
        ]
      }
    }
  }
</script>
```

:::

### 字符串数组

字符串数组渲染多选框列表。

:::demo 字符串数组渲染多选框列表时，`v-model`绑定的值取的是字符串本身。

```html

<template>
  <ext-checkbox v-model="value" :options="options"/>
</template>

<script>
  export default {
    data() {
      return {
        value: ['小米'],
        options: ['百度','腾讯','阿里','小米']
      }
    }
  }
</script>
```

:::

### 请求枚举

动态渲染枚举多选框列表。

:::demo 需要在引用该组件的配置项中传入`getEnumList`方法

```html

<template>
  <ext-checkbox v-model="value" enum-key="sex"/>
</template>

<script>
  export default {
    data() {
      return {
        value: [1]
      }
    }
  }
</script>
```

:::

### 按钮样式

按钮样式的多选组合。

:::demo

```html

<template>
  <ext-checkbox v-model="value" :options="options" show-button/>
</template>

<script>
  export default {
    data() {
      return {
        value: [1],
        options: [
          {value: 1, label: '奶茶三兄弟'},
          {value: 2, label: '金桔柠檬茶'},
          {value: 3, label: '芒果益菌多'},
          {value: 4, label: '布丁巧克力'},
          {value: 5, label: '焦糖玛奇朵'}
        ]
      }
    }
  }
</script>
```

:::

### ExtCheckbox Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  |  ----  | ----  |  ----  |
| value / v-model  | 绑定值 | Array | - | - |
| options | 可选项数据源，键名可通过 props 属性配置 | Array | - | - |
| props | 配置选项，具体看下表 | Object | - | - |
| enumKey | 枚举类型，配合vuex，需支持异步枚举请求 | String | - | - |
| showButton | 按钮样式 | Boolean | - | false |

### ExtCheckbox Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  |  ----  | ----  |  ----  |
| label  | 指定选项标签为选项对象的某个属性值 | String | - | label |
| value  | 指定选项的值为选项对象的某个属性值 | String | - | value |