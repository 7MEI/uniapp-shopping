<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#4aaa5d" v-if="showRadio" @click="clickHandle"></radio>
			<image :src="goods.goods_small_logo || Pic" class="goods-pic"></image>
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{goods.goods_price}}</view>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNumberBox" @change="numHandle"></uni-number-box>
					
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations} from 'vuex'
	export default {
		name: "goods",
		// 定义 props 属性，用来接收外界传递到当前组件的数据
		props: {
			// 商品的信息对象
			goods: {
				type: Object,
				defaul: {},
			},
			// 是否展示radio
			showRadio: {
				type: Boolean,
				// 外界没有showRadio的值，默认不展示
				default: false
			},
			// 是否展示numberbox
			showNumberBox: {
				type: Boolean,
				// 外界没有showRadio的值，默认不展示
				default: false
			}
		},
		data() {
			return {
				// 默认的空图片
				Pic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		methods: {
			
			clickHandle() {
				// 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
				// 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
				this.$emit('radio-change',{
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			numHandle(val){
				this.$emit('number-change',{
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: center;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}
			.goods-info-box{
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				.goods-price {
					font-size: 16px;
					color: #c00000;
				}
			}
			
		}
	}
</style>
