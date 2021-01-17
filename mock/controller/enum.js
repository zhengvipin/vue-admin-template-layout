const enums = {
  sex: [
    { value: 0, label: '女' },
    { value: 1, label: '男' },
    { value: 2, label: '未知' }
  ]
}

module.exports = [
  {
    url: '/vue-admin-customize/enum/list',
    type: 'post',
    response: config => {
      const { keys } = config.body
      const accessEnums = {}
      for (const key in enums) if (keys.indexOf(key) >= 0) accessEnums[key] = enums[key]
      return !keys ? { code: 500, message: 'Enums loading exception.' } : { code: 200, data: accessEnums }
    }
  }
]
