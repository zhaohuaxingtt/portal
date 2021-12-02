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
				:placeholder="language('请选择...')"
				v-model="questionModuleId"
				@change="searchQuestion"
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
		<div class="search-list">
			<div class="card mb20 cursor" v-for="(list, idx) in questionList" :key="idx" @click="handleQuestion(list, idx)" :class="selectedCardId === idx ? 'selected' : ''">
				<div class="flex flex-row justify-between list-top">
          <div class="title" :v-html="list.questionTitle"></div>
          <div class="status" :class="list.questionStatus === 'unreply' ? 'unreply-text' : list.questionStatus === 'reply' ? 'reply-text' : 'finish-text'">
            {{ list.questionStatus === 'unreply' ? '未答复' : list.questionStatus === 'reply' ? '已答复' : '已完成' }}
          </div>
        </div>
        <div class="flex flex-row mt20 justify-between gray-color">
          <div class="label">{{ list.moudleName }}</div>
          <div>{{ list.timeDate }}</div>
        </div>
			</div>
		</div>
		<div class="iPagination flex items-center justify-center">
			<iPagination
        v-update
        @current-change="handleCurrentChange($event, getQuesList)"
        background
				small=true
        :current-page="page.currPage"
        :page-size="page.pageSize"
        :total="page.totalCount"
      />
		</div>
	</div>
</template>

<script>
import { iInput, iSelect, iPagination } from 'rise';
import { getMineQuesList } from '@/api/assistant'
import moment from 'moment'
export default {
	name: 'QuestionList',
	components: {
		iInput,
		iSelect,
		iPagination
	},
	props: {
		currentMoudleId: {
			type: Number,
			default: 0
		},
		moudleList: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			queryParam: {
				keyWord: '',
				questionModuleId: ''
			},
			page: {
				totalCount: 0,
				pageSize: 10,
				currPage: 1
			},
			// unreply:未答复 reply:已答复 finished:已完成
			questionList: [],
			selectedCardId: 0
		}
	},
	mounted() {
		this.initMyQuesList()
	},
	methods: {
		initMyQuesList() {
			this.queryParam.questionModuleId = this.currentMoudleId
			this.getQuesList()
		},
		searchQuestion() {
			this.getQuesList()
		},
		getCurrModuleName(id) {
			let currName = null
			this.moudleList.map(item => {
				if (item.id === id) {
					currName = item.menuName
				}
			})
			return currName
		},	
		async getQuesList() {
			let params = {
				...this.queryParam,
				pageNum: this.page.currPage,
        pageSize: this.page.pageSize
			}
			await getMineQuesList(params).then((res) => {
				console.log(res, "11122333")
				if (res?.code === '200') {
					const { pageNum, pageSize, total } = res.data
					this.page.currPage = pageNum
          this.page.pageSize = pageSize
          this.page.totalCount = total
					this.$emit('selectQues', res?.data?.records?.[0] || {})
					this.questionList = res?.data?.records || []
					this.questionList.map(item => {
						item.timeDate = moment(item.updateDate).format('YYYY-MM-DD')
						item.moudleName = this.getCurrModuleName(item.questionModuleId)
					})
				}
			})
		},
		handleQuestion(list, idx) {
			console.log(list, idx)
			this.selectedCardId = idx
			this.$emit('selectQues', list)
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
			height: calc(100% - 120px);
			margin-top: 10px;
			overflow-y: auto;
			.card {
				padding: 20px;
				border-bottom: 1px dotted rgba(112, 112, 112, 0.14901960784313725);
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
		.iPagination {
			height: 70px;
			width: 100%;
		}
	}
	.selected {
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.16);
		border-radius: 2px;
		background: #F8F9FA;
		border: 1px solid #E5E5E5;
	}
	.el-pagination__rightwrapper {
		margin-top: 20px !important;
	}
</style>