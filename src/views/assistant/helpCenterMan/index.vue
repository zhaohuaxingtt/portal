<template>
<iPage class="main">
	<div class="flex justify-between">
		<div class="content-title">用户助手管理</div>
		<div class="types" slot="actions">
			<iTabBadge>
				<iTabBadgeItem
					v-for="tab in tabs"
					:key="tab.name"
					:active="activeMoudle === tab.type"
					:name="language(tab.name)"
					@click="tabChange(tab.type)"
				/>
			</iTabBadge>
		</div>
	</div>
	<div class="flex user-type">
		<div class="user-type-item" :class="{active: activeUser == 'supplier'}" @click="selectUser('supplier')">供应商用户</div>
		<div class="user-type-item" :class="{active: activeUser == 'inner'}" @click="selectUser('inner')">内部用户</div>
	</div>
	<div class="flex flex-row content mt20" v-show="activeMoudle === 'manual'">
		<CommonProblem 
			title="问题模块"
			:problemList="problemList"
			:currentMoudleIdx.sync="currentMoudleIdx"
		>
			<div class="flex" slot="top">
				<iInput class="flex-1" v-model="key" placeholder="搜索.."></iInput>
				<iSelect class="content-select" v-model="type" placeholder="问题模块">
					<!-- <el-option value='' label='全部'></el-option> -->
				</iSelect>
			</div>
		</CommonProblem>
		<div class="content-right">
			<UserManual></UserManual>
		</div>
	</div>
	<div class="flex flex-row content mt20" v-show="activeMoudle === 'question'">
		<CommonProblem 
			title="常见问题"
			showIcon
			:problemList="problemList"
			:currentMoudleIdx.sync="currentMoudleIdx"
		>
			<div class="flex" slot="top">
				<iInput class="flex-1" v-model="key" placeholder="搜索.."></iInput>
				<iSelect class="content-select" v-model="type" placeholder="问题模块">
					<!-- <el-option value='' label='全部'></el-option> -->
				</iSelect>
			</div>
		</CommonProblem>

		<div class="content-right">
			<Question></Question>
		</div>
	</div>
</iPage>
</template>

<script>
import store from '@/store'
import { iPage, iInput, iSelect } from 'rise'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import CommonProblem from '../components/commonProblem'
import Question from "./components/question"
import UserManual from "./components/userManual"
import { getSystemMeun } from '@/api/assistant'

export default {
	components: {
		iPage,
		iTabBadge,
		iTabBadgeItem,
		CommonProblem,
		Question,
		UserManual,
		iSelect,
		iInput
	},
	data() {
		return {
			tabs: [
				{name:'用户手册',type:'manual'},
				{name:'常见问题',type:'question'}
			],
			activeMoudle: "manual",
			activeUser: "supplier",
			problemList: [],
			currentMoudleIdx: 0,
			show: false,

			key:"",
			type:""
		}
	},
	mounted() {
		this.getProbleList()
	},
	methods:{
		getProbleList() {
			getSystemMeun().then((res) => {
				if (res.code === '200') {
					let { data: { menuList }} = res
					this.problemList = menuList[3] ? menuList[3].menuList : []
	
				}
			})
		},
		tabChange(val) {
			this.activeMoudle = val;
		},
		selectUser(v){
			this.activeUser = v;
		},
	}
}
</script>


<style lang="scss" scoped>
@import "../comon.scss";

	.main{
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.content-title {
		font-weight: bold;
		color: #000000;
		opacity: 1;
		font-size: 18px;
	}
	.content-select{
		width: 150px !important;
		margin-left: 10px;
	}
	.user-type{
		margin-top: 20px;
	}
	.user-type-item{
		padding: 8px 20px;
		margin-right: 20px;
		color: #999;
		font-size: 10px;
		cursor: pointer;
		transition: all .3s ease;
		&:hover{
			color: #1660F1;
		}
		&.active{
			background: #FFFFFF;
			box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
			border-radius: 6px;
			color: #1660F1;
		}
	}
	.content {
		width: 100%;
		flex: 1;
		overflow: hidden;
	}
	.content-right{
		flex: 1;
    	padding: 30px 40px 20px 40px;
		margin-left: 20px;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		border-radius: 5px;
		background-color: #fff;
		overflow: auto;
	}
	
</style>