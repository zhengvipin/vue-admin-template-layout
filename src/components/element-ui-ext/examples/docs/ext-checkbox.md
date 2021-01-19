## ExtCheckbox 多选框
一组备选项中进行多选

### 基础用法

基础的多选框列表展示用法。

:::demo 在`ext-checkbox`元素中定义`v-model`绑定变量，注意绑定变量需要是`Array`类型。
```html
  <template>
  <ext-checkbox v-model="value" :options="options" />
</template>

<script>
  export default {
    data() {
      return {
        value: [1],
        options: [
          { value: 1, label: '奶茶三兄弟' },
          { value: 2, label: '金桔柠檬茶' },
          { value: 3, label: '芒果益菌多' },
          { value: 4, label: '布丁巧克力' },
          { value: 5, label: '焦糖玛奇朵' }
        ]
      }
    }
  }
</script>
```
:::

### Checkbox Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  |  ----  | ----  |  ----  |
| value / v-model  | 绑定值 | Array | - | - |
| options | 可选项数据源，键名可通过 props 属性配置 | Array | - | - |
| props | 配置选项，具体看下表 | Object | - | - |
| enumKey | 枚举类型，配合vuex，需支持异步枚举请求 | String | - | - |
| showButton | 按钮样式 | Boolean | - | false |

### Props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  |  ----  | ----  |  ----  |
| label  | 指定选项标签为选项对象的某个属性值 | String | - | label |
| value  | 指定选项的值为选项对象的某个属性值 | String | - | value |