<template>
	<view class="respos">
		<view class="article-title">《E起支援-疫情物资供需平台免责协议》</view>
		<view class="title">第一条 协议订立</view>
		<view class="content">
			1.1
			用户在同意本网站：E起支援-疫情物资供需平台(https://onwh.51rry.com)公示的《E起支援-疫情物资供需平台免责协议》后，方可使用本网络服务平台（以下简称“平台”）提供的湖北省辖区内医疗物资供需信息相关服务（以下简称“服务”）。</view>
		<view class="content">1.2 用户在使用本平台提供的服务前务必认真阅读本协议，一旦用户使用本平台提供的服务即表示用户同意与本平台签订本协议且同意接受本协议之约束。</view>
		<view class="title">第二条 服务说明</view>
		<view class="content">2.1 疫区医疗机构（以下简称“受赠方”）通过本平台获取的捐赠物资均由第三方提供（以下简称“捐赠方”），本平台仅为技术服务提供方。</view>
		<view class="content">2.2 由于疫情期间存在客观情况限制或政府政策原因等多种不确定因素影响，本平台不对捐赠方的实际捐赠情况进行任何形式的承诺，同时所有捐赠方目前亦无法对实际捐赠情况作出相关承诺。</view>
		<view class="content">2.3
			关于平台发布的物资需求内容请以疫区医疗机构在各大官方渠道发布的信息为准（包括但不限于医疗机构官方网站、认证微博、官方微信公众号、已在互联发布并经核实属实的医疗机构签章文件等），本平台仅对搜集获取的内容进行整理编辑及展示</view>
		<view class="title">第三条 用户的权利和义务</view>
		<view class="content">3.1 捐赠方在进行捐赠前,应仔细阅读并接受受赠方所公示的内容。本协议中涉及受赠方与捐赠方之间权利义务的内容，如有与我国相关法律冲突的，以我国相关法律为准。</view>
		<view class="content">3.2 捐赠方进行捐赠时，应当准确填写捐赠物资类目及具体数量、详细联系方式、涉及相关技术规范要求的合格证编号等信息内容。</view>
		<view class="content">3.3 捐赠方提交捐赠信息后，应及时将捐赠物资向受赠方进行送达工作。</view>
		<view class="content">3.4 如捐赠方需取得相应凭证，应自行与受赠方联系取得。捐赠方因捐赠各项事宜产生争议由用户自行与受赠方协商解决。</view>
		<view class="content">3.5 用户同意本平台向捐赠方、受赠方、物流提供方等相关单位、个人披露用户提交捐赠信息中所涉及的个人信息。</view>
		<view class="title">第四条 免责说明</view>
		<view class="content">4.1 因疫情变化，本平台显示的信息仅供参考，最终以受赠方实际需求为准。</view>
		<view class="content">4.2 因用户提供错误信息或虚假信息所导致的损失，由用户自行承担，本平台不承担任何责任。</view>
		<view class="content">4.3 本平台为公益性信息平台，受赠方与捐赠方产生任何纠纷与本平台无关。</view>
		<view class="content">4.4 本平台会尽力维护平台信息的安全，但因出现法律规定的不可抗力情形，以及因为黑客入侵、计算机病毒等原因造成用户资料泄露、丢失、被盗用、被篡改的，本平台不承担任何责任。</view>
		<view class="content">4.5
			本平台仅提供技术服务，非捐赠方、受赠方、物流提供方等其他第三方之间的权利义务（包括但不限于赠与法律行为、运输合同行为、产品侵权责任等）主体，不介入用户与受赠方、捐赠物资使用方或物流提供方之间的纠纷，但本平台将提供一切与本平台信息发布相关的合法范围内的必要协助，保护用户的合法权益。</view>
		<view class="content">4.6 本平台如被恶意篡改用于不正当募捐使用，一律追责。</view>
		<view class="content">4.7 本平台唯一官方网址：https://onwh.51rry.com（E起支援-疫情物资供需平台)如被人恶意假借名义进行不正当行为，与本平台无关。并且保留对其追究法律责任的权力。</view>
		<view class="title">第五条 争议解决及法律适用</view>
		<view class="content">5.1在用户有意向捐赠后，如果在本协议约定内容履行过程中，对相关事宜的履行发生争议，应当协商解决，如协商不成，用户同意按照中华人民共和国颁布的相关法律法规来解决争议，并同意接受湖北省武汉市人民法院的管辖。</view>

		<navigator url="../index/index" open-type="navigateBack">
			<button class="btn info">免责申请已阅读完毕</button>
		</navigator>
	</view>
</template>

<script>
	import navUrl from '../../components/nav-url.vue'
	export default {
		components: {
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
	.info {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		background: #80ADED;
		color: #FFFFFF;
	}

	.respos {
		background-color: #fff;
		padding: 20upx;
	}

	.article-title {
		width: 100%;
		text-align: center;
		font-family: PingFangSC-Semibold;
		font-size: 16px;
		font-weight: 600;
		padding-bottom: 10px;
		color: #000000;
		line-height: 24px;
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
