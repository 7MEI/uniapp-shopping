<template>
	<view>
		<view class="search-box">
			<to-search @click="gotoSearch"></to-search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key='i' @click="navToCate(item)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 楼层分类 -->
		<view class="floor-list">
			<view class="floor-title" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" mode=""></image>
				<!-- 楼层图片 -->
				<view class="floor-img">
					<navigator class="floor-left-img" :url='item.product_list[0].url'>
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="floor-right-img">
						<navigator class="floor-right-item" v-for="(item2,i2) in item.product_list" :key="i2"
							v-if="i2 !== 0"
							:url='item2.url'>
							<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 导入自己封装的 mixin 模块
	import badgeMix from '../../mixin/tabbar-badge.js'
	export default {
		 // 将 badgeMix 混入到当前的页面中进行使用
		  mixins: [badgeMix],
		data() {
			return {
				// 轮播图
				swiperList: [],
				// 1.分类导航
				navList: [],
				// 1楼层数据
				floorList: [],
			};
		},
		onLoad() {
			// 2.轮播图
			this.getswiperList()
			// 2.分类导航
			this.getNavList()
			// 2楼层数据
			this.getFloorList()
		},
		methods: {
			// 3.轮播图
			async getswiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// 3.2请求失败
				// console.log('ressss',res)
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: '请求数据失败',
						duration: 1500,
						icon: 'none'
					})
				}
				// 3.3	请求成功
				this.swiperList = res.message
			},
			// 3分类导航
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				console.log(res)
				// 3.1请求失败
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: '请求数据失败',
						duration: 1500,
						icon: 'none'
					})
				}
				// // 3.3	请求成功
				this.navList = res.message
			},
			//nav跳转事件
			navToCate(item) {
				if (item.name == '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 3楼层数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: '获取数据失败',
						duration: 1500,
						icon: 'none'
					})
				}
				res.message.forEach(floor =>{
					floor.product_list.forEach(pro =>{
						pro.url='/subpkg/goods_list/goods_list?' +pro.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
				console.log('fffff',this.floorList)
			},
			// 跳转到Search
			gotoSearch(){
				uni.navigateTo({
					 url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		// 定位为吸顶
		position: sticky;
		top:0;
		z-index: 999;
	}
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			height: 100%;
			width: 100%
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-between;
		margin: 0 22rpx;

		.nav-item {
			image {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}

	.floor-list {
		.floor-title {
			image {
				height: 60rpx;
				width: 100%;
			}
		}
		.floor-img{
			display: flex;
			margin: 12rpx 0;
			padding-left: 10rpx;
			.floor-right-img{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
			}
		}
	}
</style>
