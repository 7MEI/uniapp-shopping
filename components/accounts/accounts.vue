<template>
	<view class="accounts-container">
		<!-- 全选 -->
		<view>
			<label class="radio" @click="changeAllCheck">
				<radio :checked="isAllCheck" color="#4aaa5d" /><text>全选</text>
			</label>
		</view>
		<!-- 合计 -->
		<view class="">
			合计：<text class="acounts-text">￥{{checkedGoodsAccount}}</text>
		</view>
		<!-- 结算按钮 -->
		<view>
			<button type="primary" class="acountts-btn" @click="gotoCount">结算({{checkedCount}})</button>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,mapMutations,mapState
	} from 'vuex'
	export default {
		name: "accounts",
		data() {
			return {

			};
		},
		computed: {
			...mapGetters('cart', ['checkedCount', 'total','checkedGoodsAccount']),
			 // addstr 是详细的收货地址
			    ...mapGetters('user', ['address']),
				 // token 是用户登录成功之后的 token 字符串
				    ...mapState('user', ['token']),
			// 2. 是否全选
			isAllCheck() {
				return this.total === this.checkedCount
			},
		},
		methods:{
			...mapMutations('cart',['updateAllGoodsState']),
			changeAllCheck(){
				  // 修改购物车中所有商品的选中状态
				    // !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
				    this.updateAllGoodsState(!this.isAllCheck)
			},
			gotoCount(){
				// 判断是够选择商品
				if(!this.checkedCount){
					return uni.showToast({
						title:'请选择商品',
						duration:1500,
						icon:'none'
					})
				}
				// 判断是否选择地址
				if(!this.address){
					return uni.showToast({
						title:'请选择收货地址',
						duration:1500,
						icon:'none'
					})
				}
				if(!this.token){
					return uni.showToast({
						title:'请先登录',
						duration:1500,
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.accounts-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;

		.acounts-text {
			color: #4aaa5d;
		}

		.acountts-btn {
			height: 50px;
			min-width: 100px;
			border-radius: 0;
		}
	}
</style>
