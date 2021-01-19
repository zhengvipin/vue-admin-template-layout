<template>
  <div class="app-container">
    <ext-form ref="ruleForm" :model="model" :items="items" label-width="100px" :span="12">
      <el-collapse-transition>
        <el-form-item v-if="model.component" label-width="0" style="width: 100%;border: 1px dotted #DCDFE6;">
          <div style="height: 300px;">
            <vue-scroll>
              <component :is="model.component" />
            </vue-scroll>
          </div>
        </el-form-item>
      </el-collapse-transition>
      <el-form-item>
        <el-button type="primary" @click.prevent.stop="submitForm('ruleForm')">确 定</el-button>
        <el-button @click.prevent.stop="$layerClose(layerid)">取 消</el-button>
      </el-form-item>
    </ext-form>
  </div>
</template>

<script>
import VueScroll from 'vuescroll'

const MODEL = { x: 0, y: 0, w: 400, h: 400, z: 0, lock: false }

const COMPONENT_OPTIONS = [
  { componentId: 1, componentName: '服务目录', x: 0, y: 0, w: 300, h: 300, z: 0, url: 'index/components/ServiceMenu' },
  { componentId: 2, componentName: '中心工作日历', x: 0, y: 0, w: 300, h: 300, z: 0, url: 'index/components/WorkCalendar' },
  { componentId: 3, componentName: '中心荣誉墙', x: 0, y: 0, w: 300, h: 300, z: 0, url: 'index/components/HoverWall' },
  { componentId: 4, componentName: '新闻走马灯', x: 0, y: 0, w: 300, h: 300, z: 0, url: 'index/components/Carousel' },
  { componentId: 5, componentName: '标签页', x: 0, y: 0, w: 300, h: 300, z: 0, url: 'index/components/Tabs' }
]

export default {
  name: 'PaneForm',
  components: {
    VueScroll
  },
  data() {
    const validatePositiveNumber = (rule, value, callback, title) => {
      if (value === '') {
        callback(new Error(`${title}不能为空`))
      } else if (value <= 0) {
        callback(new Error(`${title}必须大于0`))
      } else {
        callback()
      }
    }

    return {
      layerid: -1,
      layerdata: null,
      model: MODEL,
      items: [
        {
          type: 'select',
          prop: 'componentId',
          label: '面板类型',
          options: COMPONENT_OPTIONS,
          props: { label: 'componentName', value: 'componentId' },
          events: {
            change: (val) => {
              this.model.component = null
              const element = COMPONENT_OPTIONS.find(item => String(item.componentId || '') === String(val || ''))
              if (element) {
                this.model.componentName = element.componentName
                this.model.url = element.url
                if (!this.layerdata.edit) {
                  this.model.x = element.x
                  this.model.y = element.y
                  this.model.w = element.w
                  this.model.h = element.h
                }
                this.$parent.loadComponent(this.model)
                console.log(this.model)
              } else {
                this.model.componentName = undefined
                this.model.url = undefined
                this.model.component = null
              }
              this.$forceUpdate()
            }
          }
        },
        { type: 'input', prop: 'componentName', label: '面板名称', readonly: true },
        { type: 'input', prop: 'url', label: 'url', span: 24, readonly: true },
        { type: 'input', prop: 'w', label: '宽度' },
        { type: 'input', prop: 'h', label: '高度' },
        { type: 'input', prop: 'x', label: 'x轴坐标' },
        { type: 'input', prop: 'y', label: 'y轴坐标' }
      ],
      rules: {
        w: [
          {
            validator: (rule, value, callback) => validatePositiveNumber(rule, value, callback, '宽度'),
            trigger: 'blur'
          }
        ],
        h: [
          {
            validator: (rule, value, callback) => validatePositiveNumber(rule, value, callback, '宽度'),
            trigger: 'blur'
          }
        ],
        x: [
          { required: true, message: 'x轴坐标不能为空' },
          { type: 'number', message: 'x轴坐标必须为数字值' }
        ],
        y: [
          { required: true, message: '面板y轴坐标不能为空' },
          { type: 'number', message: '面板y轴坐标必须为数字值' }
        ]
      }
    }
  },
  created() {
    if (this.layerdata.edit) this.model = this.$lodash.cloneDeep(this.layerdata.element)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].$refs.elForm.validate((valid) => {
        if (valid) {
          this.$layerClose(this.layerid)
          setTimeout(() => {
            if (this.layerdata.edit) {
              this.$set(this.$parent.elements, this.layerdata.index, this.$lodash.cloneDeep(this.model))
              this.$baseNotify('修改成功', '温馨提示', 'success')
            } else {
              this.$parent.elements.push({ ...this.model, z: this.$parent.getMaxZIndex() })
              this.$baseNotify('创建成功', '温馨提示', 'success')
            }
          }, 500)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.app-container{
  padding: 20px;
}

.scroll-parent {
  max-height: 300px;
}
</style>
