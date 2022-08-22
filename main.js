
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入store实例
import store from './store/store.js'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
// 可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  wx.showLoading({
	  title:'数据加载中...'
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  wx.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	// 2.将store挂载到vue实例上
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif