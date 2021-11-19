<template>
	<div class="leftContent">
		<slot name="top"></slot>
		<div class="list">
			<div class="listTitle" v-text="title"></div>
			<div class="listContent">
				<div v-for="(menu, index) in problemList" :key="index" class="itemMenu flex flex-row items-center justify-start cursor" :class="currentMoudleIdx === index ? 'findBgc' : (index + 1) % 2 === 0 ? 'bluegc' : 'whgc'" @click="select(menu,index)">
					<div class="idx">{{ index + 1 }}</div>
					<i v-if="showIcon" class="icon" :class="[rank[index] ? rank[index] : '']"></i>
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
			type: Number,
			default: 0
		},
		title:{
			type:String,
			default:"常见问题"
		},
		showIcon: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			rank:{
				0:"first",
				1:"second",
				2:"third"
			}
		}
	},
	methods: {
		select(menu,index){
			this.$emit("update:currentMoudleIdx", index)
			this.$emit("change", menu)
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
		padding: 20px 20px 0px 20px;
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
					transition: all .1s ease;
					.idx {
						width: 60px;
					}
				}
			}
		}
	}
	.icon {
		margin-right: 20px;
		width: 28px;
		height: 28px;
		background-size: contain;
		background-repeat: no-repeat;
		&.first{
			background-image: url('~@/assets/images/icon/first.png');
		}
		&.second{
			background-image: url('~@/assets/images/icon/second.png');
		}
		&.third{
			background-image: url('~@/assets/images/icon/third.png');
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