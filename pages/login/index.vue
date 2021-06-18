<template>
	<view class="content">
		<!-- <image class="bg-set" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpicnew12.photophoto.cn%2F20180520%2Flanselandaeryuanbeijing-32055346_1.jpg&refer=http%3A%2F%2Fpicnew12.photophoto.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626574983&t=87452c58c4ca5368cf0a6145809d3e02"></image> -->
		
		<!-- 小程序不需要自定义导航栏，会重复-->
		<!-- <u-navbar back-text="返回" title="登录"></u-navbar> -->
		<view class="content-item">
			<text class="label">用户名：</text>
			<u-input class="input" v-model="username" border="false" type="text" placeholder="请输入用户名"></u-input>
		</view>
		<view class="content-item">
			<text class="label">密 码：</text>
			<u-input class="input" v-model="password" border="true" type="password" passwordIcon="true"
				placeholder="请输入密码"></u-input>
		</view>
		<view class="content-item">
			<text class="label">验证码：</text>
			<u-input class="input" v-model="smscode" border="true" type="number" placeholder="请输入验证码"></u-input>
			<view class="smscode">
				<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange">
					</u-verification-code>
				<u-button size="medium" :custom-style="customStyle" @click="getCode">{{tips}}</u-button>
			</view>
		</view>
		<view class="protocol">
			<u-checkbox v-model="checked" size="30"></u-checkbox>
			<view class="text" @click="change">
				登录即代表同意
				<text class="item" @click="clickPro(1)">《用户协议》</text>
				与
				<text class="item" @click="clickPro(2)">《服务协议》</text>
			</view>
		</view>
		<view class="login-btn">
			<u-button type="primary" @click="login" ripple="true">登录</u-button>
		</view>
	</view>
</template>

<script>
	import ApiService from "@/api/api.js";

	export default {
		data() {
			return {
				username: '',
				password: '',
				smscode:'',

				tips:'',
				seconds: 60,
				
				checked:false,
				index:0,

				customStyle: {
						width: '80px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					}
			}
		},
		methods: {
			login() {
				var data = {
					username: this.username,
					password: this.password
				}
				ApiService.login(data).then(res => {
					console.log(res);
					if (res.data.errorCode != 0) {
						uni.showToast({
							icon: "none",
							title: res.data.errorMsg
						})
					}
				}).catch(error => {
					console.log(error);
				});
			},
			
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('倒计时开始');
			},
			
			change() {
				console.log('change')
				if(this.index == 0) {
					this.checked = !this.checked;
				} else {
					this.index = 0;
				}
			},
			clickPro(index) {
				this.index = index;
				console.log('clickPro')
				this.$u.toast(index==1?'打开用户协议':'打开服务协议')
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20px;
	}
	
	.bg-set {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: -1;
	}
	
	.content-item {
		margin-top: 10px;
		display: flex;
		align-items: center;
		
		.label {
			min-width: 48px;
			font-size: 26upx;
			text-align: right;
		}

		.input {
			flex: 1;
		}
		
		.smscode {
			margin-left: 10px;
		}
	}

	.protocol {
		display: flex;
		align-items: center;
		margin-top: 10px;
		
		.text {
			font-size: 26upx;
			margin-left: -10px;
		}
		
		.item {
			color: blue;
		}
	}

	.login-btn {
		margin-top: 48px;
	}
</style>
