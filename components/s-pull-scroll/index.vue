<template>
  <view :class="['s-pull-scroll',customClass]" @touchmove.stop.prevent="e=>e.preventDefault()">
    <scroll-view
      :id="scrollId"
      class="s-pull-scroll-view"
      :class="{'is-fixed':fixed}"
      :style="{'padding-top':padTop,'padding-bottom':padBottom,'top':fixedTop,'bottom':fixedBottom}"
      :scroll-top="scrollTop"
      :scroll-with-animation="false"
      :scroll-y="scrollAble"
      :enable-back-to-top="true"
      @scroll="scroll"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      @touchcancel="touchend"
    >
      <view :style="{'transform': translateY, 'transition': transition}">
        <view class="s-pull-down-wrap" :style="{'height':downOffset+'rpx'}">
          <view
            class="s-pull-loading-icon"
            :class="{'s-pull-loading-rotate':isDownLoading}"
            :style="{'transform':downRotate}"
          ></view>
          <view>{{downText}}</view>
        </view>

        <slot></slot>

        <view v-if="isUpLoading" class="s-pull-up-wrap">
          <view class="s-pull-loading-icon s-pull-loading-rotate"></view>
          <view>{{loadingText}}</view>
        </view>

        <slot v-if="isEmpty" name="empty">
          <view class="s-pull-tip-wrap" v-if="emptyText">{{emptyText}}</view>
        </slot>
        <slot v-else-if="isError" name="error">
          <view class="s-pull-tip-wrap" v-if="errorText" @click="onErrorClick">{{errorText}}</view>
        </slot>
        <slot v-else-if="isFinish" name="finish">
          <view class="s-pull-tip-wrap" v-if="finishText && isShowFinishText">{{finishText}}</view>
        </slot>
      </view>
    </scroll-view>
    <!-- 回到顶部按钮 (fixed元素,需写在scroll-view外面,防止滚动的时候抖动)-->
    <view v-if="backTop" :class="['s-pull-back-top',{'show':isShowBackTop}]" @click="onBackTop">
      <slot name="backtop">
        <view class="default-back-top">
          <img src="./back-top.png" />
        </view>
      </slot>
    </view>
  </view>
</template>

<script>

