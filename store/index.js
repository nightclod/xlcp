import Vue from 'vue'
import Vuex from 'vuex'
// import system from './system.js'
import main from './main/index.js'
// import mine from './mine/index.js'
Vue.use(Vuex)
Vuex.Store.prototype.axios = function({url,method,data,type,header}){
	let head = header || {};
	if(type && type == "FormData"){
		head['Content-Type']='application/x-www-form-urlencoded'
	}
	return new Promise((resolve, reject) => {
		uni.request({
			method: method,
			url: 'http://192.168.3.192:3000' + url, 
			data: data || "",
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

const store = new Vuex.Store({
    modules:{
		// system,
		main,
		// mine
	}
})

export default store
