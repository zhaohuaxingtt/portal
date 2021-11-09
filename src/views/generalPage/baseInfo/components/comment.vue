<!--
 * @Author: 舒杰
 * @Date: 2021-05-17 21:11:42
 * @LastEditTime: 2021-07-08 16:34:25
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\generalPage\baseInfo\components\comment.vue
-->
<template>
	<iCard tabCard collapse :title="$t('LEIBUPINGJIA')" class="margin-top20">
		<iFormGroup row="3">
			<iFormItem v-permission="SUPPLIER_BASEINFO_INTERNALEVALUATION_RESPONSIBLEDEPT">
				<iLabel :label="$t('FUZEKESHI')" slot="label"></iLabel>
				<iInput v-model="supplierData.settlementBankDTO.bankName" :placeholder="$t('LK_QINGSHURU')+$t('FUZEKESHI')"></iInput>
			</iFormItem>
			<iFormItem v-model="supplierData.settlementBankDTO.bankName">
				<iLabel :label="$t('XIANGGUANZHUANYEKESHI')" slot="label"></iLabel>
				<iInput v-model="supplierData.settlementBankDTO.bankName" :placeholder="$t('LK_QINGSHURU')+$t('XIANGGUANZHUANYEKESHI')"></iInput>
			</iFormItem>
		</iFormGroup>
		<iFormGroup row="3">
			<iFormItem v-permission="SUPPLIER_BASEINFO_INTERNALEVALUATION_TP_QA_RATING">
				<iLabel :label="$t('JISHUBUMENPINGJIA')" slot="label"></iLabel>
				<iInput v-model="supplierData.settlementBankDTO.bankName" :placeholder="$t('LK_QINGSHURU')+$t('JISHUBUMENPINGJIA')"></iInput>
			</iFormItem>
			<iFormItem>
				<iLabel :label="$t('ZHILIANGBUMENPINGJIA')" slot="label"></iLabel>
				<iInput v-model="supplierData.settlementBankDTO.bankName" :placeholder="$t('LK_QINGSHURU')+$t('ZHILIANGBUMENPINGJIA')"></iInput>
			</iFormItem>
			<iFormItem v-permission="SUPPLIER_BASEINFO_INTERNALEVALUATION_MQ_QA_RATING">
				<iLabel :label="$t('WULIUBUMENPINGJIA')" slot="label"></iLabel>
				<iInput v-model="supplierData.settlementBankDTO.bankName" :placeholder="$t('LK_QINGSHURU')+$t('WULIUBUMENPINGJIA')"></iInput>
			</iFormItem>
		</iFormGroup>
	</iCard>
</template>

<script>
	import {iCard,iFormGroup,iFormItem,iLabel,iInput} from "rise";
	export default{
		components:{iCard,iFormGroup,iFormItem,iLabel,iInput},
		data() {
			return {
			}
		},
		props:{
			supplierData:{
				type:Object,
				default:()=>{}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
