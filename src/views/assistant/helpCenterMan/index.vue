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
		<div class="user-type-item" :class="{active: activeUser == 'inside'}" @click="selectUser('inside')">内部用户</div>
	</div>
	<div class="flex flex-row content mt20" v-show="activeMoudle === 'manual'">
		<CommonProblem 
			title="问题模块"
			:problemList="problemList"
			:currentMoudleIdx="currentMoudleIdx"
		/>
		<div class="content-right">
			<div @click="show = true">open</div>
			<CreateQuestion :show.sync="show"></CreateQuestion>
		</div>
	</div>
</iPage>
</template>

<script>
import store from '@/store'
import { iPage } from 'rise'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import CommonProblem from '../components/commonProblem'
import CreateQuestion from "./components/createQuestion"

export default {
	components: {
		iPage,
		iTabBadge,
		iTabBadgeItem,
		CommonProblem,
		CreateQuestion
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
			currentMoudleIdx: '',
			show: false
		}
	},
	mounted() {
		console.log(store.state, "store.state");
	},
	methods:{
		tabChange(val) {
			this.activeMoudle = val;
		},
		selectUser(v){
			this.show = true
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
	.user-type{
		margin: 30px 0 20px;
	}
	.user-type-item{
		padding: 8px 20px;
		margin-right: 20px;
		color: #999;
		font-size: 10px;
		cursor: pointer;
		transition: all .3s ease;
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
	}
	.content-right{
		flex: 1;
		padding: 15px 20px 0px 20px;
		margin-left: 20px;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		border-radius: 5px;
		background-color: #fff;
	}
	
</style>