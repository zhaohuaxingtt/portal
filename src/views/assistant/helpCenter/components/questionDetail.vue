<template>
  <div class="right-content ml20">
	<div class="search-box flex justify-end items-center">
		<iButton @click="handleQuestion">{{ language('我要提问') }}</iButton>
	</div>
	<div class="line"></div>
	<div class="title-des flex items-center mt20">{{ title }}</div>
	<div class="label mt20">{{ moudleName }}</div>
	<div class="ques-box flex flex-column">
		<div v-for="(ques, idx) in aqlist" :key="idx" class="item-ques flex flex-row">
			<div class="item-who"> {{ques.type===0?'管理员':'我'}} </div>
			<div class="desc-box">
				<div class="desc">{{ ques.content }}</div>
				<div class="date">{{ ques.date }}</div>
			</div>
		</div>
	</div>
	<div class="solution-box ">
		<div class="good-box flex flex-row items-center justify-center cursor" @click="good">
			<img src="@/assets/images/good.png" alt="" class="icon-png">
			<div class="good-text">已解决</div>
		</div>
		<div class="bad-box flex flex-row items-center justify-center cursor" @click="bad">
			<img src="@/assets/images/bad.png" alt="" class="icon-png">
			<div class="bad-text">未解决</div>
		</div>
	</div>
	
  </div>
</template>

<script>
import { iButton } from 'rise';
import { queryDetailByIdApi } from '@/api/assistant'
export default {
	name: 'QuestionDetail',
	components: {
		iButton
	},
	data() {
		return {
			title: '如何配置工艺组？',
			moudleName: '主数据管理',
			aqlist: [
				// 0 为管理员 1 为我
				{
					type: 0,
					content: '一个材料组可关联多个工艺组，如果该工艺组为Heavy iTem，则引用此工艺组 的材料组为Heavy Item',
					date: '2021-10-28 16:20:12'
				},
				{
					type: 1,
					content: '那我进入零件材料组，点击新建后…',
					date: '2021-10-28 16:20:12'
				},
				{
					type: 0,
					content: '那我进入零件材料组，点击新建后…',
					date: '2021-10-28 16:20:12'
				}
			]
		}
	},
	methods: {
		good() {
			console.log('已解决 接口处理')
		},
		bad() {
			console.log('未解决 打开追问 并带信息')
			this.$emit('handleZwQues', this.title)
		},
		handleQuestion() {
			console.log('打开智能弹窗')
			this.$emit('handleQuestion')
		},
		getCurrQuesDetail() {
			console.log('111112222')
		}
	}
}
</script>

<style lang="scss" scoped>
	@import "../../comon.scss";
	.right-content {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		opacity: 1;
		border-radius: 5px;
		padding: 30px 40px 20px 40px;
		overflow: auto;
		.search-box {
			height: 60px;
		}
		.line {
			width: 100%;
			height: 0px;
			border: 1px solid rgba(112, 112, 112, 0.14901960784313725);
			opacity: 1;
			margin-top: 20px;
		}
		.title-des {
			color: #000000;
			font-size: 18px;
			font-weight: bold;
			height: 40px;
		}
		.label {
			display: inline-block;
			background: #EDEDED;
			opacity: 1;
			border-radius: 8px;
			padding: 10px;
			color: #4B5C7D;
			font-size: 14px;
		}
		.ques-box {
			margin-top: 40px;
			height: 420px;
			border: 1px solid #F2F2F2;
			opacity: 1;
			border-radius: 2px;
			overflow-y: auto;
			.item-ques {
				margin: 20px 20px;
				.item-who {
					width: 80px;
					font-size: 16px;
					color: #000000;
				}
				.desc-box {
					display: inline-block;
					background: #F8F8FA;
					opacity: 1;
					border-radius: 4px;
					padding: 20px;
					.desc {
						color: #000000;
						font-size: 14px;
					}
					.date {
						color: #888888;
						font-size: 12px;
						margin-top: 10px;
					}
				}
			}
		}
	}
	.solution-box {
		margin-top: 80px;
		display: flex;
		align-items: center;
		justify-content: center
	}
	.good-box {
		width: 100px;
		height: 30px;
		background: #EDEDED;
		opacity: 1;
		border-radius: 16px;
		margin-right: 20px;
		.good-text {
			color: #4B5C7D;
			font-size: 14px;
			margin-left: 6px;
		}
	}
	.bad-box {
		width: 100px;
		height: 30px;
		background: #1962F1;;
		opacity: 1;
		border-radius: 16px;
		.bad-text {
			color: #FFFFFF;
			font-size: 14px;
			margin-left: 6px;
		}
	}
	.icon-png {
		width: 20px;
		height: 20px;
	}
</style>