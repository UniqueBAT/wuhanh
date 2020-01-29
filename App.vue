<script>
import util from '@/utils/util';
export default {
  onLaunch: function() {
    console.log('App Launch');
    if (!util.isWeixin()) {
      document.getElementsByTagName('html')[0].className += ' weixin-platform';
    } else {
      document.getElementsByTagName('html')[0].className += ' other-platform';
    }
  },
  onShow: function() {
    console.log('App Show');
  },
  onHide: function() {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
page {
  background-color: #f8f8f8;
  --mainColor: #4b8ae5;
}

view {
  box-sizing: border-box;
}
.call-btn {
  display: flex;
  align-items: center;
  border: 1upx solid var(--mainColor);
  background-color: #ffffff;
  color: var(--mainColor);
  padding: 0 20upx;
  height: 60upx;
  border-radius: 40upx;
  font-size: 28upx;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blank-box {
  width: 100%;
  height: 100upx;
  background-color: transparent;
}
</style>
