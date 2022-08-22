export default {
	// 开启命名空间
	namespaced: true,

	// state 数据
	state: () => ({
		// 收货地址
		address: {},
		// 3. 读取本地的收货地址数据，初始化 address 对象
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// 登录成功之后的 token 字符串
		token: '',
		// 用户信息
		userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),
	}),

	// 方法
	mutations: {
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address
			// 2. 通过 this.commit() 方法，调用 m_user 模块下的 saveAddressToStorage 方法将 address 对象持久化存储到本地
			this.commit('user/saveAddressToStorage')
		},
		// 1. 定义将 address 持久化存储到本地 mutations 方法
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		 // 更新用户的基本信息
		  updateUserInfo(state, userinfo) {
		    state.userinfo = userinfo
		    // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
		    this.commit('user/saveUserInfoToStorage')
		  },
		
		  // 将 userinfo 持久化存储到本地
		  saveUserInfoToStorage(state) {
		    uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		  },

	},


	// 数据包装器
	getters: {},
}
