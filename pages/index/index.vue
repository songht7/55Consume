<template>
	<view class="container">
		<swiper class="swiper" :current="current" :circular="circular" :vertical="vertical" @change="onSwiperChange"
		 :disable-touch="disableTouch">
			<swiper-item>
				<view class="pages pages-1 "></view>
			</swiper-item>
			<swiper-item>
				<view class="pages pages-2 "></view>
			</swiper-item>
			<swiper-item>
				<view class="pages pages-3 "></view>
			</swiper-item>
			<swiper-item>
				<view class="pages pages-4 "></view>
			</swiper-item>
			<swiper-item>
				<page-detail ref="pageDetail" :details="details"></page-detail>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
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
				details: details
			}
		},
		components: {
			pageDetail
		},
		onLoad() {
			console.log(this.details);
		},
		methods: {
			onSwiperChange(e) {
				console.log(e.detail.current)
				if (e.detail.current == this.pageDetailIndex) {
					this.disableTouch = this.canLoop;
					this.$refs.pageDetail.getList();
				}
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
</style>
