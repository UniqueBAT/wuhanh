<template>
	<view class="center-box">
		<view class="center-mubu"  v-if="showMagic" @tap="tooglePop"></view>
		<view :class="['work-wrap',showMagic ? '' : 'bottom-wrap']">
			<view class="work-item copy" v-for="(item,index) in centerDate" :key="index" @tap="changeTap(index)">
				<image :src="item.img" class="item-img" mode="widthFix"></image>
				<text class="item-text" v-text="item.text"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showMagic: false,
				centerDate: [{
					img: '../../static/icon_add_hosp.png',
					text: '在线补充医院名单'
				}, {
					img: '../../static/icon_add_car.png',
					text: '在线补充车辆名单'
				}, {
					img: '../../static/icon_copy_wx.png',
					text: '复制工作人员微信'
				}]
			};
		},
		methods: {
			tooglePop() {
				let that = this;
				that.showMagic = !that.showMagic
				// that.$emit('change')
			},
			changeTap(index){
				this.showMagic = false
				this.$emit('change',index)
			}
		}
	}
</script>

<style lang="less" scoped>
	.center-box {
		display: flex;
		justify-content: center;

		.center-mubu {
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 996;
		}

		.bottom-wrap {
			bottom: -300px !important;
		}

		.work-wrap {
			position: absolute;
			bottom: 15px;
			background-color: #fff;
			border-radius: 15px;
			display: flex;
			justify-content: space-around;
			width: 90%;
			z-index: 997;
			padding: 20upx;
			transition: bottom .6s ease-in-out;

			.work-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				flex: 1;

				.item-img {
					width: 60px;
					height: 60px;
				}

				.item-text {
					width: 56px;
					line-height: 20px;
					padding-top: 10px;
					font-family: PingFangSC-Medium;
					font-size: 14px;
					color: #333333;
				}
			}

			&:before {
				content: " ";
				border-left: 10px solid transparent;
				border-top: 10px solid #eee;
				border-right: 10px solid transparent;
				border-bottom: 10px solid transparent;
				position: absolute;
				left: 50%;
				bottom: -18px;
				margin-left: -10px;
			}

			&:after {
				content: " ";
				border-left: 12px solid transparent;
				border-top: 12px solid #fff;
				border-right: 12px solid transparent;
				border-bottom: 12px solid transparent;
				position: absolute;
				left: 50%;
				bottom: -18px;
				margin-left: -12px;
			}
		}
	}
</style>
