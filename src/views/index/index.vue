<template>
  <div>

    <!-- 新增/保存按钮侧边栏 -->
    <div class="right-pane">
      <div class="right-pane-item" @click.stop="onRightMenuAdd">
        <svg-icon class-name="right-pane-item-icon" icon-class="add" />
        <p>新增面板</p>
      </div>
      <div class="right-pane-item" @click.stop="gridVisible=!gridVisible">
        <i class="el-icon-s-grid right-pane-item-icon" />
        <p>网格布局</p>
      </div>
      <div class="right-pane-item" @click.stop="onRightMenuSave">
        <svg-icon class-name="right-pane-item-icon" icon-class="save" />
        <p>保存配置</p>
      </div>
    </div>

    <!-- 面板展示区 -->
    <div :class="{'drag-pane-container':true,'with-grid':gridVisible}">
      <vue-draggable-resizable
        v-for="(ele,index) in elements"
        :key="index"
        class-name="my-class"
        class-name-active="my-active-class"
        drag-handle=".drag-handle"
        drag-cancel=".drag-cancel"
        :x="ele.x"
        :y="ele.y"
        :z="ele.z"
        :w="ele.w"
        :h="ele.h"
        :parent="true"
        :active="!ele.lock"
        :draggable="!ele.lock"
        :resizable="!ele.lock"
        @dragging="(x, y) => onEleDrag(ele, x, y)"
        @resizing="(x, y,w,h) => onEleResize(ele, x, y, w, h)"
      >
        <el-card class="drag-pane-card" shadow="never" :body-style="{padding: 0}">
          <div slot="header" :class="ele.lock?'drag-cancel':'drag-handle'">
            <span>{{ ele.componentName }}</span>
            <el-button
              type="text"
              icon="el-icon-delete"
              @click.prevent.stop="onEleDel(index)"
            />
            <el-button
              type="text"
              icon="el-icon-edit-outline"
              @click.prevent.stop="onEleEdit(ele,index)"
            />
            <el-button
              type="text"
              :icon="ele.lock?'el-icon-lock':'el-icon-unlock'"
              @click.prevent.stop="onEleLock(ele)"
            />
            <el-button
              type="text"
              icon="el-icon-copy-document"
              @click.prevent.stop="onEleCopy(ele)"
            />
          </div>
          <vue-scroll>
            <component :is="ele.component" style="padding: 20px" />
          </vue-scroll>
        </el-card>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import VueScroll from 'vuescroll'
import PaneForm from './PaneForm'

export default {
  name: 'Index',
  components: {
    VueDraggableResizable,
    VueScroll,
    PaneForm
  },
  data() {
    return {
      gridVisible: false,
      elements: []
    }
  },
  created() {
    this.initElements()
  },
  methods: {
    initElements() {
      const elementsStr = localStorage.getItem('elements')
      if (elementsStr) {
        const elements = JSON.parse(elementsStr)
        elements.forEach(element => {
          element.lock = true
          this.loadComponent(element)
        })
        this.elements = elements
      }
    },
    onRightMenuAdd() {
      this.$layerOpen({
        title: '创建面板',
        content: PaneForm,
        parent: this,
        area: '50%',
        data: {
          edit: false
        }
      })
    },
    onRightMenuSave() {
      localStorage.setItem('elements', this.elements && JSON.stringify(this.elements) || '')
      this.$baseNotify('保存成功！', '温馨提示', 'success')
      setTimeout(() => this.initElements(), 200)
    },
    onEleLock(element) {
      this.$set(element, 'lock', !element.lock)
      this.$baseNotify(element.lock ? '加锁成功' : '解锁成功', '温馨提示', 'success')
    },
    onEleDel(index) {
      this.$baseConfirm('确认要删除当前面板吗', '温馨提示', () => {
        this.elements.splice(index, 1)
        localStorage.setItem('elements', this.elements && JSON.stringify(this.elements) || '')
        this.$baseNotify('删除成功', '温馨提示', 'success')
      })
    },
    onEleEdit(element, index) {
      this.$layerOpen({
        title: '编辑面板',
        content: PaneForm,
        parent: this,
        area: '50%',
        data: {
          edit: true,
          element,
          index
        }
      })
    },
    onEleCopy(element) {
      this.elements.push({ ...element, z: this.getMaxZIndex(), lock: false })
    },
    getMaxZIndex() {
      const zIndexArr = this.elements.map(element => element.z || 0)
      return zIndexArr.length ? Math.max(...zIndexArr) + 1 : 0
    },
    loadComponent(obj) {
      if (obj.url) obj.component = () => Promise.resolve(require(`@/views/${obj.url}`).default)
    },
    onEleDrag(el, x, y) {
      el.x = x
      el.y = y
      el.z = 300
      this.elements.forEach(e => {
        if (e.z >= el.z) {
          e.z = e.z - 1
        }
      })
    },
    onEleResize(el, x, y, w, h) {
      this.$set(el, 'x', x)
      this.$set(el, 'y', y)
      this.$set(el, 'w', w)
      this.$set(el, 'h', h)
    }
  }
}
</script>

<style lang="scss" scoped>
.right-pane {
  position: fixed;
  top: calc(50% - 28px);
  right: 10px;
  color: #fff;
  text-align: center;
  box-sizing: border-box;

  .right-pane-item {
    width: 60px;
    height: 56px;
    background-color: #009688;
    padding-top: 10px;
    cursor: pointer;
    opacity: 1;
    transition: opacity ease-in 0.2s;

    &:not(:first-child) {
      margin-top: 1px;
    }

    &:hover {
      opacity: 0.7;
    }

    .right-pane-item-icon {
      font-size: 16px;
    }

    p {
      margin: 0;
      line-height: 30px;
      font-size: 12px;
    }
  }
}

.drag-pane-container {
  z-index: 1;
  position: relative;
  width: 100%;
  height: calc(100vh + 120px);
  background-color: #e4eeec;

  &.with-grid {
    background: linear-gradient(-90deg, rgba(0, 0, 0, .3) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .3) 1px, transparent 1px);
    background-size: 20px 20px, 20px 20px;
  }

  .my-class {
    position: absolute;
    box-sizing: border-box;
    touch-action: none;
  }

  .my-active-class {
    width: 100%;
    height: 100%;
    outline: 2px solid #ffd04b;
  }

  .drag-pane-card {
    width: 100%;
    height: 100%;
    background-color: #fff;

    .drag-handle {
      cursor: move;
    }

    .drag-cancel {
      cursor: not-allowed;
    }

    ::v-deep .el-card__header {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;

      > div {
        &:before,
        &:after {
          display: table;
          content: "";
          clear: both;
        }

        .el-button {
          float: right;
          margin: 0 !important;
          padding-left: 6px;

          [class^="el-icon"] {
            font-size: 16px;
          }
        }
      }
    }

    ::v-deep .el-card__body {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
