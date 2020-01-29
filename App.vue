<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		background-color: #f8f8f8;
		--mainColor: #4B8AE5;
	}

	view {
		box-sizing: border-box;
	}
	.call-btn {
		display: flex;
		align-items: center;
		border: 1upx solid var(--mainColor);
		background-color: #FFFFFF;
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
	
	.blank-box {
		width: 100%;
		height: 100upx;
		background-color: transparent;
	}
</style>
