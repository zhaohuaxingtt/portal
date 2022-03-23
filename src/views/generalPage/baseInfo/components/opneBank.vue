<template>
	<iCard tabCard collapse :title="$t('KAIHUYINHANG')" class="margin-top20">
		<iButton class="btn_class" @click="addBank" v-if="$route.query.subSupplierType=='GP'">新增子银行账户</iButton>
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


			<!-- 电子银票账户银行名称 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPZHYHMC')" required
						slot="label"></iLabel>
				<iInput :placeholder="$t('LK_QINGSHURU')"
						v-model="supplierData.settlementBankDTO.bankTaxCode"
						></iInput>
			</iFormItem>
			<!-- 电子银票银行账户行号 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHZHHH')" required
						slot="label"></iLabel>
				<iInput :placeholder="$t('LK_QINGSHURU')"
						v-model="supplierData.settlementBankDTO.bankTaxCode"
						></iInput>
			</iFormItem>
			<!-- 电子银票银行所在国家 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHSZGJ')" required
						slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankDTO.cityCode"
						@change="changeCity()">
				<el-option :value="item.cityIdStr"
							:label="item.cityNameCn"
							v-for="(item, index) in bankCity"
							:key="index"></el-option>
				</iSelect>
			</iFormItem>
			<!-- 电子银票银行所在省份 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHSZSF')" required
						slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankDTO.cityCode"
						@change="changeCity()">
				<el-option :value="item.cityIdStr"
							:label="item.cityNameCn"
							v-for="(item, index) in bankCity"
							:key="index"></el-option>
				</iSelect>
			</iFormItem>
			<!-- 电子银票银行所在城市 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHSZCS')" required
						slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankDTO.cityCode"
						@change="changeCity()">
				<el-option :value="item.cityIdStr"
							:label="item.cityNameCn"
							v-for="(item, index) in bankCity"
							:key="index"></el-option>
				</iSelect>
			</iFormItem>
		</iFormGroup>

		<!-- 修改 -->
		<div v-for="(item, index) in zbankList" :key="index" class="smallbank">
			<iButton class="btn" @click="removeBank(index)">删除</iButton>
			<el-divider></el-divider>
			<iCard
				collapse
				:title="$t('GONGYINGSHANGZIYINHANGZHANGHU') + (index+1)"
				class="margin-top20 ziyinhang"
			>
				<iFormGroup row="3"
						:rules="bankRules"
						:model="supplierData"
						ref="bankRules">
				<iFormItem prop="settlementBankDTO.countryCode"
							v-permission="SUPPLIER_BASEINFO_BANK_BANKINCOUNTRY">
					<iLabel :label="$t('YINHANGSUOZAIGUOJIA')" required 
							slot="label"></iLabel>
					<iSelect v-model="supplierData.settlementBankDTO.countryCode"
							@change="changeCountry">
					<el-option :value="item.sapLocationCode"
								:label="item.cityNameCn"
								v-for="(item, index) in country"
								:key="index"></el-option>
					</iSelect>
				</iFormItem>
				<iFormItem :prop="isVatile ? 'settlementBankDTO.provinceCode' : 'empty'"
							v-permission="SUPPLIER_BASEINFO_BANK_BANKINPROVINCES">
					<iLabel :label="$t('YINGHANSUOZAISHENGFEN')" required
							slot="label"></iLabel>
					<iSelect v-model="supplierData.settlementBankDTO.provinceCode"
							@change="changeProvince()">
					<el-option :value="item.sapLocationCode"
								:label="item.cityNameCn"
								v-for="(item, index) in bankProvince"
								:key="index"></el-option>
					</iSelect>
				</iFormItem>
				<iFormItem :prop="isVatile ? 'settlementBankDTO.cityCode' : 'empty'"
							v-permission="SUPPLIER_BASEINFO_BANK_BANKINCITY">
					<iLabel :label="$t('YINHANGSUOZAICHENGSHI')" required
							slot="label"></iLabel>
					<iSelect v-model="supplierData.settlementBankDTO.cityCode"
							@change="changeCity()">
					<el-option :value="item.cityIdStr"
								:label="item.cityNameCn"
								v-for="(item, index) in bankCity"
								:key="index"></el-option>
					</iSelect>
				</iFormItem>

				<iFormItem prop="settlementBankDTO.bankName"
							v-permission="SUPPLIER_BASEINFO_BANK_BANKNAME">
					<iLabel :label="$t('YINGHANGMINCHENG')" required
							slot="label"
							icons="iconxinxitishi"
							:tip="$t('QDLYBJHJRXKZCXY_YINGHANGMINCHEN')"></iLabel>
					<iInput v-model="supplierData.settlementBankDTO.bankName"
							:placeholder="$t('LK_QINGSHURU') + $t('YINGHANGMINCHENG')"></iInput>
				</iFormItem>
				<iFormItem prop="settlementBankDTO.bankCode"
							v-permission="SUPPLIER_BASEINFO_BANK_BANKCODE">
					<iLabel :label="$t('YINHANGDAIMA')" required
							slot="label"
							icons="iconxinxitishi"
							:tip="$t('QDLYBJHJRXKZCXY_YINGHANGDAIMA')"></iLabel>
					<iInput v-model="supplierData.settlementBankDTO.bankCode"
							:placeholder="$t('LK_QINGSHURU') + $t('YINHANGDAIMA')"></iInput>
				</iFormItem>
				<iFormItem prop="settlementBankDTO.bankAccount"
							v-permission="SUPPLIER_BASEINFO_BANK_ACCOUNTS">
					<iLabel :label="$t('YINHANGZHANGHAO')" required
							slot="label"></iLabel>
					<iInput v-model="supplierData.settlementBankDTO.bankAccount"
							:placeholder="$t('LK_QINGSHURU') + $t('YINHANGZHANGHAO')"></iInput>
				</iFormItem>
				<iFormItem prop="settlementBankDTO.bankAccount">
					<iLabel :label="$t('NONGMINGGONGGONGZIZHUANYONG')" required
							slot="label"></iLabel>
					<iInput v-model="supplierData.settlementBankDTO.bankAccount"
							:placeholder="$t('LK_QINGSHURU') + $t('YINHANGZHANGHAO')"></iInput>
				</iFormItem>
				</iFormGroup>
				<iFormGroup row="1"
						:rules="bankRules"
						:model="supplierData"
						ref="bankRules2">
				<iFormItem prop="settlementBankDTO.bankAccount">
					<iLabel :label="$t('BEIZHU')" required
							slot="label"></iLabel>
					<iInput v-model="supplierData.settlementBankDTO.bankAccount"
							type="textarea"
							rows="3"
							:placeholder="$t('LK_QINGSHURU') + $t('YINHANGZHANGHAO')"></iInput>
				</iFormItem>
				</iFormGroup>
			</iCard>
		</div>
	</iCard>
</template>

<script>
	import {iCard,iFormGroup,iFormItem,iLabel,iInput,iSelect,iButton} from "rise";
	import {getCityInfo} from "@/api/dictionary";
	import {bankRules} from "./data";
	export default{
		components:{iCard,iFormGroup,iFormItem,iLabel,iInput,iSelect,iButton},
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
				bankCity:[],
				zbankList:[],
			}
		},
		methods:{
			addBank(){
				this.zbankList.push({

				})
			},
			removeBank(val){
				this.zbankList.splice(val,1);
			},
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
.btn_class{
  position: absolute;
  top: -60px;
  right: 90px;
}
::v-deep .cardBody{
  position: relative;
}
::v-deep .el-form-item__label{
  width:14.8rem!important;
}
.ziyinhang{
  box-shadow:none!important;

  ::v-deep .cardHeader{
    padding:0 0 20px 0!important;
  }

  ::v-deep .cardBody{
    padding:0!important;
  }
}
.smallbank{
  position: relative;

  .btn{
    position: absolute;
    top: 20px;
    right: 50px;
  }
}
</style>
