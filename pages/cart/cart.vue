<template>
	<view class="cart-container">
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop-filled" size="24px"></uni-icons>
			<text>购物车</text>
		</view>
		<!-- 商品列表 -->
		<block v-for="(item,i) in cart" :key="i">
			<goods :goods="item" :showRadio="true"  :showNumberBox="true" @radio-change="changeHandle" @number-change="numberChangeHandle"></goods>
		</block>
		<accounts></accounts>
	</view>
</template>

<script>
	import {
		mapGetters,mapState,mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		computed: {
			// 将 cart 模块中的 total 映射为当前页面的计算属性
			...mapGetters('cart', ['total']),
			  // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
			...mapState('cart',['cart']),
		},
		onShow() {
			// 在页面刚展示的时候，设置数字徽标
			this.setBadge()
		},
		methods: {
			...mapMutations('cart',['updateGoodsState', 'updateGoodsCount']),
			setBadge() {
				// 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
				uni.setTabBarBadge({
					index: 2, //购物车页面的索引
					text: this.total + '' // 注意：text 的值必须是字符串，不能是数字
				})
			},
			// radio点击事件
			changeHandle(e){
				this.updateGoodsState(e)
			},
			// 数量改变事件
			numberChangeHandle(e){
				console.log('eeeee',e)
				this.updateGoodsCount(e)
				console.log('daozhele')
			}
		}
	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 50px;
		.cart-title {
			padding: 10px 5px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #EBEEF5;
			text {
				font-size: 16px;
				margin-left: 10px;
			}
		}
	}
	
</style>
