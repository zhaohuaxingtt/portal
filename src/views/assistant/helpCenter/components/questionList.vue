<template>
	<div class="question-list">
		<div class="search-box flex flex-row">
			<iInput 
				class="input-style"
				:placeholder="language('搜索...')"
				@keyup.enter.native="searchQuestion"
				v-model="queryParam.keyWord"
			/>
			<iSelect
				class="select-style"
				:placeholder="language('全部模块')"
				v-model="questionModuleId"
				@change="searchQuestion"
				filterable
				clearable
			>
				<el-option
					v-for="(item) in moudleList"
					:key="item.id"
					:value="item.id"
					:label="item.menuName"
				>
				</el-option>
			</iSelect>
		</div>
		<div class="search-list" v-loading="listLoading">
			<div v-if="questionList.length > 0">
				<div class="card mb20 cursor" v-for="(list, idx) in questionList" :key="idx" @click="handleQuestion(list, idx)" :class="selectedCardId === idx ? 'selected' : ''">
					<div class="flex flex-row justify-between list-top">
						<div class="title" v-html="list.questionTitle" :title="list.questionTitle"></div>
						<div class="status" :class="list.questionStatus === 'unreply' ? 'unreply-text' : list.questionStatus === 'reply' ? 'reply-text' : 'finish-text'">
							{{ list.questionStatus === 'unreply' ? '未答复' : list.questionStatus === 'reply' ? '已答复' : '已完成' }}
						</div>
					</div>
					<div class="flex flex-row mt20 justify-between gray-color">
						<div class="label" :title="getCurrModuleName(list.questionModuleId)">{{getCurrModuleName(list.questionModuleId)}}</div>
						<div class="time">{{ list.timeDate }}</div>
					</div>
				</div>
			</div>
			<div v-else>
				暂无数据
			</div>
		</div>
		<div class="iPagination flex items-center justify-center">
			<el-pagination
				small="true"
				:total="totalCount"
				:page-size="queryParam.pageSize" 
				@current-change="handleCurrentChange" 
			></el-pagination>
		</div>
	</div>
</template>

<script>
import { iInput, iSelect } from 'rise';
import { getMineQuesList } from '@/api/assistant'
import moment from 'moment'
export default {
	name: 'QuestionList',
	components: {
		iInput,
		iSelect
	},
	props: {
		currentMoudleId: {
			type: Number,
			default: 0
		},
		moudleList: {
			type: Array,
			default: () => []
		},
		turnId: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			queryParam: {
				keyWord: '',
				questionModuleId: '',
				pageNum: 1,
				pageSize: 10,
				id: ''
			},
			// unreply:未答复 reply:已答复 finished:已完成
			questionList: [],
			selectedCardId: 0,
			listLoading: false,
			totalCount: 0
		}
	},
	watch:{
		moudleList(n){
			console.log(n);
		}
	},
	mounted() {
		this.initMyQuesList()
	},
	methods: {
		initMyQuesList() {
			// this.queryParam.questionModuleId = this.currentMoudleId
			this.getQuesList()
		},
		searchQuestion(e) {
			if (e.key !== 'Enter') {
				this.queryParam.questionModuleId = e
			}
			this.queryParam.pageNum = 1
			this.$nextTick(() => {
				this.getQuesList('query')
			})
		},
		handleCurrentChange(curr) {
			this.queryParam.pageNum = curr
			this.getQuesList()
		},
		getCurrModuleName(id) {
			let f = this.moudleList.find(item => item.id === id)
			return f ? f.menuName : ""
		},	
		async getQuesList(va) {
			// if (this.turnId) {
			// 	this.queryParam.id = this.turnId
			// }
			this.listLoading = true
			await getMineQuesList(this.queryParam).then((res) => {
				if (res?.code === '200') {
					this.totalCount = res?.data?.total
					if (va === 'query') {
						this.selectedCardId = res?.data?.records?.[0]?.id || ''
					}
					this.$emit('selectQues', res?.data?.records?.[0] || {})
					this.questionList = res?.data?.records || []
					this.questionList.map(item => {
						item.timeDate = moment(item.updateDate).format('YYYY-MM-DD')
					})
					this.listLoading = false
				}
			})
		},
		handleQuestion(list, idx) {
			console.log(list, idx)
			this.selectedCardId = idx
			this.$emit('selectQues', list)
		},
		changeCurrQuesStatus(id, operate) {
			this.questionList.map(item => {
				if (item.id === id) {
					item.questionStatus = operate === 'bad' ? 'unreply' : 'finished'
					this.$emit('selectQues', item)
				}
			})
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
				margin-left: 30px;
			}
		}
		.search-list {
			width: 100%;
			height: calc(100% - 120px);
			margin-top: 10px;
			overflow-y: auto;
			.card {
				width: 100%;
				padding: 20px;
				border-bottom: 1px dotted rgba(112, 112, 112, 0.14901960784313725);
				.list-top {
					width: 100%;
					.title {
						width: 80%;
						color: #000000;
						font-size: 16px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
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
					padding: 10px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.time {
					padding: 5px 0px;
				}
			}
		}
		.iPagination {
			height: 70px;
			width: 100%;
		}
	}
	.selected {
		box-shadow: 0px 4px 4px rgba(209, 230, 245, 0.16);
		border-radius: 2px;
		background: rgb(209, 230, 245);
		border: 1px solid #E5E5E5;
	}
	.el-pagination__rightwrapper {
		margin-top: 20px !important;
	}
</style>