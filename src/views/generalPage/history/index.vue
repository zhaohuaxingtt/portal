<!--
* @author:shujie
* @Date: 2021-4-14 17:00:43
* @Description: 历史沿革
 -->
<template>
	<div>
		<baseInfo ref="basic"></baseInfo>
		<historyTable class="margin-top20"></historyTable>
		<shareholderTable class="margin-top20"></shareholderTable>
		<notes v-permission="SUPPLIER_ENTERPRISEHISTORY_CHANGEOFSHAREHOLDER"></notes>
	</div>
</template>

<script>
	import historyTable from "./components/historyTable";
	import shareholderTable from "./components/shareholderTable"
	import notes from './components/notes';
	import baseInfo from "../components/baseInfoCard";
	export default{
		components:{historyTable,shareholderTable,notes,baseInfo},
		data() {
			return {
				notes:''
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
