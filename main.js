import Vue from 'vue'
import App from './App'

//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

const app = new Vue({
    ...App,
	store
})
app.$mount()
