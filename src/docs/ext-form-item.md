## ExtFormItem 表单项

作为表单的子项使用。

### 基础用法

type属性决定渲染的表单组件类型。

:::demo

```html

<template>
  <el-form :model="model" label-suffix="：" label-width="auto">
    <ext-form-item v-model="model.input" type="input" label="输入框"/>
    <ext-form-item v-model="model.number" type="number" label="计数器"/>
    <ext-form-item v-model="model.select" type="select" label="选择器" enum-key="sex"/>
    <ext-form-item v-model="model.radio" type="radio" label="单选框" enum-key="sex"/>
    <ext-form-item v-model="model.checkbox" type="checkbox" label="多选框" enum-key="sex"/>
    <ext-form-item v-model="model.date" type="date" label="日期选择器"/>
    <ext-form-item v-model="model.time" type="time" label="时间选择器"/>
    <ext-form-item v-model="model.switch" type="switch" label="开关"/>
    <ext-form-item v-model="model.slider" type="slider" label="滑块"/>
    <ext-form-item v-model="model.rate" type="rate" label="评分"/>
    <ext-form-item v-model="model.cascader" type="cascader" label="级联选择器" :options="options"/>
    <ext-form-item v-model="model.textarea" type="textarea" label="文本域"/>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          input: '',
          number: '',
          select: '',
          radio: '',
          checkbox: [],
          date: '',
          time: '',
          switch: true,
          slider: 50,
          rate: 5,
          textarea: ''
        },
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }]
          }]
        }]
      }
    }
  }
</script>
```

:::

### 属性事件

支持以属性形式绑定当前表单组件类型已有的事件。

:::demo 注意使用`this.$message()`方法的内容不能为`undefined`，否则无法弹出

```html

<template>
  <el-form :model="model" label-suffix="：" label-width="auto">
    <ext-form-item v-model="model.cascader" type="cascader" label="级联选择器" :options="options" :change="changeMethod"
                   :visible-change="visibleChangeMethod"/>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        model: {cascader: []},
        changeMethod: function (val) {
          this.$message(JSON.stringify(val))
        },
        visibleChangeMethod: function (boo) {
          console.log(boo)
        },
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }]
          }]
        }]
      }
    }
  }
</script>
```

:::

### ExtFormItem Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  |  ----  | ----  |  ----  |
| value / v-model  | 绑定值 | String/Date/Array | - | - |
| type | 表单组件类型 | String | input/textarea/password/number/select/year/month/date/dates/week/datetime/datetimerange/daterange/monthrange/time/timerange/radio/checkbox/switch/slider/rate/cascader | - |
| showLabel  | 是否展示label属性，配合 ExtSearchForm 组件使用 | Boolean | - | true |
| inline-error | 是否以行内形式展示表单校验信息 | Boolean | - | false |
| change  | 绑定值变化时触发的事件（radio/checkbox/input/number/cascader/switch/slider/timePicker系列/datePicker系列/rate） | Function | - | 选中的值 |
| input  | 在 Input 值改变时触发（input/slider） | Function | - | 输入的值 |
| blur  | 在组件 Input 失去焦点时触发（input/number/select/cascader/timePicker系列/datePicker系列） | Function | - | - |
| focus  | 在组件 Input 获得焦点时触发（input/number/select/cascader/timePicker系列/datePicker系列） | Function | - | - |
| clear  | 在点击由 clearable 属性生成的清空按钮时触发（input/select） | Function | - | - |
| expand-change  | 当展开节点发生变化时触发（cascader） | Function | - | 各父级选项值组成的数组 |
| visible-change  | 下拉框出现/隐藏时触发（select/cascader） | Function | - | 出现则为 true，隐藏则为 false |
| remove-tag  | 在多选模式下，移除Tag时触发（select/cascader） | Function | - | 移除的Tag对应的节点的值 |