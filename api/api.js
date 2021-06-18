/* 接口 */
import request from '@/api/http_request.js'

/* 测试Api */
export default{
	// 登录 玩安卓网站 用户名，密码 username，password
	login(data){
		return request.post("/user/login",data);
	}
} 
