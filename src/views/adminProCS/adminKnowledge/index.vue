<template>
		<iPage>
      <el-tabs v-model="currType">
        <el-tab-pane :label="language('内容管理')" name="content">
          <Knowledge manageType="content" v-if="currType==='content'"/>
        </el-tab-pane>
        <el-tab-pane :label="language('类型管理')" name="type">
          <Knowledge  manageType="type" v-if="currType==='type'"/>
        </el-tab-pane>
      </el-tabs>
    </iPage>
</template>

<script>
import { iPage } from 'rise'
import Knowledge from '@/views/adminProCS/adminKnowledge/knowledge'
export default {
	components: {
		Knowledge,
		iPage
	},
	data() {
		return {
			currType: 'content'
		}
	}
}
</script>

<style lang="scss" scoped>
	@import '../comon.scss';
</style>