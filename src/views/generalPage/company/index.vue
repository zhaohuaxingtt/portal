<!--
* @author:shujie
* @Date: 2021-4-14 17:00:43
* @Description: 股东、集团与关联公司
 -->
<template>
	<div class="frm">
		<baseInfo ref="basic" class="margin-bottom20"></baseInfo>
		<shareholderTable class="margin-top20"></shareholderTable>
		<groupTable class="margin-top20"></groupTable>
		<companyTable class="margin-top20"></companyTable>
		<notes></notes>
	</div>
</template>

<script>
	import companyTable from "./components/companyTable";
	import shareholderTable from "./components/shareholderTable";
	import groupTable from "./components/groupTable";
	import notes from "./components/notes";
	import baseInfo from "../components/baseInfoCard";
	export default{
		components:{
			companyTable,shareholderTable,groupTable,notes,baseInfo
		},
		data() {
			return {
			}
		}
	}
</script>