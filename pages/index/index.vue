<template>
	<view class="container">
		<swiper class="swiper" :current="current" :circular="circular" :vertical="vertical" @change="onSwiperChange"
		 :disable-touch="disableTouch">
			<swiper-item>
				<view class="pages pages-1 ">
					<view class="p-icons p1i1 animate_icon animate__animated animate__fadeInLeft animate__slow"></view>
					<view class="p-icons p1i2 animate_icon animate__animated animate__rotateIn animate__slow"></view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="pages pages-2 ">
					<view class="p-icons p2i1 animate_icon animate__animated animate__pulse animate__slow"></view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="pages pages-3 ">
					<view class="p-icons p3i1 animate_icon animate__animated animate__slideInUp animate__slow"></view>
					<view class="p-icons p3i2 animate_icon animate__animated animate__tada animate__slow"></view>
					<view class="p-icons p3i3 animate_icon animate__animated animate__flipInY animate__slow"></view>
					<view class="p-icons p1i1 animate_icon animate__animated animate__fadeInLeft animate__slow"></view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="pages pages-4 ">
					<view class="p-icons p1i1 animate_icon animate__animated animate__fadeInLeft animate__slow"></view>
					<view class="p-icons p1i2 animate_icon animate__animated animate__rotateIn animate__slow"></view>
					<view class="p-icons p3i3 animate_icon animate__animated animate__flipInY animate__slow"></view>
				</view>
			</swiper-item>
			<swiper-item>
				<page-detail ref="pageDetail" :details="details" :screenHeight="screenHeight"></page-detail>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	var jweixin = require('jweixin-module')
	import pageDetail from "@/components/page-detail.vue"
	// import details from "/common/detail.js"
	import {
		details
	} from "../../common/details/detail.js"
	export default {
		data() {
			return {
				disableTouch: false,
				vertical: true, //是否纵向
				circular: false, //是否采用衔接滑动
				current: 0,
				pageDetailIndex: 4,
				canLoop: false,
				details: details,
				systemInfo: {},
				screenHeight: 667,
				isWeixin: false

			}
		},
		components: {
			pageDetail
		},
		onLoad() {
			var that = this;
			let isWeixin = !!/micromessenger/i.test(navigator.userAgent.toLowerCase());
			that.isWeixin = isWeixin;
			if (isWeixin) {
				that.wxShare();
			}
			//console.log(this.details);
		},
		onShow() {
			var that = this;
			uni.getSystemInfo({
				success(res) {
					that.systemInfo = res;
					that.screenHeight = res.screenHeight;
				},
				complete() {
					console.log("getSystemInfo:", that.screenHeight)
				}
			});
		},
		methods: {
			onSwiperChange(e) {
				console.log(e.detail.current)
				if (e.detail.current == this.pageDetailIndex) {
					this.disableTouch = this.canLoop;
					this.$refs.pageDetail.setTtitleAnt();
					this.$refs.pageDetail.getList();
				}else{
					this.$refs.pageDetail.setTtitleNoAnt();
				}
			},
			wxShare() {
				var that = this;
				var getTicketUrl = location.origin + "/#/";
				if (that.isIOS()) {
					getTicketUrl = location.origin + "/";
				}
				var api = 'http://api_test.meetji.com/v2/ApiWeChat-getJsApiTicket.htm?url=' + getTicketUrl;
				console.log("wxShare-api:", api);
				uni.request({
					url: api,
					method: "GET",
					data: {},
					header: {},
					success: function(res) {
						console.log(res);
						let __res = res.data;
						var result = {};
						if (__res.success) {
							if (__res.data) {
								result = __res.data;
							}
							uni.setStorage({
								key: 'wx_ticket',
								data: {
									"access_token": result.access_token,
									"jsapi_ticket": result.ticket,
									"noncestr": result.noncestr,
									"signature": result.signature,
									"expires_in": result.expires_in
								},
								success: function() {}
							});
							var _config = {
								debug: false,
								appId: 'wx11eb371cd85adfd4',
								timestamp: result.timestamp,
								nonceStr: result.noncestr,
								signature: result.signature,
								jsApiList: [
									'updateAppMessageShareData',
									'updateTimelineShareData',
									'onMenuShareAppMessage',
									'onMenuShareTimeline',
									'onMenuShareQQ'
								]
							}
							console.log("_config:", _config)
							jweixin.config(_config);
						} else {
							result = {
								"Result": "0",
								"Msg": "请求失败，请重试!",
								"err": ""
							}
						}
					},
					fail: function(err) {},
					complete: function(comp) {}
				})
				var wxSet = {
					title: "上海信息消费节",
					desc: "2020 上海信息消费节开幕式 暨数字新生代云峰汇",
					link: 'http://consume.bdmartech.com/#/',
					imgUrl: 'http://consume.bdmartech.com/static/page-index.jpg',
					success: function() {}
				};
				jweixin.ready(function() {
					//wx.updateAppMessageShareData(wxSet);
					//wx.updateTimelineShareData(wxSet);
					// 2. 分享接口
					// 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
					jweixin.onMenuShareAppMessage(wxSet);
					// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
					jweixin.onMenuShareTimeline(wxSet);
					// 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
					jweixin.onMenuShareQQ(wxSet);
				});
			},
			isIOS: function() {
				var isIphone = navigator.userAgent.includes('iPhone');
				var isIpad = navigator.userAgent.includes('iPad');
				return isIphone || isIpad;
			}
		}
	}
