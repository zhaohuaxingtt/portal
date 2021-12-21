<template>
	<iPage>
		<search 
			@handleConfirm="handleConfirm"
			@handleReset="handleReset"
		/>
		<searchTable 
			ref='searchTable'
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
	methods: {
		handleConfirm(va) {
			this.$refs.searchTable.getTableList(va)
		},
		handleReset(va) {
			this.$refs.searchTable.getTableList(va)
		}
	}
}
</script>

<style lang="scss" scoped>
	.routerpage {
		overflow-x: hidden;
	}
</style>