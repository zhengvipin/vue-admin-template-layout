/*
路由名称 name
路径 path
vue文件路径 component
是否隐藏 hidden
重定向 redirect
是否一直显示当前节点 alwaysShow
标题 title
图标 icon
标记 badge
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
    badge: '',
    noCache: false,
    breadcrumb: true,
    affix: false
  },
  children: []
}
*/

const data = [
  {
    path: '/icon',
    component: '#',
    alwaysShow: true,
    name: 'Icon',
    meta: { title: '图标', icon: 'icon' },
    children: [
      {
        path: 'svgIcons',
        name: 'SvgIcons',
        component: '/views/icons/index',
        meta: { title: 'Icons', noCache: true }
      },
      {
        path: 'elementIcons',
        name: 'ElementIcons',
        component: '/views/icons/elementIcons',
        meta: { title: 'Element-UI Icons', noCache: true }
      }
    ]
  },
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
      return { code: 200, msg: 'success', data: data }
    }
  }
]
