import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const componentMap = {
  login: () => import('@/views/login/index'),
  notFound: () => import('@/views/404'),
  dashboard: () => import('@/views/dashboard/index'),
  exampleTable: () => import('@/views/table/index'),
  exampleTree: () => import('@/views/tree/index'),
  formIndex: () => import('@/views/form/index'),
  layout: Layout,
  menuManager: () => import('@/views/authority/menuManager/index'),
  roleManager: () => import('@/views/authority/roleManager/index'),
  userManager: () => import('@/views/authority/userManager/index')
}

export const constantRouterMap = [
  {
    path: '/login',
    component: componentMap['login'],
    hidden: true
  },

  {
    path: '/404',
    component: componentMap['notFound'],
    hidden: true
  },

  {
    path: '/',
    component: componentMap['layout'],
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: componentMap['dashboard'],
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }
]

// 每次动态加载路由后需要将 lastNotFound 放到最后
export const lastNotFound = [
  {
    path: '*',
    name: 'Not Found',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
