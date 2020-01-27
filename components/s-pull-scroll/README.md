# s-pull-scroll

## 参数说明

``` js
{
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
}
```

## 组件vm实例属性，方法说明

``` js

// 分页加载时，当前页数
pullScroll.page

// 当加载完数据后，可以吊以下4个方法去实现视图对应显示逻辑

pullScroll.success(); // 表示加载成功

pullScroll.error(); // 表示加载失败，显示失败布局，page会减1

pullScroll.empty(); // 表示暂无数据

pullScroll.finish(isShowFinishText:boolean); // 表示全部加载完毕,参数是否显示finishText,默认显示

// 初始化刷新，page从1开始
pullScroll.refresh(); // 如有pullDown，则自动触发下拉刷新，如有pullUp，则自动触发pullUp，page从1开始
```

## 使用方式

#### template
``` html
<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData">
  <ul>
    <li
      v-for="(item,index) of list"
      :key="index"
      style="font-size:30rpx;padding:40rpx;text-align:center;border-bottom:1px solid #aaa"
    >{{item}}</li>
  </ul>
</s-pull-scroll>
```

#### script
``` js
import sPullScroll from '@/s-ui/s-pull-scroll';
export default {
  components: {
    sPullScroll
  },
  data () {
    return {
      list: []
    };
  },
  methods: {
    refresh () {
      this.$nextTick(() => {
        this.$refs.pullScroll.refresh();
      });
    },
    pullDown (pullScroll) {
      setTimeout(() => {
        this.loadData(pullScroll);
      }, 200);
    },
    loadData (pullScroll) {
      setTimeout(() => {
        if (pullScroll.page == 1) {
          this.list = [];
        }
        const curList = [];
        for (let i = this.list.length; i < this.list.length + 20; i++) {
          curList.push(i);
        }
        this.list = this.list.concat(curList);
        if (this.list.length > 60) {
          // finish(boolean:是否显示finishText,默认显示)
          pullScroll.finish(this.list.length > 5);
        } else {
          pullScroll.success();
        }
      }, 500);
    }
  },
  onLoad () {
    this.refresh();
  }
};
```