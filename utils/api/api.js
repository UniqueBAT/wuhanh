import {
    http
} from "./http.js"
import config from '@/utils/config.js'

let host = config.HOST
export default {
	getDemandDetail: params => {
		if(params.id){
			return http.get(`${host}demand/`+params.id + '/')
		}
	},
	getDemandList: params => {
		return http.get(`${host}demand/`, params)
	},
	// 获取车辆信息
	getCarList: params => {
		return http.get(`${host}car/list/`, params)
	},
	// 获取车辆详情信息
	getCarDetail: params => {
		return http.get(`${host}car/`+params.id + '/')
	},
	// 获取车辆详情信息
	putCarDetail: params => {
		return http.put(`${host}car/apply/`+params.id + '/', params)
	},
	// 提交车辆信息
	postCarInfo: params => {
		return http.post(`${host}car/applyResource/`, params)
	},
	// 提交医院信息
	postHospitalInfo: params => {
		return http.post(`${host}demand/`, params)
	},
	// 修改医院信息
	putHospitalInfo: (params, id) => {
		return http.put(`${host}demand/apply/${id}`, params)
	},
	getDemandCount: () => {
		return http.get(`${host}demand/count`)
	}
}
