<template>
	<view class="info">
		<view class="info-content">
			<view class="main-box">
				<view style="display: flex;padding-bottom: 10px;justify-content: space-between;width: 100%;">
					<view>
						<button type="default" v-if="detail.status === '1'" class="btn-checked">信息已核实</button>
						<button type="default" v-if="detail.status === '0'" class="checking">信息核实中</button>
						<button type="default" v-if="detail.status === '-1'" class="reject-type">核实未通过</button>
					</view>
					<view class="right-top">
						<view>物资紧急度：</view>
						<image v-for="(item,index) in (detail.critical ? detail.critical : 1)" :key="index" class="right-fire" src="../../../static/icon_fire.svg" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="reject-box" v-if="detail.status === '-1'">
				<view class="title">信息核实未通过原因：</view>
				<view class="title">{{detail.rejectReason || '上传的证明图片不符合要求，请参考样例上传。'}}</view>
				<view class="reject-btn" @tap="editHospital">点这里修改申请内容</view>
			</view>
			<view class="main-box">
				<text class="main-text">{{detail.company}}</text>
			</view>
			<view class="info-box">
				<view>
					<text class="main-time">{{detail.createTime}}</text>
					<text class="come-text">{{detail.viewTimes}} 人浏览</text>
				</view>
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
		<view class="title-box">
			<view class="title">医院物资紧急程度数据参考</view>
			<view class="content">
				<view class="cont-item">
					<view class="item">医院级别：{{detail.level || '0'}}甲</view>
					<view class="item">床位数：{{detail.amount || '0'}}床</view>
				</view>
				<view class="cont-item">
					<view class="item">医护人员数：{{detail.hosAmount || '0'}}人</view>
					<view class="item">辖区覆盖人口：{{detail.totalAmount || '0'}}万人</view>
				</view>
				<view class="cont-item">
					<view class="item">辖区内医院数：{{detail.totalHos || '0'}}家</view>
				</view>
				<view class="cont-item">
					<view class="item">剩余物资可用天数：{{detail.remainDays || 0}}天【{{detail.statisDate || '2020-01-29'}}统计】</view>
				</view>
			</view>
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
			},
			editHospital() {
				uni.navigateTo({
					url: '/pages/addhospital/addhospital?id=' + this.detail.id
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
					margin-right: 20px;
					width: 188upx;
					height: 60upx;
					padding: 0;
					line-height: 60upx;
					background: #FA6400;
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
				padding-right: 10px;
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
					font-family: PingFangSC-Semibold;
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

	.right-top {
		display: flex;
		align-items: center;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #666666;
		padding-right: 20upx;

		.right-fire {
			width: 24upx;
			height: 30upx;
		}
	}

	.title-box {
		background-color: #fff;
		margin-top: 10px;
		padding: 0 10px 10px;

		.title {
			line-height: 50px;
			font-size: 16px;
			color: #4B8AE5;
			border-bottom: 1px solid #F2F2F2;
			position: relative;

			&:after {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				width: 190px;
				height: 3px;
				background: #80ADED;
				border-radius: 1px;
			}
		}

		.content {
			.cont-item {
				display: flex;
				align-items: center;
				height: 36px;
				box-shadow: inset 0 -1px 0 0 #EDEDED;
				font-family: PingFangSC-Semibold;
				font-size: 12px;
				color: #333333;

				.item {
					flex: 1;
				}
			}
		}
	}

	.reject-type {
		background: #FF4B4B;
		border-radius: 0 0 4px 4px;
	}

	.checking {
		background: #999999;
		border-radius: 0 0 4px 4px;
		font-family: PingFangSC-Semibold;
		font-size: 12px;
		color: #FFFFFF;
	}

	.reject-box {
		background: #FFEDED;
		border: 1px solid #FFC1C1;
		border-radius: 4px;
		padding: 20upx;

		.title {
			font-family: PingFangSC-Semibold;
			font-size: 14px;
			color: #FF4B4B;
			line-height: 20px;
			padding-bottom: 20upx;
		}

		.reject-btn {
			padding: 20upx 0;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #FF4B4B;
			border-radius: 2px;
			font-family: PingFangSC-Semibold;
			font-size: 14px;
			color: #FFFFFF;
		}
	}
</style>
