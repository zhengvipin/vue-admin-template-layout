import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: '错误页',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  }
]

if (process.env.NODE_ENV === 'development') {
  const exampleRouteItem = constantRoutes.find(route => route.name === 'Example')
  exampleRouteItem.children = exampleRouteItem.children.concat([
    {
      path: 'ext-button',
      name: 'ExtButton',
      component: () => import('@/docs/ext-button.md'),
      meta: { title: 'ExtButton 按钮' }
    },
    {
      path: 'ext-toolbar',
      name: 'ExtToolbar',
      component: () => import('@/docs/ext-toolbar.md'),
      meta: { title: 'ExtToolbar 工具栏' }
    },
    {
      path: 'ext-radio',
      name: 'ExtRadio',
      component: () => import('@/docs/ext-radio.md'),
      meta: { title: 'ExtRadio 单选框' }
    },
    {
      path: 'ext-checkbox',
      name: 'ExtCheckbox',
      component: () => import('@/docs/ext-checkbox.md'),
      meta: { title: 'ExtCheckbox 复选框' }
    },
    {
      path: 'ext-select',
      name: 'ExSelect',
      component: () => import('@/docs/ext-select.md'),
      meta: { title: 'ExSelect 选择器' }
    },
    {
      path: 'ext-table',
      name: 'ExtTable',
      component: () => import('@/docs/ext-table.md'),
      meta: { title: 'ExtTable 表格' }
    },
    {
      path: 'ext-time-picker',
      name: 'ExtTimePicker',
      component: () => import('@/docs/ext-time-picker.md'),
      meta: { title: 'ExtTimePicker 时间选择器' }
    },
    {
      path: 'ext-form-item',
      name: 'ExtFormItem',
      component: () => import('@/docs/ext-form-item.md'),
      meta: { title: 'ExtFormItem 表单项' }
    },
    {
      path: 'ext-form',
      name: 'ExtForm',
      component: () => import('@/docs/ext-form.md'),
      meta: { title: 'ExtForm 表单' }
    },
    {
      path: 'ext-search-form',
      name: 'ExtSearchForm',
      component: () => import('@/docs/ext-search-form.md'),
      meta: { title: 'ExtSearchForm 查询表单' }
    },
    {
      path: 'ext-pagination',
      name: 'ExtPagination',
      component: () => import('@/docs/ext-pagination.md'),
      meta: { title: 'ExtPagination 分页栏' }
    }
  ])
}

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
