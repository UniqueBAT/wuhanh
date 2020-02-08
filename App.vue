<script>
	import util from '@/utils/util';
	export default {
		onLaunch: function() {
			console.log('App Launch');
			if (util.isWeixin() || util.isDev()) {
				document.getElementsByTagName('html')[0].className += ' weixin-platform';
			} else {
				document.getElementsByTagName('html')[0].className += ' other-platform';
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		background-color: #f8f8f8;
		--mainColor: #4b8ae5;
	}

	view {
		box-sizing: border-box;
	}

	// icon定制化样式处理
	.uni-tabbar {
		z-index: 1000000 !important;
	}

	.uni-tabbar /deep/ .uni-tabbar__label {
		line-height: 14px;
	}

	.uni-tabbar /deep/ .uni-tabbar__icon {
		width: 20px;
	}

	.uni-tabbar /deep/ .uni-tabbar__icon__diff {
		width: 46px !important;
	}

	// icon定制化样式处理

	.call-btn {
		display: flex;
		align-items: center;
		border: 1upx solid var(--mainColor);
		background-color: #ffffff;
		color: var(--mainColor);
		padding: 0 20upx;
		height: 60upx;
		border-radius: 40upx;
		font-size: 28upx;
	}

	.flex-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.flex-center{
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.blank-box {
		width: 100%;
		height: 100upx;
		background-color: transparent;
	}

	.subTitle {
		padding-right: 10upx;
		color: #ff3500;
		font-size: 12px;
		text-align: right;
	}
</style>
