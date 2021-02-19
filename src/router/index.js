import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import store from '../store/index'
import getMenuList from '../utils/permission'

Vue.use(VueRouter);

const asyncRouteMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    hidden: false,
    icon: 'shop'
  },
  component: Home,
  children: [{
      path: 'list',
      name: 'ProductList',
      component: () => import('@/views/page/productList.vue'),
      meta: {
        title: '商品列表',
        hidden: false,
        icon: 'unordered-list'
      }
    },
    {
      path: 'add',
      name: 'ProductAdd',
      component: () => import('../views/page/productAdd.vue'),
      meta: {
        title: '添加商品',
        hidden: false,
        icon: 'folder-add'
      }
    },
    {
      path: 'edit/:id',
      name: 'ProductEdit',
      component: () => import('../views/page/productAdd.vue'),
      meta: {
        title: '编辑商品',
        hidden: true,
      }
    },
    {
      path: 'category',
      name: 'Category',
      component: () => import('../views/page/category.vue'),
      meta: {
        title: '商品类目',
        hidden: false,
        icon: 'menu'
      }
    }
  ]
}]

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'bank'
    },
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('../views/page/index.vue'),
      meta: {
        title: '统计',
        hidden: false,
        icon: 'line-chart'
      }
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/layout/Login.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/layout/Register.vue'),
    meta: {
      title: '注册',
      hidden: true
    }
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

let isAddRoutes = false
router.beforeEach(function (to, from, next) {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.email) {
      if (!isAddRoutes) {
        const menuList = getMenuList(store.state.user.role, asyncRouteMap)
        router.addRoutes(menuList)
        const routesList = routes.concat(menuList)
        store.dispatch('getMenuList', routesList)
        isAddRoutes = !isAddRoutes
      }
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router;
