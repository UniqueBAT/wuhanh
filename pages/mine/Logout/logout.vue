<template>
	<view class="log-out">
		<view class="login-box">
			<navigator class="login-btn flex-center" url="../Login/Login">手机号登陆注册</navigator>
			<view class="text flex-center">登陆注册即代表您同意平台 <navigator url="../respos/respos" class="text-resp">《用户免责协议》</navigator></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.log-out {
		height: 100%;
		background-image: url(../../../static/mine/img_mine_bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;

		.login-box {
			position: absolute;
			bottom: 200upx;
			left: 0;
			right: 0;
			padding: 0 60upx;

			.login-btn {
				height: 100upx;
				background: #80ADED;
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
				border-radius: 4px;
				font-family: PingFangSC-Semibold;
				font-size: 36upx;
				color: #FFFFFF;
			}

			.text {
				padding-top: 40upx;
				font-family: PingFangSC-Regular;
				font-size: 28upx;
				color: #FFFFFF;

				.text-resp {
					text-decoration: underline;
				}
			}
		}
	}
</style>
