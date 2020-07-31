export default{
    state:{
		phone:"",
		name:"",
		picture:"",
		userId:""
	},
	getters:{
		phone:state=>state.phone,
		name:state=>state.name,
		picture:state=>state.picture,
		userId:state=>state.userId
	},
    mutations: {
		Phone(state,phone){
			state.phone = phone;
		},
		Name(state,name){
			state.name = name;
		},
		Picture(state,picture){
			state.picture = picture;
		},
		LogType(state,data){
			state.userId = data;
		}
	},
    actions: {
		getPhoneData({commit},id){
			
		},
		getNameData({commit},id){
			
		},
		getUserData({commit},id){
			return new Promise((resolve, reject) => {
				if(id === ""){
					resolve();
				}
				this.axios({
					url:"/user/data",
					method:"GET",
					data:{
						id:id
					}
				}).then(res=>{
					if(res.data.msgCode == 200){
						commit('Phone',res.data.info.phone);
						commit('Name',res.data.info.name);
						commit('Picture',res.data.info.headpic);
						resolve({
							code:res.data.msgCode,
						});
					}else{
						commit('Phone',"");
						commit('Name',"");
						commit('Picture',"");
						commit('LogType',"");
						uni.setStorage({
							key: 'yehan_user_info',
							data: JSON.stringify({
								id:""
							})
						});
						resolve({
							code:res.data.msgCode,
							info:res.data.info
						});
					}
				}).catch(err=>{
					reject(err);
				})
			})
		},
		emptyUserData({commit}){
			commit('Phone',"");
			commit('Name',"");
			commit('Picture',"");
			commit('LogType',"");
		},
		logtypechange({commit},data){//更变登录状态
			uni.setStorage({
			    key: 'yehan_user_info',
			    data: JSON.stringify({
					id:data
				})
			});
			commit("LogType",data);
		},
		login({commit},data){
			return new Promise((resolve, reject) => {
				console.log("?")
				this.axios({
					url:"/user/login",
					method:"POST",
					// type:"FormData",
					data:data
				}).then(res=>{
					if(res.data.msgCode == 200){
						uni.setStorage({
						    key: 'yehan_user_info',
						    data: JSON.stringify({
								id:res.data.info
							})
						});
						commit('LogType',res.data.info)
						resolve({code:res.data.msgCode});
					}else{
						resolve({
							code:res.data.msgCode,
							info:res.data.info
						});
					}
				}).catch(err=>{
					console.log(err)
					reject(err);
				})
			})
		}
	}
}