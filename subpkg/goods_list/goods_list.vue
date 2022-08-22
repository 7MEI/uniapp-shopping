<template>
	<view>
		<view class="goodslist-container">
			<view v-for="(item,i) in goodsList" :key="i" @click="toDetail(item)">
				<view class="goodslist-item">
					<view class="list-left">
						<image :src="item.goods_small_logo || Pic" mode=""></image>
					</view>
					<view class="right-list">
						<view class="right-name">{{item.goods_name}}</view>
						<view class="right-price">￥{{item.goods_price | tofixed}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键字
					query: '',
					cid: '',
					// 页码值
					pageNum: 1,
					// 每页显示多少条数据
					pagesize: 10

				},
				goodsList: [],
				total: 0,
				// 默认空照片
				Pic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				// 是否正在请求数据
				isLoading:false
			};
		},
		onLoad(option) {
			// 将携带的参数存到queryObject中
			this.queryObj.cid = option.cid || ''
			this.queryObj.query = option.query || ''
			// 2获取商品列表
			this.getGoodsList()
		},
		filters:{
			// 把数字处理为带两位小数的数字
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods: {
			// 获取商品列表
			async getGoodsList(cb) {
				// 打开节流阀
				this.isLoading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				// 关闭节流阀
				this.isLoading = false
				// 只要数据请求完毕，就立即按需调用 cb 回调函数
				  cb && cb()
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: '获取数据失败',
						duration: 1500,
						icon: 'none'
					})
				}
				// 新旧数据拼接
				this.goodsList = [...this.goodsList,...res.message.goods ]
				this.total = res.message.total
			},
			// 跳转详情
			toDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id 
				})
			}
		},
		// 上拉触底事件
		onReachBottom() {
			// 判断是否还有下一页数据
			if(this.queryObj.pageNum * this.queryObj.pagesize >=this.total){
				return uni.showToast({
					title:'数据加载完毕',
					duration:1500,
					icon:'none'
				})
			}
			 // 判断是否正在请求其它数据，如果是，则不发起额外的请求
			  if (this.isloading) return
			// 让页码值增1
			this.queryObj.pageNum +=1
			// 重新获取列表数据
			this.getGoodsList()
		},
		enablePullDownRefresh(){
			// 1. 重置关键数据
			  this.queryObj.pageNum = 1
			  this.total = 0
			  this.isLoading = false
			  this.goodsList = []
			
			  // 2. 重新发起请求
			  this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	.goodslist-item {
		display: flex;
		padding: 10px 5px;
		.list-left {
			image {
				height: 100px;
				width: 100px;
				display: block;
			}
		}

		.right-list {
			display: flex;
			//上下对齐
			flex-direction: column;
			justify-content: space-between;
			margin-left: 5px;
			.right-name {
				font-size: 15px;
			}
			.right-price{
				font-size: 13px;
				color: #aa0000;
			}
		}

	}
</style>
