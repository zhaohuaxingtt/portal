<template>
	<iPage>
		<search 
			@handleConfirm="handleConfirm"
			@handleReset="handleConfirm"
		/>
		<searchTable 
			ref='searchTable'
			:params="params"
		/>
	</iPage>
</template>

<script>
import { iPage } from 'rise'
import Search from './search'
import SearchTable from './searchTable'

export default {
	components: {
		iPage,
		Search,
		SearchTable
	},
	data() {
		return {
			params:{
				keyword: ''
			}
		}
	},
	methods: {
		handleConfirm(va) {
			this.params = va
			this.$nextTick(() => {
				this.$refs.searchTable.getTableList()
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.routerpage {
		overflow-x: hidden;
	}
</style>