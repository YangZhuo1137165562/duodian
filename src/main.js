import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/font/iconfont.css"//引入icon样式
import "swiper/css/swiper.css"//引入swiper样式
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
