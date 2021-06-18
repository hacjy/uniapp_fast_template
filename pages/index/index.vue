<template>
	<view class="content">
		 <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" @emptyclick="emptyClick"
		 :down="downOption" :up="upOption" fixed="true">
			<!-- 数据列表 -->
			<good-list :list="goods"></good-list>
		</mescroll-body>
		<u-tabbar :list="tabbar" :before-switch="beforeSwitch"></u-tabbar>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {apiGoods} from "@/api/mock.js"
	
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				tabbar: '',
				
				downOption:{
					auto:false // 自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption:{
					auto:true, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
						btnText: '去看看'
					},
					textNoMore:"无更多数据"
				},
				goods: [] //列表数据
			}
		},
		onLoad() {
			/**
			 * 示例中为每个tabbar页面都写了一遍tabbar变量，您可以将tabbar数组写入到vuex中，这样可以全局引用
			 */
			this.tabbar = this.$store.state.tabbar
		},
		methods:{
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				// this.i: 每个tab页的专属下标
				// this.index: 当前tab的下标
				let word = "全部" // 具体项目中,您可能取的是tab中的type,status等字段
				apiGoods(page.num, page.size, word).then(res=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					// this.mescroll.endSuccess(res.list.length);
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					this.mescroll.endByPage(res.list.length, 3); //必传参数(当前页的数据个数, 总页数)
					
					//设置列表数据
					if(page.num == 1) this.goods = []; //如果是第一页需手动制空列表
					this.goods=this.goods.concat(res.list); //追加新数据
				}).catch(()=>{
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			//点击空布局按钮的回调
			emptyClick(){
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
			},
			beforeSwitch(index) {
				const token = uni.getStorageSync('token');
				console.log('token='+token)
				if(token) {
					return true;
				}else {
					console.log('run='+index)
					uni.navigateTo({
					    url: '/pages/login/index',
					});
					return false;
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
