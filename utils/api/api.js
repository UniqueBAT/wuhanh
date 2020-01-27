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
	// 提交车辆信息
	postCarInfo: params => {
		return http.post(`${host}car/applyResource/`, params)
	},
	// 提交医院信息
	postHospitalInfo: params => {
		return http.post(`${host}demand/`, params)
	}
}
