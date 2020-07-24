import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue';
Vue.use(VueRouter)
import { account } from "../utils/api";

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/TestCase',
        name: 'TestCase',
        meta: {
          auth: true
        },
        component: () => import('../views/TestCase.vue')
      },
      {
        path: '/Login',
        name: 'Login',
        component: () => import('../views/Login.vue')
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  console.log("beforeEach")
  // 判断要进入的路由是否需要认证
  if (to.meta.auth) {
    account.islogin().then(user => {
      to.params.user = user;
      next(); // 如果登录则放行，进入路由
    }).catch(err => {
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      });
    })
  } else {
    next();
  }

})


export default router
