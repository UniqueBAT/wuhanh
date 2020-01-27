/* 
	思路:
	封装一个方法，方法的参数就是 键key，值value，时间time，
	里面存两个缓存，一个存你要存的数据，一个用来存时间，这个时间怎么存呢，
	自定义一个标识（我用的是“redis”）+key值

	取值的也是一样的，封装一个方法，参数只需要key就行了，
	先用自定义的标识+key取出时间，然后比较现在的时间，如果大于现在的时间，
	说明还没过期，然后返回key对应的value，如果小于现在的时间，说明过期了，
	删除key对应的数据，返回null
 */
const redis = 'redis'
module.exports = {
    /**
     * 设置
     * k 键key
     * v 值value
     * t 秒
     */
    set: function (k, v, t) {
        let seconds = parseInt(t)
        uni.setStorageSync(k, v)
        if (seconds > 0) {
            let newtime = Date.parse(new Date())
            newtime = newtime / 1000 + seconds
            uni.setStorageSync(k + redis, newtime + '')
        } else {
            uni.removeStorageSync(k + redis)
        }
    },
    get: function (k) {
        let deadtime = parseInt(uni.getStorageSync(k + redis))
        if (deadtime) {
            if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
                this.remove(k)
                console.log(k + '过期了')
                return null
            }
        }
        let res = wx.getStorageSync(k)
        return res ? res : null
    },
    remove: function (k) {
        uni.removeStorageSync(k)
        uni.removeStorageSync(k + redis)
    },
    clear: function () {
        uni.clearStorageSync()
    }

}
