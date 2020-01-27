<template>
	<view class="info">
		<view class="info-title" @tap="goBack">
			<svg width="10px" height="18px" viewBox="0 0 10 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<!-- Generator: Sketch 59 (86127) - https://sketch.com -->
				<title>返回</title>
				<desc>Created with Sketch.</desc>
				<g id="在线补充" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<g id="在线补充医院名单" transform="translate(-16.000000, -107.000000)" fill="#333333">
						<g id="顶部信息栏" transform="translate(0.000000, 88.000000)">
							<path d="M26,27.9703032 L17.3690593,36.7610719 C17.0543445,37.0817458 16.5454834,37.0793158 16.2331535,36.7556718 C15.9208236,36.4310378 15.9229435,35.9107414 16.2378349,35.5886274 L23.7139675,27.9745332 L16.2396015,20.4131798 C15.9233851,20.0921458 15.9196753,19.5716693 16.231387,19.2461353 C16.5392121,18.9240213 17.0448933,18.9171813 17.3610214,19.2308351 C17.3631413,19.2329052 17.3652612,19.2349752 17.3672927,19.2371352 L26,27.9703032 Z"
							 id="返回" transform="translate(21.000000, 28.000000) scale(-1, 1) translate(-21.000000, -28.000000) "></path>
						</g>
					</g>
				</g>
			</svg>
			<text class="title-item"> 返回列表</text>
		</view>
		<view class="info-content">
			<view class="main-box">
				<text class="main-text">{{detail.company}}</text>
				<view>
					<button type="default" v-if="detail.needToPay" class="btn-canpay">接受付费购买</button>
					<button type="default" v-if="detail.status === '0'" class="btn-checked">信息已核实</button>
					<button type="default" v-else class="btn-nocheck">信息未核实</button>
				</view>
			</view>
			<view class="info-box">
				<text class="main-time">{{detail.createTime}}</text>
				<view class="touch-box" v-show="detail.sourceUrl">
					<text class="come-text" @tap="toOut(detail.sourceUrl)">来源：{{detail.source}}</text>
					<svg width="10px" height="18px" viewBox="0 0 14 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<title>返回</title>
						<desc>Created with Sketch.</desc>
						<g stroke="none" stroke-width="1" fill="#999999" fill-rule="evenodd" transform="translate(30, 40)rotate(180)">
							<path d="M26,27.9703032 L17.3690593,36.7610719 C17.0543445,37.0817458 16.5454834,37.0793158 16.2331535,36.7556718 C15.9208236,36.4310378 15.9229435,35.9107414 16.2378349,35.5886274 L23.7139675,27.9745332 L16.2396015,20.4131798 C15.9233851,20.0921458 15.9196753,19.5716693 16.231387,19.2461353 C16.5392121,18.9240213 17.0448933,18.9171813 17.3610214,19.2308351 C17.3631413,19.2329052 17.3652612,19.2349752 17.3672927,19.2371352 L26,27.9703032 Z"
							 id="返回" transform="translate(21.000000, 28.000000) scale(-1, 1) translate(-21.000000, -28.000000) "></path>
						</g>
					</svg>
				</view>
			</view>
		</view>
		<view class="info-from">
			<text>医院地址：{{detail.province + detail.city + detail.area + detail.street}}</text>
			<view class="info-person" v-for="(item,index) in detail.contacts" :key="index">
				<view>
					<text>联系人：</text>
					<text>{{item.name}}</text>
				</view>
				<view>
					<button type="default" size="mini" @tap="callSomeOne(item.phone)">联系医院</button>
				</view>
			</view>
		</view>
		<view class="item-redCross" v-if="detail.type !== '0'">
			<button type="primary" @tap="callSomeOne('027-87327533')">联系红十字会</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			detail: {
				type: Object
			}
		},
		data() {
			return {

			}
		},
		methods: {
			callSomeOne(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			toOut(url) {
				if (url) window.location.replace(url);
			},
			goBack() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.info {
		background-color: #EDEDED;
		margin-bottom: 20upx;

		.info-title {
			height: 100upx;
			padding: 0 20upx;
			margin-bottom: 20upx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;

			.title-item {
				line-height: 100upx;
				padding: 16upx 0;
				margin-left: 20upx;
				font-size: 32upx;
				// border-bottom: 4upx solid var(--mainColor);
			}
		}

		.info-content {
			font-family: PingFangSC-Semibold;
			padding: 0 20upx 20upx 20upx;
			background-color: #FFFFFF;

			.main-box {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				
				.btn-canpay {
					width: 188upx;
					height: 60upx;
					padding: 0;
					line-height: 60upx;
					background: #FFC936;
					border-radius: 0 0 4px 4px;
					font-size: 24upx;
					color: #FFFFFF;
				}

				.btn-checked {
					width: 188upx;
					height: 60upx;
					padding: 0;
					line-height: 60upx;
					background: #7fae00;
					border-radius: 0 0 4px 4px;
					font-size: 24upx;
					color: #FFFFFF;
				}

				.btn-nocheck {
					padding: 0;
					width: 188upx;
					height: 60upx;
					line-height: 60upx;
					background: #999999;
					border-radius: 0 0 4px 4px;
					font-size: 24upx;
					color: #FFFFFF;
				}
			}

			.main-text {
				font-size: 32upx;
				color: #333333;
				line-height: 50upx;
				display: block;
			}

			.main-time {
				font-size: 28upx;
				color: #333333;
			}

			.info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 14upx;

				.come-text {
					font-size: 24upx;
					color: #999999;
					margin-right: 10upx;
				}

				.touch-box {
					display: flex;
					align-items: center;
				}
			}
		}

		.info-from {
			border-top: 1upx solid #ededed;
			font-family: PingFangSC-Semibold;
			font-size: 28upx;
			color: #333333;
			padding: 28upx 20upx 24upx 20upx;
			background-color: #FFFFFF;

			.info-person {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 14upx;

				button {
					background: #FFFFFF;
					border: 1px solid #80ADED;
					border-radius: 50upx;
					font-family: PingFangSC-Semibold;
					font-size: 28upx;
					color: #80ADED;
				}
			}
		}

		.item-redCross {
			padding: 20upx;
			background-color: #FFFFFF;

			button {
				background-color: #80ADED;
				height: 74upx;
				line-height: 74upx;
				border-radius: 4upx;
			}
		}
	}
</style>
