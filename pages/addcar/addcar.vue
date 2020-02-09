<template>
	<view>
		<view class="content-box">
			<view class="item">
				<view class="item-title"><text class="subTitle">*</text>运输渠道</view>
				<input placeholder="点击请输入" type="text" v-model="postInfo.carTeamName" />
			</view>

			<view class="item">
				<view class="item-title"><text class="subTitle">*</text>联系人</view>
				<input placeholder="点击请输入" type="text" v-model="postInfo.name" />
			</view>

			<view class="item">
				<view class="item-title"><text class="subTitle">*</text>联系电话</view>
				<input placeholder="点击请输入" maxlength="11" type="number" v-model="postInfo.phone" />
			</view>

			<view class="note" style="margin: 0;">
				<view class="note-title"><text class="subTitle">*</text>配送范围</view>
				<textarea class="note-content" placeholder="请输入详细配送范围" v-model="postInfo.deliveryArea"></textarea>
			</view>

			<view class="note" style="margin: 0;">
				<view class="note-title"><text class="subTitle">*</text>车辆运力</view>
				<textarea class="note-content" placeholder="请输入详细车辆运力" v-model="postInfo.capacity"></textarea>
			</view>

			<view class="item">
				<view class="item-title"><text class="subTitle">*</text>运输服务是否免费</view>
				<view class="select">
					<view :class="['select-item',postInfo.type == 1 ?  'on' : '']" @click="postInfo.type = 1">有偿</view>
					<view :class="['select-item',postInfo.type == 0 ?  'on' : '']" @click="postInfo.type = 0">免费</view>
				</view>
			</view>
			
			<view class="note" style="margin: 0;">
				<view class="note-title"><text class="subTitle">*</text>{{postInfo.type == 0 ? '服务标准' : '收费标准'}}</view>
				<textarea class="note-content" placeholder="请输入服务收费标准" v-model="postInfo.standard"></textarea>
			</view>

			<view class="item">
				<view class="item-title"><text class="subTitle">*</text>配送开始时间</view>
				<timeSelector showType="yearToMinute" @btnConfirm="btnConfirmStart" @btnCancel="btnCancel"><text class="time-arr plh">{{postInfo.deliveryStartTime ? postInfo.deliveryStartTime : '选择开始时间'}}</text></timeSelector>
			</view>

			<view class="item">
				<view class="item-title"><text class="subTitle">*</text>配送结束时间</view>
				<timeSelector showType="yearToMinute" @btnConfirm="btnConfirmEnd" @btnCancel="btnCancel"><text class="time-arr plh">{{postInfo.deliveryEndTime ? postInfo.deliveryEndTime : '选择结束时间'}}</text></timeSelector>
			</view>

			<view class="item carType">
				<view class="item-title"><text class="subTitle">*</text>车辆资源类型</view>
				<picker mode="selector" :range="carTypes" :value="postInfo.category" @change="bindCarTypeChange">
					<view>
						<span class="value">{{carTypes[postInfo.category] || '请选择'}}</span>
					</view>
				</picker>
			</view>

			<view class="note">
				<view class="note-title"><text class="subTitle">*</text>备注信息</view>
				<textarea class="note-content" placeholder="填写其它备注信息" v-model="postInfo.remark"></textarea>
			</view>
		</view>
		<button class="btn" @click="subCarInfo">{{subMsg}}</button>

		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onCityConfirm"></mpvue-city-picker>
	</view>
</template>

