export default{
    state: {
		taskbarHight:0,
		windowWidth:0,
		windowHeight:0,
		currentAddress:"地址..."
	},
	getters:{
		currentAddress:state=>state.currentAddress,
		taskbarHight:state=>state.taskbarHight,
		windowWidth:state=>state.windowWidth,
		windowHeight:state=>state.windowHeight
	},
    mutations: {
		SystemInfo(state,data){
			state.taskbarHight = data.statusBarHeight;
			state.windowWidth = data.windowWidth;
			state.windowHeight = data.windowHeight;
		},
		CurrentAddress(state,{currentAddress}){
			state.currentAddress = currentAddress;
		}
	},
    actions: {
		getSystemInfo({commit}){//获取手机信息
			if(this.getters.taskbarHight === 0){
				commit('SystemInfo',uni.getSystemInfoSync());
			}
		},
		verifySession({commit},cd){//判断是否过期并登录
			uni.checkSession({
				success: () => {cd && cd();},
				fail:()=>{
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							wx.cloud.init();
							wx.cloud.callFunction({
								name: 'login',
								data: {"code": loginRes.code},
								success: res => {
									console.log('连接成功');
									cd && cd();
								},
								fail: err => {
									console.log('连接失败',err);
								}
							})
						},
						fail: (err) => {
							uni.showToast({
							    title: '登录失败，请稍后重新登录',
							    duration: 2000
							});
						}
					});	
				}
			});
		},
		authorizeSite({commit},cd){//判断是否授权位置信息
			uni.authorize({
			    scope: 'scope.userLocation',
			    success() {
					cd && cd();
			    },
				fail() {
					console.log('拒绝授权位置');
					uni.showModal({
					    title: '提示',
					    content: '您拒绝了授权位置，是否打开设置页重新设置',
					    success: function (res) {
					        if (res.confirm) {
								wx.openSetting()
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
					
				}
			})
		},
		getCurrentAddress({commit},refresh){//获取当前位置
			if(refresh || (this.getters.currentAddress === "地址...")){
				uni.authorize({
				    scope: 'scope.userLocation',
				    success() {
						qqmapsdk.reverseGeocoder({
							success: function(res) {
								commit("CurrentAddress",{currentAddress:res.result.formatted_addresses.recommend});
							},
							fail: function(error) {
								uni.showModal({
									title: '提示',
									content: error,
								});
							}
						})
				    }
				})	
			}
		}
	}
}