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
	<!-- <div class="flex user-type">
		<div class="user-type-item" :class="{active: activeUser == 'supplier'}" @click="selectUser('supplier')">供应商用户</div>
		<div class="user-type-item" :class="{active: activeUser == 'inner'}" @click="selectUser('inner')">内部用户</div>
	</div> -->
	<div class="flex flex-row content mt20" v-show="activeMoudle === 'manual'">
		<CommonProblem 
			title="问题模块"
			:moudleList="manualList"
			:currentMoudleId="manualInfo.id"
			:loading="manualInfo.loading"
			@change="moduleChange($event,'manualInfo')"
		>
			<iInput slot="top" v-model="manualInfo.keyword" placeholder="搜索.."></iInput>
		</CommonProblem>
		<div class="content-right" v-loading="contentLoading">
			<UserManual :detail="manualInfo.detail" :qs="manualInfo.activeInfo" @refresh="queryManualDetail()"></UserManual>
		</div>
	</div>
	<div class="flex flex-row content mt20" v-show="activeMoudle === 'question'">
		<CommonProblem 
			title="常见问题"
			:moudleList="qsList"
			:currentMoudleId="qsInfo.id"
			:loading="qsInfo.loading"
			@change="moduleChange($event,'qsInfo')"
			showIcon
		>
			<iInput slot="top" v-model="qsInfo.keyword" placeholder="搜索.."></iInput>
		</CommonProblem>
		<div class="content-right" v-loading="contentLoading">
			<Question :detail="qsInfo.detail" :qs="qsInfo.activeInfo" @refresh="queryProblemDetail()"></Question>
		</div>
	</div>
	
</iPage>
</template>

<script>
import { iPage, iInput } from 'rise'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import CommonProblem from '../components/commonProblem'
import Question from "./components/question"
import UserManual from "./components/userManual"
import { getModuleList, getUserDes, getProblemDetail, queryFaqListByPage } from '@/api/assistant'
import assistant_mixin from "./../mixins"
export default {
	components: {
		iPage,
		iTabBadge,
		iTabBadgeItem,
		CommonProblem,
		Question,
		UserManual,
		iInput
	},
	mixins: [assistant_mixin],
	data() {
		return {
			tabs: [
				{name:'用户手册',type:'manual'},
				{name:'常见问题',type:'question'}
			],
			activeMoudle:"manual",
			contentLoading:false,
			manualInfo:{	//用户手册
				detail:{},
				keyword:"",
				list: [],
				loading:false,
				id: "",
				activeInfo:{},
			},
			qsInfo:{	//常见问题
				detail:{},
				keyword:"",
				list: [],
				loading:false,
				id: "",
				activeInfo:{},
			},
			show: false,
			key:"",
			type:"",
		}
	},
	created() {
		this.getProbleList()
	},
	computed:{
		manualList(){
			if(this.manualInfo.keyword){
				return this.manualInfo.list.filter(e => e.menuName && e.menuName.includes(this.manualInfo.keyword))
			}
			return this.manualInfo.list
		}
	},
	methods:{
		// 用户手册-问题模块
		async getProbleList() {
			this.manualInfo.loading = true
			try {
				await getModuleList().then((res) => {
					if (res.code === '200') {
						this.manualInfo.list = res.data
						this.manualInfo.id = res.data[0]?.id
						this.manualInfo.activeInfo = res.data[0]
						this.queryManualDetail()
					}
				})
			} finally {
				this.manualInfo.loading = false
			}
		},
		// 用户手册-常见问题查询
		async queryFaqListByPage() {
			this.qsInfo.loading = true
			try {
				await queryFaqListByPage().then((res) => {
					if (res.code === '200') {
						this.qsInfo.list = res.data
						this.qsInfo.id = res.data[0]?.id
						this.qsInfo.activeInfo = res.data[0]
						this.queryProblemDetail()
					}
				})
			} finally {
				this.qsInfo.loading = false
			}
		},
		tabChange(val) {
			this.activeMoudle = val
			if(!this.qsInfo.id){
				this.manualInfo.id = this.manualInfo.list[0]?.id
				this.manualInfo.activeInfo = this.manualInfo.list[0]
			}
			if(this.activeMoudle == 'manual'){
				this.queryManualDetail()
			}else{
				this.queryProblemDetail()
			}
		},
		selectUser(v){
			this.activeUser = v;
		},
		// 查询用户手册详情
		async queryManualDetail(){
			try {
				this.contentLoading = true
				let {data} = await getUserDes({moduleId:this.manualInfo.id,source:this.getUserType()})
				this.manualInfo.detail = data || {}
			} finally {
				this.contentLoading = false
			}
		},
		// 查询问题详情
		async queryProblemDetail(){
			try {
				this.contentLoading = true
				let {data} = await getProblemDetail({id:this.manualInfo.id})
				this.qsInfo.detail = data || {}
			} finally {
				this.contentLoading = false
			}
		},
		moduleChange(v,type){
			this[type].id = v.id
			this[type].activeInfo = v
			if(type == 'manualInfo'){
				this.queryManualDetail()
			}else{
				this.queryProblemDetail()
			}
		}
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
		margin-top: 40px;
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