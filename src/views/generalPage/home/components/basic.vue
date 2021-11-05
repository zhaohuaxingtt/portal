<template>
	<iCard tabCard collapse title="基础信息">
		<iFormGroup row="3" :rules="baseRules" :model="supplierData" ref="baseRulesForm">
			<iFormItem prop="nameZh">
				<iLabel :label="$t('SupplierZh')" required slot="label"></iLabel>
				<iInput :placeholder="$t('LK_QINGSHURU')+$t('SupplierZh')" v-model="supplierData.nameZh"></iInput>
			</iFormItem>
			<iFormItem prop="shortNameZh">
				<iLabel :label="$t('SupplierAbbreviationZh')" slot="label" required icons="iconxinxitishi"
					:tip="$t('SUPPLIER_GONGYINGSHANGJIANCHENZHTIPS')"></iLabel>
				<iInput :placeholder="$t('LK_QINGSHURU')+$t('SupplierAbbreviationZh')" v-model="supplierData.shortNameZh"></iInput>
			</iFormItem>
			<iFormItem prop="socialcreditNo">
				<iLabel :label="$t('UnifySocialCreditCode')" slot="label" required></iLabel>
				<iInput :placeholder="$t('LK_QINGSHURU')+$t('UnifySocialCreditCode')" @change="getInfosByCode"
					v-model="supplierData.socialcreditNo"></iInput>
			</iFormItem>
			<iFormItem prop="nameEn">
				<iLabel :label="$t('SupplierEn')" slot="label" required></iLabel>
				<iInput :placeholder="$t('LK_QINGSHURU')+$t('SupplierEn')" v-model="supplierData.nameEn"></iInput>
			</iFormItem>
			<iFormItem prop="shortNameEn">
				<iLabel :label="$t('SupplierAbbreviationEn')" slot="label" required icons="iconxinxitishi"
					:tip="$t('SUPPLIER_GONGYINGSHANGJIANCHENGENTIPS')"></iLabel>
				<iInput :placeholder="$t('LK_QINGSHURU')+$t('SupplierAbbreviationEn')" v-model="supplierData.shortNameEn"></iInput>
			</iFormItem>
			<iFormItem>
				<iLabel label="DUNS" slot="label" icons="iconxinxitishi"
					:tip="$t('SUPPLIER_DUNSTIPS')">
				</iLabel>
				<div class="duns flex-align-center">
					<iInput v-model="dunsCode.one" maxlength="2"></iInput>
					<span></span>
					<iInput v-model="dunsCode.two" maxlength="3"></iInput>
					<span></span>
					<iInput v-model="dunsCode.three" maxlength="4"></iInput>
				</div>
			</iFormItem>
		</iFormGroup>
	</iCard>
</template>

<script>
	import {iCard,iFormGroup,iFormItem,iInput,iLabel,iMessage} from "rise";
	import {baseRules} from "./data";
	import {getInfosByCode} from "@/api/register/home";
	import {generalPageMixins} from '@/views/generalPage/commonFunMixins';	
	export default {
		mixins: [generalPageMixins],
		components: {
			iCard, iFormGroup, iFormItem, iInput, iLabel 
		},
		props:{
			supplierData:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				dunsCode: { //组装邓氏号
					one: "",
					two: "",
					three: ""
				},
				baseRules: baseRules
			}
		},
		methods: {
			//获取邓氏号
			getDunsCode() {
				if (this.dunsCode.one.length==2 && this.dunsCode.two.length==3 && this.dunsCode.three.length==4) {
					return this.dunsCode.one + '-' + this.dunsCode.two + '-' + this.dunsCode.three
				}else if(this.dunsCode.one.length==0 && this.dunsCode.two.length==0 && this.dunsCode.three.length==0){
					return ""
				} else{
					iMessage.warn('duns号错误，例：xx-xxx-xxxx')
					return 1
				}
			},
			// 拆分邓氏号
			splitDuns(){
				let arr=this.supplierData.dunsCode.split('-')
				this.dunsCode.one=arr[0]
				this.dunsCode.two=arr[1]
				this.dunsCode.three=arr[2]
			},
			// 根据社会信用代码获取供应商信息
			getInfosByCode() {
				if (!this.supplierData.socialcreditNo) return
				getInfosByCode(this.supplierData.socialcreditNo).then(res => {
					if (res.data) {
						for (let m in res.data) {
							if (res.data[m] && this.supplierData[m] == "") {
								this.supplierData[m] = res.data[m]
							}
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.duns {
		> span {
			display: inline-block;
			width: 18px;
			height: 1px;
			margin: 0 10px;
			background-color: $color-black;		
		}
	}
</style>
