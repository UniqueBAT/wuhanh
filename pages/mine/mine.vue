<template>
	<view class="mine-wrap">
		<LogOut></LogOut>
	</view>
</template>

<script>
	import LogOut from './Logout/logout.vue'
	export default {
		components: {
			LogOut
		},
		data() {
			return {

			}
		},
		methods: {

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
