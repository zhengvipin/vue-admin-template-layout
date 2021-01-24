## ExtTimePicker 时间选择器

用于选择或输入日期。

### 基础用法

可以选择任意时间。

:::demo

```html

<template>
  <ext-time-picker v-model="value" />
</template>

<script>
  export default {
    data() {
      return {
        value: new Date(2016, 9, 10, 18, 40)
      }
    }
  }
</script>
```

:::

### 固定时间点

提供几个固定的时间点供用户选择。

:::demo

```html

<template>
  <ext-time-picker v-model="value" time-select />
</template>

<script>
  export default {
    data() {
      return {
        value: '10:00'
      }
    }
  }
</script>
```

:::

### ExtTimePicker Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  |  ----  | ----  |  ----  |
| value / v-model  | 绑定值 | String/Date/Array | - | - |
| timeSelect | 固定值模式 | Boolean | - | false |