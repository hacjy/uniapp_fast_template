import Request from '@/js_sdk/luch-request/luch-request/index.js'
import {
	BASE_API
} from '@/api/url.js'

const http = new Request({
	baseURL: BASE_API, //设置请求的base url
	timeout: 300000, //超时时长5分钟,
	header: {
		'Content-Type': 'application/json;charset=UTF-8;'
	}
})

//请求拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	const token = uni.getStorageSync('token');
	if (token) {
		config.headers.common["Authorization"] = 'Bearer ' + token;
	}

	if (config.method === 'POST') {
		config.data = JSON.stringify(config.data);
	}
	return config
}, error => {
	return Promise.resolve(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
	console.log(response)
	return response
}, (error) => {
	//未登录时清空缓存跳转
	if (error.statusCode == 401) {
		uni.clearStorageSync();
		uni.switchTab({
			url: "/pages/index/index.vue"
		})
	}
	return Promise.resolve(error)
})
export default http;
