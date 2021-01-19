import Vue from 'vue'
import layer from 'layui-layer'
import drag from './drag'

// 重写layer的open方法
const origin_layerOpen = layer.open
layer.open = function(options) {
  const { type, content, parent, data, container, move = true } = options
  if (type === 1 && typeof content === 'object') {
    const origin_success = options.success
    options.success = function(layero, layerid) {
      const layeroDom = layero.get(0)
      // 渲染目标组件
      const Component = Vue.extend(content)
      const instance = new Component({ data: { layerid, layerdata: data }, parent })
      instance.vm = instance.$mount()
      layero.children('.layui-layer-content').html(instance.vm.$el)
      // 范围内弹窗
      if (container) {
        // 遮罩层
        const $shade = layero.prev('.layui-layer-shade')
        const l = container.offsetLeft
        const t = container.offsetTop
        if ($shade.length) {
          $shade.css({
            width: $shade.outerWidth() - l + 'px',
            left: l + 'px',
            height: $shade.outerHeight() - t + 'px',
            top: t + 'px'
          })
        }
        // 内容容器
        layero.css({
          left: layeroDom.offsetLeft + l / 2 + 'px',
          top: layeroDom.offsetTop + t / 2 + 'px'
        })
        // 标题拖拽
        if (move) {
          const $title = layero.children('.layui-layer-title')
          $title.css('cursor', 'move')
          drag({
            container: layeroDom,
            parent: container,
            handle: $title.get(0),
            visible: true
          })
          options.move = false
        }
      }
      // 成功回调
      if (origin_success && origin_success instanceof Function) origin_success(layero, layerid)
    }
    options.content = ''
  }
  return origin_layerOpen(options)
}

function layerOpen(opts = {}) {
  return layer.open({
    type: 1,
    offset: '15vh',
    ...opts,
    zIndex: 2000
  })
}

function layerClose(layerid) {
  return layer.close(layerid)
}

Vue.prototype.$layer = layer
Vue.prototype.$layerOpen = layerOpen
Vue.prototype.$layerClose = layerClose
