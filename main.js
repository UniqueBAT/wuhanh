import Vue from 'vue'
import App from './App'

import api from '@/utils/api/api.js'
import utils from '@/utils/util.js';
import redis from '@/utils/redis.js';
import cityNameFilter from '@/filters/city-filter.js';

//  h5分享配置
import jswx from './components/jweixin-module/lib/index.js'
// let wx_config = “后台返回的config”


// jswx.config({
// 	debug: false,
// 	appId: wx_config.appId, // 必填，公众号的唯一标识  
// 	timestamp: wx_config.timestamp, // 必填，生成签名的时间戳  
// 	nonceStr: wx_config.nonceStr, // 必填，生成签名的随机串  
// 	signature: wx_config.signature, // 必填，签名  
// 	jsApiList: wx_config.jsApiList // 必填，需要使用的JS接口列表          
// });
jswx.ready(() => {
	//分享给朋友  
	jswx.onMenuShareTimeline({
		title: '湖北医疗物资需求信息平台', // 分享标题  
		link: 'https://onwh.51rry.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致  
		imgUrl: 'https://img.51rry.com/onwh/logo/8df93ea862d55499c6727b66f97cb80.png', // 分享图标  
		success: function() {
			uni.showToast({
				title: '分享成功',
				duration: 2000
			});
		},
	});
	//分享朋友圈  
	jswx.onMenuShareAppMessage({
		title: '湖北医疗物资需求信息平台', // 分享标题  
		desc: '武汉加油', // 分享描述  
		link: 'https://onwh.51rry.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致  
		imgUrl: 'https://img.51rry.com/onwh/logo/8df93ea862d55499c6727b66f97cb80.png', // 分享图标  
		success: function() {
			uni.showToast({
				title: '分享成功',
				duration: 2000
			});
		}
	});
})
//  h5分享配置

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

Vue.prototype.$api = api
Vue.prototype.$utils = utils;
Vue.prototype.$redis = redis;
Vue.filter('cityname', cityNameFilter)

app.$mount()
