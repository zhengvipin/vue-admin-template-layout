import request from '@/utils/request'

export function getRouterList(data) {
  return request({
    url: '/vue-admin-template/menu/navigate',
    method: 'post',
    data
  })
}
