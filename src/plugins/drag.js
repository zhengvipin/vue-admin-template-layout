/**
 * 实现拖拽
 * @param options
 * @param options.container 拖拽的容器【必需】
 * @param options.handle 拖拽的手柄【可选】
 * @param options.parent 拖拽的限制范围【可选】
 * @param options.visible 拖拽范围是否为可视区域【可选】
 */
const drag = function(options) {
  const { container, parent, handle, visible } = options || {}

  if (!container) throw Error('container element is required!')

  let x, y, w, h, pL, pT, pW, pH
  let isDrop = false // 移动状态的判断鼠标按下才能移动

  const wH = document.documentElement.clientHeight
  const wW = document.documentElement.clientWidth

  const handleEle = handle || container// 定义把柄元素
  handleEle.onmousedown = function(ev) {
    // 要用event这个对象来获取鼠标的位置
    const e = ev || window.event
    w = container.offsetWidth
    h = container.offsetHeight
    x = e.clientX - container.offsetLeft
    y = e.clientY - container.offsetTop
    if (parent) {
      pW = parent.clientWidth
      pH = parent.clientHeight
      pL = parent.offsetLeft
      pT = parent.offsetTop
    }
    // 设为true表示可以移动
    isDrop = true
  }

  document.onmousemove = function(ev) {
    // 是否为可移动状态
    if (isDrop) {
      const e = ev || window.event
      // 得到距离左边移动距离
      let moveX = e.clientX - x
      // 得到距离上边移动距离
      let moveY = e.clientY - y
      if (parent) {
        // 可移动最大距离
        const maxX = visible ? Math.min(pW + pL, wW) - w : pW + pL - w
        const maxY = visible ? Math.min(pH + pT, wH) - h : pH + pT - h
        // 范围限定方法
        if (moveX < pL) moveX = pL
        else if (moveX > maxX) moveX = maxX
        if (moveY < pT) moveY = pT
        else if (moveY > maxY) moveY = maxY
      } else {
        // 可移动最大距离
        const maxX = wW - w
        const maxY = wH - h
        // 范围限定方法
        if (moveX < 0) moveX = 0
        else if (moveX > maxX) moveX = maxX
        if (moveY < 0) moveY = 0
        else if (moveY > maxY) moveY = maxY
      }
      container.style.left = moveX + 'px'
      container.style.top = moveY + 'px'
    }
  }

  document.onmouseup = function() {
    isDrop = false// 设置为false不可移动
  }
}

export default drag
