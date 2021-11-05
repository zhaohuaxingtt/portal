<!--
 * @Author: 舒杰
 * @Date: 2021-06-08 16:51:54
 * @LastEditTime: 2021-07-30 14:31:37
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\bpm\frmRatingApproval\depthReportApproval\index.vue
-->
<template>
	<div class="iPage">
		<iNavMvp :list="depthReportRouter" :lev='1' @change="changeNav"/>
		<div v-if="currentNav==1">
			<basic ref="basic" isDisabled></basic>
			<business ref="business" isDisabled></business>
			<finance ref="finance" isDisabled></finance>
		</div>
		<div v-if="currentNav==2">
			<basicEn ref="basic" isDisabled></basicEn>
			<businessEn ref="business" isDisabled></businessEn>
			<financeEn ref="finance" isDisabled></financeEn>
		</div>
	</div>
</template>

<script>
	import basic from '../../../frmRating/depthRating/depthReport/components/basic';
	import business from '../../../frmRating/depthRating/depthReport/components/business';
	import finance from '../../../frmRating/depthRating/depthReport/components/finance';

	import basicEn from '../../../frmRating/depthRating/depthReportEn/components/basic';
	import businessEn from '../../../frmRating/depthRating/depthReportEn/components/business';
	import financeEn from '../../../frmRating/depthRating/depthReportEn/components/finance';
	import {iNavMvp} from "rise";
	import {depthReportRouter} from "./data"

	export default{
		components:{basicEn,businessEn,financeEn,basic,business,finance,iNavMvp},
		data() {
			return {
				currentNav: 1,
				depthReportRouter
			}
		},
		methods: {
			changeNav(val) {
				if (this.currentNav!=val.value) {
					this.currentNav = val.value;
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.iPage{
		width:100%;
		height: 100%;
		overflow-y: scroll;
	}
</style>
