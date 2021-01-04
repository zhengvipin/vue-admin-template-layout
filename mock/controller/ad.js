const data = [
  {
    title: 'vue-admin-beautiful-pro 1.7版本已发布，点我提前体验',
    url: 'https://chu1204505056.gitee.io/vue-admin-beautiful-pro/#/index'
  },
  {
    title: 'vue-admin-beautiful（antdv） vue3.0版本已发布，点我提前体验',
    url: 'https://chu1204505056.gitee.io/vue-admin-beautiful-mini/#/index'
  }
]

module.exports = [
  {
    url: '/vue-admin-template/ad/getList',
    type: 'get',
    response() {
      return {
        code: 20000,
        msg: 'success',
        data
      }
    }
  }
]
