import api from '@/utils/api/api.js';

module.exports = {
  max: function(n1, n2) {
    return Math.max(n1, n2);
  },
  len: function(arr) {
    arr = arr || [];
    return arr.length;
  },
  isDev: function() {
    return /https?:\/\/localhost/.test(location.href);
  },
  isWeixin: function() {
    // #ifdef H5
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    }
    return false;
    // #endif
  },
  isIOS: function() {
    // #ifdef H5
    var ua = window.navigator.userAgent.toLowerCase();
    if (/(iphone|ipad|ipod|ios)/i.test(ua)) {
      return true;
    }
    return false;
    // #endif
  },
  isAndroid: function() {
    // #ifdef H5
    var ua = window.navigator.userAgent.toLowerCase();
    if (/(android)/i.test(ua)) {
      return true;
    }
    return false;
    // #endif
  },
  //  #ifdef H5
  getQueryString: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  cookieUtils: {
    setCookie(c_name, value, expiredays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + expiredays);
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        c_name +
        '=' +
        escape(value) +
        (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
    },
    getCookie(name) {
      var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
      if ((arr = document.cookie.match(reg))) return arr[2];
      else return null;
    },
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = cookie.getCookie(name);
      if (cval != null) document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  },
  // #endif

  showModal: function(content) {
    uni.showModal({
      title: '提示消息',
      content: content,
      showCancel: false,
      success(res) {
        console.log(res);
      }
    });
  },
  showToast: function(title, position, func) {
    let pos = postions ? postions : 'center';
    uni.showToast({
      title: title,
      position: pos,
      durations: 2000,
      success() {
        func();
      }
    });
  },
  getPlatform: function() {
    return uni.getSystemInfoSync().platform;
  },

  compareVersion: function(v1, v2) {
    /**
     * 比较小程序的版本号
     * compareVersion('1.11.0', '1.9.9') // => 1 // 1表示 1.11.0比1.9.9要新
     * */

    v1 = v1.split('.');
    v2 = v2.split('.');
    var len = Math.max(v1.length, v2.length);

    while (v1.length < len) {
      v1.push('0');
    }
    while (v2.length < len) {
      v2.push('0');
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i]);
      var num2 = parseInt(v2[i]);

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }
    return 0;
  },

  throttle: function(callBack, time) {
    let timer = null;
    return function() {
      if (!timer) {
        timer = setTimeout(() => {
          callBack();
          timer = null;
        }, time);
        clearInterval(timer);
      }
    };
  },
  once: function(fn) {
    let result;

    return function() {
      if (fn) {
        console.log('======执行once次==');
        result = fn.apply(this, arguments);
        fn();
        fn = null;
      }
      return result;
    };
  },
  //  ================ 页面跳转 =======================
  navToPath: function(path) {
    // 跳转登录
    uni.navigateTo({
      url: path
    });
  },
  // =============== show to login ===================
  showToLogin: function(forcedLogin) {
    uni.showModal({
      title: '未登录',
      content: '您未登录，登录之后才可继续查看',
      showCancel: !forcedLogin,
      success: res => {
        if (res.confirm) {
          // 先解析用户信息,看绑定手机号没,如果没跳转绑定手登录的页面
          // 如果已经绑定手机号则直接登录
          // api.parseAuthUser()
          // todo... fix 多平台登录这块需要重新兼容
          // https://developers.weixin.qq.com/community/develop/doc/000c2424654c40bd9c960e71e5b009?highLine=getUserInfo
          // 微信登录新逻辑
          uni.login({
            provider: 'weixin',
            success(res) {
              console.log(res);
              // 获取用户信息
              uni.getUserInfo({
                provider: 'weixin',
                withCredentials: true,
                success(user_res) {
                  console.log('获得的微信用户信息:', user_res);
                  let params = {
                    userinfo: user_res.userInfo,
                    signature: user_res.signature,
                    iv: user_res.iv,
                    encryptedData: user_res.encryptedData,
                    rawData: user_res.rawData,
                    code: res.code
                  };
                  api
                    .parseAuthUser(params)
                    .then(response => {
                      console.log('登录后的用户信息', response);
                    })
                    .catch(error => {
                      console.log('登录失败:', error);
                    });
                }
              });
            }
          });

          // 如果需要强制登录，使用reLanuch方法
          // if (forcedLogin) {
          // 	uni.reLaunch({
          // 		url: '../../login/login'
          // 	})
          // } else {
          // 	uni.navigateTo({
          // 		url: '../../login/login'
          // 	})
          // }
        }
      },
      fail() {}
    });
  },
  converUrl: function(url, param) {
    // 找到富文本中第一张页面
    let urlReg = /:\w+/g;
    let arr = url.match(urlReg);
    console.log(arr);
    for (let i = 0, len = arr.length; i < len; i++) {
      let key = arr[i].split(':')[1];
      url = url.replace(arr[i], param[key]);
      delete param[key];
    }
    return url;
  },
  formatLocation: function(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
      longitude = parseFloat(longitude);
      latitude = parseFloat(latitude);
    }

    longitude = longitude.toFixed(2);
    latitude = latitude.toFixed(2);

    return {
      longitude: longitude.toString().split('.'),
      latitude: latitude.toString().split('.')
    };
  },

  dateUtils: {
    formatPassTime: function() {
      var currentTime = Date.parse(new Date()),
        time = currentTime - startTime,
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);
      if (year) return year + '年前';
      if (month) return month + '个月前';
      if (day) return day + '天前';
      if (hour) return hour + '小时前';
      if (min) return min + '分钟前';
      else return '刚刚';
    },
    formatRemainTime: function() {
      var startDate = new Date(); //开始时间
      var endDate = new Date(endTime); //结束时间
      var t = endDate.getTime() - startDate.getTime(); //时间差
      var d = 0,
        h = 0,
        m = 0,
        s = 0;
      if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor((t / 1000 / 60 / 60) % 24);
        m = Math.floor((t / 1000 / 60) % 60);
        s = Math.floor((t / 1000) % 60);
      }
      return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒';
    },
    UNITS: {
      年: 31557600000,
      月: 2629800000,
      天: 86400000,
      小时: 3600000,
      分钟: 60000,
      秒: 1000
    },
    humanize: function(milliseconds) {
      var humanize = '';
      for (var key in this.UNITS) {
        if (milliseconds >= this.UNITS[key]) {
          humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
          break;
        }
      }
      return humanize || '刚刚';
    },
    format: function(dateStr) {
      var date = this.parse(dateStr);
      var diff = Date.now() - date.getTime();
      if (diff < this.UNITS['天']) {
        return this.humanize(diff);
      }
      var _format = function(number) {
        return number < 10 ? '0' + number : number;
      };
      return (
        date.getFullYear() +
        '/' +
        _format(date.getMonth() + 1) +
        '/' +
        _format(date.getDate()) +
        '-' +
        _format(date.getHours()) +
        ':' +
        _format(date.getMinutes())
      );
    },
    parse: function(str) {
      //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
      var a = str.split(/[^0-9]/);
      return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
    },
    dateFormat: function(time) {
      return getformatDate(new Date(time), 'yyyy-MM-dd hh:mm');
    },
    dateTime: function() {
      let myDate = new Date();
      return myDate;
    },
    dateNow: function() {
      let date_time = this.dateTime();
      let year = date_time.getFullYear();
      let month = date_time.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let date = date_time.getDate() < 10 ? '0' + date_time.getDate() : date_time.getDate();
      return year + '/' + month + '/' + date;
    },
    timeNow: function() {
      let date_time = this.dateTime();
      let hour = date_time.getHours() < 10 ? '0' + date_time.getHours() : date_time.getHours();
      let min = date_time.getMinutes() < 10 ? '0' + date_time.getMinutes() : date_time.getMinutes();
      let sec = date_time.getSeconds() < 10 ? '0' + date_time.getSeconds() : date_time.getSeconds();
      return hour + ':' + min + ':' + sec;
    }
  },
  formatTime: function(time) {
    if (typeof time !== 'number' || time < 0) {
      return time;
    }

    var hour = parseInt(time / 3600);
    time = time % 3600;
    var minute = parseInt(time / 60);
    time = time % 60;
    var second = time;

    return [hour, minute, second]
      .map(function(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
      })
      .join(':');
  },
  /*
     判断数据类型
     https://juejin.im/post/5cc7afdde51d456e671c7e48
     可判断类型：undefined、null、string、number、boolean、array、object、symbol、
     date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
     */
  dataType: (tgt, type) => {
    const dataType = Object.prototype.toString
      .call(tgt)
      .replace(/\[object (\w+)\]/, '$1')
      .toLowerCase();
    return type ? dataType === type : dataType;
  },
  StringUtils: {
    // randomStr(10)
    randomStr: len =>
      Math.random()
        .toString(36)
        .substr(3, len),
    randomColor: () =>
      '#' +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, '0'),
    // 星级评分
    startScore: rate => '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate),
    // 字符串替换
    replaceAll: (str, findText, replaceText) => {
      let raRegExp = new RegExp(findText, 'g');
      return str.replace(raRegExp, replaceText);
    },
    // 往字符串指定位置插入字符
    insert_flg: (str, flg, sn) => {
      var newstr = '';
      for (var i = 0; i < str.length; i += sn) {
        var tmp = str.substring(i, i + sn);
        newstr += tmp + flg;
      }
      return newstr;
    },
    // 字符串循环复制
    repeatStr: (str, count) => {
      let text = '';
      for (var i = 0; i < count; i++) {
        text += str;
      }
      return text;
    },

    // 加密替换成*
    replaceStr: (str, regArr, way, replchar) => {
      /*
                replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
                0: 中间替换(默认) /左边,
                1: 两边替换 / 右边
            测试用例:
                //replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
                //ecDo.replaceStr('18819322663',[3,5,3],0)
                //result：188*****663
                //ecDo.replaceStr('asdasdasdaa',[3,5,3],1)
                //result：***asdas***
                //ecDo.replaceStr('1asd88465asdwqe3',[5],0)
                //result：*****8465asdwqe3
                //ecDo.replaceStr('1asd88465asdwqe3',[5],1,'+')
                //result："1asd88465as+++++"
            */
      let regtext = '',
        reg = null,
        replaceText = replchar || '*',
        type = way || 0;
      if (regArr.length === 3 && type == 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})';
        Reg = new RegExp(regtext);
        let replaceCount = this.repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2');
      } else if (regArr.length === 3 && type === 1) {
        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}';
        Reg = new RegExp(regtext);
        let replaceCount1 = this.repeatStr(replaceText, regArr[0]);
        let replaceCount2 = this.repeatStr(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2);
      } else if (regArr.length === 1 && type === 0) {
        regtext = '(^\\w{' + regArr[0] + '})';
        Reg = new RegExp(regtext);
        let replaceCount3 = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount3);
      } else if (regArr.length === 1 && type === 1) {
        regtext = '(\\w{' + regArr[0] + '}$)';
        Reg = new RegExp(regtext);
        let replaceCount4 = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount4);
      }
    },
    checkStrType: function(str, type) {
      /*
             str: 字符串
             type: phone, email, tel, number, english, text, chinese, lower, upper, idcard, realname, carid, url,
             */
      switch (type) {
        case 'email':
          return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
          return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
          return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'url':
          return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(
            str
          );
        case 'idcard':
          /*
                        中国的身份证号，一代身份证号是15位的数字，二代身份证都是18位的，最后一位校验位除了可能是数字还可能是'X'或'x'，
                        所以有四种可能性：a.15位数字 b.18位数字 c.17位数字，第十八位是'X' d.17位数字，第十八位是'x'
                     */
          return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'carid':
          /*
                     车牌规则:
                        1.常规车牌号：仅允许以汉字开头，后面可录入六个字符，由大写英文字母和阿拉伯数字组成。如：粤B12345；
                        2.武警车牌：允许前两位为大写英文字母，后面可录入七个字符，由大写英文字母和阿拉伯数字组成，其中第三位可录汉字也可录大写英文字母及阿拉伯数字，如：WJ01警0081、WJ0112345。
                        3.最后一个为汉字的车牌：允许以汉字开头，后面可录入六个字符，前五位字符，由大写英文字母和阿拉伯数字组成，而最后一个字符为汉字，汉字包括“挂”、“学”、“警”、“军”、“港”、“澳”。如：粤Z1234港。
                        4.新军车牌：以两位为大写英文字母开头，后面以5位阿拉伯数字组成。如：BA12345。
                        5.黑龙江车牌存在08或38开头的情况
                     */
          return /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(
            str
          );
        case 'realname':
          // 真实姓名,用的unicode字符的来进行匹配，而中国人的姓名长度一般都是2-5，所以重复匹配{2,5}次
          return /^[\u4e00-\u9fa5]{2,5}$/.test(str);
        case 'formatedate':
          return /(\d{4}(\-|\/|.)\d{1,2}\1\d{1,2})/.test(str);
        case 'number':
          return /^[0-9]$/.test(str);
        case 'english':
          return /^[a-zA-Z]+$/.test(str);
        case 'text':
          return /^\w+$/.test(str);
        case 'chinese':
          return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
          return /^[a-z]+$/.test(str);
        case 'upper':
          return /^[A-Z]+$/.test(str);
        default:
          return true;
      }
    },
    checkPwd: function(str) {
      // 检测密码强度
      var nowLv = 0;
      if (str.length < 6) {
        return nowLv;
      }
      if (/[0-9]/.test(str)) {
        nowLv++;
      }
      if (/[a-z]/.test(str)) {
        nowLv++;
      }
      if (/[A-Z]/.test(str)) {
        nowLv++;
      }
      if (/[\.|-|_]/.test(str)) {
        nowLv++;
      }
      return nowLv;
    },
    // 找出某段字符在字符串中出现的次数
    countStrIn: function(str, strSplit) {
      /*
            //var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
            //ecDo.countStr(strTest,'blog')
            //result：6
            */
      return str.split(strSplit).length - 1;
    },
    formatText: function(str, size, delimiter) {
      /*
            //ecDo.formatText('1234asda567asd890')
            //result："12,34a,sda,567,asd,890"
            //ecDo.formatText('1234asda567asd890',4,' ')
            //result："1 234a sda5 67as d890"
            //ecDo.formatText('1234asda567asd890',4,'-')
            //result："1-234a-sda5-67as-d890"
             */
      var _size = size || 3,
        _delimiter = delimiter || ',';
      var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
      var reg = new RegExp(regText, 'g');
      return str.replace(reg, _delimiter);
    }
  },
  DeviceUtils: {
    getExplore: function() {
      var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
      (s = ua.match(/rv:([\d.]+)\) like gecko/))
        ? (sys.ie = s[1])
        : (s = ua.match(/msie ([\d\.]+)/))
        ? (sys.ie = s[1])
        : (s = ua.match(/edge\/([\d\.]+)/))
        ? (sys.edge = s[1])
        : (s = ua.match(/firefox\/([\d\.]+)/))
        ? (sys.firefox = s[1])
        : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
        ? (sys.opera = s[1])
        : (s = ua.match(/chrome\/([\d\.]+)/))
        ? (sys.chrome = s[1])
        : (s = ua.match(/version\/([\d\.]+).*safari/))
        ? (sys.safari = s[1])
        : 0;
      // 根据关系进行判断
      if (sys.ie) return 'IE: ' + sys.ie;
      if (sys.edge) return 'EDGE: ' + sys.edge;
      if (sys.firefox) return 'Firefox: ' + sys.firefox;
      if (sys.chrome) return 'Chrome: ' + sys.chrome;
      if (sys.opera) return 'Opera: ' + sys.opera;
      if (sys.safari) return 'Safari: ' + sys.safari;
      return 'Unkonwn';
    },
    getPlatformType: function(type) {
      var ua = navigator.userAgent.toLowerCase();
      switch (type) {
        case 'android':
          return navigator.userAgent.toLowerCase().indexOf('android') !== -1;
        case 'iphone':
          return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
        case 'ipad':
          return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;
        case 'weixin':
          return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
        default:
          return navigator.userAgent.toLowerCase();
      }
    },
    getPlatformOS: function() {
      var userAgent =
        ('navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase()) ||
        '';
      var vendor =
        ('navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase()) || '';
      var appVersion =
        ('navigator' in window &&
          'appVersion' in navigator &&
          navigator.appVersion.toLowerCase()) ||
        '';

      if (/mac/i.test(appVersion)) return 'MacOSX';
      if (/win/i.test(appVersion)) return 'windows';
      if (/linux/i.test(appVersion)) return 'linux';
      if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios';
      if (/android/i.test(userAgent)) return 'android';
      if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
    }
  },
  ArrayUtils: {
    // 判空
    isNullArr: arr => Array.isArray(arr) && !arr.length,
    // 判断两数组是否相等
    isArrEqual: (arr1, arr2) => {
      if (arr1 === arr2) return true;
      if (arr1.length != arr2.length) return false;
      for (let i = 0; i < arr1.length; ++i) {
        if (arr1[i] != arr2[i]) return false;
      }
      return true;
    },
    // 拷贝
    copyArr: arr => _arr => [..._arr],
    // 拼接数组
    concatArr: (arr1, arr2) => [...arr1, ...arr2],
    // 去重
    uniqueNumInArr: arr => [...new Set(arr)],
    // 过滤数组的空值
    filterNullInArr: arr => arr.filter(Boolean),
    // 首部插入
    putInArrHead: (num, arr) => {
      //return [num].concat(arr)
      // [num, ...arr]
      return arr.unshift(num);
    },
    // add obj uniq in arr
    putObjInArr: (obj, arr, type) => {
      for (let i = 0; i < arr.length; i += 1) {
        if (type == 'device') {
          if (arr[i].name == obj.name) {
            // arr[i].age = obj.age
            return;
          }
        } else if (type == 'characteristic') {
          if (arr[i].uuid == obj.uuid) {
            // arr[i].age = obj.age
            return;
          }
        }
      }
      arr.push(obj);
      return arr;
    },
    // 尾部插入
    putInArrEnd: (num, arr) => {
      // arr.concat(num)
      // arr[arr.length] = num
      // [..., num]
      return arr.push(num);
    },
    //统计数组成员个数
    countArrItemNum: arr =>
      arr.reduce((t, c) => {
        t[c] = t[c] ? ++t[c] : 1;
      }, {}),
    // 获取随机数组成员(抽奖用(获取后过滤))
    randomNumInArr: arr => arr[Math.floor(Math.random() * arr.length)]

    /*
         解构数组
         const arr = [0, 1, [2, 3, [4, 5]]];
         const [a, b, [c, d, [e, f]]] = arr;

         //解构数组成员别名
         const arr = [0, 1, 2];
         const { 0: a, 1: b, 2: c } = arr;

         // 解构数组成员默认值
         const arr = [0, 1, 2];
         const [a, b, c = 3, d = 4] = arr;
         // a b c d => 0 1 2 4
         */
  },
  NumberUtils: {
    // 取整 ～～1.69 => 1, 1.69｜0 ==> 1, 1.69>>0 => 1
    // fillZero(169, 5) => '00169'
    fillZero: (num, len) => num.toString().padStart(len, '0'),
    // 转数值 +null => 0; +"" => 0; +false=>0, +'169' => 169
    // 转时间戳 "2019-12-12" 或 "2019-12-12 09:21:22"
    timeStamp: fortimestr => +new Date(fortimestr),
    // 判断奇偶 oddEven(2) ==> even
    oddEven: num => (!!(num & 1) ? 'odd' : 'even'),
    // 寻找数组中的最大值或最小值
    minNum: arr => Math.min(...arr),
    // 生成一定范围内的随机数 randomNum(2,10) => 4...
    randomNum: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
  },
  /*
     判断条件执行函数
     const flagA = true; // 条件A
     const flagB = false; // 条件B
     (flagA || flagB) && Func(); // 满足A或B时执行
     (flagA || !flagB) && Func(); // 满足A或不满足B时执行
     flagA && flagB && Func(); // 同时满足A和B时执行
     flagA && !flagB && Func(); // 满足A且不满足B时执行

     const flag = false; // undefined、null、""、0、false、NaN
     !flag && Func(); // 为非假值时执行
     // 数组不为空时执行
     const arr = [0, 1, 2];
     arr.length && Func();

    // 对象不为空时执行
    const obj = { a: 0, b: 1, c: 2 };
    Object.keys(obj).length && Func();
     */
  ClassUtils: {
    hasClass: (ele, cls) => new RegExp('(\\s|^)' + cls + '(\\s|$)').test(ele.className),
    addClass: (ele, cls) => {
      if (!this.hasClass(ele, cls)) {
        ele.className += ' ' + cls;
      }
    },
    removeClass: (ele, cls) => {
      if (this.hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
      }
    }
  }
};
