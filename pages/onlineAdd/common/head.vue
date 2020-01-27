<template>
	<view class="com-back">
		<svg @tap="doBack" width="10px" height="18px" viewBox="0 0 10 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<g id="在线补充" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<g id="在线补充医院名单" transform="translate(-16.000000, -107.000000)" fill="#333333">
					<g id="顶部信息栏" transform="translate(0.000000, 88.000000)">
						<path d="M26,27.9703032 L17.3690593,36.7610719 C17.0543445,37.0817458 16.5454834,37.0793158 16.2331535,36.7556718 C15.9208236,36.4310378 15.9229435,35.9107414 16.2378349,35.5886274 L23.7139675,27.9745332 L16.2396015,20.4131798 C15.9233851,20.0921458 15.9196753,19.5716693 16.231387,19.2461353 C16.5392121,18.9240213 17.0448933,18.9171813 17.3610214,19.2308351 C17.3631413,19.2329052 17.3652612,19.2349752 17.3672927,19.2371352 L26,27.9703032 Z"
						 id="返回" transform="translate(21.000000, 28.000000) scale(-1, 1) translate(-21.000000, -28.000000) "></path>
					</g>
				</g>
			</g>
		</svg>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			doBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.com-back {
		height: 112upx;
		background-color: #fff;
		
		svg{
			
		}
	}
</style>
