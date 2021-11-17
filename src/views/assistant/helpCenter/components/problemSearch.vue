<template>
	<div class="search-box">
		<el-form :model="searchForm" ref="searchForm" class="search">
			<el-row :gutter="20">
				<el-col :span="4">
          <el-form-item :label="formTitle.problemModule" prop="problemModule">
            <iSelect
              :placeholder="formTitle.selectPlaceholder"
              v-model="searchForm.problemModule"
            >
              <el-option
                v-for="item in moduleList"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </el-form-item>
        </el-col>
				<el-col :span="5" push="2">
          <el-form-item :label="formTitle.problemLabel" prop="labelModule">
            <iSelect
              :placeholder="formTitle.selectPlaceholder"
              v-model="searchForm.labelModule"
            >
              <el-option
                v-for="item in moduleList"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </el-form-item>
        </el-col>
				<el-col :span="4" push="3">
          <el-form-item :label="formTitle.problemTitle" prop="titleProblem">
            <iInput
              :placeholder="formTitle.inputPlaceholder"
              v-model="searchForm.titleProblem"
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
	data() {
		return {
			searchForm: {
				problemModule: '',
				labelModule: '',
				titleProblem: ''
		
			},
			formTitle: {
				problemModule: '问题模块',
				selectPlaceholder: '请选择',
				inputPlaceholder: '请输入',
				problemLabel: '标签',
				problemTitle: '问题标题'
			},
			moduleList: [
				{id: '0', name: '模块一', value: '0'},
				{id: '1', name: '模块二', value: '1'},
				{id: '2', name: '模块三', value: '2'}
			]
		}
	},
	methods: {
		query() {
			console.log(this.searchForm)
		},
		reset() {
			this.$refs.searchForm.resetFields()
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