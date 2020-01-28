<template>
	<view class="respos">
		<view class="title">第一条 协议订立</view>
		<view class="content">1.1
			用户在同意本网站：湖北医疗物资需求信息平台(https：//onwh.51rry.com)的《服务协议》和本协议后，方可使用本网络服务平台（以下简称“平台”）提供的湖北医疗物资需求信息相关服务（以下简称“服务”）。</view>
		<view class="content">1.2 用户在使用本平台提供的服务前务必认真阅读本协议，一旦用户使用本平台提供的服务即表示用户同意与本平台签订本协议且同意受本协议之约束。</view>
		<view class="title">第二条 服务说明</view>
		<view class="content">2.1 疫区医院通过本平台获取的捐赠物资均由第三方提供（以下简称“捐赠方”），本平台仅为技术服务提供方。</view>
		<view class="content">2.2 由于情况各异，本平台所有捐赠方目前均无法承诺捐赠实际情况。</view>
		<view class="content">2.3 需求内容以疫区医院在各大官方发布信息为准（认证微博、官方微信公众号、医院盖章文件等），平台只做内容收集展示。 </view>
		<view class="title">第三条 用户的权利和义务</view>
		<view class="content">3.1   捐赠方在进行捐赠前,应仔细阅读并接受疫区院方所公示的内容。本协议中涉及疫区院方与捐赠方之间权利义务的内容，如有与我国相关法律冲突的，以我国相关法律为准。</view>
		<view class="content">3.2    捐赠方进行捐赠时，应当准确填写捐赠物资类目及具体数量等信息内容。</view>
		<view class="content">3.3    捐赠方提交捐赠信息后，及时进行邮寄。</view>
		<view class="content">3.4 如捐赠方需取得相应凭证，应与疫区院方联系取得。捐赠方因捐赠各项事宜产生争议由用户与疫区医院协商解决。</view>
		<view class="content">3.5 用户同意本平台向捐赠方、疫区医院等相关单位披露用户提交捐赠信息中所涉及的个人信息。</view>
		<view class="title">第四条 免责说明</view>
		<view class="content">4.1       因疫情变化，本平台显示的信息仅供参考，最终以疫区医院实际需求为准。</view>
		<view class="content">4.2    因用户提供错误捐赠信息所导致的损失，由用户自行承担，本平台不承担任何责任。</view>
		<view class="content">4.3      本平台为公益性信息平台，疫区医院与捐赠方产生任何纠纷与本平台无关。</view>
		<view class="content">4.4 本平台会尽力维护平台信息的安全，但法律规定的不可抗力，以及因为黑客入侵、计算机病毒等原因造成用户资料泄露、丢失、被盗用、被篡改的，本平台不承担任何责任。</view>
		<view class="content">4.5 本平台仅提供技术服务，不是赠与合同的权利义务主体，不介入用户与疫区医院之间的纠纷，但本平台将提供一切协助，保护用户的合法权益。</view>
		<view class="content">4.6 本平台如被恶意篡改用于不正当募捐使用，一律追责。</view>
		<view class="content">4.7 本平台唯一官方网址：https：//onwh.51rry.com（湖北医疗物资需求信息)如被人恶意假借名义进行不正当行为，与本平台无关。并且保留对对方追究法律责任的权力。</view>
		<view class="title">第五条 争议解决及法律适用</view>
		<view class="content">5.1在用户有意向捐赠后，如果在本协议约定内容履行过程中，对相关事宜的履行发生争议，应当协商解决，如协商不成，用户同意按照中华人民共和国颁布的相关法律法规来解决争议，并同意接受湖北省武汉市人民法院的管辖</view>
	</view>
</template>

<script>
	import navUrl from '../../components/nav-url.vue'
	export default {
		components:{
			navUrl
		},
		data() {
			return {
				url: '/pages/index/index'
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.respos {
		background-color: #fff;
		padding: 20upx;
	}

	.title {
		font-family: PingFangSC-Semibold;
		font-size: 16px;
		color: #000000;
		line-height: 24px;
	}

	.content {
		text-indent: 2em;
		text-align: justify;
		font-family: PingFangSC-Semibold;
		font-size: 12px;
		color: #333333;
		line-height: 22px;
	}
</style>
