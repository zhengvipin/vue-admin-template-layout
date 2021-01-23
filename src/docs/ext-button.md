## ExtButton 按钮

常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo

```html

<template>
  <ext-button name="默认按钮"/>
  <ext-button type="primary" name="主要按钮"/>
  <ext-button type="success" name="成功按钮"/>
  <ext-button type="info" name="信息按钮"/>
  <ext-button type="warning" name="警告按钮"/>
  <ext-button type="danger" name="危险按钮"/>
</template>
```

:::

### 点击事件

点击按钮触发handler属性事件。

:::demo

```html

<template>
  <ext-button type="primary" :handler="handler">点我试试</ext-button>
  <ext-button type="primary" :handler="handlerLoading">也点我试试</ext-button>
</template>

<script>
  export default {
    methods: {
      handler: function () {
        this.$message('这是一条消息提示')
      },
      handlerLoading: function (done) {
        done(true)
        setTimeout(function () {
          done(false)
        }, 500)
      }
    }
  }
</script>
```

:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name            | 设置标题，也可以通过 slot#default 传入 DOM                                           | String         | — | —    |
| handler         | 按钮点击事件，done 是个回调函数，返回 true 会触发 loading 效果，false 关闭 loading 效果   | Function(done) | — | —     |
| preventDefault  | 配合handler属性使用，是否阻止默认事件                                                | Boolean        | — | false |
| stopPropagation | 配合handler属性使用，是否阻止冒泡事件                                                | Boolean        | — | false |
| permissions     | 角色数组，配合vuex，需支持异步角色请求，用于对比控制权限按钮的显隐                         | Array           | — | —    |