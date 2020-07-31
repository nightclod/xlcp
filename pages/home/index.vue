<template>
	<div id='home' class='home'>
		
		
	</div>
</template>

<script>
	import {mapActions,mapGetters} from 'vuex';
	export default {
		name:'home',
		data() {
			return {
				
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
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
