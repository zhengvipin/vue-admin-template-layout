import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/ad/getList',
    method: 'get',
    params
  })
}
