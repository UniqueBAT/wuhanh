<template>
	<view class="list">
		<view class="home-head">
			<tabs ref="tab" :tabData="tabList" :defaultIndex="current" @tabClick='tabClick'></tabs>
		</view>
		<view class="city-wrap">
			<text :class="['city-item',isCity == '-1' ? 'city-active' : '']" @tap="checkCity(-1)">全部地区</text>
			<text 
				v-for="(item,index) in cityList"
				:key="index"
				:class="['city-item',isCity == index ? 'city-active' : '']"
				@tap="checkCity(index)"
			>{{item | cityname}}</text>
			<view :class="['city-item', 'city-select', !!cityPickerValue.text ? 'city-active' : '']" @tap="handleSelectCity">
				<text class="city-select-text">{{cityPickerValue.text || '选择更多地区'}}</text>
			</view>
		</view>
		<view class="city-search">
			<input class="search-input" type="text" :value="company" v-model="company" :placeholder="placeholder" />
		</view>
		<section class="PullScroll-Page" v-show="current == 0">
			<PullScroll ref="pullScroll" :fixed="false" :back-top="true" :pullDown="pullDown" :pullUp="pullUp">
				<view class="swiper-item" v-for="(item,index) in list" :key="index" v-if="list.length > 0">
					<view class="item-top">
						<view class="top-left">
							<view class="left-box">
								<text class="item-name" v-text="item.company"></text>
								<text class="item-sex">{{item.createTime ? item.createTime : '2020-01-24 19:00'}}</text>
							</view>
						</view>
						<view class="item-rights">
							<view :class="['top-right',item.type == 0 ? '' : 'tip-active']">{{item.type == 0 ? '接受个人捐赠' : '不接受个人捐赠'}}</view>
							<view class="text">来源：{{item.source ? item.source : '网络'}}</view>
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
						</view>
					</view>
					<view class="item-call flex-between">
						<text></text>
						<view class="call-btn" @tap="handleModel(index)">联系医院</view>
					</view>
				</view>
			</PullScroll>
		</section>
		<section class="PullScroll-Page" v-show="current != 0">
			<PullScroll ref="pullScroll" :fixed="false" :back-top="true" :pullDown="pullDown" :pullUp="pullUp">
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
								<text class="time">更新时间： {{item.updateTime}}</text>
							</view>
						</view>
						<view class="item-info">{{item.remark}}</view>
						<button class="btn-edit" @click="navToCarChange(item)">车辆信息有误，点这里提交修改申请</button>
					</view>
					
				</view>
			</PullScroll>
		</section>
		<!-- <view class="right-us" @tap="handleModel(-1)">
			<image src="../../static/logo.png" mode="widthFix" class="us-img"></image>
			<view class="call-btns">us</view>
		</view> -->
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
		<mpvue-city-picker themeColor="#007AFF" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue.pickerValue"
			   :shouldShowArea="false"
			   @onConfirm="onCityPickerConfirm"></mpvue-city-picker>
	</view>
</template>

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
			navToCarChange(itemData){
				let id = itemData.id
				uni.navigateTo({
					url: '../addcar/addcar?id='+id
				})
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
					itemList: ['复制工作人员 1 微信', '复制工作人员 2 微信', '在线补充医院名单', '在线补充车辆名单'],
					itemColor: '#007AFF',
					success: (res) => {
						switch(res.tapIndex) {
							case 0:
								this.copyPhone('Best_jungle', true);
								break
							case 1:
								this.copyPhone('kindyin', true);
								break
							case 2:
								uni.navigateTo({
									url: '/pages/addhospital/addhospital'
								})
								break
							case 3:
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
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				let that = this;
				that.PullScroll = pullScroll
				// that.list = [];
				setTimeout(() => {
					that.loadData(pullScroll, 1);
				}, 200);
			},
			pullUp(pullScroll) {
				let that = this;
				that.startNum++
				that.loadData(pullScroll, that.startNum);
			},
			loadData(pullScroll, index) {
				let that = this;
				let params = {
					pageSize: 10,
					start: index,
				}
				if (that.current == 0) {
					if (that.city) {
						params.city = that.city
					} else if (that.company) {
						params.company = that.company
					}
					that.$api.getDemandList(params)
						.then(res => {
							if (this.list.length > res.data.total) {
								if (index == 1) {
									that.list = res.data.list
								}
								pullScroll.finish();
							} else {
								pullScroll.success();
								console.log(res.data.total)
								that.tabList[0].title = '医院需求' + '(' + res.data.total + ')'
								if (index == 1) {
									that.list = res.data.list
								} else {
									that.list = that.list.concat(res.data.list)
								}
							}
						}).catch(err => {
							console.log(err)
						})
				} else {
					params.city = that.city
					params.keyword = that.company
					that.$api.getCarList(params).then(res => {
							that.tabList[1].title = '车辆资源' + '(' + res.data.total + ')'
							that.carList = res.data.list
						}
					)
				}
			},
			handleSelectCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onCityPickerConfirm(e) {
				const city = e.label.split('-')[1];
				this.cityPickerValue = {
					pickerValue: e.value,
					text: city
				}
				this.city = city;
				this.loadData(this.PullScroll, 1);
			},
		},
		onLoad() {
			this.refresh();
			this.getTabList();
		}
	};
</script>

<style lang="scss">
	$main: #80ADED;
	.city-search {
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
		height: 100vh;

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
				
				.time {
					color: #999999;
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
				display: flex;
				align-items: center;
				height: 80upx;

				.text {
					
					font-size: 14px;
					color: #333333;
				}
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
		z-index: 10;
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
		z-index: 100;
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
</style>
