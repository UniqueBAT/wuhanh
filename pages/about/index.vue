<template>
  <view class="respos">
    <view class="title">平台slogan</view>
    <view class="content">众志成城，抗击疫情，弘扬互联网精神，续写民间力量。</view>
    <view class="title">平台目标</view>
    <view class="content"
      >方便物资供应商直接联系医院，提供来自医院官方渠道的物资需求及运输信息。</view
    >

    <view class="title">平台说明</view>
    <view class="content">
      <p>关于【湖北医疗物资需求信息平台】</p>
      <p>是由一群互联网人通过线上远程协作共同开发的方式临时搭建！</p>
      <p>1、平台目的：方便物资供应商直接联系医院；</p>
      <p>2、平台功能：提供来自医院官方渠道的物资需求及运输信息。</p>
    </view>

    <view class="content">
      <p>特此声明：</p>
      <p>1、平台为互联网人联合发起，纯公益性质，不涉及任何公司、个人品牌及宣传；</p>
      <p>2、平台为纯信息平台，不涉及任何钱、捐款、物资信息；</p>
      <p>3、医院方在对接物资时请擦亮眼睛监督质量，要求货到付款；</p>
      <p>4、任何打着平台幌子进行品牌宣传、收集物资、收集善款的人，欢迎举报！</p>
      <p>举报电话：<a href="tel:18348425631">18348425631</a>，感谢大家支持！</p>
    </view>

    <view class="title">平台参与人员</view>
    <view class="content">
      志愿者团队包含：PMO办公室交付统筹团队、IT开发团队、
      资源池信息发布群、医疗信息对接群、数据收集群、数据校对群、纠错群、
      医院资源核实群、物资运输群、电话信息核对群、物资调配群 等 1000+ 的志愿者团队自发自主协力打造！
    </view>
  </view>
</template>

<script>
import navUrl from '../../components/nav-url.vue';
export default {
  components: {
    navUrl
  },
  data() {
    return {
      url: '/pages/index/index'
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.respos {
  background-color: #fff;
  padding: 20upx;
}

.title {
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  color: var(--mainColor);
  line-height: 40px;
}

.content {
  margin: 10px 0;
  text-align: justify;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  p {
    line-height: 20px;
    margin: 0;
    padding: 0;
    a {
      color: var(--mainColor);
    }
  }
}
</style>
