<template>
	<div class="flex flex-column content">
		<div class="tip" v-if="showTipsFlag">{{ text }}</div>
		<div class="flex flex-row justify-center">
			<div class="good-box flex flex-row items-center justify-center cursor" @click="good">
				<!-- <img src="@/assets/images/good.png" alt="" class="icon-png"> -->
				<i class="icon good"></i>
				<div class="good-text">已解决</div>
			</div>
			<div class="good-box flex flex-row items-center justify-center cursor" @click="bad">
				<!-- <img src="@/assets/images/bad.png" alt="" class="icon-png"> -->
				<i class="icon bad"></i>
				<div class="good-text">未解决</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'solution',
	props: {
		text: {
			type: String,
			default: () => '此回答是否解决了您的问题?'
		},
		showTipsFlag: {
			type: Boolean,
			default: () => false
		}
	},
	methods: {
		good() {
			console.log('good')
			this.$emit('goodSolution')
		},
		bad() {
			console.log('bad')
			this.$emit('badSolution')
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../comon.scss";
.content {
	width: 100%;
	margin-bottom: 20px;
	.good-box {
		width: 100px;
		height: 30px;
		background: #EDEDED;
		opacity: 1;
		border-radius: 16px;
		margin-right: 20px;
		&:hover{
			background: #1962F1;
			.good-text {
				color: #fff;
			}

			.icon {
				&.good{
					background-image: url("~@/assets/images/assistant/zan.jpg");
				}
				&.bad{
					width: 18px;
					height: 18px;
					background-image: url("~@/assets/images/assistant/nozan.jpg");
				}
			}
		}
		.good-text {
			color: #4B5C7D;
			font-size: 14px;
			margin-left: 6px;
		}
	}
	.bad-box {
		width: 100px;
		height: 30px;
		// background: #1962F1;
		opacity: 1;
		border-radius: 16px;
		.bad-text {
			color: #FFFFFF;
			font-size: 14px;
			margin-left: 6px;
		}
		&:hover{
			background: #1962F1;
		}
	}
}	
	.icon {
		width: 20px;
		height: 20px;
		background-repeat: no-repeat;
		background-size: contain;
		&.good{
			background-image: url("~@/assets/images/assistant/zan_active.jpg");
		}
		&.bad{
			width: 18px;
			height: 18px;
			background-image: url("~@/assets/images/assistant/nozan_active.jpg");
		}
	}
	.tip {
		width: 100%;
		height: 40px;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		color: #666666;
	}
</style>