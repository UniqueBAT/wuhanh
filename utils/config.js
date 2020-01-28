let HOST = ''
let IMG_HOST = ''
let ENV = process.env.NODE_ENV

if (ENV == 'development') {
	// 开发环境
	HOST = 'http://120.79.211.179:5566/'
	IMG_HOST = 'http://120.79.211.179:5566/'
} else {
	// 生产环境
	HOST = 'https://whapi.51rry.com/'
	IMG_HOST = 'https://whapi.51rry.com/'
}

export default {
	HOST,
	IMG_HOST
}
