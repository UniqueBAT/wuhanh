<template>
	<view>
		<view class="top-info">
			<text class="top-type">车辆资源负责人</text>
			<view class="top-phone"> <text>{{ phone |phoneNumFilter(phone)}}</text>,您好</view>
		</view>
		<view class="center">
			<view class="center-top">
				<view class="center-status">
					<text class="logistics" >物流公司</text>
					<text class="serve" >有偿服务</text>
				</view>
				<view class="center-car">
					汉口区义务运输队
				</view>
				<view class="center-more">
					<text class="center-link">车队联系人：王五</text>
				</view>
			</view>
			<view class="car-goods">
				<view class="car-info">
					<view class="car-item">
						<text class="car-label">配送范围：</text>
						<text class="car-value">武汉市区</text>
					</view>
					<view class="car-item">
						<text class="car-label">配送时间：</text>
						<text class="car-value">2020.01.24 10:00 - 2020.01.24 20:00</text>
					</view>
					<view class="car-item">
						<text class="car-label">车辆运力：</text>
						<text class="car-value">单次可运输10吨货物</text>
					</view>
					<view class="car-item">
						<text class="car-label">收费标准：</text>
						<text class="car-value">按照运输吨数，运输公里数综合计费</text>
					</view>
					<view class="car-item-other">
						<view class="car-item"><text class="car-label">备注信息：</text>
						<text class="car-time">更新时间：2020-01-25 12:23</text></view>
						<view class="other-info">车队共10辆私家车，请至少提前一小时沟通联系，谢谢！</view>
					</view>
				</view>
				
				<view class="car-pass" @tap="updateHospital">
					车辆信息有误，点这里提交修改申请
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:"18827145997",
				status:-1,
				details:[
					"医用口罩","N95型口罩","防护服","一次性医用防护服","防护眼镜","一次性放渗透手术衣","防护眼罩","护目镜","医用一次性乳胶手套","护目镜","医用一次性乳胶手套"
				]
			};
		},
		methods:{
			updateHospital(){
				uni.navigateTo({
				    url: './update'
				});
			},
			 
		}, 
		filters: {
			phoneNumFilter (phone) {
			    let phoneArr = [...phone];
				var value="";
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
.top-info{
	position: relative;
	width: 100%;
	height: 108px;
	margin: 10px auto;
	background: #fff;
	padding-top: 60px;
	.top-type{
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-65px, 0px);
		background: #6236FF;
		border-radius: 0 0 10px 10px;
		width: 130px;
		height: 40px;
		line-height: 40px;
		font-family: PingFangSC-Semibold;
		font-size: 16px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
	.top-phone{
		font-family: PingFangSC-Semibold;
		font-size: 20px;
		color: #333333;
		letter-spacing: 0;
		text-align: center;
	}
}

.center{
	width: 100%;
	height: 100%;
	padding:0 10px;
	background: #fff;
	.center-top{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		box-shadow: inset 0 -1px 0 0 #EDEDED;
		padding-bottom: 15px;
		.center-status{
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			margin-bottom: 12px;
			font-family: PingFangSC-Semibold;
			font-size: 12px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
			.logistics{
				background: #00B8B2;
				border-radius: 0 0 4px 4px;
				padding: 6px 10px 7px;
				margin-right: 10px;
			}
			.serve{
				background: #999999;
				border-radius: 0 0 4px 4px;
				padding: 6px 10px 7px;
			}
		}
	
		.center-car{
			width: 100%;
			font-family: PingFangSC-Semibold;
			font-size: 14px;
			color: #333333;
			letter-spacing: 0;
			margin-bottom: 10px;
			font-weight: 600;
		}
		.center-more{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			height: 100%;
			.center-link{
				font-family: PingFangSC-Semibold;
				font-size: 12px;
				color: #333333;
				letter-spacing: 0;
				text-align: center;
			}
		}
	}

	.car-goods{
		height: 100%;
		.car-info{
			background: #FFFFFF;
			box-shadow: inset 0 -1px 0 0 #EDEDED;
			.car-item{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-family: PingFangSC-Semibold;
				font-size: 12px;
				color: #333333;
				letter-spacing: 0;
				height: 36px;
				line-height: 36px;
				background: #FFFFFF;
				box-shadow: inset 0 -1px 0 0 #EDEDED;
				font-weight: 600;
			}
			
			.car-item-other{
				display: flex;
				flex-direction: column;
				box-shadow: inset 0 -1px 0 0 #EDEDED;
				padding-bottom: 26px;
				.car-item{
					box-shadow:none;
				}
				.other-info{
					font-family: PingFangSC-Semibold;
					font-size: 12px;
					color: #333333;
					letter-spacing: 0;
					font-weight: 600;
				}
			}
		}
		
		.car-total{
			width: 100%;
			height: 100%;
			.car-item{
				display: inline-block;
				background: #C0DAFF;
				border-radius: 4px;
				padding: 5px;
				margin-right: 10px;
				margin-bottom: 10px;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #666666;
				letter-spacing: 0;
			
			}
			.other-info{
				width: 100%;
				
			}
		}
	
	
		// .car-no-pass{
		// 	display: inline-block;
		// 	background: #FFEDED;
		// 	border: 1px solid #FFC1C1;
		// 	border-radius: 4px;
		// 	padding: 12px 10px 10px;
		// 	margin-bottom: 10px;
		// 	text{
		// 		display: inline-block;
		// 		font-family: PingFangSC-Semibold;
		// 		font-size: 14px;
		// 		color: #FF4B4B;
		// 		letter-spacing: 0;
		// 		margin-bottom: 10px;
		// 	}
		// 	button{
		// 		width: 100%;
		// 		height: 40px;
		// 		line-height: 40px;
		// 		background: #FF4B4B;
		// 		border-radius: 2px;
		// 		font-family: PingFangSC-Semibold;
		// 		font-size: 14px;
		// 		color: #FFFFFF;
		// 		letter-spacing: 0;
		// 		text-align: center;
		// 	}
		// }
		.car-pass{
			display: inline-block;
			width: 100%;
			height: 40px;
			line-height: 40px;
			background: #FFFFFF;
			border: 1px solid #80ADED;
			border-radius: 4px;
			font-family: PingFangSC-Semibold;
			font-size: 16px;
			color: #80ADED;
			letter-spacing: 0;
			text-align: center;
			margin-top: 20px;
			margin-bottom: 20px;
		}
	}
}
</style>
