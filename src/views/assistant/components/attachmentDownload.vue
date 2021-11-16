<template>
  <div class="attch-box flex felx-row items-center">
		<div class="attach-text">附件:</div>
		<img src="@/assets/images/fujian.png" alt="" class="fujian-png">
		<div class="load-text" @click="load">点击下载</div>
	</div>
</template>

<script>
export default {
	name: 'attachment-doenload',
	methods: {
		load() {
			console.log('load')
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../comon.scss";
	.attch-box {
		height: 40px;
		.attach-text {
			color: #4B4B4C;
			font-size: 16px;
		}
		.fujian-png {
			width: 22px;
			height: 22px;
			margin-left: 20px;
		}
		.load-text {
			color: #2369F1;
			text-decoration: underline;
			font-size: 18px;
			margin-left: 10px;
			cursor: pointer;
		}
	}
</style>