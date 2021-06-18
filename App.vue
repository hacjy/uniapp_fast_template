<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes);

					// 获取用户信息
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							console.log('用户昵称为：' + infoRes.userInfo.nickName);

							console.log(JSON.stringify(infoRes.userInfo));
							uni.setStorage({ //缓存用户登陆状态
								key: 'userInfo',
								data: infoRes.userInfo
							})

						}
					});


					//获取用户openid 
					uni.request({
						url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx8551cb891a35bfad&secret=5c8468f8838cf2acab8ba4b51419038c&js_code=' +
							loginRes.code + '&grant_type=authorization_code',
						data: {
							text: 'uni.request'
						},

						header: {
							'custom-header': 'hello' //自定义请求头信息
						},
						success: (res) => {
							console.log(res);
							uni.setStorage({ //缓存用户openid 
								key: 'userInfoOpenId',
								data: res.data.openid
							})

						}
					});


				}
			});
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>


<style lang="scss">
	@import "uview-ui/index.scss";
</style>
