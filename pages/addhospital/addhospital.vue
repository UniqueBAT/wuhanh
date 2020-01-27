<template>
	<view>
		<navUrl :url="url"></navUrl>
		<view class="hospital-area">
			<view class="area_1">
				<div class="company">
					<div class="label">医院名称:</div>
					<textarea v-model="formData.company" placeholder="点击输入" />
					</div>
				<div>
					<div class="label">是否接受物资付费购买：</div>
					<div :class="`select ${formData.type ? 'on' : 'off'}`">
						<div @click="formData.type = 1">是</div>
						<div @click="formData.type = 0">否</div>
					</div>
				</div>
				<div>
					<div class="label">联系人：</div>
					<input type="text" placeholder="点击输入"  v-model="formData.contact.name">
				</div>
				<div>
					<div class="label">联系电话：</div>
					<input type="number" placeholder="点击输入"  v-model="formData.contact.phone">
				</div>
				<div>
					<div class="label">所在区域：</div>
					<div @click="showSelectCityFlag = true">
						{{formData.province ? formData.province + formData.city + formData.area + formData.deliveryArea : '省/市/区'  }}
					</div>
				</div>
				<div class="street">
					<div class="label">医院地址：</div>
					<textarea value="" placeholder="点击输入"  v-model="formData.street"/>
				</div>
			</view>
			<view class="area_2">
				<div class="title">所需物资数量</div>
				<template>
					<div v-for="(item, index) in formData.details" @click="chooseNum(item, index)">
						<div class="label">{{item.name}}</div>
						<div class="show">
							<span>{{checkItem(item)}}</span>
							<span class="icon"></span>
						</div>
					</div>
				</template>
			</view>
			<view class="area_3">
				<div class="title">快递对接信息</div>
				<div>
					<div class="label">快递地址：</div>
					<input type="text" placeholder="点击输入" v-model="formData.receiptInfo.street">
				</div>
				<div>
					<div class="label">收件人：</div>
					<input type="text" placeholder="点击输入" v-model="formData.receiptInfo.name">
				</div>
				<div>
					<div class="label">联系电话：</div>
					<input type="number" placeholder="点击输入" v-model="formData.receiptInfo.phone">
				</div>
			</view>
			<view class="area_4">
				<div class="title">物资对接信息</div>
				<div>
					<div class="label">物资对接地址：</div>
					<input type="text" placeholder="点击输入" v-model="formData.receiptInfo.dockingAddress">
				</div>
				<div>
					<div class="label">对接人：</div>
					<input type="text" placeholder="点击输入" v-model="formData.receiptInfo.dockinger">
				</div>
				<div>
					<div class="label">联系电话：</div>
					<input type="number" placeholder="点击输入" v-model="formData.receiptInfo.dockingerPhone">
				</div>	
			</view>
			<view v-show="showSelectCityFlag">
				<view class="mask"></view>
				<view class="select-time">
					<view class="time-title">选择医院所在区域</view>
					<view class="content-box">
						<view class="box-time">
							<view class="item-title">省市区选择</view>
							<view v-if="formData.province == ''" type="buttom" @click="showMulLinkageThreePickerSend"
								  class="row-input plh need">选择省市区
							</view>
							<view v-else type="buttom" @click="showMulLinkageThreePickerSend" class="row-input">
								{{formData.province+formData.city + formData.area}}
							</view>
						</view>
						<view class="box-time">
							<view class="item-title">详细地址</view>
							<input placeholder="输入详细地址" class="addrr-input" type="text" v-model="formData.deliveryArea"  />
						</view>
					</view>
					<view class="box-btn">
							<view class="btn-left" @click="showSelectCityFlag=false">取消</view>
							<view class="btn-right" @click="sureSelectTime">确定</view>
						</view>
				</view>
			</view>
			<view class="submit" @click="submit">
				提交医院名单申请
			</view>
			<view class="model" v-if="showModel">
				<div class="area">
					<div class="choose">
						<div>
							<div class="choose-item" @click="nowChoose.type = 0">
								<span :class="{active: nowChoose.type === 0}"></span>
								<span>数量不限</span>
							</div>
						</div>
						<div>
							<div class="choose-item" @click="nowChoose.type = 1">
								<span :class="{active: nowChoose.type === 1}"></span>
								<span>不需要</span>
							</div>
						</div>
						<div>
							<div class="choose-item" @click="nowChoose.type = 2">
								<span :class="{active: nowChoose.type === 2}"></span>
								<span>具体数量</span>
							</div>
							<div class="input-item">
								<input type="number" v-model="nowChoose.num">
								<span>个</span>
							</div>
						</div>
					</div>
					<div class="btn-box">
						<div @click="cancel">取消</div>
						<div @click="ok">确认</div>
					</div>
				</div>
			</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" 
		:pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onCityConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import navUrl from '../../components/nav-url.vue'
	export default {
		data() {
			return {
				showModel: true,
				url: '/pages/index/index',
				showSelectCityFlag: false,
				showModel: false,
				themeColor: '#007AFF',
				cityPickerValueDefault:[16, 0, 0],
				nowChoose: {
					index: -1,
					type: -1,
					num: null
				},
				formData: {
					company: '',
					type: 0,
					contact: {
						name: '',
						phone: ''
					},
					province: '',
					city: '',
					area: '',
					deliveryArea: '',
					street: '',
					
					details: [
						{
							name: '医用外科口罩',
							standard: '',
							unit: '个',
							amount: 0
						},
						{
							name: '医用防护口罩',
							standard: '',
							unit: '个',
							amount: 0
						},
						{
							name: '防护帽',
							standard: '',
							unit: '个',
							amount: 0
						},
						{
							name: '一次性医用防护服',
							standard: '',
							unit: '个',
							amount: 0
						},
						{
							name: '手术衣',
							standard: '',
							unit: '个',
							amount: 0
						},
						{
							name: '防护眼镜',
							standard: '',
							unit: '个',
							amount: 0
						},
						{
							name: '防护眼罩',
							standard: '',
							unit: '个',
							amount: 0
						},
						{
							name: '护目镜',
							standard: '',
							unit: '个',
							amount: 0
						},
						{
							name: '医用一次性乳胶手套',
							standard: '',
							unit: '个',
							amount: 0
						},
					],
					
					receiptInfo: {
						name: '',
						phone: '',
						street: '',
						dockingerPhone: '',
						dockinger: '',
						dockingAddress: ''
					}
				}
			};
		},
		components: {
			navUrl,
			mpvueCityPicker
		},
		methods: {
			chooseNum(item, index) {
				this.nowChoose.index = index;
				this.nowChoose.type = item.amount === 0 ? 0 : item.amount > 0 ? 2 : 1;
				this.nowChoose.num = item.amount > 0 ? item.amount : null;
				this.showModel = !this.showModel;
			},
			checkItem(item) {
				return item.amount > 0 ? item.amount + ' 个' : item.amount === 0 ? '数量不限' : '不需要'
			},
			cancel() {
				this.nowChoose = {
					index: -1,
					type: -1,
					num: null
				}
				this.showModel = false
			},
			ok() {
				const {index, type, num} = this.nowChoose;
				this.formData.details[index].unit = '个';
				this.formData.details[index].amount = type === 1 ? -1 : type === 0 ? 0 : num;
				this.nowChoose = {
					index: -1,
					type: -1,
					num: null
				}
				this.showModel = false
			},
			sureSelectTime(){
				this.showSelectTimeFlag = false
				this.showSelectCityFlag = false
			},
			onCityConfirm(e){
				let areaArr = e.label.split('-')
				if(areaArr && areaArr.length) {
					this.formData.province = areaArr[0]
					this.formData.city = areaArr[1]
					this.formData.area = areaArr[2]
				}
			},
			showMulLinkageThreePickerSend() {
			    this.$refs.mpvueCityPicker.show()
			},
			submit() {
				let _that = this
				if (!_that.formData.company) {
				    _that.$utils.showModal("请写正确的医院名称")
				    return;
				}
				console.log('2222:===', _that.formData)
				_that.$api.postHospitalInfo(_that.formData).then(res => {
					if(res.code == 10000){
						uni.showModal({
						    title: '提交成功',
						    content: "您的申请我们已收到，工作人员核实通过后会发布到平台！",
						    showCancel: false,
						    success(res) {
						        uni.navigateBack({
						        	delta: 1,
						        	animationType: 'pop-out',
						        	animationDuration: 200
						        })
						    }
						})
					}else if(res.code == 5003){
						uni.showModal({
						    title: '提交失败',
						    content: "您提交的医院信息平台已存在，感谢参与。",
						    showCancel: false,
						    success(res) {
						        console.log(res)
						    }
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.hospital-area {
		padding-bottom: 60px;
	
		& * {
			box-sizing: border-box;
			font-family: PingFangSC-Regular;
			font-size: 14px;
			letter-spacing: 0;
		}
	}
	
	.addrr-input{
		height: 98rpx;
		line-height: 98rpx;
		width: 80%;
		text-align: right;
	}
	
	.label {
		color: #333333;
	}
	
	uni-view[class ^= 'area'] {
		width: 100%;
		min-height: 204px;
		background-color: #fff;
		margin-top: 10px;
		padding: 10px;
		
		>div {
			box-sizing: border-box;
			border-bottom: 1px solid #F2F2F2;
			display: flex;
			justify-content: space-between;
			align-items: center;
			min-height: 36px;
			padding: 14px 0;
			
			>.label {
				width: 50%;
			}
			
			>.show {
				width: 66%;
				text-align: right;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				
				.icon {
					width: 9px;
					height: 10px;
					transform: rotate(180deg);
					margin-left: 6px;
					background-image: url(../../static/icon-back.svg);
					background-repeat: no-repeat;
					background-size: 60%;
				}
			}
			
			>input {
				text-align: right;
				width: 66%;
			}
			
			>uni-textarea {
				width: 100%;
				height: 50px;
				
				&::placeholder {
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #999999;
				}
			}
			
			>.select {
				width: 70px;
				height: 30px;
				border: 1px solid #4B8AE5;
				border-radius: 6px;
				overflow: hidden;
				color: #80ADED;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				>div {
					width: 50%;
					text-align: center;
					line-height: 30px;
					transition: all .3s;
				}
				
				&.on {
					&>div:first-child {
						background-color: #4B8AE5;
						color: #fff;
					}
				}
				
				&.off {
					&>div:last-child {
						background-color: #4B8AE5;
						color: #fff;
					}
				}
			}
		}
		
		.title {
			height: 50px;
			font-size: 16px;
			color: #4B8AE5;
			border-bottom: 1px solid #F2F2F2;
			position: relative;
			
			&:after {
				content: "";
				position: absolute;
				bottom: 0;
				width: 96px;
				height: 4px;
				background: #4B8AE5;
				border-radius: 1px;
			}
		}
	}
	
	uni-view.area_1 > div {
		min-height: 48px;
		
		&.company, &.street {
			flex-direction: column;
			align-items: flex-start;
			
			>.label {
				margin-bottom: 10px;
			}
		}
	}
	
	.submit {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50px;
		width: 100%;
		background-color: #4B8AE5;
		text-align: center;
		line-height: 50px;
		font-family: PingFangHK-Regular;
		font-size: 18px;
		color: #FFFFFF;
	}
	
	.model {
		position: fixed;
		z-index: 2;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
		width: 100%;
		background: rgba(0,0,0,0.50);
		display: flex;
		align-items: flex-end;
		
		>.area {
			width: 100%;
			height: 255px;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.choose {
				padding: 10px;
				
				>div {
					height: 55px;
					padding: 15px 0;
					border-bottom: 1px solid #F2F2F2;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				
				.choose-item {
					display: flex;
					justify-content: space-between;
					
					&>span:first-child {
						width: 20px;
						height: 20px;
						border-radius: 50%;
						border: 1px solid #EDEDED;
						position: relative;
						margin-right: 6px;
						
						&::before {
							content: '';
							position: absolute;
							opacity: 0;
							transition: all .3s;
							top: 2px;
							left: 2px;
							width: 14px;
							height: 14px;
							border-radius: 50%;
							background-color: #4B8AE5;
							
						}
						
						&.active::before {
							opacity: 1;
						}
					}
				}
				
				.input-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					uni-input {
						border: 1px solid #EDEDED;
						height: 40px;
						width: 100px;
						text-align: right;
						padding: 4px;
						margin-right: 14px;
					}
				}
					
			}
			
			.btn-box {
				width: 100%;
				height: 57px;
				display: flex;
				justify-content: space-between;
				border: 1px solid #EDEDED;
				
				>div {
					width: 50%;
					line-height: 57px;
					text-align: center;
					font-family: PingFangHK-Medium;
					font-size: 18px;
					
					&:first-child {
						color: #4A90E2;
					}
					
					&:last-child {
						background-color: #4B8AE5;
						color: #FFFFFF;
					}
				}
			}
		}
	}
	
	.mask{
		background-color: rgba(0,0,0,0.5);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 2;
	}
	
	.select-time{
		z-index: 10;
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-50%,0);
		background-color: #FFFFFF;
		width: 85%;
		height: 360rpx;
		box-sizing: content-box;
		border-radius: 12rpx;
		padding: 30rpx;
		.time-title{
			text-align: center;
			padding-bottom: 25rpx;
			border-bottom: 1rpx solid #eeeeee;
		}
		.content-box{
			display: flex;
			flex-direction: column;
			font-size: 26rpx;
		}
		
		.box-time{
			display: flex;
			flex-direction: row;
			align-content: space-between;
			justify-content: space-between;
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 1rpx solid #eeeeee;
		}
		.box-btn{
			display: flex;
			view{
				flex: 1;
				text-align: center;
				margin-top: 20rpx;
				height: 70rpx;
				line-height: 70rpx;
				border-left: 1rpx solid #eeeeee;
			}
			view:first-child{
				border-left: none;
			}
		}
	}
</style>
