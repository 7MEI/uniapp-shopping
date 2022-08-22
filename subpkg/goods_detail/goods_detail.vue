<template>
	<view class="detail-container">
		<!-- 轮播图 circular衔接播放-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goodsDetail.pics" :key="i">
				<image :src="item.pics_big" mode="" @click="preImage(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="detail_info">
			<view class="detail_price">
				￥{{goodsDetail.goods_price}}
			</view>
			<view class="detail_descri">
				<view class="">
					{{goodsDetail.goods_name}}
				</view>
				<view class="shoucang">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
		</view>
		<!-- 运费 -->
		<view class="yf">
			<text>快递：免运费</text>
		</view>
		<!--  -->
		<rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
		<!-- 按钮组 -->
		<view class="uni-nav">
			<!-- fill 控制右侧按钮的样式 -->
			<!-- options 左侧按钮的配置项 -->
			<!-- buttonGroup 右侧按钮的配置项 -->
			<!-- click 左侧按钮的点击事件处理函数 -->
			<!-- buttonClick 右侧按钮的点击事件处理函数 -->
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	// 按需导入 mapMutations 这个辅助方法
	import {mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				goodsDetail: {},
				// 左侧按钮组的配置对象
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: ''
				}],
				// 右侧按钮组的配置对象
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
		},
		computed:{
			// 把 cart 模块中名称为 total 的 getter 映射到当前页面中使用
			// ...mapGetters('cart',['total'])
			 ...mapGetters('cart', ['total']),
		},
		 watch: {
		    // 1. 监听 total 值的变化，通过第一个形参得到变化后的新值
		    total:{
				// handler 属性用来定义侦听器的 function 处理函数
				handler(newVal){
					// 2. 通过数组的 find() 方法，找到购物车按钮的配置对象
					const findResult = this.options.find((x) => x.text === '购物车')		
					if (findResult) {
					  // 3. 动态为购物车按钮的 info 属性赋值
					  findResult.info = newVal
					}
				},
		       // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
			   immediate:true
		    },
		  },
		// watch:{
		// 	 // 1. 监听 total 值的变化，通过第一个形参得到变化后的新值
		// 	total(newVal){
		// 		console.log('走到这')
		// 		  // 2. 通过数组的 find() 方法，找到购物车按钮的配置对象
		// 		const resule = this.options.find((x) =>{
		// 			return x.text === '购物车'
		// 		})
		// 		console.log('eee',resule)
		// 		if(resule){
		// 			console.log('eee',resule)
		// 		}
		// 	}
		// },
		methods: {
			// 把 cart 模块中的 addToCart 方法映射到当前页面使用
			...mapMutations('cart', ['addToCart']),
			// 
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: '获取数据失败',
						duration: 1500,
						icon: 'none'
					})
				}
				// 解决图片空隙问题和i图片问题os无法显示webp
				// res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/webp/g, 'jpg')
				this.goodsDetail = res.message
				// console.log('dddd', this.goodsDetail)
			},
			// 预览轮播图
			preImage(i) {
				// 调用 uni.previewImage() 方法预览图片
				uni.previewImage({
					// 预览时，默认显示图片的索
					current: i,
					// 所有图片 url 地址的数组
					urls: this.goodsDetail.pics.map(x => x.pics_big)
				})
			},
			// 购物车按钮
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			// 右侧按钮的点击事件处理函数
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					// 2. 组织一个商品的信息对象
					const goods = {
						goods_id: this.goodsDetail.goods_id,
						goods_name: this.goodsDetail.goods_name,
						goods_price: this.goodsDetail.goods_price, // 商品的价格
						goods_count: 1, // 商品的数量
						goods_small_logo: this.goodsDetail.goods_small_logo, // 商品的图片
						goods_state: true // 商品的勾选状态
					}

					// 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.detail_info {
		padding-bottom: 50px;

		.detail_price {
			font-size: 18px;
			color: #aa5500;
			margin-top: 10PX;
		}

		.detail_descri {
			font-size: 17px;
			display: flex;
			vertical-align: top;
			justify-content: space-between;
			padding: 10px 10px;

			.shoucang {
				width: 120px;
				padding-top: 0;
				margin-top: 0px;
				display: flex;
				flex-direction: column;
				// 水平居中
				justify-content: center;
				// 垂直居中
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray
			}
		}
	}

	.yf {
		font-size: 14px;
		color: gray;
		margin-left: 10px
	}

	.uni-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
