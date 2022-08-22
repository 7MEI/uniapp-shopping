<template>
	<view>
		<view class="search-box">
			<to-search @click="gotoSearch"></to-search>
		</view>
		<view class="scroll-view-container">
			<scroll-view scroll-y="true" class="left-scroll" style="{height: wh +'px';}">
				<block v-for="(item,i) in cateList" :key="i">
					<view class="[left-scrool-item, i=== active? 'active' :'']" @click="activeChange(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右边区域 -->
			<scroll-view scroll-y="true" class="right-scrool" style="{height: wh + 'px';}" :scroll-top="scrollTop">
				<view v-for="(item2,i2) in cateList2" :key="i2">
					<view class="right-title-item">
						/ {{item2.cat_name}} /
					</view>
					<!-- 三级分类 -->
					<view class="right-list">
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<!-- 图片 -->
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
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
				// 可用高度
				wh: 0,
				cateList: [],
				cateList2: [],
				// 当前选中项的索引，默认让第一项被选中
				active: 0,
				scrollTop:0
			};
		},
		onLoad() {
			// 获取系统信息
			const sysInfo = uni.getSystemInfoSync()
			// 动态赋值可用高度
			this.wh = sysInfo.windowHeight - 50
			// 2.获取分类数据
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: '获取数据失败',
						duration: 1500,
						icon: 'none'
					})
				}
				this.cateList = res.message
				// 二级分类赋值
				this.cateList2 = this.cateList[0].children
			},
			// 索引改变
			activeChange(i) {
				this.active = i
				// 一级索引改变之后，重新给cateList2赋值
				this.cateList2 = this.cateList[i].children
				// 修改scrollTop的值
				this.scrollTop = this.scrollTop === 0 ? 1 : 0

			},
			gotoGoodsList(item3){
				uni.navigateTo({
				    url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				  })
			},
			// 跳转到search
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
	.scroll-view-container {
		display: flex;

		.left-scroll {
			width: 120px;

			.left-scrool-item {
				text-align: center;
				line-height: 60px;
				background-color: #F7F7F7;
				font-size: 14px;

				&.active {
					background-color: #E6E8FA;
				}
			}
		}

		.right-scrool {

			.right-title-item {
				line-height: 60px;
				font-size: 14px;
				text-align: center;
				font-weight: bold;
			}

			.right-list {
				display: flex;
				flex-wrap: wrap;

				.cate-lv3-item {
					width: 33.33%;
					margin-bottom: 10px;
					display: flex;
					flex-direction: column;
					align-items: center;
					
					    image {
					      width: 60px;
					      height: 60px;
					    }
					
					    text {
					      font-size: 12px;
					    }
				}
			}
		}
	}
</style>
