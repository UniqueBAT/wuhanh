<template>
	<view>
		<view class="mine-wrap">
			<LogOut></LogOut>
		</view>
		<!-- 遮罩中间按钮的遮罩层 -->
		<push-pop ref="pushPop" @change="chooseItem"></push-pop>
		<view class="bottom-btn" @tap="showMore"></view>
	</view>
</template>

<script>
	import pushPop from '../../components/push-pop.vue'
	import LogOut from './Logout/logout.vue'
	import Clipboard from '../../utils/common/clipboard.min.js'
	export default {
		components: {
			LogOut,
			pushPop
		},
		data() {
			return {

			}
		},
		methods: {
			// 显示中间弹出层
			showMore() {
				let that = this
				that.$refs.pushPop.tooglePop();
			},
			chooseItem(index) {
				let that = this;
				switch (index) {
					case 2:
						that.copyPhone('kindyin', true);
						break
					case 0:
						uni.navigateTo({
							url: '/pages/addhospital/addhospital'
						})
						break
					case 1:
						uni.navigateTo({
							url: '/pages/addcar/addcar'
						})
						break
				}
			},
			copyPhone(phone, isWechat = false) {
				const clipboard = new Clipboard('.copy', {
					text: function() {
						return phone;
					}
				});
				const toastMsg = isWechat ? '微信号复制成功' : '电话复制成功'
				clipboard.on('success', function(e) { //复制成功执行的回调，可选
					uni.showToast({
						title: toastMsg,
						icon: 'none',
						duration: 1500
					});
					clipboard.destroy();
				});
				clipboard.on('error', function(e) { //复制失败执行的回调，可选
					uni.showToast({
						title: toastMsg,
						icon: 'none',
						duration: 1500
					});
					clipboard.destroy();
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.mine-wrap {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>
