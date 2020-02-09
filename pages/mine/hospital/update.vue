<template>
    <view>
        <view class="top_back">
			<image src="../../../static/mine/icon_back.svg" @tap="goBack"></image>
        </view>
		<view class="top_info">
			华中科技大学附属同济医院华中科技大学附属同济医院
		</view>
        <view class="hospital-area">
			<view class="area_2">
				<view class="title">所需物资数量</view>
				<template v-for="(item, index) in formData.details">
                    <template v-if="item.name">
                    <view v-if="item.type !== 'textarea'" @click="chooseNum(item, index)" v-bind:key="index">
                        <view class="label">{{item.name}}</view>
                        <view class="show">
                            <text style="font-size: 12px;">{{checkItem(item)}}</text>
                            <view class="icon"></view>
                        </view>
                    </view>
				</template>
</template>
<textarea placeholder="所需物资种类和数量要补充点这里填写" v-model="formData.additionalDetail" style="height:120px;width:100%;border-radius: 4px;padding: 10px;border: 1px solid #EDEDED;margin: 10px 0;"></textarea>
<textarea placeholder="所需物资如有防护标准请在这里标明" v-model="formData.additinalStandard" style="height:120px;width:100%;border-radius: 4px;padding: 10px;border: 1px solid #EDEDED;margin: 10px 0;"></textarea>
</view>

<view class="area_5">
    <view class="title">医院基础信息</view>
    <view>
        <view class="label">剩余物资可用天数：</view>
        <input type="number" placeholder="点击输入" v-model="formData.remainDays">
		<!-- <text class="icon"></text> -->
    </view>
    <view>
        <view class="label">剩余物资统计截止日期：</view>
        <!-- <input type="number" placeholder="选择" v-model="tempInfo.recordDate"> -->
        <!-- <picker mode="date" :value="tempInfo.statisDate" @change="bindDateChange">
            <view class="">{{tempInfo.statisDate || '选择'}}</view>
        </picker> -->
        <picker mode="date" :value="formData.statisDate" @change="bindDateChange">
            <view class="">{{formData.statisDate || '选择'}}</view>
        </picker>
		<!-- <text class="icon"></text> -->
    </view>
</view>


<!-- 底部提交按钮 -->
<view class="foot-btn">
	<view class="submit" @click="submit">
	    提交
	</view>
	<view class="link">其他物资信息调整<br/>点这里联系工作人员</view>
</view>
<!-- <view class="submit" v-if="id" @click="submit">
    提交医院信息修改申请
</view>
<view class="submit" v-else @click="submit">
    提交医院名单申请
</view> -->

<!-- 城市选择弹框 -->
<view v-show="showSelectCityFlag">
    <view class="mask"></view>
    <view class="select-time">
        <view class="time-title">选择医院所在区域</view>
        <view class="content-box">
            <view class="box-time">
                <view class="item-title">省市区选择</view>
                <view v-if="formData.province == ''" type="buttom" @click="showMulLinkageThreePickerSend" class="row-input plh need">选择省市区
                </view>
                <view v-else type="buttom" @click="showMulLinkageThreePickerSend" class="row-input">
                    {{formData.province+formData.city + formData.area}}
                </view>
            </view>
            <view class="box-time">
                <!-- <view class="box-time">
							<view class="item-title">详细地址</view>
							<input placeholder="输入详细地址" class="addrr-input" type="text" v-model="formData.deliveryArea"  />
				</view> -->
            </view>
            <view class="box-btn">
                <view class="btn-left" @click="showSelectCityFlag=false">取消</view>
                <view class="btn-right" @click="sureSelectTime">确定</view>
            </view>
        </view>
    </view>
