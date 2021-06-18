import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		tabbar:[
				{
					iconPath: "/static/uview/example/component.png",
					selectedIconPath: "/static/uview/example/component_select.png",
					text: '首页',
					count: 2,
					pagePath: "/pages/index/index"
				},
				{
					iconPath: "/static/uview/example/js.png",
					selectedIconPath: "/static/uview/example/js_select.png",
					text: '消息',
					midButton: true,
					pagePath: "/pages/message/index"
				},
				{
					iconPath: "/static/uview/example/template.png",
					selectedIconPath: "/static/uview/example/template_select.png",
					text: '我的',
					pagePath: "/pages/mine/index"
				},
			]
	},
	mutations: {
		SET_TABBAR(state,tabbar){
			state.tabbar = tabbar||[]
		}
	},
	actions: {
	}
})

export default store
