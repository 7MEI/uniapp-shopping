<template>
	<view>
		<view class="search-container">
			<view class="search-item" @click="searchHandle">
				<uni-icons type="search" size="17"></uni-icons>
				<text class="search-text">搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "to-search",
		data() {
			return {

			};
		},
		methods: {
			searchHandle() {
				// 触发外界通过 @click 绑定的 click 事件处理函数
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		height: 40px;
		// 纵向居中
		align-items: center;
		// 横向居中
		padding: 0 10px;
		display: flex;
		background-color: #4aaa5d;

		.search-item {
			width: 100%;
			height: 30px;
			border-radius: 15px;
			display: flex;
			// 横向居中
			justify-content: center;
			// 纵向居中
			align-items: center;
			background-color: #FFFFFF;

			.search-text {
				font-size: 15px;
			}
		}
	}
</style>