</view>
<!-- 物质数量选择弹框 -->
<view class="model" v-show="showModel">
    <view class="area">
        <view class="choose">
            <!-- <div>
						<div class="choose-item" @click="nowChoose.type = 0">
							<text :class="{active: nowChoose.type === 0}"></text>
							<text>数量不限</text>
						</div>
					</div> -->
            <view>
                <view class="choose-item" @click="nowChoose.type = 1">
                    <text :class="{active: nowChoose.type === 1}"></text>
                    <text>不需要</text>
                </view>
            </view>
            <view>
                <view class="choose-item" @click="nowChoose.type = 2">
                    <text :class="{active: nowChoose.type === 2}"></text>
                    <text>具体数量</text>
                </view>
                <view class="input-item">
                    <input type="number" v-model="nowChoose.num">
                    <text>个</text>
                </view>
            </view>
        </view>
        <view class="btn-box">
            <view @click="cancel">取消</view>
            <view @click="ok">确认</view>
        </view>
    </view>
</view>

<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onCityConfirm"></mpvue-city-picker>
</view>
</view>
</template>

<!-- 站长统计工具 -->
<script type="text/javascript">
var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
document.write(unescape("%3Ctext id='cnzz_stat_icon_1278590114'%3E%3C/text%3E%3Cscript src='" + cnzz_protocol +
    "v1.cnzz.com/z_stat.php%3Fid%3D1278590114%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));
</script>
<script>
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
import navUrl from '../../../components/nav-url.vue'
import uniIcons from "../../../components/uni-icons/uni-icons.vue"
import uniCard from '@/components/uni-card/uni-card.vue'
import config from '@/utils/config.js'
import {
    Request
} from '../../../utils/http.js'

export default {
    data () {
        return {
            // tempInfo: {},
            id: null,
            details: {},
            url: '/pages/index/index',
            showSelectCityFlag: false,
            showModel: false,
            themeColor: '#007AFF',
            // cityPickerValueDefault: [16, 0, 0],
            nowChoose: {
                index: -1,
                type: -1,
                num: null
            },
            formData: {
                company: '',
                needToPay: false,
                files: [{
                    type: 1,
                    url: ''
                }, {
                    type: 2,
                    url: ''
                }, {
                    type: 3,
                    url: ''
                }, {
                    type: 4,
                    url: ''
                }, {
                    type: 5,
                    url: ''
                }],
                contacts: [{
                    name: '',
                    phone: ''
                }],
                province: '',
                city: '',
                area: '',
                deliveryArea: '',
                street: '',
                remainDays: '',
                statisDate: '',
                details: [{
                    name: '医用外科口罩',
                    standard: '',
                    unit: '个',
                    amount: -1
                }, {
                    name: '医用防护口罩',
                    standard: '',
                    unit: '个',
                    amount: -1
                }, {
                    name: '防护帽',
                    standard: '',
                    unit: '个',
                    amount: -1
                }, {
                    name: '一次性医用防护服',
                    standard: '',
                    unit: '个',
                    amount: -1
                }, {
                    name: '手术衣',
                    standard: '',
                    unit: '个',
                    amount: -1
                }, {
                    name: '防护眼镜',
                    standard: '',
                    unit: '个',
                    amount: -1
                }, {
                    name: '防护眼罩',
                    standard: '',
                    unit: '个',
                    amount: -1
                }, {
                    name: '护目镜',
                    standard: '',
                    unit: '个',
                    amount: -1
                }, {
                    name: '医用一次性乳胶手套',
                    standard: '',
                    unit: '个',
                    amount: -1
                }],
                additionalDetail: '', // {
                // type: 'textarea',
                // placeholder: '所需物资种类和数量要补充点这里填写',
                // valueKey: 'formData.additionalDetail'
                // }, 
                additinalStandard: '', // {
                // type: 'textarea',
                // placeholder: '所需物资如有防护标准请在这里标明',
                // valueKey: 'formData.additinalStandard'
                // },
                receiptInfo: {
                    name: '',
                    phone: '',
                    street: '',
                    dockingerPhone: '',
                    dockinger: '',
                    dockingAddress: ''
                },

                level: '',
                amount: '',
                hosAmount: '',
                totalAmount: '',
                totalHos: ''
            },
            isShowDemoImageModel: null,
            demoImageItem: null // 示例图片对应item
        };
    },
    components: {
        navUrl,
        mpvueCityPicker,
        uniIcons,
        uniCard
    },
    methods: {
        bindDateChange (e) {
            // this.$set(this.tempInfo, 'statisDate', e.target.value);
            this.$set(this.formData, 'statisDate', e.target.value);
        },
        onCompanyTextareaBlur () {
            const that = this
            let company = ''
            if (this.formData.company) {
                company = that.formData.company.replace(/\r\n/g, '').replace(/\n/g, '').replace(/^\s+|\s+$/g, '')
            }
            const params = {
                company
            }
            that.$api.getHospitalCountByName(params)
                .then((res) => {
                    if (res.code === '10000') {
                        if (res.data.length > 0) {
                            uni.showModal({
                                content: "您提交的医院信息平台已存在或正在审核中，感谢您的无私奉献。",
                                showCancel: false,
                                success (res) {
                                    that.formData.company = ''
                                }
                            })
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
        },


        loadDetail (id) {
            if (id) {
                let that = this;
                let params = {
                    'id': id
                }
                that.id = id
                that.$api.getDemandDetail(params)
                    .then(res => {
                        console.log('加载的数据', res);
                        if (res.code === '10000') {
                            that.details = res.data;
                            that.formData = {
                                applicantName: that.details.applicantName || '',
                                applicantPhone: that.details.applicantPhone || '',
                                applicantDuty: that.details.applicantDuty || '',
                                source: that.details.source || '',

                                company: that.details.company || '',
                                contacts: that.details.contacts && that.details.contacts.length ? that.details.contacts : [{
                                    name: '',
                                    phone: ''
                                }],
                                province: that.details.province || '',
                                city: that.details.city || '',
                                area: that.details.area || '',
                                deliveryArea: that.details.deliveryArea || '',
                                street: that.details.street || '',

                                details: that.details.details && that.details.details.length ? that.details.details : [],
                                files: (that.details.files && that.details.files.length > 0) ? that.details.files : [{ type: 1, url: '' }, { type: 2, url: '' }, { type: 3, url: '' }, { type: 4, url: '' }, { type: 5, url: '' }],
                                receiptInfo: that.details.receiptInfo || {
                                    name: '',
                                    phone: '',
                                    street: '',
                                    dockingerPhone: '',
                                    dockinger: '',
                                    dockingAddress: ''
                                },

                                level: that.details.level || '',
                                amount: that.details.amount || '',
                                hosAmount: that.details.hosAmount || '',
                                totalAmount: that.details.totalAmount || '',
                                totalHos: that.details.totalHos || '',
                            }

                            // that.formData = res.data
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }
        },
		//选择物资数量 开始
        chooseNum (item, index) {
            console.log('addhospital.vue ==> chooseNum | item', item, 'index', index);
            this.nowChoose.index = index;
            this.nowChoose.type = item.amount === 0 ? 0 : item.amount > 0 ? 2 : 1;
            this.nowChoose.num = item.amount > 0 ? item.amount : null;
            this.showModel = true;
        },
        checkItem (item) {
            console.log('addhospital.vue ==> checkItem | item', item);
            return item.amount > 0 ? item.amount + ' 个' : item.amount === 0 ? '数量不限' : '不需要'
        },
        cancel () {
            this.nowChoose = {
                index: -1,
                type: -1,
                num: null
            }
            this.showModel = false
        },
        ok () {
            const {
                index,
                type,
                num
            } = this.nowChoose;
            this.formData.details[index].unit = '个';
            this.formData.details[index].amount = type === 1 ? -1 : type === 0 ? 0 : num;
            this.nowChoose = {
                index: -1,
                type: -1,
                num: null
            }
            this.showModel = false
        },
		//选择物资数量 结束
        sureSelectTime () {
            this.showSelectTimeFlag = false
            this.showSelectCityFlag = false
        },
		
        onCityConfirm (e) {
            let areaArr = e.label.split('-')
            if (areaArr && areaArr.length) {
                this.formData.province = areaArr[0]
                this.formData.city = areaArr[1]
                this.formData.area = areaArr[2]
            }
        },
        showMulLinkageThreePickerSend () {
            this.$refs.mpvueCityPicker.show()
        },
		goBack(){
			uni.navigateBack({
			    delta: 2
			});
		},
		// 提交
        submit () {
            let _that = this;
            console.log('addhospital.vue ==> submit | this', this);

            try {
                (Object.entries({
                    remainDays: '请填写剩余物资可用天数'
                })).forEach(([key, value]) => {
                    // console.log('addhospital.vue ==> submit | key', key);
                    switch (key) {
                        case 'files':
                            this.formData[key].forEach(item => {
                                Object.entries(value).forEach(([key0, value0]) => {
                                    if (`${item.type}` === key0 && !item.url) {
                                        throw value0;
                                    }
                                });
                            });
                            break;
                        case 'contacts':
                            if (this.formData[key].length === 0) {
                                throw '请至少录入一个联系人信息';
                            } else {
                                this.formData[key].forEach(item => {
                                    Object.entries(value).forEach(([key0, value0]) => {
                                        if (!item[key0]) {
                                            throw value0;
                                        }
                                    });
                                });
                            }
                            break;
                        case 'receiptInfo':
                            Object.entries(value).forEach(([key0, value0]) => {
                                if (!this.formData[key][key0]) {
                                    throw value0;
                                }
                            });
                            break;
                        default:
                            // 检测内容本身、去掉首位空格、去掉所有换行后是否为空
                            if (!this.formData[key]) {
                            // if (!(this.formData[key] && this.formData[key].replace(/\n/igm, '').trim())) {
                                throw value;
                            }
                    }
                });
            } catch (e) {
                this.$utils.showModal(e);
                return;
            }
           

            if (_that.id) {
                _that.$api.putHospitalInfo(_that.formData, _that.id).then(res => {
                    if (res.code == 10000) {
                        uni.showModal({
                            title: '提交成功',
                            content: "您的申请已收到，稍后会进行内容核实，请耐心等候。",
                            showCancel: false,
                            confirmText: '好的',
                            success (res) {
                                uni.navigateBack({
                                    delta: 1,
                                    animationType: 'pop-out',
                                    animationDuration: 200
                                })
                            }
                        })

                    } else {
                        uni.showModal({
                            title: '提交失败',
                            content: res.message ? res.message : "网络繁忙，请稍后再试。",
                            showCancel: false,
                            confirmText: '好的'
                        })
                    }
                })
            } else {
                _that.$api.postHospitalInfo(_that.formData).then(res => {
                    if (res.code == 10000) {
                        uni.showModal({
                            title: '提交成功',
                            content: "您的申请已收到，马上电话进行核实，核实后方可以显示出来，请耐心等待",
                            showCancel: false,
                            success (res) {
                                uni.navigateBack({
                                    delta: 1,
                                    animationType: 'pop-out',
                                    animationDuration: 200
                                })
                            }
                        })
                    }
                })
            }
        }
    },
    onLoad (option) {
        this.loadDetail(option.id)
    }
}
</script>

<style lang="scss">
.icon {
    display: block;
    background-repeat: no-repeat;
    background-size: 100%;

    &.icon-add {
        height: 30px;
        width: 30px;
        background-image: url(../../../static/icon-add.svg);
    }

    &.icon-close {
        height: 14px;
        width: 14px;
        background-image: url(../../../static/icon-close.svg);
    }
}

.item {
    &.textarea {
        flex-direction: column;
        padding-bottom: 0;

        & > .label {
            width: initial;
            margin-right: auto;
        }
    }

    &.upload {
        flex-wrap: wrap;
        padding-bottom: 0;

        & > .label {
            width: initial;
            margin-right: auto;
        }

        & > .tips {
            color: #4b8ae5;
        }

        & > .image {
            display: flex;
            padding: 8px 10px;
            margin: 6px 0;
            border-radius: 4px;
            width: 100%;
            border: 1px solid #4b8ae5;

            // & > img {
            //     margin-right: auto;
            //     color: #4b8ae5;
            // }
            & > text {
                margin-right: auto;
                color: #4b8ae5;
            }
        }

        & > .add {
            margin: 6px auto;
            color: #4b8ae5;
            border-radius: 4px;
            border: 1px solid #4b8ae5;
            font-size: 14px;
            width: 210px;
            line-height: 36px;
            text-align: center;
        }
    }
}

// 顶部信息开始
.top_back {
	display: flex;
	align-items: center;
	width: 100%;
	height: 56px;
	background: #FFFFFF;
	margin-bottom: 10px;
	padding-left: 16px;
	image{
		width: 10px;
		height: 18px;
	}
}
.top_info{
	width: 100%;
	height: 60px;
	background-color: #FFFFFF;
	font-family: PingFangSC-Semibold;
	font-size: 14px;
	color: #333333;
	letter-spacing: 0;
	line-height: 60px;
	text-align: center;
	font-weight: 600;
}
// 顶部信息结束

.demoImageModel {
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    padding: 0 10px;

    & > .area {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        background: #fff;

        & > .title {
            display: flex;
            justify-content: space-between;
        }

        & > img {
            width: 100%;
            padding: 20px 10px;
        }
    }
}

.uni-modal {
    & > .uni-modal__bd {
        &:nth-child(2) {
            color: #000;
            font-size: 14px;
        }
    }

    & > .uni-modal__ft {
    }
}

//

.hospital-area {
    padding-bottom: 60px;

    & * {
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        letter-spacing: 0;
    }
}

.addrr-input {
    height: 98rpx;
    line-height: 98rpx;
    width: 80%;
    text-align: right;
}

.label {
    color: #333333;
}

uni-view[class^="area"] {
    width: 100%;
    min-height: 204px;
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;

    > view {
        box-sizing: border-box;
        border-bottom: 1px solid #f2f2f2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 36px;
        padding: 14px 0;

        > .label {
            width: 50%;
        }

        > .show {
            width: 66%;
            text-align: right;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .icon {
				display: inline-block;
                width: 9px;
                height: 10px;
                transform: rotate(180deg);
                margin-left: 6px;
                background-image: url(../../../static/icon-back.svg);
                background-repeat: no-repeat;
                background-size: 60%;
            }
        }

        > input {
            text-align: right;
            width: 66%;
        }

        > uni-textarea {
            width: 100%;
            height: 50px;

            &::placeholder {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #999;
            }
        }

        > .select {
            width: 70px;
            height: 30px;
            border: 1px solid #4b8ae5;
            border-radius: 6px;
            overflow: hidden;
            color: #80aded;
            display: flex;
            justify-content: space-between;
            align-items: center;

            > div {
                width: 50%;
                text-align: center;
                line-height: 30px;
                transition: all 0.3s;
            }

            &.on {
                & > div:first-child {
                    background-color: #4b8ae5;
                    color: #fff;
                }
            }

            &.off {
                & > div:last-child {
                    background-color: #4b8ae5;
                    color: #fff;
                }
            }
        }
    }

    .title {
        height: 50px;
		line-height: 50px;
        font-size: 16px;
        color: #4b8ae5;
        border-bottom: 1px solid #f2f2f2;
        position: relative;

        &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 96px;
            height: 4px;
            background: #4b8ae5;
            border-radius: 1px;
        }
    }
}

uni-view.area_1 > div {
    min-height: 48px;

    &.company,
    &.street {
        flex-direction: column;
        align-items: flex-start;

        > .label {
            margin-bottom: 10px;
        }
    }
}

.submit {
    // position: fixed;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // height: 50px;
    // width: 100%;
    // background-color: #4b8ae5;
    // text-align: center;
    // line-height: 50px;
    // font-family: PingFangHK-Regular;
    // font-size: 18px;
    // color: #ffffff;
}

.model {
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;

    > .area {
        width: 100%;
        height: 180px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .choose {
            padding: 10px;
			display: flex;
			flex-direction: column;
            > view {
				width: 100%;
                height: 55px;
                padding: 15px 0;
                border-bottom: 1px solid #f2f2f2;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .choose-item {
                display: flex;
                justify-content: space-between;

                & > text {
                    &:first-child {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        border: 1px solid #ededed;
                        position: relative;
                        margin-right: 6px;

                        &::before {
                            content: "";
                            position: absolute;
                            opacity: 0;
                            transition: all 0.3s;
                            top: 2px;
                            left: 2px;
                            width: 14px;
                            height: 14px;
                            border-radius: 50%;
                            background-color: #4b8ae5;
                        }

                        &.active::before {
                            opacity: 1;
                        }
                    }

                    &:last-child {
                        font-size: 18px;
                        color: #4b8ae5;
                        line-height: 1;
                    }
                }
            }

            .input-item {
                display: flex;
                justify-content: space-between;
                align-items: center;

                uni-input {
                    border: 1px solid #ededed;
                    height: 40px;
                    width: 100px;
                    text-align: right;
                    padding: 4px;
                    margin-right: 14px;
                }

                text {
                    font-size: 18px;
                    color: #4b8ae5;
                    line-height: 1;
                }
            }
        }

        .btn-box {
            width: 100%;
            height: 57px;
            display: flex;
            justify-content: space-between;
            border: 1px solid #ededed;

            > view {
				display: inline-block;
                width: 50%;
                line-height: 57px;
                text-align: center;
                font-family: PingFangHK-Medium;
                font-size: 18px;

                &:first-child {
                    color: #4a90e2;
                }

                &:last-child {
                    background-color: #4b8ae5;
                    color: #ffffff;
                }
            }
        }
    }
}

.mask {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
}

.select-time {
    z-index: 10;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #ffffff;
    width: 85%;
    height: 360rpx;
    box-sizing: content-box;
    border-radius: 12rpx;
    padding: 30rpx;

    .time-title {
        text-align: center;
        padding-bottom: 25rpx;
        border-bottom: 1rpx solid #eeeeee;
    }

    .content-box {
        display: flex;
        flex-direction: column;
        font-size: 26rpx;
    }

    .box-time {
        display: flex;
        flex-direction: row;
        align-content: space-between;
        justify-content: space-between;
        height: 100rpx;
        line-height: 100rpx;
        border-bottom: 1rpx solid #eeeeee;
    }

    .box-btn {
        display: flex;

        view {
            flex: 1;
            text-align: center;
            margin-top: 20rpx;
            height: 70rpx;
            line-height: 70rpx;
            border-left: 1rpx solid #eeeeee;
        }

        view:first-child {
            border-left: none;
        }
    }
}

.input-box {
    height: 60upx;
    direction: flex;
    align-items: center;
}

// 底部提交按钮
.foot-btn{
	position: fixed;
	bottom:0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 50px;
	background: #FFFFFF;
	box-shadow: inset 0 1px 0 0 #EDEDED;
	view{
		display: inline-block;
		width: 170px;
		height: 36px;
	}
	.submit{
		background: #4B8AE5;
		border-radius: 2px;
		font-family: PingFangHK-Regular;
		font-size: 18px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		line-height: 36px;
	}
	.link{
		background: #FFFFFF;
		border: 1px solid #4B8AE5;
		border-radius: 2px;
		font-family: PingFangHK-Regular;
		font-size: 12px;
		color: #4B8AE5;
		letter-spacing: 0;
		text-align: center;
	}
}
</style>
