<template>
	<div id="main" class="dis-flex flex-dir-col">
		<div class="main">
			<home ref="home" v-if="keyi==1 ? true : false"></home>
			<mine ref="mine" v-if="keyi==2 ? true : false"></mine>
		</div>
		<div id="menu" class="menu">
			<div @click="home">  
				<div class="main_icon">
				</div>
				<p :class="keyi==1?'typei':''">首页</p>
			</div>
			<div @click="mine">
				<div class="main_icon">
				</div>
				<p :class="keyi==2?'typei':''">我的</p>
			</div>
		</div>
	</div>
</template>
<script>
	import Home from '../home/index.vue'
	import Mine from '../mine/index.vue'
	import {mapActions,mapGetters} from 'vuex';
	export default {
		data() {
			return {
				keyi: 1
			}
		},
		onLoad:function(option){
			if(option.index){
				this.keyi = parseInt(option.index);
				if(this.keyi == 1){
					uni.setNavigationBarTitle({
					    title: '首页'
					});
				}else if(this.keyi == 2){
					uni.setNavigationBarTitle({
					    title: '我的'
					});
				}
			}
		},
		onPageScroll: function(res) {//监听滚动
			// if(this.keyi === 1){
			// 	this.$refs['home'].sticky = res.scrollTop > 53 ? false : true;
			// }
		},
		onPullDownRefresh() {//下拉刷新
			if(this.keyi === 1){
				this.$refs['home'].init(()=>{
					uni.stopPullDownRefresh();
				});
			}else if(this.keyi === 2){
				// this.$refs['mine'].init(()=>{
				// 	uni.stopPullDownRefresh();
				// });
			}
		},
		components:{
			Home,
			Mine
		},
		computed:{
			// ...mapGetters(["userId"])
		},
		methods: {
			// ...mapActions(["getSystemInfo","logtypechange"]),
			home(){
				if(this.keyi == 1){return}
				this.keyi = 1;
				uni.setNavigationBarTitle({
				    title: '首页'
				});
			},
			mine(){
				if(this.keyi == 2){return}
				this.keyi = 2;
				uni.setNavigationBarTitle({
				    title: '我的'
				});
			}
		},
		mounted() {
			// this.getSystemInfo();
			// if(this.userId === ""){
			// 	uni.getStorage({
			// 		key: 'yehan_user_info',
			// 		success: (res)=>{
			// 			let data = JSON.parse(res.data);
			// 			if(data.id !== ""){
			// 				this.logtypechange(data.id);
			// 			}
			// 		}
			// 	});
			// }
		}
	}
</script>
<style lang="scss">
	.main{
		overflow: auto;
		padding-bottom: 104rpx;
	}
	.menu{
		position: fixed;
		height: 104rpx;
		width: 100%;
		bottom: 0;
		display: flex;
		text-align: center;
		background-color: #fafafa;
		background-color: #aaa;
		> div{
			padding-top: 16rpx;
			height: 88rpx;
			width: 325rpx;
			.main_icon{
				height: 50rpx !important;
			}
			i{
				color: #575859;
				font-size: 40rpx;
			}
			p{
				height: 20rpx;
				line-height: 20rpx;
				color: #9d9d9d;
				font-size: 20rpx;
			}
			.typei{
				color: #464646;
			}
		}
	}
</style>
