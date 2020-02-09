<template>
	<view class="zai-box">
		<image src="../../static/mine/img_center_bg.png" class="zai-logo"></image>
		<!-- 登录表单 -->
		<view class="zai-form" v-if="status === 0">
			<view class="zai-item">
				<text class="zai-lable">手机号码：</text>
				<input class="zai-input" placeholder-class placeholder="请输入手机号码" @input="replacePhone" v-model="phone" />
				<view class="zai-checking" @click="checking" v-if="state===false && isClick == 0">获取验证码</view>
				<view class="zai-checking" @click="checking" v-if="state===false && isClick == 1">再次获取</view>
				<view class="zai-checking zai-time" v-if="state===true">{{ currentTime }}s</view>
			</view>
			<view class="zai-item">
				<text class="zai-lable">验证码：</text>
				<input class="zai-input" placeholder-class placeholder="请输入验证码" @input="showLogin" v-model="code" />
			</view>
			<button class="zai-btn " v-if="isLogin===false">登陆</button>
			<button class="zai-btn login-btn" v-if="isLogin===true" @tap="goSelectType">登陆</button>
			<view class="zai-respos flex-center">
				登陆注册即代表您同意平台 <navigator url="../respos/respos" class="text-resp">《用户免责协议》</navigator>
			</view>
		</view>
		<!-- 未设置状态 -->
		<view class="status-box no-set" v-if="status ===1">
			<view class="no-set-phone"><text>{{ userphone |phoneNumFilter(userphone)}}</text>，您好</view>
			<text class="no-set-select">请选择您的身份</text>
			<text class="no-set-identity" @tap="selectType('N')">您是热心网友，点这里</text>
			<text class="no-set-identity" @tap="selectType('H')">您是医院物资负责人，点这里</text>
			<text class="no-set-identity" @tap="selectType('C')">您是车辆资源负责人，点这里</text>
		</view>
		<!-- 已登录不同身份 -->
		<view class="status-box login-status" v-if="status == 2">
			<view class="top-box"> <text class="top-status">{{ type == "N" ? "热心网友" : ( type == "H" ? "医院物资负责人" : "车辆资源负责人")}}</text></view>
			<view class="login-phone"><text>{{ userphone |phoneNumFilter(userphone)}}</text>，您好</view>
			<view class="net-friend" v-if="status == 2 && type == 'N'">
				<text class="more-fun">感谢您对平台的关注和支持，更多功能正在加紧开发中</text>
				<button class="index-btn flex-center" url="../index/index" @tap="goIndex">去首页</button>
			</view>
			<view class="hospital" v-if="status == 2 && type == 'H'">
				<view class="status-title" @tap="goAdd('H')">
					<text>平台没有我医院物资救助信息，我来添加</text>
					<image src="../../static/mine/icon_right.png" class="img-right"></image>
				</view>
				<view class="status-info">
					<view class="info-title">平台已有我医院物资救助信息，我来完善信息</view>
					<view class="info-select">
						<text class="info-select-lable">选择医院：</text>
						<input class="info-input" placeholder="请输入医院名称进行搜索" />
					</view>
					<button class="to-over" @tap="updateHospital">去完善</button>
				</view>
			</view>
			<view class="car" v-if="status == 2 && type == 'C'">
				<view class="status-title" @tap="goAdd('C')">
					<text>平台没有我车辆资源信息，我来添加</text>
					<image src="../../static/mine/icon_right.png" class="img-right"></image>
				</view>
				<view class="status-info">
					<view class="info-title">平台有我车辆资源助信息，我来完善信息</view>
					<view class="info-select">
						<text class="info-select-lable">选择车辆：</text>
						<input class="info-input" placeholder="请输入车辆资源名称搜索" />
					</view>
					<button class="to-over">去完善</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userphone: "18827145997",
				state: false, //是否开启倒计时
				totalTime: 60, //总时间，单位秒
				recordingTime: 0, //记录时间变量
				currentTime: 0, //显示时间变量
				isClick: 0, //是否点击获取过code
				phone: "",
				code: "",
				isLogin: false, //登录高亮显示
				status: 0,
				type: 'N', //身份类型
				isGetCode: false, //能否获得code
			}
		},
		onLoad() {

		},
		methods: {
			checking() {
				if (this.isGetCode == true) {
					//把显示时间设为总时间
					this.currentTime = this.totalTime;
					//开始倒计时
					this.state = true;
					this.isClick = 1;
					//执行倒计时
					this.checkingTime();
				} else {
					uni.showModal({
						title: '提示',
						content: '手机号格式不正确！',
						showCancel: false,
						success: function(res) {}
					});
				}

			},
			checkingTime() {
				let that = this;
				//判断是否开启
				if (this.state) {
					//判断显示时间是否已到0，判断记录时间是否已到总时间
					if (this.currentTime > 0 && this.recordingTime <= this.totalTime) {
						//记录时间增加 1
						this.recordingTime = this.recordingTime + 1;
						//显示时间，用总时间 - 记录时间
						this.currentTime = this.totalTime - this.recordingTime;
						//1秒钟后，再次执行本方法
						setTimeout(() => {
							//定时器内，this指向外部，找不到vue的方法，所以，需要用that变量。
							that.checkingTime();
						}, 1000)
					} else {
						//时间已完成，还原相关变量
						this.state = false; //关闭倒计时
						this.recordingTime = 0; //记录时间为0
						this.currentTime = this.totalTime; //显示时间为总时间
					}
				} else {
					//倒计时未开启，初始化默认变量
					this.state = false;
					this.recordingTime = 0;
					this.currentTime = this.totalTime;
				}
			},
			// 手机号
			replacePhone(event) {
				var value = event.target.value;
				console.log(value, 'value');
				this.phone = value;
				if (value && value.length == 11) {
					if (!/^1(3|4|5|6|7|8)\d{9}$/.test(value)) {
						uni.showModal({
							title: '提示',
							content: '手机号格式不正确！',
							showCancel: false,
							success: function(res) {}
						});
						return false;
					} else {
						this.isGetCode = true;
						if (this.code) {
							this.isLogin = true;
						}
					}
				} else {
					this.isGetCode = false;
					this.isLogin = false;
					if (value && value.length >= 11) {
						uni.showModal({
							title: '提示',
							content: '手机号不是11位数！',
							showCancel: false,
							success: function(res) {}
						});
						return false;
					}

				}
			},
			// 登录显示状态
			showLogin(event) {
				var value = event.target.value;
				console.log("111", value);
				this.code = value;
				if (this.isGetCode && this.code) {
					this.isLogin = true;
				} else {
					this.isLogin = false;
				}
			},
			// 选择身份
			selectType(type) {
				console.log(type, 'type');
				this.status = 2;
				this.type = type;
			},
			// 跳转首页
			goIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			//修改医院
			updateHospital() {
				uni.navigateTo({
					url: '../mine/hospital/update'
				});
			},
			// // 选择身份状态{
			goSelectType() {
				console.log("989")
				this.status = 1;
			},
			// 跳转添加页面
			goAdd(value) {
				console.log(value, 'value');
				uni.navigateTo({
					url: value == "H" ? "../addhospital/addhospital" : "../addcar/addcar"
				});
			}

		},
		filters: {
			phoneNumFilter(phone) {
				let phoneArr = [...phone];
				var value = "";
				phoneArr.map((res, index) => {
					if (index > 2 && index < 7) {
						value += '*';
					} else {
						value += res;
					}
				});
				return value;
			}
		}
	}