export default {
  name: 's-pull-scroll',
  data () {
    Object.assign(this, {
      pullType: '',
      scrollRealTop: 0, // 滚动条的位置
      preScrollY: 0,
      clientNum: 0,
      isExec: false,
      scrollHeight: 0,
      clientHeight: 0,
      bodyHeight: 0,
      windowTop: 0, // 可使用窗口的顶部位置
      windowBottom: 0, // 可使用窗口的底部位置
      page: 0,
      startPoint: null,
      lastPoint: null,
      startTop: 0,
      maxTouchmoveY: 0,
      inTouchend: false,
      moveTime: 0,
      moveTimeDiff: 0,
      movetype: 0,
      isMoveDown: false
    });
    return {
      scrollId: 's-pull-scroll-view-id-' + Math.random().toString(36).substr(2), // 随机生成mescroll的id(不能数字开头,否则找不到元素)
      downHight: 0, // 下拉刷新: 容器高度
      downRotate: 0, // 下拉刷新: 圆形进度条旋转的角度
      downText: '', // 下拉刷新: 提示的文本
      isDownReset: false, // 下拉刷新: 是否显示重置的过渡动画
      isDownLoading: false, // 下拉刷新: 是否显示加载中
      isUpLoading: false, // 上拉加载: 是否显示 "加载中..."
      isFinish: false, // 是否加载完毕
      isEmpty: false, // 是否显示空布局
      isError: false, // 是否加载出错
      isShowBackTop: false, // 是否显示回到顶部按钮
      scrollAble: true, // 是否禁止下滑 (下拉时禁止,避免抖动)
      scrollTop: 0, // 滚动条的位置
      isShowFinishText: false
    };
  },
  props: {
    // class
    customClass: {
      type: String,
      default: ''
    },
    // 是否通过fixed固定高度, 默认true
    fixed: {
      type: Boolean,
      default: true
    },
    // 距顶部(rpx)
    top: {
      type: [Number, Array, String],
      default () {
        return 0;
      }
    },
    // 距底部(rpx)
    bottom: {
      type: [Number, Array, String],
      default () {
        return 0;
      }
    },
    // 提示文案
    loadingText: {
      type: String,
      default: '加载中 ...'
    },
    pullingText: {
      type: String,
      default: '下拉刷新'
    },
    loosingText: {
      type: String,
      default: '释放刷新'
    },
    finishText: {
      type: String,
      default: '暂无更多了'
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    errorText: {
      type: String,
      default: '加载失败，点击重新加载'
    },
    // 下拉配置
    // 下拉回掉，参数为vm
    pullDown: Function,
    downOffset: {
      type: Number,
      default: 100
    },
    downFps: {
      type: Number,
      default: 40
    },
    downMinAngle: {
      type: Number,
      default: 45
    },
    downInOffsetRate: {
      type: Number,
      default: 1
    },
    downOutOffsetRate: {
      type: Number,
      default: 0.4
    },
    downStartTop: {
      type: Number,
      default: 100
    },
    downBottomOffset: {
      type: Number,
      default: 20
    },
    // 上拉配置
    // 上拉回掉，参数为vm
    pullUp: Function,
    upOffset: {
      type: Number,
      default: 160
    },
    // 回到顶部
    backTop: Boolean,
    backTopOffset: {
      type: Number,
      default: 1000
    }
  },
  watch: {
    top () {
      this.refreshClientHeight();
    },
    bottom () {
      this.refreshClientHeight();
    }
  },
  computed: {
    // top数值,单位rpx,需转成px. 目的是使下拉布局往下偏移
    numTop () {
      return (Array.isArray(this.top) ? this.top : [this.top]).map(num => uni.upx2px(Number(num || 0))).reduce((a, b) => a + b) || 0;
    },
    // bottom数值,单位rpx,需转成px 目的是使上拉布局往上偏移
    numBottom () {
      return (Array.isArray(this.bottom) ? this.bottom : [this.bottom]).map(num => uni.upx2px(Number(num || 0))).reduce((a, b) => a + b) || 0;
    },
    numBackTopOffset () {
      return uni.upx2px(Number(this.backTopOffset || 0));
    },
    numDownBottomOffset () {
      return uni.upx2px(Number(this.downBottomOffset || 0));
    },
    numDownStartTop () {
      return uni.upx2px(Number(this.downStartTop || 0));
    },
    numDownOffset () {
      return uni.upx2px(Number(this.downOffset || 0));
    },
    numUpOffset () {
      return uni.upx2px(Number(this.upOffset || 0));
    },
    fixedTop () {
      return this.fixed ? (this.numTop + this.windowTop) + 'px' : 0;
    },
    padTop () {
      return !this.fixed ? this.numTop + 'px' : 0;
    },
    fixedBottom () {
      return this.fixed ? (this.numBottom + this.windowBottom) + 'px' : 0;
    },
    padBottom () {
      return !this.fixed ? this.numBottom + 'px' : 0;
    },
    // 过渡
    transition () {
      return this.isDownReset ? 'transform 300ms' : '';
    },
    translateY () {
      return this.downHight > 0 ? 'translateY(' + this.downHight + 'px)' : ''; // transform会使fixed失效,需注意把fixed元素写在mescroll之外
    }
  },
  methods: {
    // 注册列表滚动事件,用于下拉刷新
    scroll (e) {
      e = e.detail;
      // 更新滚动条的位置
      this.scrollRealTop = e.scrollTop;
      // 更新滚动内容高度
      this.scrollHeight = e.scrollHeight;
      // 向上滑还是向下滑动
      const isScrollUp = e.scrollTop - this.preScrollY > 0;
      this.preScrollY = e.scrollTop;
      // 上滑 && 检查并触发上拉
      isScrollUp && this.triggerPullUp(true);
      // 回到顶部功能
      if (this.backTop) {
        // 返回顶部按钮的显示隐藏
        if (e.scrollTop >= this.numBackTopOffset) {
          this.isShowBackTop = true;
        } else {
          this.isShowBackTop = false;
        }
      }
    },
    // 注册列表touchstart事件,用于下拉刷新
    touchstart (e) {
      if (!this.pullDown) return;
      this.startPoint = this.getPoint(e); // 记录起点
      this.startTop = this.scrollRealTop; // 记录此时的滚动条位置
      this.lastPoint = this.startPoint; // 重置上次move的点
      this.maxTouchmoveY = this.bodyHeight - this.numDownBottomOffset; // 手指触摸的最大范围(写在touchstart避免body获取高度为0的情况)
      this.inTouchend = false; // 标记不是touchend
    },
    // 注册列表touchmove事件,用于下拉刷新
    touchmove (e) {
      if (!this.pullDown) return;
      if (!this.startPoint) return;
      // 节流
      const t = Date.now();
      if (this.moveTime && t - this.moveTime < this.moveTimeDiff) { // 小于节流时间,则不处理
        return;
      } else {
        this.moveTime = t;
        this.moveTimeDiff = 1000 / this.downFps;
      }

      let scrollRealTop = this.scrollRealTop; // 当前滚动条的距离
      let curPoint = this.getPoint(e); // 当前点

      let moveY = curPoint.y - this.startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉

      // (向下拉&&在顶部) scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
      // scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
      if (moveY > 0 && (scrollRealTop <= 0 || (scrollRealTop <= this.numDownStartTop && scrollRealTop === this.startTop))) {
        // 可下拉的条件
        if (this.pullDown && !this.inTouchend && !this.isDownLoading && !this.isUpLoading) {
          // 下拉的角度是否在配置的范围内
          let x = Math.abs(this.lastPoint.x - curPoint.x);
          let y = Math.abs(this.lastPoint.y - curPoint.y);
          let z = Math.sqrt(x * x + y * y);
          if (z !== 0) {
            let angle = Math.asin(y / z) / Math.PI * 180; // 两点之间的角度,区间 [0,90]
            if (angle < this.downMinAngle) return; // 如果小于配置的角度,则不往下执行下拉刷新
          }

          // 如果手指的位置超过配置的距离,则提前结束下拉,避免Webview嵌套导致touchend无法触发
          if (this.maxTouchmoveY > 0 && curPoint.y >= this.maxTouchmoveY) {
            this.inTouchend = true; // 标记执行touchend
            this.touchend(); // 提前触发touchend
            return;
          }

          this.preventDefault(e); // 阻止默认事件

          let diff = curPoint.y - this.lastPoint.y; // 和上次比,移动的距离 (大于0向下,小于0向上)

          // 下拉距离  < 指定距离
          if (this.downHight < this.numDownOffset) {
            if (this.movetype !== 1) {
              this.movetype = 1; // 加入标记,保证只执行一次
              // 下拉的距离进入offset范围内那一刻的回调
              this.scrollAble = false; // 禁止下拉,避免抖动 (自定义mescroll组件时,此行不可删)
              this.isDownReset = false; // 不重置高度 (自定义mescroll组件时,此行不可删)
              this.isDownLoading = false; // 不显示加载中
              this.downText = this.pullingText; // 设置文本
              this.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
            }
            this.downHight += diff * this.downInOffsetRate; // 越往下,高度变化越小
            // 指定距离  <= 下拉距离
          } else {
            if (this.movetype !== 2) {
              this.movetype = 2; // 加入标记,保证只执行一次
              // 下拉的距离大于offset那一刻的回调
              this.scrollAble = false; // 禁止下拉,避免抖动 (自定义mescroll组件时,此行不可删)
              this.isDownReset = false; // 不重置高度 (自定义mescroll组件时,此行不可删)
              this.isDownLoading = false; // 不显示加载中
              this.downText = this.loosingText; // 设置文本
              this.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
            }
            if (diff > 0) { // 向下拉
              this.downHight += Math.round(diff * this.downOutOffsetRate); // 越往下,高度变化越小
            } else { // 向上收
              this.downHight += diff; // 向上收回高度,则向上滑多少收多少高度
            }
          }
          let rate = this.downHight / this.numDownOffset; // 下拉区域当前高度与指定距离的比值
          // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
          this.downRotate = 'rotate(' + 360 * rate + 'deg)'; // 设置旋转角度
        }
      }
      this.lastPoint = curPoint; // 记录本次移动的点
    },
    // 注册列表touchend事件,用于下拉刷新
    touchend (e) {
      if (!this.pullDown) return;
      // 如果下拉区域高度已改变,则需重置回来
      if (this.isMoveDown) {
        if (this.downHight >= this.numDownOffset) {
          // 符合触发刷新的条件
          this.triggerPullDown();
        } else {
          // 不符合的话 则重置
          this.downHight = 0;
          this.scrollAble = true; // 开启下拉 (自定义mescroll组件时,此行不可删)
          this.isDownReset = true; // 重置高度 (自定义mescroll组件时,此行不可删)
          this.isDownLoading = false; // 不显示加载中
        }
        this.movetype = 0;
        this.isMoveDown = false;
      } else if (this.scrollRealTop === this.startTop) { // 到顶/左/右/底的滑动事件
        const isScrollUp = this.getPoint(e).y - this.startPoint.y < 0; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
        // 上滑 && 检查并触发上拉
        isScrollUp && this.triggerPullUp(true);
      }
    },
    preventDefault (e) {
      // 小程序不支持e.preventDefault
      // app的bounce只能通过配置pages.json的style.app-plus.bounce为"none"来禁止
      // cancelable:是否可以被禁用; defaultPrevented:是否已经被禁用
      if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
    },
    // 点击回到顶部的按钮回调
    onBackTop () {
      this.isShowBackTop = false; // 回到顶部按钮需要先隐藏,再执行回到顶部,避免闪动
      this.scrollTo(0); // 执行回到顶部
    },
    // 点击失败重新加载
    onErrorClick () {
      this.isError = false;
      if (this.pullType === 'down') {
        this.triggerPullDown();
      } else if (this.pullType === 'up') {
        this.triggerPullUp();
      }
    },
    scrollTo (y) {
      this.scrollTop = this.scrollRealTop;
      this.$nextTick(() => {
        this.scrollTop = y;
      });
    },
    /* 根据点击滑动事件获取第一个手指的坐标 */
    getPoint (e) {
      if (!e) {
        return {
          x: 0,
          y: 0
        };
      }
      if (e.touches && e.touches[0]) {
        return {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY
        };
      } else if (e.changedTouches && e.changedTouches[0]) {
        return {
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY
        };
      } else {
        return {
          x: e.clientX,
          y: e.clientY
        };
      }
    },
    /* 滚动条到底部的距离 */
    getScrollBottom () {
      return this.scrollHeight - this.getClientHeight() - this.scrollRealTop;
    },
    /* 滚动容器的高度 */
    getClientHeight (isReal) {
      let h = this.clientHeight || 0;
      if (h === 0 && isReal !== true) { // 未获取到容器的高度,可临时取body的高度 (可能会有误差)
        h = this.bodyHeight;
      }
      return h;
    },
    /* 更新滚动区域的高度 (使内容不满屏和到底,都可继续翻页) */
    refreshClientHeight () {
      if (!this.isExec) {
        this.isExec = true; // 避免多次获取
        this.$nextTick(() => { // 确保dom已渲染
          uni.createSelectorQuery().in(this).select('#' + this.scrollId).boundingClientRect(data => {
            this.isExec = false;
            if (data) {
              this.clientHeight = data.height;
            } else if (this.clientNum != 3) { // 极少部分情况,可能dom还未渲染完毕,递归获取,最多重试3次
              this.clientNum = this.clientNum == 0 ? 1 : this.clientNum + 1;
              setTimeout(() => {
                this.refreshClientHeight();
              }, this.clientNum * 100);
            }
          }).exec();
        });
      }
    },
    /* 显示下拉进度布局 */
    showDownLoading () {
      this.isEmpty = false;
      this.isError = false;
      this.isFinish = false;
      this.isDownLoading = true; // 显示加载中
      this.downHight = this.numDownOffset; // 更新下拉区域高度
      this.scrollAble = true; // 开启下拉 (自定义mescroll组件时,此行不可删)
      this.isDownReset = true; // 重置高度 (自定义mescroll组件时,此行不可删)
      this.downText = this.loadingText; // 设置文本
    },
    /* 显示上拉加载中 */
    showUpLoading () {
      this.isEmpty = false;
      this.isError = false;
      this.isFinish = false;
      this.isUpLoading = true;
    },
    /* 结束下拉刷新 */
    hideDownLoading () {
      this.$nextTick(() => {
        this.downHight = 0;
        this.scrollAble = true; // 开启下拉 (自定义mescroll组件时,此行不可删)
        this.isDownReset = true; // 重置高度 (自定义mescroll组件时,此行不可删)
        this.isDownLoading = false; // 不显示加载中
        this.downHight = 0; // 设置下拉区域的高度 (自定义mescroll组件时,此行不可删)
        this.scrollHeight = 0;// 重置滚动区域,使数据不满屏时仍可检查触发翻页
      });
    },
    /* 结束上拉加载 */
    hideUpLoading () {
      this.$nextTick(() => {
        this.isUpLoading = false;
      });
    },
    /* 触发下拉刷新 */
    triggerPullDown () {
      if (this.pullDown && !this.isDownLoading && !this.isUpLoading) {
        // 下拉加载中...
        this.showDownLoading(); // 下拉刷新中...
        this.page = 1; // 预先加一页
        this.pullType = 'down';
        this.pullDown && this.pullDown.call(this.$parent, this);
      }
    },
    /* 触发上拉加载 */
    triggerPullUp (isCheck) {
      if (this.pullUp && !this.isUpLoading && !this.isDownLoading && !this.isError && !this.isFinish) {
        // 是否校验在底部; 默认不校验
        if (isCheck && this.getScrollBottom() > this.numUpOffset) return;
        // 上拉加载中...
        this.showUpLoading();
        this.page++;
        this.pullType = 'up';
        this.pullUp && this.pullUp.call(this.$parent, this);
        // 更新容器的高度
        this.refreshClientHeight();
      }
    },
    refresh () {
      this.page = 0;
      this.isEmpty = false;
      this.isError = false;
      this.isFinish = false;
      this.isDownLoading = false;
      this.isUpLoading = false;
      this.scrollTo(0);
      if (this.pullDown) {
        this.triggerPullDown();
      } else if (this.pullUp) {
        this.triggerPullUp();
      }
    },
    /* 正常加载成功 */
    success () {
      this.hideDownLoading();
      this.hideUpLoading();
    },
    /* 加载失败 */
    error () {
      this.hideDownLoading();
      this.hideUpLoading();
      this.page--;
      this.isError = true;
    },
    /* 没有数据 */
    empty () {
      this.hideDownLoading();
      this.hideUpLoading();
      this.isEmpty = true;
      this.isFinish = true;
    },
    /* 全部数据加载完毕 */
    finish (isShowFinishText = true) {
      this.hideDownLoading();
      this.hideUpLoading();
      this.isFinish = true;
      this.isShowFinishText = !!isShowFinishText;
    },
	reset () {
	  console.log(this.page)
	  this.isFinish = false;
	  this.isShowFinishText = false;
	  this.page = 0;
	  this.scrollTo(0);
	}
  },
  // 使用created初始化mescroll对象; 如果用mounted部分css样式编译到H5会失效
  created () {
    // 设置高度
    uni.getSystemInfo({
      success: (res) => {
        if (res.windowTop) this.windowTop = res.windowTop; // 修正app和H5的top值
        if (res.windowBottom) this.windowBottom = res.windowBottom; // 修正app和H5的bottom值
        this.bodyHeight = res.windowHeight;// 使down的bottomOffset生效
      }
    });
  },
  mounted () {
    // 设置容器的高度
    this.refreshClientHeight = this.refreshClientHeight.bind(this);
    uni.onWindowResize(this.refreshClientHeight);
    this.refreshClientHeight();
  },
  beforeDestroy () {
    uni.offWindowResize(this.refreshClientHeight);
  }
};
</script>

<style lang="scss">
.s-pull-scroll {
  height: 100%;
  -webkit-overflow-scrolling: touch;

  .s-pull-scroll-view {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }
  /* 定位的方式固定高度 */
  .is-fixed {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    height: auto;
  }
  .s-pull-down-wrap,
  .s-pull-up-wrap,
  .s-pull-tip-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    color: #969799;
  }
  .s-pull-down-wrap {
    position: absolute;
    left: 0;
    width: 100%;
    transform: translateY(-100%);
  }
  .s-pull-up-wrap,
  .s-pull-tip-wrap {
    height: 100rpx;
  }
  /* 旋转loading */
  .s-pull-loading-icon {
    width: 30rpx;
    height: 30rpx;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    border: 2rpx solid #c8c9cc;
    border-bottom-color: transparent;
    box-sizing: border-box;
    &:first-child {
      margin-right: 16rpx;
    }
  }
  /* 旋转动画 */
  .s-pull-loading-rotate {
    animation: s-pull-loading-rotate 0.6s linear infinite;
  }

  @keyframes s-pull-loading-rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  /* 回到顶部的按钮 */
  .s-pull-back-top {
    position: relative;
    z-index: 99;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s linear;
	bottom: 60rpx;
    &.show {
      opacity: 1;
      pointer-events: auto;
    }
  }
  .default-back-top {
    position: fixed;
    right: 20rpx;
    bottom: calc(var(--window-bottom) + 140rpx);

    img {
      width: 72rpx;
      height: 72rpx;
      border-radius: 50%;
    }
  }
}
</style>
