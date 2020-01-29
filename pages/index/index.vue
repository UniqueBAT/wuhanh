<template>
	<view class="list">
		<view class="fixed-box">
			<view class="home-head">
				<tabs ref="tab" :tabData="tabList" :defaultIndex="current" @tabClick='tabClick'></tabs>
			</view>
			<view class="city-wrap">
				<text :class="['city-item',isCity == '-1' ? 'city-active' : '']" @tap="checkCity(-1)">全部地区</text>
				<text v-for="(item,index) in cityList" :key="index" :class="['city-item',isCity == index ? 'city-active' : '']"
				 @tap="checkCity(index)">{{item | cityname}}</text>
				<view :class="['city-item', 'city-select', isCity == '100' ? 'city-active' : '']" @tap="handleSelectCity">
					<text class="city-select-text">{{cityPickerValue.text || '选择更多地区'}}</text>
				</view>
			</view>
			<view class="city-search">
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
							<view class="badge badge-orange" v-if="item.needToPay">接受付费购买</view>
							<view class="badge badge-green" v-if="item.status==='1'">信息已核实</view>
							<view class="badge badge-gray" v-if="item.status==='0'">信息未核实</view>
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
				<view class="swiper-item" v-for="(item,index) in carList" :key="index" v-if="carList.length > 0">
					<view class="item-top">
						<view class="top-left">
							<view class="left-box">
								<text class="item-name" v-text="item.carTeamName"></text>
								<text class="item-sex" style="color: #666;">车队联系人：{{item.name ? item.name : '张三'}}</text>
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
				<view v-show="showOne">
					<view class="title">【紧急通知】</view>
					<view class="content">接到举报反馈，发现部分医院物资数量真实性与实际需求并不符，现对审核标准，合规发布有如下说明：</view>
					<view class="content">💥平台暂不发布“无医院官网”或“无医院微信公众号”或“无医院官方微博”的医院机构求助信息；</view>
					<view class="content">💥只接受医院发布官方认证的，并接受社会监督，避免引发扰乱政府救助、社会治安秩序等违法乱纪的行为；</view>
					<view class="content" style="padding-bottom: 10px;">💥审核规则标准更新，需待定更新！</view>
				</view>
				<view v-show="!showOne">
					<view class="title">特别声明</view>
					<view class="content">本平台认证信息均由平台志愿者认证通过</view>
					<navigator url="../respos/respos" class="lianjie">平台免责说明</navigator>
				</view>
				<view class="mian-ben" @click="closeMian">确定</view>
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
					this.loadData(this.PullScroll, 1);
				} else {
					this.company = value
					this.loadData(this.PullScroll, 0);
				}
			}
		},
		data() {
			return {
				showOne: true,
				showMian: true,
				placeholder: '请输入你要搜索的医院名称',
				PullScroll: '',
				company: '',
				city: '',
				showFunc: false,
				showModel: false,
				callList: [],
				list: [],
				bottomList: [],
				carList: [],
				startNum: 1,
				current: 0,
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
		methods: {
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
					})
				});
				clipboard.on('error', function(e) { //复制失败执行的回调，可选
					console.log(e);
					uni.showToast({
						title: toastMsg,
						icon: 'none',
						duration: 1500
					})
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
				this.showModel = true;
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
			checkCity(index) {
				this.isCity = index;
				this.company = ''
				if (index == -1) {
					this.city = ''
				} else {
					this.city = this.cityList[index]
				}
				this.loadData(this.PullScroll, 1);
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
				params.city = that.city
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
				console.log('index', pullScroll)
				if(index == 1) {
					pullScroll.reset();
				}
				const loadList = (method, tab, tabName, listKey) => {
					method(params)
						.then(res => {
							that.startNum = index + 1
							const total = res.data.total
							const list = res.data.list
							tab.title = `${tabName}(${total})`
							if (index == 1) {
								that[listKey] = list
							} else {
								that[listKey] = that.list.concat(list)
							}
							if(!that[listKey].length) {
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
					} else if (that.company) {
						params.company = that.company
					}
					loadList(that.$api.getDemandList, that.tabList[0], '医院需求', 'list')
				} else {
					params.city = that.city
					params.keyword = that.company
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

			.item-sub {
				color: $gray;
			}

			.item-top-v2 {
				border-bottom: 1px solid $border;
				padding-bottom: 10px;

				.item-name {
					font-size: 14px;
					padding: 10px 0;
				}

				.item-types {
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
			border-radius: 5px;
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
			}
		}
	}
</style>
