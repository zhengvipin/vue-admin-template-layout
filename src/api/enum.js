import request from '@/utils/request'

export function getEnumList(data) {
  return request({
    url: '/vue-admin-customize/enum/list',
    method: 'post',
    data
  })
}
