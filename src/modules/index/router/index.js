import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import home from '../views/home.vue'
import index from '../views/index.vue'
import print from '../views/print.vue'
import order from '../views/order.vue'
import orderDetails from '../../../compoents/order_details.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: index
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/home',
    component: home,
    redirect: 'print',
    children: [
      {
        path: '/print',
        component: print
      },
      {
        path: '/order',
        component: order
      },
      {
        path: '/order_details',
        component: orderDetails
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫控制访问权限
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 放行函数
  // next()表示放行; next('/login')表示强制跳转
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('userToken')
  if (!tokenStr && to.path !== '/') return next('/login')
  next()
})

export default router
