import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./router.config.js"

Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由拦截
router.beforeEach((to,from,next)=>{
  // some 查找有一个为真就返回真，matched数组，里面放的是路由
  if(to.matched.some(item=>item.meta.requireAuto)){
    if(!window.localStorage.token){//本地存储
      next({
        path:"/login",
        query:{
          redirect:to.fullPath
        }
      })
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
