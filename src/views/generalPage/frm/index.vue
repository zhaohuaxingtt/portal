<!--
* @author:shujie
* @Date: 2021-4-14 17:00:43
* @Description: FRM评级
 -->
<template>
	<div class="frm">
		<baseInfo ref="basic"></baseInfo>
		<iCard class="margin-top20">
			<formItem :title="item" v-for="(item,index) in frmTitle" :key="index"></formItem>
		</iCard>
	</div>
</template>

<script>
	import {iCard} from "rise";
	import formItem from "./components/formItem";
	import {frmTitle} from "./components/data.js";
	import baseInfo from "../components/baseInfoCard";
	export default{
		components:{
			iCard,formItem,baseInfo
		},
		data() {
			return {
				frmTitle
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>

