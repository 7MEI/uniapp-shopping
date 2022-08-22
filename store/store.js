// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// a.导入购物车vuex仓库
import cart  from './car.js'
import user from './user.js'

// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

// 3. 创建 Store 的实例对象并暴露
export default new Vuex.Store({
  // TODO：挂载 store 模块
  modules: {
	  //b.挂载购物车vuex模块
	  cart:cart,
	  user:user
  },
})
