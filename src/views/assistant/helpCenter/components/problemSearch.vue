<template>
	<div class="search-box">
		<el-form :model="searchForm" ref="searchForm" class="search">
			<el-row :gutter="20">
				<el-col :span="4">
          <el-form-item :label="formTitle.problemModule" prop="questionModuleId">
            <iSelect
              :placeholder="formTitle.selectPlaceholder"
              v-model="searchForm.questionModuleId"
							@change="handleModuleChange"
            >
              <el-option
                v-for="item in moudleList"
                :key="item.id"
                :label="item.menuName"
                :value="item.id"
              >
              </el-option>
            </iSelect>
          </el-form-item>
        </el-col>
				<el-col :span="5" push="2">
          <el-form-item :label="formTitle.problemLabel" prop="questionLableId">
            <iSelect
				:disabled=" labelList.length > 0 ? false : true "
				:placeholder="formTitle.selectPlaceholder"
				v-model="searchForm.questionLableId"
            >
              <el-option
                v-for="item in labelList"
                :key="item.id"
                :label="item.lableName"
                :value="item.id"
              >
              </el-option>
            </iSelect>
          </el-form-item>
        </el-col>
				<el-col :span="4" push="3">
          <el-form-item :label="formTitle.problemTitle" prop="questionTitle">
            <iInput
              :placeholder="formTitle.inputPlaceholder"
              v-model="searchForm.questionTitle"
            />
          </el-form-item>
        </el-col>
		<el-col :span="6" push="4" class="btn">
          <el-form-item>
            <iButton @click="query">{{ language('查询') }}</iButton>
			<iButton @click="reset">{{ language('重置') }}</iButton>
          </el-form-item>
        </el-col>
			</el-row>
		</el-form>	
	</div>
</template>

<script>
import { getCurrLabelList } from '@/api/assistant'
import {
  iSelect,
	iInput,
	iButton
} from 'rise'
export default {
	name: 'problem-search',
	components: {
		iSelect,
		iInput,
		iButton
	},
	props: {
		moudleList: {
			type: Array,
			default: () => []
		},
	},
	data() {
		return {
			searchForm: {
				questionModuleId: null,
				questionLableId: null,
				questionTitle: ''
		
			},
			formTitle: {
				problemModule: '问题模块',
				selectPlaceholder: '请选择',
				inputPlaceholder: '请输入',
				problemLabel: '标签',
				problemTitle: '问题标题'
			},
			labelList: []
		}
	},
	methods: {
		query() {
			this.$emit('queryProblem', this.searchForm)
		},
		reset() {
			this.labelList = []
			this.$refs.searchForm.resetFields()
			this.$emit('reset')
		},
		handleModuleChange() {
			this.searchForm.questionLableId = ''
			console.log(this.searchForm.questionModuleId, "questionModuleId")
			if (!this.searchForm.questionModuleId) return
			getCurrLabelList(this.searchForm.questionModuleId).then(res => {
				if (res?.code === '200') {
					this.labelList = res?.data || []
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../comon.scss";
	.search-box {
		width: 100%;
		height: 120px;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		opacity: 1;
		.search {
			margin-top: 10px;
			margin-left: 40px;
		}
	}
	.btn {
		margin-top: 40px;
	}
</style>