<template>
	<iPage>
		<!-- <div class="flex">
			<h1>ProCS</h1>
			<iNavMvp 
				:list="menus"
				:lev="2"
				lang
				router-page />
		</div> -->
		<router-view></router-view>
	</iPage>
</template>

<script>
import { iPage,iNavMvp } from 'rise'
export default {
  name: 'ProCSS',
  components: { iPage,iNavMvp },
  data() {
    return {
      	menus: [
			{
			value: 1,
			name: '词条管理',
			url: '/cf-ProCS/glossaryManage',
			activePath: '/cf-ProCS/glossaryManage',
			key: '词条管理'
			},
			{
			value: 2,
			name: '知识管理',
			url: '/cf-ProCS/knowledgeManage',
			activePath: '/cf-ProCS/knowledgeManage',
			key: '知识管理'
			},
			{
			value: 3,
			name: '流程管理',
			url: '/cf-ProCS/processManage',
			activePath: '/cf-ProCS/processManage',
			key: '流程管理'
			},
		]
    }
  },
}
</script>

<style lang="scss" scoped>
.flex{
	display: flex;
	justify-content: space-between;
}


</style>
