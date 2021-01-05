/*
路由名称 name
标题 title
路径 path
vue文件路径 component
重定向 redirect
图标 icon
是否一直显示当前节点 alwaysShow
是否隐藏 hidden
是否无缓存 noCache
是否在tagsView中固定 affix
是否在面包屑中展示 breadcrumb

const route = {
  parentId: '',
  id: '',
  name: '',
  path: '',
  component: '',
  hidden: 0,
  redirect: '',
  alwaysShow: true,
  meta: {
    title: '',
    icon: '',
    noCache: false,
    breadcrumb: true,
    affix: false
  },
  children: []
}
*/

const data = [
  {
    path: '/nested',
    component: '#',
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: '/views/nested/menu1/index', // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: '/views/nested/menu1/menu1-1',
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: '/views/nested/menu1/menu1-2',
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: '/views/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: '/views/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: '/views/nested/menu1/menu1-3',
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: '/views/nested/menu2/index',
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: 'external-link',
    component: '#',
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

module.exports = [
  {
    url: '/vue-admin-template/menu/navigate',
    type: 'post',
    response() {
      return { code: 20000, msg: 'success', data: data }
    }
  }
]
