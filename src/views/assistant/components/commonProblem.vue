<template>
	<div class="leftContent">
		<div class="list">
			<div class="listTitle">常见问题</div>
		</div>
	</div>
</template>

<script>
import { getSystemMeun } from '@/api/assistant'
export default {
	name: 'CommonProbelm',
	data() {
		return {
			problemList: []
		}
	},
	mounted() {
		this.getProbleList()
	},
	methods: {
		async getProbleList() {
			getSystemMeun().then((res) => {
				console.log(res, '1234')
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.leftContent {
		width: 28%;
		height: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		opacity: 1;
		border-radius: 5px;
		.list {
			margin: 15px 20px 0px 20px;
			.listTitle {
				height: 50px;
				background-color: rgba(22, 96, 241, 0.1);
				border-radius: 5px 5px 0px 0px;
				color: #000000;
				font-size: 14px;
				text-align: center;
				line-height: 50px;
				font-weight: bold;
			}
		}
	}
</style>