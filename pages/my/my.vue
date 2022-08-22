<template>
	<view>
		<my-login v-if="!token"></my-login>
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块
	import badgeMix from '../../mixin/tabbar-badge.js'
	import { mapState  } from 'vuex'
	export default {
		 // 将 badgeMix 混入到当前的页面中进行使用
		  mixins: [badgeMix],
		  computed:{
			  ...mapState ('user',['token'])
		  },
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
