<template>
	<iCard tabCard collapse :title="$t('KAIHUYINHANG')" class="margin-top20">
		<iButton class="btn_class" @click="addBank" v-if="$route.query.subSupplierType=='GP'">新增子银行账户</iButton>
		<iFormGroup row="3" :rules="bankRules" :model="supplierData" ref="bankRules">
			<iFormItem prop="settlementBankVo.country" v-permission="SUPPLIER_BASEINFO_BANK_BANKINCOUNTRY">
				<iLabel :label="$t('YINHANGSUOZAIGUOJIA')" slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankVo.countryCode" @change="changeCountry()">
					<el-option :value="item.sapLocationCode" :label="item.cityNameCn" v-for="(item, index) in country" :key="index"></el-option>
				</iSelect>
			</iFormItem>
			<iFormItem prop="settlementBankVo.province" v-permission="SUPPLIER_BASEINFO_BANK_BANKINPROVINCES">
				<iLabel :label="$t('YINGHANSUOZAISHENGFEN')" slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankVo.provinceCode" @change="changeProvince()">
					<el-option :value="item.sapLocationCode" :label="item.cityNameCn" v-for="(item, index) in bankProvince" :key="index"></el-option>
				</iSelect>
			</iFormItem>
			<iFormItem prop="settlementBankVo.city" v-permission="SUPPLIER_BASEINFO_BANK_BANKINCITY">
				<iLabel :label="$t('YINHANGSUOZAICHENGSHI')" slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankVo.cityCode">
					<el-option :value="item.cityIdStr" :label="item.cityNameCn" v-for="(item, index) in bankCity" :key="index"></el-option>
				</iSelect>
			</iFormItem>
			
			<iFormItem prop="settlementBankVo.bankName" v-permission="SUPPLIER_BASEINFO_BANK_BANKNAME">
				<iLabel :label="$t('YINGHANGMINCHENG')" slot="label" icons="iconxinxitishi" :tip="$t('QDLYBJHJRXKZCXY_YINGHANGMINCHEN')"></iLabel>
				<iInput v-model="supplierData.settlementBankVo.bankName" :placeholder="$t('LK_QINGSHURU')+$t('YINGHANGMINCHENG')"></iInput>
			</iFormItem>
			<iFormItem prop="settlementBankVo.bankCode" v-permission="SUPPLIER_BASEINFO_BANK_BANKCODE">
				<iLabel :label="$t('YINHANGDAIMA')" slot="label" icons="iconxinxitishi" :tip="$t('QDLYBJHJRXKZCXY_YINGHANGDAIMA')"></iLabel>
				<iInput v-model="supplierData.settlementBankVo.bankCode" :placeholder="$t('LK_QINGSHURU')+$t('YINHANGDAIMA')"></iInput>
			</iFormItem>
			<iFormItem prop="settlementBankVo.bankAccount" v-permission="SUPPLIER_BASEINFO_BANK_ACCOUNTS">
				<iLabel :label="$t('YINHANGZHANGHAO')" slot="label"></iLabel>
				<iInput v-model="supplierData.settlementBankVo.bankAccount" :placeholder="$t('LK_QINGSHURU')+$t('YINHANGZHANGHAO')"></iInput>
			</iFormItem>
			
			<iFormItem prop="settlementBankVo.bankTaxCode" v-permission="SUPPLIER_BASEINFO_BANK_TAXCODE">
				<iLabel :label="$t('SHUIWUDAIMA')" slot="label"></iLabel>
				<iInput  :placeholder="$t('LK_QINGSHURU')+$t('SHUIWUDAIMA')" v-model="supplierData.settlementBankVo.bankTaxCode"></iInput>
			</iFormItem>


			<!-- 电子银票账户银行名称 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPZHYHMC')" required
						slot="label"></iLabel>
				<iInput :placeholder="$t('LK_QINGSHURU')"
						v-model="supplierData.gpSupplierBankNoteVO.bankNoteName"
						></iInput>
			</iFormItem>
			<!-- 电子银票银行账户行号 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHZHHH')" required
						slot="label"></iLabel>
				<iInput :placeholder="$t('LK_QINGSHURU')"
						v-model="supplierData.gpSupplierBankNoteVO.bankNoteAccount"
						></iInput>
			</iFormItem>
			<!-- 电子银票银行所在国家 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHSZGJ')" required
						slot="label"></iLabel>
				<iSelect v-model="supplierData.gpSupplierBankNoteVO.country"
						@change="changeCountryDC()">
				<el-option :value="item.cityIdStr"
							:label="item.cityNameCn"
							v-for="(item, index) in country"
							:key="index"></el-option>
				</iSelect>
			</iFormItem>
			<!-- 电子银票银行所在省份 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHSZSF')" required
						slot="label"></iLabel>
				<iSelect v-model="supplierData.gpSupplierBankNoteVO.province"
						@change="changeProvinceDC()">
				<el-option :value="item.cityIdStr"
							:label="item.cityNameCn"
							v-for="(item, index) in bankProvinceDC"
							:key="index"></el-option>
				</iSelect>
			</iFormItem>
			<!-- 电子银票银行所在城市 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHSZCS')" required
						slot="label"></iLabel>
				<iSelect v-model="supplierData.gpSupplierBankNoteVO.city"
						>
				<el-option :value="item.cityIdStr"
							:label="item.cityNameCn"
							v-for="(item, index) in bankCityDC"
							:key="index"></el-option>
				</iSelect>
			</iFormItem>
		</iFormGroup>

		<!-- 修改 -->
		<div v-for="(item, index) in supplierData.subBankVos" :key="index" class="smallbank">
			<iButton class="btn" @click="removeBank(index)">删除</iButton>
			<el-divider></el-divider>
			<iCard
				collapse
				:title="$t('GONGYINGSHANGZIYINHANGZHANGHU') + (index+1)"
				class="margin-top20 ziyinhang"
			>
				<iFormGroup row="3"
						:rules="bankRules"
						:model="item"
						ref="bankRules">
					<iFormItem 
								v-permission="SUPPLIER_BASEINFO_BANK_BANKINCOUNTRY">
						<iLabel :label="$t('YINHANGSUOZAIGUOJIA')" required 
								slot="label"></iLabel>
						<iSelect v-model="item.country"
								@change="changeGJ($event,index)">
						<el-option :value="item.cityIdStr"
									:label="item.cityNameCn"
									v-for="(item, index) in country"
									:key="index"></el-option>
						</iSelect>
					</iFormItem>
					<iFormItem 
								v-permission="SUPPLIER_BASEINFO_BANK_BANKINPROVINCES">
						<iLabel :label="$t('YINGHANSUOZAISHENGFEN')" required
								slot="label"></iLabel>
						<iSelect v-model="item.province"
								@change="changeSF($event,index)">
						<el-option :value="ite.cityIdStr"
									:label="ite.cityNameCn"
									v-for="(ite, index) in item.bankProvince"
									:key="index"></el-option>
						</iSelect>
					</iFormItem>
					<iFormItem :prop="item.city"
								v-permission="SUPPLIER_BASEINFO_BANK_BANKINCITY">
						<iLabel :label="$t('YINHANGSUOZAICHENGSHI')" required
								slot="label"></iLabel>
						<iSelect v-model="item.city"
								>
						<el-option :value="item.cityIdStr"
									:label="item.cityNameCn"
									v-for="(item, index) in item.bankCity"
									:key="index"></el-option>
						</iSelect>
					</iFormItem>

					<iFormItem :prop="item.bankName"
								v-permission="SUPPLIER_BASEINFO_BANK_BANKNAME">
						<iLabel :label="$t('YINGHANGMINCHENG')" required
								slot="label"
								icons="iconxinxitishi"
								:tip="$t('QDLYBJHJRXKZCXY_YINGHANGMINCHEN')"></iLabel>
						<iInput v-model="item.bankName"
								:placeholder="$t('LK_QINGSHURU') + $t('YINGHANGMINCHENG')"></iInput>
					</iFormItem>
					<iFormItem :prop="item.bankCode"
								v-permission="SUPPLIER_BASEINFO_BANK_BANKCODE">
						<iLabel :label="$t('YINHANGDAIMA')" required
								slot="label"
								icons="iconxinxitishi"
								:tip="$t('QDLYBJHJRXKZCXY_YINGHANGDAIMA')"></iLabel>
						<iInput v-model="item.bankCode"
								:placeholder="$t('LK_QINGSHURU') + $t('YINHANGDAIMA')"></iInput>
					</iFormItem>
					<iFormItem :prop="item.bankAccount"
								v-permission="SUPPLIER_BASEINFO_BANK_ACCOUNTS">
						<iLabel :label="$t('YINHANGZHANGHAO')" required
								slot="label"></iLabel>
						<iInput v-model="item.bankAccount"
								:placeholder="$t('LK_QINGSHURU')"></iInput>
					</iFormItem>
					<iFormItem :prop="item.salaryAccount">
						<iLabel :label="$t('NONGMINGGONGGONGZIZHUANYONG')" required
								slot="label"></iLabel>
						<iInput v-model="item.salaryAccount"
								:placeholder="$t('LK_QINGSHURU')"></iInput>
					</iFormItem>
					</iFormGroup>
					<iFormGroup row="1"
							:rules="bankRules"
							:model="item"
							ref="bankRules2">
					<iFormItem :prop="item.remark">
						<iLabel :label="$t('BEIZHU')" required
								slot="label"></iLabel>
						<iInput v-model="item.remark"
								type="textarea"
								rows="3"
								:placeholder="$t('LK_QINGSHURU')"></iInput>
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

				bankProvinceDC:[],
				bankCityDC:[],
				subBank:{
					country:"",
					province:"",
					city:"",
					bankName:"",
					bankCode:"",
					bankAccount:"",
					salaryAccount:"",
					remark:"",
					bankProvince:[],
					bankCity:[],
				}
			}
		},
		methods:{
			addBank(){
				this.supplierData.subBankVos.push(_.cloneDeep(this.subBank))
			},
			removeBank(val){
				this.supplierData.subBankVos.splice(val,1);
			},
			// 获取银行省市
			getBankProvince(){
				let  data = {
					sapLocationCode: this.supplierData.settlementBankVo.countryCode
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
					sapLocationCode: this.supplierData.settlementBankVo.provinceCode
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
					if (this.supplierData.settlementBankVo.countryCode) {
				this.supplierData.settlementBankVo.country=this.country.find(item=>item.sapLocationCode==this.supplierData.settlementBankVo.countryCode).cityNameCn
					}
					if (this.supplierData.settlementBankVo.provinceCode) {
				this.supplierData.settlementBankVo.province=this.bankProvince.find(item=>item.sapLocationCode==this.supplierData.settlementBankVo.provinceCode).cityNameCn
					}
					if (this.supplierData.settlementBankVo.cityCode) {
				this.supplierData.settlementBankVo.city=this.bankCity.find(item=>item.cityIdStr==this.supplierData.settlementBankVo.cityCode).cityNameCn
					}
			},	
			// 国家切换 获取省信息
			changeCountry(){
				this.supplierData.settlementBankVo.provinceCode=""
				this.supplierData.settlementBankVo.cityCode=""
				this.bankProvince=[]
				this.bankCity=[]
				this.getBankProvince()
			},
			// 省市切换 获取市级信息
			changeProvince(){
				this.supplierData.settlementBankVo.cityCode=""
				this.bankCity=[]
				this.getBankCity()
			},




			changeProvinceDC(){
				this.supplierData.gpSupplierBankNoteVO.city=""
				this.bankCityDC=[]
				let data = {
					parentCityId: this.supplierData.gpSupplierBankNoteVO.province
				}
				getCityInfo(data).then(res=>{
					this.bankCityDC=res.data
				})
			},
			changeCountryDC(){// 国家切换 获取省信息
				this.supplierData.gpSupplierBankNoteVO.province=""
				this.supplierData.gpSupplierBankNoteVO.city=""
				this.bankProvinceDC=[]
				this.bankCityDC=[]
				// 获取银行省市
				let  data = {
					parentCityId: this.supplierData.gpSupplierBankNoteVO.country
				}
				getCityInfo(data).then(res=>{
					this.bankProvinceDC=res.data
				})
			},


			changeGJ(val,index){
				console.log(index);
				this.supplierData.subBankVos[index].province=""
				this.supplierData.subBankVos[index].city=""
				this.supplierData.subBankVos[index].bankProvince=[]
				this.supplierData.subBankVos[index].bankCity=[]

				let data = {parentCityId: val}
				getCityInfo(data).then(res=>{
					this.$set(this.supplierData.subBankVos[index],"bankProvince",res.data)

					console.log(this.supplierData.subBankVos)
				})
			},
			changeSF(val,index){
				this.supplierData.subBankVos[index].city=""
				this.supplierData.subBankVos[index].bankCity=[]
				let data1 = {parentCityId: val}
				getCityInfo(data1).then(res=>{
					this.$set(this.supplierData.subBankVos[index],"bankCity",res.data)
				})
			},

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
