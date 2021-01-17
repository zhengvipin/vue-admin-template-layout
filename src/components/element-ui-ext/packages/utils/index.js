import _ from 'lodash'

/**
 * 获取下拉组件的绑定值类型
 * @param value
 * @returns {function(*=): any}
 */
export function getValueType(value) {
  const val = _.isArray(value) ? value[0] : value
  if (/^-?\d+$/.test(val) && typeof val === 'number') {
    return param => Number(param)
  } else if (/^true|false$/.test(val) && typeof val === 'boolean') {
    return param => Boolean(param)
  } else {
    return param => param
  }
}

/**
 * 判断 options 是否对象数组
 * @param value
 * @returns {boolean}
 */
export function isObjectArray(value) {
  if (!value || !_.isArray(value) || !value.length) return false
  return (typeof value[0]) === 'object'
}

/**
 * 对象key转驼峰命名
 * @param object
 * @returns {{}}
 */
export function camelCaseObject(object) {
  const newObject = {}
  if (_.isObject(object)) {
    _.forIn(object, (value, key) => {
      newObject[_.camelCase(key)] = value
    })
  }
  return newObject
}

/**
 * 枚举翻译
 * @param options 下拉选列表
 * @param value 绑定值
 * @param defaultName 无匹配项时的默认值
 * @returns {string}
 */
export function transEnumName(options = [], value, defaultName) {
  return String(value).split(',').map(item => options.filter(data => String(data.id || data.value) === String(item)).map(data => data.name || data.label).join(',') || defaultName || value).join(',')
}

/**
 * 获取html元素的偏移量
 * @param element
 * @returns {{}}
 */
export function getElementOffset(element) {
  const elementPosition = {}
  const body = document.body
  const docEl = document.documentElement

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  if (element instanceof SVGElement) {
    const x = element.getBoundingClientRect()
    elementPosition.top = x.top + scrollTop
    elementPosition.width = x.width
    elementPosition.height = x.height
    elementPosition.left = x.left + scrollLeft
  } else {
    // set width
    elementPosition.width = element.offsetWidth

    // set height
    elementPosition.height = element.offsetHeight

    // calculate element top and left
    let _x = 0
    let _y = 0
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      _x += element.offsetLeft
      _y += element.offsetTop
      element = element.offsetParent
    }
    // set top
    elementPosition.top = _y
    // set left
    elementPosition.left = _x
  }

  return elementPosition
}

