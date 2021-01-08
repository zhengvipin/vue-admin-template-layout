module.exports = {
  // intelligence和all两种方式，前者后端权限只控制permissions不控制view文件的import（前后端配合，减轻后端工作量），all方式完全交给后端前端只负责加载
  authentication: 'all',
  // 是否显示在页面高亮错误
  errorLog: ['production', 'development'],
  // 加载时显示文字
  loadingText: '正在加载中...',
  // 消息框消失时间
  messageDuration: 3000
}
