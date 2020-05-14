<template>
	<view class="page-detail">
		<view class="page-header">
			<view :class="['title',titleAnt]">
				上海信息消费节
			</view>
			<view :class="['title','title-sub',subTitleAnt]">
				精彩活动
			</view>
		</view>
		<view class="page-detail-main">
			<view class="detail-block detail-ctg">
				<view class="ctgs" v-for="(ctg,k) in details.category" :key="k">
					<view :class="['ctg-btn',currCtg==ctg.id?'active':'']" @click="switchCtg(k,ctg.id)">{{ctg.name}}</view>
				</view>
			</view>
			<view class="detail-block detail-sub-ctg">
				<view class="ctgs sub-ctgs" v-for="(subCtg,kk) in details['category'][currCtgIndex]['subCategory']" :key="kk">
					<view :class="['sub-ctg-btn',currSubCtg==subCtg.id?'active':'']" @click="switchSubCtg(kk,subCtg.id)">{{subCtg.name}}</view>
				</view>
			</view>
			<scroll-view scroll-y="true" class="detail-list-box" :style="{'height':listHeight}">
				<block v-for="(dtl,dk) in list" :key="dk">
					<view :class="['detail-block', 'detail-list','animate__animated','animate__fadeIn',animate__fadeOut,dtl.show?'detail-show':'']">
						<view :class="['detail-title']" @click="getDetail(dk,dtl.id)">{{dtl.name}}</view>
						<view class="detail-more" v-show="dtl.show">
							<view class="dtl-row">活动时间：{{dtl.time}}</view>
							<view class="dtl-row">活动地点/渠道：
								<block v-if="dtl.addressRich">
									<rich-text class="row-rich" :nodes="dtl.address"></rich-text>
								</block>
								<block v-else>
									{{dtl.address}}
								</block>
							</view>
							<view class="dtl-row">主办单位：
								<block v-if="dtl.companyRich">
									<rich-text class="row-rich" :nodes="dtl.company"></rich-text>
								</block>
								<block v-else>
									{{dtl.company}}
								</block>
							</view>
							<view class="detail-close" @click="getDetail(dk,dtl.id)"></view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			details: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			screenHeight: {
				type: Number,
				default: 667
			}
		},
		data() {
			return {
				currCtgIndex: 0,
				currCtg: 1, //当前分类 id
				currSubCtg: 101, //当前二级分类 id
				list: [], //页面列表
				animate__fadeOut: '',
				titleAnt: [],
				subTitleAnt: [],
			};
		},
		watch: {},
		computed: {
			listHeight() {
				let h = '570px'
				console.log(this.screenHeight)
				if (this.screenHeight < 736) {
					h = "420px"
				} else if (this.screenHeight >= 736 && this.screenHeight < 812) {
					h = "470px"
				}
				return h
			}
		},
		methods: {
			switchCtg(index = 0, id = 1) {
				// console.log("switchCtg:", index, id)
				var that = this;
				that.currCtg = id;
				that.currCtgIndex = index;
				that.currSubCtg = that.details.category[index]['subCategory'][0]['id'];
				that.getList();
			},
			switchSubCtg(index, id) {
				// console.log("switchSubCtg:", index, id)
				var that = this;
				that.currSubCtg = id;
				that.getList();
			},
			setTtitleAnt() {
				this.titleAnt = ['animate__animated', 'animate__bounceInLeft'];
				this.subTitleAnt = ['animate__animated', 'animate__bounceInRight'];
			},
			setTtitleNoAnt() {
				this.titleAnt = [];
				this.subTitleAnt = [];
			},
			getList() {
				var that = this;
				//that.list = [];
				that.animate__fadeOut = 'animate__fadeOut';
				let _list = that.details.list.filter((obj, k) => obj.subCtg == that.currSubCtg);
				console.log("getList:", _list.length)
				setTimeout(() => {
					that.animate__fadeOut = '';
					that.list = _list;
				}, 200)
			},
			getDetail(index, id) {
				console.log("getDetail:", index, id)
				// console.log(this.list)
				var that = this;
				that.list[index]['show'] = !that.list[index]['show'];
			}
		}
	}
</script>

<style scoped>
	.page-detail {
		background-color: #f2f2f2;
		min-height: 100%;
	}

	.page-header {
		background: url(../static/page-bg.jpg) 50% 50% no-repeat;
		background-size: cover;
		padding: 60rpx 0 80rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		align-content: center;
	}

	.title {
		line-height: 2;
		font-size: 42rpx;
		color: #FFFFFF;
	}

	.page-detail-main {
		padding: 0 30rpx;
		position: relative;
		top: -20px;
	}

	.detail-block {
		margin-bottom: 20rpx;
	}

	.detail-ctg,
	.detail-sub-ctg {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		background: #ffffff;
		padding: 20rpx 10rpx;
	}

	.detail-sub-ctg {
		padding: 10rpx;
	}

	.ctgs {
		width: 30%;
		text-align: center;
		line-height: 1.4;
		border-right: 1px solid #3e4d6a;
	}

	.ctgs:last-child {
		border-right: none;
	}

	.sub-ctgs {
		border-right: none;
	}

	.ctg-btn {
		font-size: 32rpx;
		line-height: 2;
		width: 90%;
		color: #070707;
	}

	.active {
		background: #1354a8;
		color: #FFFFFF;
	}

	.sub-ctg-btn {
		width: 100%;
		font-size: 30rpx;
		border-bottom: 2px solid transparent;
	}

	.sub-ctg-btn.active {
		background: none;
		color: #070707;
		border-bottom: 2px solid #1354a8;
	}

	.detail-list {
		background: #FFFFFF;
		padding: 10rpx;
	}

	.detail-title {
		font-size: 30rpx;
		padding-right: 50rpx;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: space-between;
		flex-direction: row;
	}

	.detail-title::after {
		content: "☰";
		/* ≡ */
		color: #384f6e;
		position: relative;
		right: -40rpx;
		font-size: inherit;

	}

	.detail-show .detail-title::after {
		content: "";
	}

	.detail-more {
		padding: 10rpx 0 0;
		display: flex;
		align-items: flex-start;
		align-content: center;
		justify-content: flex-start;
		flex-direction: column;
	}

	.detail-close {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.detail-close::after {
		content: "—";
		color: #384f6e;
	}

	.dtl-row {
		line-height: 1.4;
		font-size: 28rpx;
	}

	.detail-list-box {
		height: 1000rpx;
	}
</style>