<script type="text/javascript">
	var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
	document.write(unescape("%3Cspan id='cnzz_stat_icon_1278590114'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol +
		"v1.cnzz.com/z_stat.php%3Fid%3D1278590114%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
</script>
<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import timeSelector from '@/components/wing-time-selector/wing-time-selector.vue';
	import navUrl from '../../components/nav-url.vue'
	export default {
		data() {
			return {
				tempInfo: {},
				//
				url: '/pages/index/index',
				themeColor: '#007AFF',
				cityPickerValueDefault: [16, 0, 0],
				subMsg: '提交车辆资源名单申请',
				params: null,
				postInfo: {
					"carTeamName": "",
					"city": "",
					"type": 0,
					"category": 0,
					"createTime": 0,
					"deliveryArea": "",
					"capacity": '',
					"deliveryEndTime": "",
					"deliveryStartTime": "",
					"standard": '',
					"id": 0,
					"name": "",
					"phone": "",
					"province": "",
					"remark": "",
					"status": 0,
					"updateTime": 0
				},
				carTypes: [
					'请选择',
					"政府车辆资源",
					"民间志愿者",
					"物流公司",
					"其他"
				]
			}
		},
		components: {
			timeSelector,
			mpvueCityPicker,
			navUrl
		},
		onLoad(opt) {
			let _that = this
			if (opt.id) {
				let params = {
					id: opt.id
				}
				_that.params = params
				_that.subMsg = "确认修改车辆资源信息"
				_that.$api.getCarDetail(params).then(res => {
					if (res.code == 10000) {
						_that.postInfo = res.data
					}
				})
			} else {
				_that.subMsg = "提交车辆资源名单申请"
			}
		},
		methods: {
			bindCarTypeChange(e) {
				this.postInfo.category = e.target.value;
			},
			subCarInfo() {
				let _that = this;
				console.log('addcar.vue ==> subCarInfo | this', this);
				try {
					(Object.entries({
						carTeamName: '请填写渠道名称',
						name: '请填写联系人',
						phone: '请填写联系电话',
						deliveryArea: '请填写配送范围地址信息',
						deliveryStartTime: '请填写配送时间',
						deliveryEndTime: '请填写配送时间',
						category: '请填写车辆资源类型',
						remark: '请填写备注信息'
					})).forEach(([key, value]) => {
						console.log('addcar.vue ==> subCarInfo | key', key);
						switch (key) {
							default:
								// 检测内容本身、去掉首位空格、去掉所有换行后是否为空
								if (!this.postInfo[key]) {
									throw value;
								}
						}
					});
				} catch (e) {
					this.$utils.showModal(e);
					return;
				}
				// if (!_that.postInfo.carTeamName) {
				// 	_that.$utils.showModal("请填写渠道名称")
				// 	return;
				// }
				// if (!_that.postInfo.name) {
				// 	_that.$utils.showModal("请填写联系人")
				// 	return;
				// }
				// if (!_that.postInfo.phone) {
				// 	_that.$utils.showModal("请填写联系电话")
				// 	return;
				// }

				// if (!_that.postInfo.deliveryArea) {
				// 	_that.$utils.showModal("请填写配送范围地址信息")
				// 	return;
				// }

				// if (!_that.postInfo.deliveryStartTime || !_that.postInfo.deliveryEndTime) {
				// 	_that.$utils.showModal("请填写配送时间")
				// 	return;
				// }
				// if (!_that.postInfo.category || !_that.postInfo.category) {
				// 	_that.$utils.showModal("请填车辆资源类型")
				// 	return;
				// }

				// // 可能存在社会团体的特殊电话（993292），暂不校验
				// // if (!_that.postInfo.phone || !_that.$utils.StringUtils.checkStrType(_that.postInfo.phone, 'phone')) {
				// // 	_that.$utils.showModal("请写正确的手机号")
				// // 	return;
				// // }

				if (_that.params && _that.params.id && _that.params.id > 0) {
					_that.$api.putCarDetail(_that.postInfo).then(res => {
						if (res.code == 10000) {
							uni.showModal({
								title: '提交成功',
								content: "您的申请已收到，稍后会进行内容核实，请耐心等候。",
								showCancel: false,
								confirmText: '好的',
								success(res) {
									uni.navigateBack({
										delta: 1,
										animationType: 'pop-out',
										animationDuration: 200
									})
								}
							})

						}
					})
				} else {
					_that.$api.postCarInfo(_that.postInfo).then(res => {
						if (res.code == 10000) {
							uni.showModal({
								title: '提示消息',
								content: "感谢您为抗击肺炎所做贡献！",
								showCancel: false,
								success(res) {
									uni.navigateBack({
										delta: 1,
										animationType: 'pop-out',
										animationDuration: 200
									})
								}
							})

						}
					})
				}
			},
			showMulLinkageThreePickerSend() {
				this.$refs.mpvueCityPicker.show()
			},
			btnConfirmStart(e) {
				this.postInfo.deliveryStartTime = e.key
			},
			btnConfirmEnd(e) {
				this.postInfo.deliveryEndTime = e.key
			},
			onCityConfirm(e) {
				let areaArr = e.label.split('-')
				if (areaArr && areaArr.length) {
					this.postInfo.province = areaArr[0]
					this.postInfo.city = areaArr[1]
					// this.postInfo.area = areaArr[2]
					this.postInfo.deliveryArea = areaArr[2]
				}
			},
			btnCancel(e) {

			}
		}
	}
</script>

<style lang="less">
	.content-box {
		display: flex;
		flex-direction: column;
		padding: 0 20upx;
		background-color: #ffffff;
		padding-bottom: 100upx;

		.item {
			display: flex;
			flex-direction: row;
			height: 90rpx;
			line-height: 90rpx;
			align-items: center;
			border-bottom: 1rpx solid #eeeeee;
			justify-content: space-between;

			input {
				font-size: 28rpx;
				padding-left: 28rpx;
				padding-right: 28rpx;
				height: 90rpx;
				line-height: 90rpx;
				text-align: right;
			}

			.time-arr {
				font-size: 28rpx;
				text-align: right;
				margin-right: 14rpx;
			}

			&.carType {
				.value {
					font-size: 14px;
					margin-right: 6px;
				}
			}
		}

		.item-title {
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			color: #333333;
			letter-spacing: 0;
		}

		.note {
			margin-top: 30rpx;
			margin-bottom: ;
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			color: #333333;
			letter-spacing: 0;
			background: #ffffff;
			box-shadow: inset 0 -1px 0 0 #F2F2F2;

			.note-title {
				margin: 30rpx 0;
			}
			.note-content{
				height: 80px;
				padding-left: 10px;
			}
		}
	}

	.select-time {
		z-index: 10;
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-50%, 0);
		background-color: #ffffff;
		width: 85%;
		height: 360rpx;
		box-sizing: content-box;
		border-radius: 12rpx;
		padding: 30rpx;

		.time-title {
			text-align: center;
			padding-bottom: 25rpx;
			border-bottom: 1rpx solid #eeeeee;
		}

		.content-box {
			display: flex;
			flex-direction: column;
			font-size: 28rpx;
		}

		.box-time {
			display: flex;
			flex-direction: row;
			align-content: space-between;
			justify-content: space-between;
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 1rpx solid #eeeeee;
		}

		.box-btn {
			display: flex;

			view {
				flex: 1;
				text-align: center;
				margin-top: 20rpx;
				height: 70rpx;
				line-height: 70rpx;
				border-left: 1rpx solid #eeeeee;
			}

			view:first-child {
				border-left: none;
			}
		}
	}

	.mask {
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 2;
	}

	.addrr-input {
		height: 98rpx;
		line-height: 98rpx;
		width: 80%;
		text-align: right;
	}

	.btn {
		font-family: PingFangHK-Regular;
		position: fixed;
		width: 100%;
		bottom: 0rpx;
		background: #4b8ae5 !important;
		border-radius: 0 !important;
		font-size: 18px;
		color: #ffffff;
		letter-spacing: 0;
		text-align: center;
	}

	.select {
		width: 70px;
		height: 30px;
		border: 1px solid #4b8ae5;
		border-radius: 6px;
		overflow: hidden;
		color: #80aded;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.select-item {
			flex: 1;
			text-align: center;
			line-height: 30px;
			transition: all 0.3s;
			font-family: PingFangSC-Regular;
			font-size: 14px;
		}
	}

	.on {
		background-color: #4b8ae5;
		color: #fff;
	}
</style>
