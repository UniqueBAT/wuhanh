import Request from '@/utils/api/request'
import HOST from "@/utils/config"
import constant from '@/utils/constant.js'
import redis from '@/utils/redis.js'

const http = new Request()

// 设置发送请求的头部
http.setConfig((config) => {
    config.baseUrl = HOST
    config.isLoading = config.isLoading || false
	let token = uni.getStorageSync('token');
	
    config.header = {
        ...config.header,
		'content-type': 'application/json',
		'accessToken': token || undefined
    }

    return config
})

// 设置拦截器
http.interceptor.request((config, cancel) => {
    /* 请求之前拦截器 */
    let method = config.method.toLowerCase()
    if (method == 'post') {
        config.data = {
            ...config.data,
        }
    } else if (method == 'get') {
        config.params = {
            ...config.params,
        }
    }else if (method == 'put') {
        config.params = {
            ...config.params,
        }
    }
	
    config.header = {
        ...config.header,
    }

    // 判断是否有token存在, 如果没有就跳转注册
    if (!config.header.token) {
        //todo... 处理未登录情况
        // cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
    }
    let _showLoading = false;
    // 是否显示加载
    if (config.isLoading) {
        uni.showLoading({
            title: '加载中...'
        })
        _showLoading = true;
    }

    return config

})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
    return statusCode === constant.SUCCESS_CODE
}

http.interceptor.response((response) => {
    /* 请求之后的响应拦截,对响应状态进行判断 */
    let statusCode = response.statusCode
    if (statusCode == constant.SUCCESS_CODE) {
		if(response.data) {
			return response.data
		}
        
    } else {
        //todo... 对初出错的响应进行处理
    }
}, (error) => {
    /* 请求错误的处理, 可以在此处做一个报警机制的处理 */
	if(error.data.code == '30003') {
		uni.showToast({
			icon: 'none',
		    title: error.data.data ? error.data.data : '网络繁忙，请稍后再试。',
		    duration: 2000
		});
	}
	
    return error
})

export {
    http
}
