<template>
	<div class="question-list">
		<div class="search-box flex flex-row">
			<iInput 
				class="input-style"
				:placeholder="language('搜索...')"
				@keyup.enter.native="searchQuestion"
				v-model="queryParam.questionKey"
			/>
			<iSelect
				class="select-style"
				:placeholder="language('请选择...')"
				v-model="queryParam.moudleKey"
			>
				<el-option
          v-for="(item, index) in moudleList"
          :key="index"
          :value="item.value"
          :label="item.name"
        >
				</el-option>
			</iSelect>
		</div>
		<div class="search-list">
			<el-card class="card mb20 cursor" v-for="(list, idx) in questionList" :key="idx" @click="handleQuestion(list, idx)" :shadow="selectedCardId === idx ? 'always' : 'never'">
				<div class="flex flex-row justify-between list-top">
          <div class="title">{{ list.title }}</div>
          <div class="status" :class="list.status === 'unreply' ? 'unreply-text' : list.status === 'reply' ? 'reply-text' : 'finish-text'">
            {{ list.status === 'unreply' ? '未答复' : list.status === 'reply' ? '已答复' : '已完成' }}
          </div>
        </div>
        <div class="flex flex-row mt20 justify-between gray-color">
          <div class="label">{{ list.moudleName }}</div>
          <div>{{ list.date }}</div>
        </div>
			</el-card>
		</div>
	</div>
</template>

<script>
import { iInput, iSelect } from 'rise';
export default {
	name: 'QuestionList',
	components: {
		iInput,
		iSelect
	},
	data() {
		return {
			queryParam: {
				questionKey: '',
				moudleKey: ''
			},
			moudleList: [
				{ name: '模板一', value: '1' },
				{ name: '模板二', value: '2' },
			],
			questionList: [
				// unreply:未答复 reply:已答复 finished:已完成
				{ title: '如何配置工艺', status: 'unreply', moudleName: '主数据管理', date: '2021-10-26 ' },
				{ title: '如何配置工艺二', status: 'reply', moudleName: '主数据管理', date: '2021-10-26' },
				{ title: '如何配置工艺三', status: 'finished', moudleName: '主数据管理', date: '2021-10-26' }
			],
			selectedCardId: 0
		}
	},
	methods: {
		searchQuestion() {
			console.log(this.queryParam, "queryParam")
		},
		handleQuestion(list, idx) {
			console.log(list, idx)
			this.selectedCardId = idx
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../comon.scss";
	.question-list {
		width: 28%;
		height: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		opacity: 1;
		border-radius: 5px;
		padding: 20px 20px 20px 20px;
		.search-box {
			width: 100%;
			height: 40px;
			margin-bottom: 20px;
			.input-style {
				width: 100%;
			}
			.select-style {
				margin-left: 10px;
			}
		}
		.search-list {
			width: 100%;
			height: calc(100% - 50px);
			margin-top: 10px;
			overflow-y: auto;
			.card {
				.list-top {
					.title {
						color: #000000;
						font-size: 16px;
					}
					.status {
						font-size: 14px;
						font-weight: bold;
					}
					.unreply-text {
						color: #E30D0D;
					}
					.reply-text {
						color: #FF8E00;
					}
					.finish-text {
						color: #05BB8B;
					}
				}
				.gray-color {
					color: #666666;
				}
				.label {
					background: #ededed;
					border-radius: 10px;
					color: #4b5c7d;
					padding: 5px 10px;
				}
			}
		}
	}
</style>