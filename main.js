import Vue from 'vue'
import App from './App'

import api from '@/utils/api/api.js'
import utils from '@/utils/util.js';
import redis from '@/utils/redis.js';
import cityNameFilter from '@/filters/city-filter.js';

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})

Vue.prototype.$api = api
Vue.prototype.$utils = utils;
Vue.prototype.$redis = redis;
Vue.filter('cityname', cityNameFilter)

app.$mount()
