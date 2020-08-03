<template>
	<div id='home' class='home'>
		<div class="banner">
			<div class="bannerbgc"></div>
			<div class="bannerves">
				<u-swiper :list="list" height="300" border-radius="20" @click="banner"></u-swiper>
			</div>
		</div>
		
	</div>
</template>

<script>
	import {mapActions,mapGetters} from 'vuex';
	export default {
		name:'home',
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg'
					}
				],
			}
		},
		onReady:function (){
			this.init();//下拉刷新
		},
		components:{
		},
		computed:{
			...mapGetters([])
		},
		methods: {
			...mapActions([]),
			init(cd){
				cd && cd();
			},
			banner(index){
				console.log(index)
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	.banner{
		.bannerbgc{
			height: 200rpx;
			width: 100%;
			background-color: #F0AD4E;
		}
		.bannerves{
			position: absolute;
			top: 0;
			width: 700rpx;
			height: 300rpx;
			left: 25rpx;
			border: solid 1px #adadad;
			border-radius: 20rpx;
			
		}
	}
</style>
