const data = [
  {
    title: '@cparagraph(2)',
    url: 'https://chu1204505056.gitee.io/vue-admin-beautiful-pro/#/index'
  },
  {
    title: '@cparagraph(2)',
    url: 'https://chu1204505056.gitee.io/vue-admin-beautiful-mini/#/index'
  }
]

module.exports = [
  {
    url: '/vue-admin-template/ad/getList',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data
      }
    }
  }
]
