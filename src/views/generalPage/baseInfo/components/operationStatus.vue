<template>
	<iCard tabCard collapse :title="$t('JINGYINGZHUANGTAI')" class="margin-top20">
		<div v-permission="SUPPLIER_BASEINFO_BUSINESSSTATUS_BUSINESSSCOPE">{{$t('JINGYINGFANWEI')}} 
			<span style="color: red;">*</span>
		</div>
		<iInput v-model="supplierData.supplierDTO.businessScope" type="textarea" rows="4" class="margin-top20"></iInput>
		<iFormGroup row="3" class="margin-top25" :rules="businessRules" :model="supplierData" ref="businessRules">
			<iFormItem prop="supplierDTO.businessPeriod" v-permission="SUPPLIER_BASEINFO_BUSINESSSTATUS_BUSINESSPERIOD">
				<iLabel :label="$t('JINGYINGQIXIAN')" required slot="label"></iLabel>
				<iInput v-model="supplierData.supplierDTO.businessPeriod" :placeholder="$t('LK_QINGSHURU')+$t('JINGYINGQIXIAN')"></iInput>
			</iFormItem>
			<iFormItem prop="supplierDTO.businessPlaceForm" v-permission="SUPPLIER_BASEINFO_BUSINESSSTATUS_FORMSOFOWNERSHIPOFBUSINESSSITE">
				<iLabel :label="$t('JINGYINGCHANSUOSUOYOUXINGSHI')" required slot="label"></iLabel>
				<iSelect v-model="supplierData.supplierDTO.businessPlaceForm">
					<el-option :value="item.code" :label="item.name" v-for="(item, index) in fromGroup.OWNMODE" :key="index"></el-option>
				</iSelect>
			</iFormItem>
			<iFormItem prop="supplierDTO.businessPlacePosition" v-permission="SUPPLIER_BASEINFO_BUSINESSSTATUS_LOCATIONOFBUSINESSSITE">
				<iLabel :label="$t('JINGYINGCHANGSUOWEIZHI')" required slot="label"></iLabel>
				<iInput v-model="supplierData.supplierDTO.businessPlacePosition" :placeholder="$t('LK_QINGSHURU')+$t('JINGYINGCHANGSUOWEIZHI')">
				</iInput>
			</iFormItem>
		</iFormGroup>
	</iCard>
</template>

<script>
	import {iCard,iFormGroup,iFormItem,iLabel,iInput,iSelect} from "rise";
	import {businessRules} from "./data";
	export default{
		components:{iCard,iFormGroup,iFormItem,iLabel,iInput,iSelect},
		props:{
			supplierData:{
				type:Object,
				default:()=>{}
			},
			fromGroup:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				businessRules
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