</script>

<style lang="less" scoped>
	.zai-box {
		position: relative;
	}

	.zai-logo {
		width: 100%;
	}

	.zai-title {
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}

	.zai-form {
		position: fixed;
		top: 200px;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		border-radius: 20px 20px 0 0;
		padding: 70px 56upx 0;
	}

	.zai-item {
		position: relative;
		width: 100%;
		height: 50px;
		margin-bottom: 10px;
		background: #FFFFFF;
		box-shadow: inset 0 -1px 0 0 #EDEDED;

		.zai-lable {
			position: absolute;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #666666;
			letter-spacing: 0;
			text-align: center;
			width: 76px;
			line-height: 50px;
		}

		.zai-input {
			font-size: 14px;
			height: 100%;
			padding-left: 76px;
		}
	}


	.input-placeholder,
	// .zai-input {
	// 	color: #94afce;
	// }

	// 登录按钮 状态
	.zai-btn {
		width: 100%;
		height: 50px;
		background: #D1D1D1;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
		border-radius: 4px;
		font-family: PingFangSC-Semibold;
		font-size: 18px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		margin-top: 50px;
	}

	.zai-btn:after {
		border: 0;
	}

	.login-btn {
		background: #80ADED;
	}

	/*验证码输入框*/
	.zai-input-btn {
		position: relative;
	}

	.zai-input-btn .zai-input {
		padding-right: 260upx;
	}

	.zai-checking {
		position: absolute;
		right: 0;
		bottom: 7px;
		background: #FFFFFF;
		border: 1px solid #80ADED;
		border-radius: 4px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #80ADED;
		letter-spacing: 0;
		padding: 8px 0px;
		width: 103px;
		text-align: center;
	}

	.zai-checking.zai-time {
		background: #F4F4F4;
		border-radius: 4px;
		border: none;
	}

	/*按钮点击效果*/
	.zai-btn.button-hover {
		transform: translate(1upx, 1upx);
	}

	/* 用户免责 */
	.zai-respos {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #666666;
		letter-spacing: 0;
		text-align: center;
		margin-top: 20px;

		.text-resp {
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #80ADED;
			letter-spacing: 0;
			text-align: center;
			line-height: 20px;
			text-decoration: underline;
		}
	}


	// 不同状态
	.status-box {
		position: fixed;
		top: 200px;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		border-radius: 20px 20px 0 0;
		padding: 0px 56upx 0;
	}

	.no-set {
		padding-top: 30px;

		.no-set-phone {
			font-family: PingFangSC-Semibold;
			font-size: 20px;
			font-weight: 600;
			color: #333333;
			letter-spacing: 0;
			text-align: center;
			margin-bottom: 10px;
		}

		.no-set-select {
			width: 100%;
			display: inline-block;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			color: #333333;
			letter-spacing: 0;
			text-align: center;
			margin-bottom: 30px;
		}

		.no-set-identity {
			display: inline-block;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background: #80ADED;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
			border-radius: 4px;
			margin-bottom: 20px;
			text-align: center;
			font-family: PingFangSC-Semibold;
			font-size: 18px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
		}
	}

	.login-status {
		.top-box {
			display: flex;
			justify-content: center;

			.top-status {
				width: 130px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background: #6236FF;
				border-radius: 0px 0px 10px 10px;
				font-family: PingFangSC-Semibold;
				font-size: 16px;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
				margin-bottom: 20px;
			}
		}

		.login-phone {
			font-family: PingFangSC-Semibold;
			font-size: 20px;
			color: #333333;
			letter-spacing: 0;
			text-align: center;
			margin-bottom: 35px;
		}

		.more-fun {
			display: inline-block;
			margin: 0 65px;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			line-height: 20px;
			color: #333333;
			letter-spacing: 0;
			text-align: center;
			margin-bottom: 78px;
		}

		.index-btn {
			width: 100%;
			height: 50px;
			line-height: 50px;
			background: #80ADED;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
			border-radius: 4px;
			font-family: PingFangSC-Semibold;
			font-size: 18px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
		}

		.status-title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background: #80ADED;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
			border-radius: 4px;
			margin-bottom: 20px;
			padding: 0 10px;

			text {
				font-family: PingFangSC-Semibold;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: 0;
			}

			.img-right {
				width: 9px;
				height: 16px;
			}
		}

		.status-info {
			background: #80ADED;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
			border-radius: 4px;
			padding: 20px 21px 10px;

			.info-title {
				font-family: PingFangSC-Semibold;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
				margin-bottom: 10px;
			}

			.info-select {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 10px;

				.info-select-lable {
					width: 76px;
					font-family: PingFangSC-Semibold;
					font-size: 14px;
					color: #FFFFFF;
					letter-spacing: 0;
					text-align: center;
				}

				.info-input {
					flex: 1;
					background: #6A94CF;
					border-radius: 4px;
					height: 50px;
					line-height: 50px;
					padding-left: 10px;
				}
			}

			.to-over {
				height: 40px;
				text-align: center;
				line-height: 40px;
				background: #FFFFFF;
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
				border-radius: 4px;
				font-family: PingFangSC-Semibold;
				font-size: 16px;
				color: #9BC4FF;
				letter-spacing: 0;
				text-align: center;
			}
		}
	}
</style>