</script>

<style scoped>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.container {
		flex: 1;
		width: 750rpx;
		min-height: inherit;
		min-width: inherit;
		background: url(../../static/bg.jpg) 50% 50% no-repeat;
		background-size: cover;
		position: relative;
	}

	.container:before {
		width: 100%;
		height: 50%;
		content: "";
		background: url(../../static/logo.png) 90% 0 no-repeat;
		background-size: auto 150rpx;
		position: absolute;
		top: 10rpx;
		left: 0;
	}

	.swiper {
		flex: 1;
		min-height: 100%;
	}

	.swiper-item {
		flex: 1;
	}

	.pages {
		min-height: 100%;
		min-width: 100%;
		background-image: url(../../static/page-1.png);
		background-position: 50% 50%;
		background-repeat: no-repeat;
		background-size: 95% auto;
		position: relative;
	}

	.pages:after {
		content: "";
		width: 80rpx;
		height: 80rpx;
		background: url(../../static/arrow.png) 50% 90% no-repeat;
		background-size: contain;
		transform: rotate(90deg);
		position: absolute;
		bottom: 10px;
		left: 45.5%;
		opacity: 0.6;
		animation: opener .5s ease-in-out alternate infinite;
	}

	@-webkit-keyframes opener {
		100% {
			bottom: 20px;
		}
	}

	@keyframes opener {
		100% {
			bottom: 20px;
		}
	}

	.pages-2 {
		background-image: url(../../static/page-2.png);
	}

	.pages-3 {
		background-image: url(../../static/page-3.png);
		background-size: contain;
	}

	.pages-4 {
		background-image: url(../../static/page-4.png);
	}

	.animate_icon {
		animation-iteration-count: infinite;
		animation-direction: alternate
	}

	.p-icons {
		width: 180rpx;
		height: 180rpx;
		background-image: url(../../static/p1-1.png);
		background-position: 50% 50%;
		background-repeat: no-repeat;
		background-size: contain;
		position: absolute;
	}

	.p1i1 {
		background-image: url(../../static/p1-1.png);
		left: 5%;
		top: 75%;
	}

	.p1i2 {
		width: 100rpx;
		height: 100rpx;
		background-image: url(../../static/p1-2.png);
		right: 10%;
		top: 80%;
	}

	.p2i1 {
		width: 250rpx;
		height: 250rpx;
		background-image: url(../../static/p2-1.png);
		left: -10px;
		top: 50%;
	}

	.p3i1 {
		width: 100rpx;
		height: 100rpx;
		background-image: url(../../static/p3-1.png);
		left: 10%;
		top: 15%;
	}

	.p3i2 {
		width: 80rpx;
		height: 80rpx;
		background-image: url(../../static/p3-2.png);
		right: 10%;
		top: 25%;
	}

	.p3i3 {
		width: 150rpx;
		height: 150rpx;
		background-image: url(../../static/p3-3.png);
		right: 0;
		top: 35%;
	}
</style>
