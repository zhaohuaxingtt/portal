<template>
<div>
		<search
			@handleConfirm="handleConfirm"
			@handleReset="handleReset"
		/>
		<searchTable
			ref="searchTable"
			:manageType="manageType"
		/>
	</div>
</template>

<script>
import Search from './search'
import SearchTable from './searchTable'
export default {
	name: 'knowledge',
	components: {
		Search,
		SearchTable
	},
	props: {
		manageType: {
			type: String,
			default: 'content'
		}
	},
	data() {
		return {

		}
	},
	methods: {
		handleConfirm(va) {
			console.log(va, '2222')
			this.$refs.searchTable.getTableList(va)
		},
		handleReset(va) {
			console.log(va, '111')
			this.$refs.searchTable.getTableList(va)
		}
	}
}
</script>