<template>
	<view class="content">
		<image class="logo" src="/static/uview/common/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<u-tabbar :list="tabbar" :before-switch="beforeSwitch"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '模板',
				tabbar: ''
			}
		},
		onLoad() {
			this.tabbar = this.$store.state.tabbar
		},
		methods: {
			beforeSwitch(index) {
				const token = uni.getStorageSync('token');
				console.log('token=' + token)
				if (token) {
					return true;
				} else {
					console.log('run=' + index)
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
