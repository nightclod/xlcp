import Vue from 'vue'
import App from './App'
import store from './store'//引入vuex
import {time} from './common/js/commonFunction.js'
import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false;
// 挂载方法
Date.prototype.Time = time;
Vue.prototype.$store = store;
Vue.prototype.axios = function({url,method,data,type,header}){
	let head = header || {};
	if(type && type == "FormData"){
		head['Content-Type']='application/x-www-form-urlencoded'
	}
	return new Promise((resolve, reject) => {
		uni.request({
			method: method,
			url: 'https://www.sdfple.com/' + url, //仅为示例，并非真实接口地址。
			data: data,
			header: head,
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err);
			}
		});
	})
};




App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()



