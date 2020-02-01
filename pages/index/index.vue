<template>
	<view class="list">
		<view class="fixed-box">
			<view class="home-head">
				<tabs ref="tab" :tabData="tabList" :defaultIndex="current" @tabClick='tabClick'></tabs>
			</view>
			<view class="city-wrap" v-if="current == 0">
				<text :class="['city-item',isCity == '-1' ? 'city-active' : '']" @tap="checkCity(-1,1)">全部地区</text>
				<text v-for="(item,index) in cityList" :key="index" :class="['city-item',isCity == index ? 'city-active' : '']"
				 @tap="checkCity(index,1)">{{item | cityname}}</text>
				<view :class="['city-item', 'city-select', isCity == '100' ? 'city-active' : '']" @tap="handleSelectCity">
					<text class="city-select-text">{{cityPickerValue.text || '选择更多地区'}}</text>
				</view>
			</view>
			<view class="city-wrap" v-if="current == 1">
				<text v-for="(item,index) in typeList" :key="index" :class="['city-item',isType == index ? 'city-active' : '']"
				 @tap="checkCity(index,2)">{{item}}</text>
			</view>
			<view class="city-search">
				<span v-if="current == 0" @click="toggleSelectStatus(!showSelectStatus)">{{statusMap[currentStatus]}}<i class="down"></i>
					<ul class="pop-fixed" v-if="!!showSelectStatus">
						<li :class="currentStatus===99?'current':''" @click="selectStatus(99)">全部状态</li>
						<li :class="currentStatus===1?'current':''" @click="selectStatus(1)">已核实</li>
						<li :class="currentStatus===0?'current':''" @click="selectStatus(0)">核实中</li>
						<li :class="currentStatus===-1?'current':''" @click="selectStatus(-1)">核实未通过</li>
					</ul>
				</span>
				<input class="search-input" type="text" :value="company" v-model="company" :placeholder="placeholder" />
				<image src="../../static/icon_Search.svg" class="search-icon" mode="widthFix"></image>
			</view>
		</view>
		<view class="blank-boxs"></view>
		<section class="PullScroll-Page" v-show="current == 0">
			<PullScroll ref="pullScrollHospital" :fixed="false" :back-top="true" :pullDown="pullDown" :pullUp="pullUp">
				<view class="swiper-item" v-for="(item,index) in list" :key="index" v-if="list.length > 0">
					<view class="item-top-v2">
						<view class="item-types">
							<view>
								<view class="badge badge-green" v-if="item.status==='1'">信息已核实</view>
								<view class="badge badge-gray" v-if="item.status==='0'">信息核实中</view>
								<view class="badge badge-red" v-if="item.status==='-1'">核实未通过</view>
							</view>
							<view class="right-top" v-if="item.critical">
								<view>物资紧急度：</view>
								<image v-for="(child,index) in (item.critical ? item.critical : 0)" :key="index" class="right-fire" src="../../static/img_fire.png"
								 mode="widthFix"></image>
							</view>
						</view>
						<view class="item-name" v-text="item.company"></view>
						<view class="flex-between">
							<view>{{item.createTime}}</view>
							<view class="item-sub">来源：{{item.source || '网站'}}</view>
						</view>
					</view>
					<view class="item-main">
						<view class="item-more flex-between">
							<text>急需物资类型</text>
							<view>
								<text class="more-main" @tap="toDetails(item.id)">更多详情</text>
								<svg style="position: absolute; margin: 5rpx 0rpx 10rpx -24rpx;" width="10px" height="18px" viewBox="0 0 14 24"
								 version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
									<title>返回</title>
									<desc>Created with Sketch.</desc>
									<g stroke="none" stroke-width="1" fill="#999999" fill-rule="evenodd" transform="translate(30, 40)rotate(180)">
										<path d="M26,27.9703032 L17.3690593,36.7610719 C17.0543445,37.0817458 16.5454834,37.0793158 16.2331535,36.7556718 C15.9208236,36.4310378 15.9229435,35.9107414 16.2378349,35.5886274 L23.7139675,27.9745332 L16.2396015,20.4131798 C15.9233851,20.0921458 15.9196753,19.5716693 16.231387,19.2461353 C16.5392121,18.9240213 17.0448933,18.9171813 17.3610214,19.2308351 C17.3631413,19.2329052 17.3652612,19.2349752 17.3672927,19.2371352 L26,27.9703032 Z"
										 id="返回" transform="translate(21.000000, 28.000000) scale(-1, 1) translate(-21.000000, -28.000000) "></path>
									</g>
								</svg>
							</view>
						</view>
						<view class="item-content">
							<view class="item-wuzi flex-between" v-for="(child,idx) in item.details" :key="idx" v-if="idx<=2">
								<text class="text">{{child.name}}</text>
								<text v-if="child.amount > 0">{{child.amount}} / {{child.unit}}</text>
								<text v-else>不限</text>
							</view>
							<view class="item-call flex-between">
								<text></text>
								<view class="call-btn" @tap="handleModel(index)">联系医院</view>
							</view>
						</view>
					</view>
				</view>
			</PullScroll>
		</section>
		<section class="PullScroll-Page" v-show="current != 0">
			<PullScroll ref="pullScrollCar" :fixed="false" :back-top="true" :pullDown="pullDown" :pullUp="pullUp">
				<view class="swiper-item" v-for="(item,index) in carList" :key="index" v-if="carList.length > 0 && item.name">
					<view class="type-box" v-if="item.category == 1">政府资源</view>
					<view class="type-box type-min" v-if="item.category == 2">民间志愿者</view>
					<view class="type-box type-wuliu" v-if="item.category == 3">物流公司</view>
					<view class="type-box type-other" v-if="item.category == 4">其它</view>
					<view class="item-top">
						<view class="top-left">
							<view class="left-box">
								<text class="item-name" v-text="item.carTeamName"></text>
								<text class="item-sex" style="color: #666;">车队联系人：{{item.name ? item.name : ''}}</text>
							</view>
						</view>
						<view class="item-rights">
							<view class="call-btn" @tap="callSomeOne(item.phone)" style="position: absolute;right: 0;">拨打电话</view>
						</view>
					</view>
					<view class="item-main">
						<view class="item-content">
							<view class="item-wuzi flex-between">
								<text class="text">配送范围</text>
								<text>{{item.deliveryArea}}</text>
							</view>
							<view class="item-wuzi flex-between">
								<text class="text">配送时间</text>
								<text>{{item.deliveryStartTime}}--{{item.deliveryEndTime}}</text>
							</view>
							<view class="item-wuzi flex-between">
								<text class="text">备注信息</text>
								<text class="item-sub">更新时间： {{item.updateTime}}</text>
							</view>
						</view>
						<view class="item-info">{{item.remark}}</view>
						<button class="btn-edit" @click="navToCarChange(item)">车辆信息有误，点这里提交修改申请</button>
					</view>
				</view>
				<!-- <view class="blank-boxs"></view> -->
				<!-- <view class="none-data" v-if="carList.length == 0">
					暂无更多了
				</view> -->
			</PullScroll>
		</section>

		<view class="bottom-btn" @tap="showMore">医院和车辆资源需要补充，点这里与工作人员联系添加</view>
		<!-- <view class="more-func"></view> -->
		<view class="model-wrap" v-show="showModel" @tap="hideModel">
			<view class="model">
				<view class="model-item flex-between" v-for="(item,index) in callList" :key="index">
					<text class="text">{{item.name}}</text>
					<view class="phone-wrap">
						<text class="copy-key copy" v-if="item.phone" @tap="copyPhone(item.phone)">一键复制</text>
						<text class="call-btn" v-if="item.phone" @tap="callSomeOne(item.phone)">拨打电话</text>
						<text class="model-email" v-if="item.email" @tap="copy(item.email)">{{item.email}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="model-mianze-box" v-show="showMian">
			<view class="model-mianze">
				<view>
					<view class="title">特别声明</view>
					<view class="content">本平台认证信息均由平台志愿者认证通过，仅作为捐助企业参考使用。</view>
					<navigator url="../respos/respos" class="lianjie">平台免责说明</navigator>
					<navigator url="../about/index" class="lianjie">关于我们</navigator>
				</view>
				<view class="mian-ben" @click="closeMian">确定</view>
			</view>
		</view>
		<view class="model-mianze-box" v-show="showMoveMian">
			<view class="model-mianze-move" style="padding: 20px 10px;width: 90%;">
				<view class="move">
					<view class="m-title">网址迁移声明</view>
					<view class="m-title" style="font-size: 12px;line-height: 22px;">因近期平台访问数据量过大，为保证平台数据稳定和安全性对原有访问网址进行了更换请知悉</view>
					<view class="title" style="font-size: 14px;margin: 10px 0;">《湖北医疗物资供需信息平台免责协议》</view>
					<view class="m-content">
						第一条 协议订立</br>
						1.1
						用户在同意本网站：E起支援-疫情物资供需平台(https：//www.eqizhiyuan.qq.com)公示的《E起支援-疫情物资供需平台免责协议》后，方可使用本网络服务平台（以下简称“平台”）提供的湖北省辖区内医疗物资供需信息相关服务（以下简称“服务”）。
						</br>1.2 用户在使用本平台提供的服务前务必认真阅读本协议，一旦用户使用本平台提供的服务即表示用户同意与本平台签订本协议且同意接受本协议之约束。

						</br>第二条 服务说明
						</br>2.1 疫区医疗机构（以下简称“受赠方”）通过本平台获取的捐赠物资均由第三方提供（以下简称“捐赠方”），本平台仅为技术服务提供方。
						</br>2.2 由于疫情期间存在客观情况限制或政府政策原因等多种不确定因素影响，本平台不对捐赠方的实际捐赠情况进行任何形式的承诺，同时所有捐赠方目前亦无法对实际捐赠情况作出相关承诺。
						</br>2.3
						关于平台发布的物资需求内容请以疫区医疗机构在各大官方渠道发布的信息为准（包括但不限于医疗机构官方网站、认证微博、官方微信公众号、已在互联发布并经核实属实的医疗机构签章文件等），本平台仅对搜集获取的内容进行整理编辑及展示。

						</br>第三条 用户的权利和义务
						</br>3.1 捐赠方在进行捐赠前,应仔细阅读并接受受赠方所公示的内容。本协议中涉及受赠方与捐赠方之间权利义务的内容，如有与我国相关法律冲突的，以我国相关法律为准。
						</br>3.2 捐赠方进行捐赠时，应当准确填写捐赠物资类目及具体数量、详细联系方式、涉及相关技术规范要求的合格证编号等信息内容。
						</br>3.3 捐赠方提交捐赠信息后，应及时将捐赠物资向受赠方进行送达工作。
						</br>3.4 如捐赠方需取得相应凭证，应自行与受赠方联系取得。捐赠方因捐赠各项事宜产生争议由用户自行与受赠方协商解决。
						</br>3.5 用户同意本平台向捐赠方、受赠方、物流提供方等相关单位、个人披露用户提交捐赠信息中所涉及的个人信息。

						</br>第四条 免责说明
						</br>4.1 因疫情变化，本平台显示的信息仅供参考，最终以受赠方实际需求为准。
						</br>4.2 因用户提供错误信息或虚假信息所导致的损失，由用户自行承担，本平台不承担任何责任。
						</br>4.3 本平台为公益性信息平台，受赠方与捐赠方产生任何纠纷与本平台无关。
						</br>4.4 本平台会尽力维护平台信息的安全，但因出现法律规定的不可抗力情形，以及因为黑客入侵、计算机病毒等原因造成用户资料泄露、丢失、被盗用、被篡改的，本平台不承担任何责任。
						</br>4.5
						本平台仅提供技术服务，非捐赠方、受赠方、物流提供方等其他第三方之间的权利义务（包括但不限于赠与法律行为、运输合同行为、产品侵权责任等）主体，不介入用户与受赠方、捐赠物资使用方或物流提供方之间的纠纷，但本平台将提供一切与本平台信息发布相关的合法范围内的必要协助，保护用户的合法权益。
						</br>4.6 本平台如被恶意篡改用于不正当募捐使用，一律追责。。
						</br>4.7 本平台唯一官方网址：https：//www.eqizhiyuan.qq.com（E起支援-疫情物资供需平台)如被人恶意假借名义进行不正当行为，与本平台无关。并且保留对其追究法律责任的权力。
						</br>第五条 争议解决及法律适用
						</br>5.1 在用户有意向捐赠后，如果在本协议约定内容履行过程中，对相关事宜的履行发生争议，应当协商解决，如协商不成，用户同意按照中华人民共和国颁布的相关法律法规来解决争议，并同意接受湖北省武汉市人民法院的管辖。
						<view class="mian-ben" @click="closeMoveMian">免责申请已阅读完毕</view>
					</view>
				</view>
			</view>
		</view>

		<mpvue-city-picker themeColor="#007AFF" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue.pickerValue"
		 :shouldShowArea="false" @onConfirm="onCityPickerConfirm"></mpvue-city-picker>
	</view>
</template>

<script type="text/javascript">
	var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
	document.write(unescape("%3Cspan id='cnzz_stat_icon_1278590114'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol +
		"v1.cnzz.com/z_stat.php%3Fid%3D1278590114%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
</script>
<script>
	import PullScroll from '../../components/s-pull-scroll/index.vue'
	import tabs from '../../components/yc_tabs/yc_tabs.vue'
	import Clipboard from '../../utils/common/clipboard.min.js'
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import util from '@/utils/util';
	import {
		Request
	} from '../../utils/http.js'
	export default {
		components: {
			PullScroll,
			tabs,
			mpvueCityPicker,
		},
		watch: {
			company(value) {	
				if (this.current == 0) {
					this.company = value
					this.debouncedSearch(value);
				} else {
					this.company = value
					this.debouncedSearch(value)
				}
			}
		},
		data() {
			return {
				showOne: false,
				showMian: true,
				showMoveMian: false,
				placeholder: '请输入你要搜索的医院名称',
				PullScroll: '',
				company: '',
				city: '',
				showSelectStatus: false,
				currentStatus: 99,
				showFunc: false,
				showModel: false,
				callList: [],
				list: [],
				bottomList: [],
				carList: [],
				startNum: 1,
				current: 0,
				statusMap: {
					99: '全部状态',
					0: '核实中',
					1: '已核实',
					'-1': '核实未通过'
				},
				typeList: ['政府车辆资源', '民间志愿者', '物流公司', '其它'],
				isType: 0,
				tabList: [{
					title: '医院需求(0)',
					hasRed: false,
					isShow: true,
					num: '99+'
				}, {
					title: '车辆资源(0)',
					hasRed: false,
					isShow: true,
					num: '99+'
				}],
				isCity: -1,
				cityList: ["武汉", "荆州", "黄石", "宜昌"],
				cityPickerValue: {
					pickerValue: [16, 0, 0],
					text: '',
				},
			};
		},
		onLoad() {
			// let _that = this
			// if (!_that.$redis.get('showMoveMian')) {
			// 	_that.showMoveMian = true
			// 	_that.$redis.set('showMoveMian', 1, _that.$constant.SHOWMOVE_EXPRIED_TIME)
			// } else {
			// 	_that.showMoveMian = false
			// }
		},
		mounted() {
			this.debouncedSearch = util.debounce(this.search)
		},
		methods: {
			search(value){
				let that = this;
				if(that.current == 0){
					let params = {
						pageSize: 0,
						start: 1,
						company: value
					}
					if(this.city){
						params.city = this.city;
					}
					if(this.currentStatus!==99){
						params.status = this.currentStatus;
					}
					that.$api.getDemandList(params).then(res => {
						that.list = res.data.list
					})
				}else{
					let params = {
						pageSize: 0,
						start: 1,
						keyword: value,
						category: that.isType + 1
					}
					that.$api.getCarList(params).then(res => {
						that.carList = res.data.list
					})
				}
			},
			closeMoveMian() {
				this.showMoveMian = false
			},
			selectStatus(status) {
				this.currentStatus = status;
				this.loadData(this.PullScroll, 1);
			},
			toggleSelectStatus(bool) {
				this.showSelectStatus = !!bool;
			},
			navToCarChange(itemData) {
				let id = itemData.id
				uni.navigateTo({
					url: '../addcar/addcar?id=' + id
				})
			},
			closeMian() {
				if (this.showOne) {
					this.showOne = false
				} else {
					this.showMian = false;
				}
			},
			copyPhone(phone, isWechat = false) {
				const clipboard = new Clipboard('.copy, .uni-actionsheet__cell:nth-child(1), .uni-actionsheet__cell:nth-child(2)', {
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
					console.log(e);
					uni.showToast({
						title: toastMsg,
						icon: 'none',
						duration: 1500
					});
					clipboard.destroy();
				});
			},
			handleModel(index) {
				if (index == -1) {
					this.callList = [{
						name: '印凯',
						phone: '15071369696'
					}, {
						name: '邮箱',
						email: 'lp_developer@163.com'
					}]
				} else {
					this.callList = this.list[index].contacts;
				}
				if (this.callList.length) {
					this.showModel = true;
				} else {
					uni.showToast({
						title: '暂无联系方式',
						icon: 'none',
						duration: 1500
					})
				}
			},
			hideModel() {
				this.showModel = false;
			},
			toDetails(id) {
				uni.navigateTo({
					url: '../details/details?id=' + id
				})
			},
			tabClick(e) {
				let current = typeof e === 'object' ? e.detail.current : e;
				this.current = current;
				if (current == 0) {
					this.placeholder = '请输入你要搜索的医院名称'
				} else {
					this.placeholder = '请输入你要搜索的车辆信息'
				}
				this.company = ''
				this.PullScroll = current ? this.$refs.pullScrollCar : this.$refs.pullScrollHospital;
				this.$refs.tab.tabToIndex(current);
				this.loadData(this.PullScroll, 1);
			},
			checkCity(index, type) {
				if (type == 1) {
					this.isCity = index;
					this.company = ''
					if (index == -1) {
						this.city = ''
					} else {
						this.city = this.cityList[index]
					}
					this.loadData(this.PullScroll, 1);
				} else {
					this.isType = index;
					this.loadData(this.PullScroll, 1);
				}
			},
			getTabList() {
				let that = this;
				Request.doInvoke('demand/city', 'GET')
					.then(res => {
						if (res.code === '10000') {
							that.cityList = (res.data || []).filter(city => !!city)
						}
					}).catch(err => {
						console.log(err)
					})
			},
			showMore() {
				let that = this
				uni.showActionSheet({
					/* '拨打工作人员电话', '复制工作人员微信', */
					itemList: ['复制工作人员微信', '在线补充医院名单', '在线补充车辆名单'],
					itemColor: '#007AFF',
					success: (res) => {
						switch (res.tapIndex) {
							case 0:
								this.copyPhone('kindyin', true);
								break
							case 1:
								uni.navigateTo({
									url: '/pages/addhospital/addhospital'
								})
								break
							case 2:
								uni.navigateTo({
									url: '/pages/addcar/addcar'
								})
								break
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			// 打电话功能
			callSomeOne(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			//初始化下拉加载插件和数据
			refresh() {
				this.$nextTick(() => {
					this.PullScroll = this.$refs.pullScrollHospital;
					this.$refs.pullScrollHospital.refresh();
				});
			},
			pullDown() {
				// this.list = [];
				setTimeout(() => {
					this.loadData(this.PullScroll, 1);
				}, 200);
			},
			pullUp() {
				this.loadData(this.PullScroll, this.startNum);
			},
			loadCar(index) {
				let that = this;
				let params = {
					pageSize: 10,
					start: index,
				}
				params.keyword = that.company
				that.$api.getCarList(params).then(res => {
					that.tabList[1].title = '车辆资源' + '(' + res.data.total + ')'
					that.carList = res.data.list
				})
			},
			loadData(pullScroll, index) {
				let that = this;
				let params = {
					pageSize: 10,
					start: index,
				}
				if (this.currentStatus !== 99) {
					params.status = this.currentStatus;
				}
				if (index == 1) {
					pullScroll.reset();
				}
				const loadList = (method, tab, tabName, listKey) => {
					method(params)
						.then(res => {
							that.startNum = index + 1
							const total = res.data.total
							const list = res.data.list
							tab.title = `${tabName}(${total})`
							if (that.current == 0) {
								if (index == 1) {
									that[listKey] = list
								} else {
									that[listKey] = that.list.concat(list)
								}
							} else {
								if (index == 1) {
									that[listKey] = list
								} else {
									// that[listKey] = that.carList.concat(list)
									that.carList = that.carList.concat(list)
								}
							}
							if (!that[listKey].length) {
								pullScroll.empty();
							}
							if (that[listKey].length >= total) {
								pullScroll.finish();
							} else {
								pullScroll.success();
							}
						}).catch(err => {
							console.log(err)
						})
				}

				if (that.current == 0) {
					if (that.city) {
						params.city = that.city
					} 
					if (that.company) {
						params.company = that.company
					}
					loadList(that.$api.getDemandList, that.tabList[0], '医院需求', 'list')
				} else {
					params.keyword = that.company
					params.category = that.isType + 1;
					loadList(that.$api.getCarList, that.tabList[1], '车辆资源', 'carList')
				}
			},
			handleSelectCity() {
				this.$refs.mpvueCityPicker.show();
			},
			onCityPickerConfirm(e) {
				const city = e.label.split('-')[1];
				this.cityPickerValue = {
					pickerValue: e.value,
					text: city
				}
				this.isCity = 100;
				this.city = city;
				this.loadData(this.PullScroll, 1);
			},
		},
		onShow() {
			this.refresh();
			this.getTabList();
			this.loadCar(1);
		}
	};
</script>

<style lang="scss">
	@import "@/styles/variables.scss";

	.badge {
		border-radius: 0 0 4px 4px;
		height: 30px;
		line-height: 30px;
		font-size: 12px;
		color: #FFFFFF;
		padding: 0 20upx;
		display: inline-block;
		background: $main;

		&-orange {
			background: $orange;
		}

		&-green {
			background: $green;
		}

		&-gray {
			background: $gray;
		}
	}

	.city-search {
		display: flex;
		position: relative;
		box-sizing: border-box;
		background: #F8F8F8;
		padding: 20upx;

		span {
			font-size: 14px;
			display: inline-block;
			line-height: 32px;
			position: relative;
			width: 100px;
			padding-right: 20px;
			margin-left: 5px;

			ul,
			li {
				margin: 0;
				padding: 0;
				list-style: none;
			}

			.pop-fixed {
				position: absolute;
				left: 50%;
				// bottom: 0;
				width: 90px;
				margin-left: -50px;
				background-color: #fff;
				border-radius: 5px;
				// border: 1px solid #fff;
				box-shadow: grey 0px 0px 5px;

				li {
					text-align: center;
					border-bottom: 1px solid #eee;
				}

				li:nth-last-child(1) {
					border: 0px;
				}

				.current {
					color: #80ADED;
				}
			}

			.pop-fixed:before {
				content: " ";
				border-left: 10px solid transparent;
				border-top: 10px solid transparent;
				border-right: 10px solid transparent;
				border-bottom: 10px solid #eee;
				position: absolute;
				left: 50%;
				top: -18px;
				margin-left: -5px;
			}

			.pop-fixed:after {
				content: " ";
				border-left: 12px solid transparent;
				border-top: 12px solid transparent;
				border-right: 12px solid transparent;
				border-bottom: 12px solid #fff;
				position: absolute;
				left: 50%;
				top: -19px;
				margin-left: -7px;
			}
		}

		i.down {
			position: absolute;
			right: 0px;
			top: 0;
			background: url(../../static/icon_down.svg) no-repeat center center;
			width: 20px;
			display: inline-block;
			height: 30px;
		}

		.search-input {
			box-sizing: border-box;
			background: #E6E6E6;
			border-radius: 34upx;
			width: 100%;
			height: 60upx;
			line-height: 60upx;
			padding: 0 30upx;
		}

		.search-icon {
			width: 28upx;
			height: 28upx;
			position: absolute;
			right: 25px;
			top: 18px;
		}
	}

	.city-wrap {
		height: 100rpx;
		width: 100%;
		background: #FFFFFF;
		box-shadow: inset 0 1px 0 0 #EDEDED;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.city-item {
			font-size: 14px;
			color: #80ADED;
			letter-spacing: 0;
			text-align: center;
		}

		.city-select {
			&-text {
				display: inline-block;
				max-width: 100px;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				vertical-align: middle;
			}

			&.city-active {
				&::after {
					display: inline-block;
					content: "";
					margin-left: 3px;
					vertical-align: middle;
					border: 5px dashed transparent;
					border-top: 5px solid #fff;
					border-bottom: 0 none;
				}
			}
		}

		.city-active {
			background: #80ADED;
			border-radius: 17px;
			border-radius: 17px;
			font-size: 14px;
			color: #FFFFFF;
			letter-spacing: 0;
			text-align: center;
			padding: 5px 9px;
		}
	}

	.btn-edit {
		font-size: 12px;
		color: $main;
		background: none;
		height: 40px;
		border-radius: 0;
		line-height: 40px;
		background-color: #fff;

		&::after {
			border: 1px solid $main;
			border-radius: 4px;
		}

		&.button-hover {
			background: darken(#fff, 10%)
		}
	}

	.PullScroll-Page {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 344upx;
		padding-bottom: 100upx;

		.btn {
			width: 100%;
			height: 80rpx;
			font-size: 28rpx;

			&:not(:first-child) {
				margin-top: 40rpx;
			}
		}

		.swiper-item {
			background-color: #FFFFFF;
			padding: 0 20upx;
			margin-bottom: 20upx;
			box-sizing: border-box;
			font-size: 12px;

			.type-box {
				display: flex;
				align-items: center;
				justify-content: center;
				font-family: PingFangSC-Semibold;
				background: #6236FF;
				border-radius: 0 0 4px 4px;
				font-size: 12px;
				color: #FFFFFF;
				width: 200upx;
				height: 60upx;
			}

			.type-min {
				background: #7FAE00 !important;
			}

			.type-wuliu {
				background: #00B8B2 !important;
			}

			.type-other {
				background: #5B95A2 !important;
			}

			.item-sub {
				color: $gray;
			}

			.item-top-v2 {
				border-bottom: 1px solid $border;
				padding-bottom: 10px;

				.item-name {
					font-weight: 600;
					font-size: 16px;
					padding: 10px 0;
				}

				.item-types {
					justify-content: space-between;
					align-items: center;
					display: flex;

					.badge {
						margin-right: 10px;
					}
				}
			}

			.item-top {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 140upx;
				border-bottom: 1upx solid #ededed;

				.item-rights {
					.tip-active {
						background-color: #999 !important;
					}

					.top-right {
						position: absolute;
						right: 0upx;
						top: 0;
						width: 210upx;
						display: flex;
						align-items: center;
						justify-content: center;
						background: #FFC936;
						border-radius: 0 0 4px 4px;
						height: 60upx;
						font-size: 24upx;
						color: #FFFFFF;
						padding: 0 20upx;
					}

					.text {
						font-size: 24upx;
						color: #999999;
						display: block;
						text-align: center;
						padding-top: 40upx;
					}
				}

				.top-left {
					display: flex;
					align-items: center;

					.item-avatar {
						width: 88upx;
						height: 88upx;
					}

					.left-box {
						display: flex;
						flex-direction: column;

						.item-name {
							width: 500upx;
							font-weight: 600;
							font-size: 28upx;
							color: #333333;
							padding-bottom: 20upx;
						}

						.item-sex {
							font-weight: 600;
							font-size: 24upx;
							color: #333;
						}
					}
				}
			}

			.item-main {
				padding-bottom: 10px;

				.item-more {
					display: flex;
					align-items: center;
					height: 76upx;
					color: #333;
					font-size: 28upx;

					.more-main {
						margin-right: 30rpx;
						color: var(--mainColor);
					}
				}

				.item-wuzi {
					border-bottom: 1upx solid #f2f2f2;
					height: 72upx;
					font-size: 24upx;
					color: #000;

					&:last-child {
						border-bottom: 0 none;
					}
				}
			}

			.item-info {
				line-height: 20px;
				min-height: 40px;
				border-bottom: 1upx solid #f2f2f2;
			}

			.btn-edit {
				margin-top: 10px;
			}

			.item-call {
				padding-top: 10px;
			}
		}
	}

	.model-wrap {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1010;
		background: rgba(#000000, 0.5);

		.model {
			width: 80%;
			border-radius: 10px;
			background-color: #fff;
			padding: 0 20upx;

			.model-item {
				padding: 20upx 0;
				display: flex;
				align-items: center;
				border-bottom: 1upx solid #ededed;

				&:last-child {
					border: none;
				}

				.text {
					font-size: 32upx;
					color: #666666;
				}

				.model-email {
					color: var(--mainColor);
					font-size: 32upx;
				}
			}
		}
	}

	.right-us {
		position: fixed;
		right: 0;
		bottom: 300upx;

		.us-img {
			width: 120upx;
		}

		.call-btns {
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1upx solid var(--mainColor);
			background-color: #FFFFFF;
			color: var(--mainColor);
			width: 60upx;
			height: 60upx;
			border-radius: 50%;
			font-size: 28upx;
		}
	}

	.bottom-btn {
		z-index: 1010;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		background: rgba(255, 72, 0, 0.80);
		font-size: 12px;
		color: #FFFFFF;
	}

	.phone-wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.copy-key {
			padding-right: 20upx;
			font-size: 28upx;
			color: #80ADED;
		}
	}

	.blank-boxs {
		width: 100%;
		height: 155px;
		background-color: transparent;
	}

	.fixed-box {
		position: fixed;
		z-index: 999;
		top: 30px;
		left: 0;
		right: 0;
		height: 142px;
		background: #f8f8f8;
	}

	.none-data {
		align-items: center;
		font-size: 14px;
		color: #969799;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.model-mianze-box {
		display: flex;
		z-index: 10000;
		align-items: center;
		justify-content: center;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.5);
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		bottom: 0;

		.model-mianze {
			display: flex;
			justify-content: center;
			flex-direction: column;
		}

		.model-mianze-move {
			height: 465px;
		}

		.model-mianze,
		.model-mianze-move {

			background: #FFFFFF;
			padding: 40upx 100upx;
			border-radius: 8px;
			width: 80%;

			.title {
				font-family: PingFangSC-Medium;
				font-size: 18px;
				color: #000000;
				text-align: center;
			}

			.content {
				font-family: PingFangSC-Medium;
				padding-top: 20upx;
				font-size: 14px;
				color: #000000;
				text-align: justify;
			}

			.lianjie {
				font-family: PingFangSC-Medium;
				font-size: 14px;
				color: #4B8AE5;
				letter-spacing: 0;
				text-align: center;
				margin: 20upx 0;
				float: left;
				width: 50%;
			}

			.mian-ben {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 72upx;
				text-align: center;
				background: #FFFFFF;
				border: 1px solid #4B8AE5;
				border-radius: 18px;
				font-family: PingFangSC-Medium;
				font-size: 14px;
				color: #4B8AE5;
				margin-top: 20px;
			}
		}
	}

	.weixin-platform {
		uni-page-head {
			display: none;
		}

		.fixed-box {
			top: 0;
		}

		.PullScroll-Page {
			top: 284upx;
		}
	}

	.badge-red {
		background: #FF4B4B !important;
	}

	.right-top {
		display: flex;
		align-items: center;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #666666;

		.right-fire {
			margin-left: 10upx;
			width: 24upx;
			height: 30upx;
		}
	}

	.move {
		max-height: 300upx;

		.m-title {
			font-size: 16px;
			color: #FA6400;
			letter-spacing: 0;
			text-align: center;
		}

		.m-content {
			font-size: 12px;
			color: #000000;
			letter-spacing: 0;
			line-height: 17px;
			height: 305px;
			overflow-y: auto;
		}

	}

	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
	::-webkit-scrollbar {
		width: 8px;
		/*滚动条宽度*/
		height: 8px;
		/*滚动条高度*/
	}

	/*定义滚动条轨道 内阴影+圆角*/
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
		border-radius: 5px;
		/*滚动条的背景区域的圆角*/
		background-color: #E5E5E5;
		/*滚动条的背景颜色*/
	}

	/*定义滑块 内阴影+圆角*/
	::-webkit-scrollbar-thumb {
		border-radius: 5px;
		/*滚动条的圆角*/
		-webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, .3);
		background-color: #dddddd;
		/*滚动条的背景颜色*/
	}
</style>
