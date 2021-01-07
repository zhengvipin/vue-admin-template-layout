module.exports = {
// 配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  // 最长请求时间
  requestTimeout: 5000,
  // 操作正常code，支持String、Array、int多种类型
  successCode: [200, 0],
  // 登录失效code
  invalidCode: 402,
  // 无权限code
  noPermissionCode: 401,
  // token名称
  tokenName: 'access_token'
}
