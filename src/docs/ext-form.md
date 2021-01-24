## ExtForm 表单

由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据

### 基础用法

快速渲染一般表单。

:::demo

```html

<template>
  <ext-form :model="model" :items="items"/>
</template>

<script>
  export default {
    data() {
      return {
        model: {input: '', number: ''},
        items: [
          {type: 'input', prop: 'input', label: '输入框'},
          {type: 'number', prop: 'number', label: '计数器'}
        ]
      }
    }
  }
</script>
```

:::

### 栅格布局

通过基础的 24 分栏，迅速简便地创建布局。

:::demo 不设置`span`属性时，默认自适应，自适应比较耗性能，建议设置`span`。

```html

<template>
  <ext-form :model="model" :items="items" :span="12"/>
</template>

<script>
  export default {
    data() {
      return {
        model: {input: '', number: '', select: '', radio: ''},
        items: [
          {type: 'input', prop: 'input', label: '输入框'},
          {type: 'number', prop: 'number', label: '计数器'},
          {type: 'select', prop: 'select', label: '选择器', enumKey: 'sex'},
          {type: 'radio', prop: 'radio', label: '单选框', enumKey: 'sex'}
        ]
      }
    }
  }
</script>
```

:::

### 分栏间隔

分栏之间存在间隔。

:::demo

```html

<template>
  <ext-form :model="model" :items="items" :span="12" :gutter="50"/>
</template>

<script>
  export default {
    data() {
      return {
        model: {input: '', number: '', select: '', radio: ''},
        items: [
          {type: 'input', prop: 'input', label: '输入框'},
          {type: 'number', prop: 'number', label: '计数器'},
          {type: 'select', prop: 'select', label: '选择器', enumKey: 'sex'},
          {type: 'radio', prop: 'radio', label: '单选框', enumKey: 'sex'}
        ]
      }
    }
  }
</script>
```

:::

### 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

:::demo 设置`inline`属性可以让表单域变为行内的表单域，行内表单与栅格布局互斥。

```html

<template>
  <ext-form :model="model" :items="items" label-width="100px" inline/>
</template>

<script>
  export default {
    data() {
      return {
        model: {input: '', number: '', select: ''},
        items: [
          {type: 'input', prop: 'input', label: '输入框'},
          {type: 'number', prop: 'number', label: '计数器'},
          {type: 'select', prop: 'select', label: '选择器', enumKey: 'sex'}
        ]
      }
    }
  }
</script>
```

:::

### 禁用状态

表单项为不可用状态。

:::demo 通过给表单添加`readonly`属性使所有表单项不可用，表单项的`readonly`优先级高于表单`readonly`。

```html

<template>
  <ext-form :model="model" :items="items" readonly/>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          input: '',
          number: '',
          select: ''
        },
        items: [
          {type: 'input', prop: 'input', label: '输入框', readonly: false},
          {type: 'number', prop: 'number', label: '计数器'},
          {type: 'select', prop: 'select', label: '选择器', enumKey: 'sex'}
        ]
      }
    }
  }
</script>
```

:::

### 自定义表单项模板

自定义表单项的显示内容，可组合其他组件使用。

:::demo

```html

<template>
  <ext-form :model="model" :items="items" label-width="100px">
    <template #customize="props">
      <ext-form-item v-bind="props">
        <el-input v-model="model[props.prop]" placeholder="请输入内容">
          <template slot="append">.com</template>
        </el-input>
      </ext-form-item>
    </template>
  </ext-form>
</template>

<script>
  export default {
    data() {
      return {
        model: {customize: ''},
        items: [{type: 'slot', prop: 'customize', label: '自定义插槽'}]
      }
    }
  }
</script>
```

:::

### 表单验证

在防止用户犯错的前提下，尽可能让用户更早地发现并纠正错误。

:::demo

```html

<template>
  <ext-form ref="ruleForm" :model="model" :rules="rules" :items="items" :span="8" label-width="100px" inline-error>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </ext-form>
</template>

<script>
  export default {
    data() {
      const OPTIONS = [{
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
        rules: {
          input: [
            {required: true, trigger: 'blur'}
          ],
          number: [
            {required: true, trigger: ['blur', 'change']}
          ],
          select: [
            {required: true, trigger: 'change'}
          ],
          radio: [
            {required: true, trigger: 'change'}
          ],
          checkbox: [
            {required: true, trigger: 'change'}
          ],
          date: [
            {required: true, trigger: 'change'}
          ],
          time: [
            {required: true, trigger: 'change'}
          ],
          switch: [
            {required: true, trigger: 'change'}
          ],
          slider: [
            {required: true, trigger: 'change'}
          ],
          rate: [
            {required: true, trigger: 'change'}
          ],
          cascader: [
            {required: true, trigger: 'change'}
          ],
          textarea: [
            {required: true, trigger: 'blur'}
          ]
        },
        items: [
          {type: 'input', prop: 'input', label: '输入框'},
          {type: 'number', prop: 'number', label: '计数器'},
          {type: 'select', prop: 'select', label: '选择器', enumKey: 'sex',change(val){alert(val)}},
          {type: 'radio', prop: 'radio', label: '单选框', enumKey: 'sex'},
          {type: 'checkbox', prop: 'checkbox', label: '多选框', enumKey: 'sex'},
          {type: 'date', prop: 'date', label: '日期选择器'},
          {type: 'time', prop: 'time', label: '时间选择器'},
          {type: 'switch', prop: 'switch', label: '开关'},
          {type: 'slider', prop: 'slider', label: '滑块'},
          {type: 'rate', prop: 'rate', label: '评分'},
          {type: 'cascader', prop: 'cascader', label: '级联选择器', options: OPTIONS},
          {type: 'textarea', prop: 'textarea', label: '文本域', span: 24}
        ]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].$refs.elForm.validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].$refs.elForm.resetFields()
      }
    }
  }
</script>
```

:::

### ExtForm Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  |  ----  | ----  |  ----  |
| model | 表单数据对象 | Object | - | - |
| items | 表单项对象数组，表单项对象参数请参考 ExtFormItem | Array | - | - |
| span | 表单项占据的栅格列数，值为 0 时，代表根据窗口大小做内部自适应 | Number | - | 0 |
| gutter | 表单项的栅格间隔 | Number | - | 10 |
| inline | 行内表单 | Boolean | - | false |
| readonly | 是否只读 | Boolean | - | false |
| inline-error | 是否以行内形式展示表单校验信息 | Boolean | - | false |
| top | 上边距，单位是px | Number | - | 0 |
| right | 右边距，单位是px | Number | - | 0 |
| bottom | 下边距，单位是px | Number | - | 0 |
| left | 左边距，单位是px | Number | - | 0 |

### ExtForm Slot

| name | 说明 |
|  ----  | ----  |
| -  | 表单后置内容 |
| [prop]  | 自定义表单项的内容，参数为该表单项在 items 中定义的对象 |

### ExtFormItem Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  |  ----  | ----  |  ----  |
| formItem | 配合ExtForm组件使用，标识是否作为ExtForm的子组件存在 | Boolean | - | false |
