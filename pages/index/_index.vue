<template>
	<view class="container">
		<zzx-calendar @selected-change="datechange" :showBack="true"></zzx-calendar>
		<!-- <lxCalendar @change="change"></lxCalendar> -->
	</view>
</template>

<script>
	import zzxCalendar from "@/components/zzx-calendar/zzx-calendar.vue"
	import lxCalendar from '@/components/lx-calendar/lx-calendar.vue'
	export default {
		data() {
			return {}
		},
		components: {
			zzxCalendar,
			lxCalendar
		},
		methods: {
			datechange(e) {
				console.log(e);
			},
			change(e) {
				console.log(e);
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
