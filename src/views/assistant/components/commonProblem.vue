<template>
	<div class="leftContent">
		<div class="list">
			<div class="listTitle" v-text="title"></div>
			<div class="listContent">
				<div v-for="(menu, index) in problemList" :key="index" class="itemMenu flex flex-row items-center justify-start cursor" :class="currentMoudleIdx === index ? 'findBgc' : (index + 1) % 2 === 0 ? 'bluegc' : 'whgc'">
					<div class="idx">{{ index + 1 }}</div>
					<div>{{ menu.name }}</div>
					<div class="block"></div>
				</div> 
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CommonProbelm',
	props: {
		problemList: {
			type: Array,
			default: () => []
		},
		currentMoudleIdx: {
			type: Array,
			default: () => 0
		},
		title:{
			type:String,
			default:"常见问题"
		}
	},
}
</script>

<style lang="scss" scoped>
@import "../comon.scss";
	.leftContent {
		width: 28%;
		min-height: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		opacity: 1;
		border-radius: 5px;
		padding: 15px 20px 20px 20px;
		overflow-y: auto;
		.list {
			.listTitle {
				height: 50px;
				background-color: rgba(22, 96, 241, 0.1);
				border-radius: 5px 5px 0px 0px;
				color: #000000;
				font-size: 14px;
				text-align: center;
				line-height: 50px;
				font-weight: bold;
				margin-top: 20px;
			}
			.listContent {
				.itemMenu {
					width: 100%;
					height: 50px;
					padding-left: 30px;
					font-size: 400;
					cursor: pointer;
					.idx {
						width: 60px;
					}
				}
			}
		}
	}
	.block {
		height: 50px;
		width: 1px;
		margin-left: auto;
	}
	.bluegc {
		background: #F7FAFF;
		color: #000000;
	}
	.whgc {
		background: #FFFFFF;
		color: #000000;
	}
	.findBgc {
		background: #1660F1;
		color: #FFFFFF;
	}
</style>