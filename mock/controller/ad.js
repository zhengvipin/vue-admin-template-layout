const data = [
  {
    title: '起始不凡，成就远见',
    url: 'https://chu1204505056.gitee.io/vue-admin-beautiful-pro/#/index'
  },
  {
    title: '团结一致加油干，重振国寿再出发',
    url: 'https://chu1204505056.gitee.io/vue-admin-beautiful-pro/#/index'
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
