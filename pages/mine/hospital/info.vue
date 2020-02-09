<template>
	<view>
		<view class="top-info">
			<text class="top-type">医院物资负责人</text>
			<view class="top-phone"> <text>{{ phone |phoneNumFilter(phone)}}</text>,您好</view>
		</view>
		<view class="center">
			<view class="center-top">
				<view class="center-status">
					<text class="no-pass" v-if="status == -1">信息核实未通过</text>
					<text class="passing"v-if="status == 0">信息核实中</text>
					<text class="pass" v-if="status == 1">信息已核实</text>
					<text class="hot">发热门诊</text>
				</view>
				<view class="center-hospital">
					华中科技大学附属同济医院华中科技大学附属同济医院
				</view>
				<view class="center-more">
					<text class="center-time">2020-01-24 19:00</text>
					<text class="center-source">来源：官方微博</text>
				</view>
			</view>
			<view class="need-goods">
				<view class="need-top">
					<text class="need-title">急需物资类型 (共{{details && details.length >0 ? details.length : 0 }}类)</text>
					<view class="need-detail">
						<text>更多详情</text>
						<view class="icon"></view>
					</view>
				</view>
				<view class="need-total">
					<text class="need-item" v-for="(item,index) in details" :key="index">{{item}}</text>
				</view>
				
				<view class="need-no-pass" v-if="status === -1">
					<text>信息核实未通过原因：</text>
					<text>上传的证明图片不符合要求，请参考样例上传。</text>
					<button  @tap="updateHospital">点这里修改申请内容</button>
				</view>
				<view class="need-pass" @tap="updateHospital" v-if="status === 1">
					医院物资信息有变动，点这里修改
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
			}
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
		padding-bottom: 10px;
		.center-status{
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			margin-bottom: 10px;
			font-family: PingFangSC-Semibold;
			font-size: 12px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
			.no-pass{
				background: #FF4B4B;
				border-radius: 0 0 4px 4px;
				padding: 6px 10px 7px;
				margin-right: 10px;
			}
			.passing{
				background: #999999;
				border-radius: 0 0 4px 4px;
				padding: 6px 10px 7px;
				margin-right: 10px;
			}
			.pass{
				background: #7FAE00;
				border-radius: 0 0 4px 4px;
				padding: 6px 10px 7px;
				margin-right: 10px;
			}
			.hot{
				background: #80ADED;
				border-radius: 0 0 4px 4px;
				padding: 6px 10px 7px;
			}
		}
	
		.center-hospital{
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
			.center-time{
				font-family: PingFangSC-Semibold;
				font-size: 12px;
				color: #333333;
				letter-spacing: 0;
				text-align: center;
			}
			.center-source{
				font-family: PingFangSC-Semibold;
				font-size: 12px;
				color: #999999;
				letter-spacing: 0;
				text-align: center;
			}
		}
	}

	.need-goods{
		height: 100%;
		.need-top{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin: 10px 0;
			.need-title{
				font-family: PingFangSC-Semibold;
				font-size: 12px;
				color: #333333;
				letter-spacing: 0;
			}
			.need-detail{
				display: inline-block;
				line-height: 100%;
				text{
					font-family: PingFangSC-Semibold;
					font-size: 14px;
					color: #80ADED;
					letter-spacing: 0;
					text-align: center;
					margin-right: 10px;
				}
				.icon{
					display: inline-block;
					width: 9px;
					height: 10px;
					transform: rotate(180deg);
					background-image: url(../../../static/icon-back.svg);
					background-repeat: no-repeat;
					background-size: 60%;
				}
				image{
					width: 9px;
					height: 16px;
				}
			}
		}
		
		.need-total{
			width: 100%;
			height: 100%;
			.need-item{
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
		}
	
	
		.need-no-pass{
			display: inline-block;
			background: #FFEDED;
			border: 1px solid #FFC1C1;
			border-radius: 4px;
			padding: 12px 10px 10px;
			margin-bottom: 10px;
			text{
				display: inline-block;
				font-family: PingFangSC-Semibold;
				font-size: 14px;
				color: #FF4B4B;
				letter-spacing: 0;
				margin-bottom: 10px;
			}
			button{
				width: 100%;
				height: 40px;
				line-height: 40px;
				background: #FF4B4B;
				border-radius: 2px;
				font-family: PingFangSC-Semibold;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
			}
		}
		.need-pass{
			display: inline-block;
			width: 100%;
			height: 50px;
			line-height: 50px;
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
