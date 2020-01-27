<template>
	<view class="zt-form">
		<template v-for="(item,index) in items">
			<view v-if="item.type==='input'" class="" :key="index">
				<input type="text" value="输入框" />
			</view>
			
			选择器等
		</template>
	</view>
</template>

<script>
	export default {
		props:{
			items:{
				type:Array,
				default:function(){
					return [
						{
							type:"input",
							prop:""
						}
					]
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
