<template>
	<iPage>
		<div class="flex justify-between">
			<div class="content-title">用户助手</div>
			<div class="types" slot="actions">
				<iTabBadge>
					<iTabBadgeItem
						:active="helpMoudle === 'manual'"
						:name="language('用户手册')"
						@click="tabChange('manual')"
					/>
					<iTabBadgeItem
						:active="helpMoudle === 'problem'"
						:name="language('常见问题')"
						@click="tabChange('problem')"
					/>
					<iTabBadgeItem
						:active="helpMoudle === 'ask'"
						:name="language('我的提问')"
						@click="tabChange('ask')"
					/>
				</iTabBadge>
			</div>
		</div>
		<div class="flex flex-row content mt20" v-show="helpMoudle === 'manual'">
			<CommonProblem />
			<DataManage />
		</div>
		<div class="flex flex-row content mt20" v-show="helpMoudle === 'problem'">
			<ProblemSearch/>
		</div>
		<div class="flex flex-row content mt20" v-show="helpMoudle === 'ask'">
			我的提问
		</div>
	</iPage>
</template>

<script>

// import store from '@/store'
import { iPage } from 'rise'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import CommonProblem from '../components/commonProblem'
import DataManage from '../components/dataManage'
import ProblemSearch from '../components/problemSearch'

export default {
	data() {
		return {
			text: '用户助手',
			helpMoudle: "manual",  // manual 用户手册 problem 常见问题 ask 我的提问
		}
	},
	components: {
		iPage,
		iTabBadge,
		iTabBadgeItem,
		CommonProblem,
		DataManage,
		ProblemSearch
	},
	// mounted() {
	// 	console.log(store.state, "store.state")
	// },
	methods: {
		// 右上方分类点击事件
		tabChange(val) {
			this.helpMoudle = val
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../comon.scss";
	.content-title {
		font-weight: bold;
		color: #000000;
		opacity: 1;
		font-size: 18px;
	}
	.content {
		width: 100%;
		height: 94%;
	}
</style>