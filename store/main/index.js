export default{
    state:{
		proTitleList:[]
	},
	getters:{//数据的计算 过滤 分拣
		proTitleList:state=>state.proTitleList
	},
    mutations: {
		ProTitleList(state,proTitleList){
			state.proTitleList = proTitleList;
		}
	},
    actions: {
		getProTitleList({commit}){
			return new Promise((resolve, reject) => {
				this.axios({
					url:"request33",
					method:"POST",
					type:"FormData"
				}).then(res=>{
					console.log(res,"res");
				}).catch(err=>{
					console.log(err,"err");
				})
			})
		}
	}
}