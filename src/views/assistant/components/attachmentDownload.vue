<template>
  <div class="attch-box flex felx-row items-center">
		<div class="attach-text">附件:</div>
		<img v-if="load==='down'" src="@/assets/images/fujian.png" alt="" class="fujian-png">
		<div v-if="load==='down'" class="load-text cursor" @click="handleLoad">点击下载</div>
		<iButton class="ml20" v-if="load==='up'">{{ language('上传') }}</iButton>
	</div>
</template>

<script>
import { iButton } from 'rise'
export default {
	name: 'attachment-doenload',
	components: { iButton },
	props: {
		load: {
			type: String,
			default: 'down'
		}
	},
	methods: {
		handleLoad() {
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
			font-size: 16px;
			margin-left: 10px;
		}
	}
</style>