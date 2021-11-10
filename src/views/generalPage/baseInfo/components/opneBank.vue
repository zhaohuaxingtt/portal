<template>
	<iCard tabCard collapse :title="$t('KAIHUYINHANG')" class="margin-top20">
		<iFormGroup row="3" :rules="bankRules" :model="supplierData" ref="bankRules">
			<iFormItem prop="settlementBankDTO.country" v-permission="SUPPLIER_BASEINFO_BANK_BANKINCOUNTRY">
				<iLabel :label="$t('YINHANGSUOZAIGUOJIA')" slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankDTO.countryCode" @change="changeCountry()">
					<el-option :value="item.sapLocationCode" :label="item.cityNameCn" v-for="(item, index) in country" :key="index"></el-option>
				</iSelect>
			</iFormItem>
			<iFormItem prop="settlementBankDTO.province" v-permission="SUPPLIER_BASEINFO_BANK_BANKINPROVINCES">
				<iLabel :label="$t('YINGHANSUOZAISHENGFEN')" slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankDTO.provinceCode" @change="changeProvince()">
					<el-option :value="item.sapLocationCode" :label="item.cityNameCn" v-for="(item, index) in bankProvince" :key="index"></el-option>
				</iSelect>
			</iFormItem>
			<iFormItem prop="settlementBankDTO.city" v-permission="SUPPLIER_BASEINFO_BANK_BANKINCITY">
				<iLabel :label="$t('YINHANGSUOZAICHENGSHI')" slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankDTO.cityCode">
					<el-option :value="item.cityIdStr" :label="item.cityNameCn" v-for="(item, index) in bankCity" :key="index"></el-option>
				</iSelect>
			</iFormItem>
			
			<iFormItem prop="settlementBankDTO.bankName" v-permission="SUPPLIER_BASEINFO_BANK_BANKNAME">
				<iLabel :label="$t('YINGHANGMINCHENG')" slot="label" icons="iconxinxitishi" :tip="$t('QDLYBJHJRXKZCXY_YINGHANGMINCHEN')"></iLabel>
				<iInput v-model="supplierData.settlementBankDTO.bankName" :placeholder="$t('LK_QINGSHURU')+$t('YINGHANGMINCHENG')"></iInput>
			</iFormItem>
			<iFormItem prop="settlementBankDTO.bankCode" v-permission="SUPPLIER_BASEINFO_BANK_BANKCODE">
				<iLabel :label="$t('YINHANGDAIMA')" slot="label" icons="iconxinxitishi" :tip="$t('QDLYBJHJRXKZCXY_YINGHANGDAIMA')"></iLabel>
				<iInput v-model="supplierData.settlementBankDTO.bankCode" :placeholder="$t('LK_QINGSHURU')+$t('YINHANGDAIMA')"></iInput>
			</iFormItem>
			<iFormItem prop="settlementBankDTO.bankAccount" v-permission="SUPPLIER_BASEINFO_BANK_ACCOUNTS">
				<iLabel :label="$t('YINHANGZHANGHAO')" slot="label"></iLabel>
				<iInput v-model="supplierData.settlementBankDTO.bankAccount" :placeholder="$t('LK_QINGSHURU')+$t('YINHANGZHANGHAO')"></iInput>
			</iFormItem>
			
			<iFormItem prop="settlementBankDTO.bankTaxCode" v-permission="SUPPLIER_BASEINFO_BANK_TAXCODE">
				<iLabel :label="$t('SHUIWUDAIMA')" slot="label"></iLabel>
				<iInput  :placeholder="$t('LK_QINGSHURU')+$t('SHUIWUDAIMA')" v-model="supplierData.settlementBankDTO.bankTaxCode"></iInput>
			</iFormItem>
		</iFormGroup>
	</iCard>
</template>

<script>
	import {iCard,iFormGroup,iFormItem,iLabel,iInput,iSelect} from "rise";
	import {getCityInfo} from "@/api/dictionary";
	import {bankRules} from "./data";
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
			},
			country:{
				type:Array,
				default:()=>[]
			}
		},
		data() {
			return {
				bankRules,
				bankProvince:[],
				bankCity:[]
			}
		},
		methods:{
			// 获取银行省市
			getBankProvince(){
				let  data = {
					sapLocationCode: this.supplierData.settlementBankDTO.countryCode
				}
				getCityInfo(data).then(res=>{
					if (res.data) {
						let req={
							parentCityId:res.data[0].cityIdStr
						}
						getCityInfo(req).then(result=>{
							this.bankProvince=result.data
						})
					}
				})
			},
			// 获取银行城市
			getBankCity(){
				let  data = {
					sapLocationCode: this.supplierData.settlementBankDTO.provinceCode
				}
				getCityInfo(data).then(res=>{
					if (res.data) {
						let req={
							parentCityId:res.data[0].cityIdStr
						}
						getCityInfo(req).then(result=>{
							this.bankCity=result.data
						})
					}
				})
			},
			// 获取城市 国家 省市对应中文名
         getCityName(){
				if (this.supplierData.settlementBankDTO.countryCode) {
            this.supplierData.settlementBankDTO.country=this.country.find(item=>item.sapLocationCode==this.supplierData.settlementBankDTO.countryCode).cityNameCn
				}
				if (this.supplierData.settlementBankDTO.provinceCode) {
            this.supplierData.settlementBankDTO.province=this.bankProvince.find(item=>item.sapLocationCode==this.supplierData.settlementBankDTO.provinceCode).cityNameCn
				}
				if (this.supplierData.settlementBankDTO.cityCode) {
            this.supplierData.settlementBankDTO.city=this.bankCity.find(item=>item.cityIdStr==this.supplierData.settlementBankDTO.cityCode).cityNameCn
				}
         },	
			// 国家切换 获取省信息
			changeCountry(){
				this.supplierData.settlementBankDTO.provinceCode=""
				this.supplierData.settlementBankDTO.cityCode=""
				this.bankProvince=[]
				this.bankCity=[]
				this.getBankProvince()
			},
			// 省市切换 获取市级信息
			changeProvince(){
				this.supplierData.settlementBankDTO.cityCode=""
				this.bankCity=[]
				this.getBankCity()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
