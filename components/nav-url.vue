<template>
	<view class="nav-box">
		<navigator :url="url" class="arrow"></navigator>
	</view>
</template>

<script>
	export default {
		name:'nav-url',
		props:{
			url:{
				type: String,
				default: '/pages/index/index'
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	.nav-box{
		height: 80rpx;
		line-height: 80rpx;
		background-color: #FFFFFF;
		margin-bottom: 25rpx;
		.arrow{
			position: fixed;
			left: 28rpx;
			top: 28rpx;
			height: 22rpx;
			width: 22rpx;
			border: 2rpx solid #999;
			transform: rotate(225deg);
			overflow: hidden;
			border-bottom: none;
			border-left: none;
		}
	}

</style>
