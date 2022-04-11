<template>
	<iCard tabCard collapse :title="$t('KAIHUYINHANG')" class="margin-top20">
		<iButton class="btn_class" @click="addBank" v-if="$route.query.subSupplierType=='GP'">新增子银行账户</iButton>
		<iFormGroup row="3" :rules="bankRules" :model="supplierData" ref="bankRules">
			<!-- 银行所在国家 -->
			<iFormItem prop="settlementBankDTO.country" v-permission="SUPPLIER_BASEINFO_BANK_BANKINCOUNTRY">
				<iLabel :label="$t('YINHANGSUOZAIGUOJIA')" slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankDTO.countryCode" @change="changeCountry($event)">
					<el-option :value="item.sapLocationCode" :label="item.cityNameCn" v-for="(item, index) in country" :key="index"></el-option>
				</iSelect>
			</iFormItem>
			<!-- 银行所在省份 -->
			<iFormItem prop="settlementBankDTO.province" v-permission="SUPPLIER_BASEINFO_BANK_BANKINPROVINCES">
				<iLabel :label="$t('YINGHANSUOZAISHENGFEN')" slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankDTO.provinceCode" @change="changeProvince($event)">
					<el-option :value="item.sapLocationCode" :label="item.cityNameCn" v-for="(item, index) in bankProvince" :key="index"></el-option>
				</iSelect>
			</iFormItem>
			<!-- 银行所在城市/区 -->
			<iFormItem prop="settlementBankDTO.city" v-permission="SUPPLIER_BASEINFO_BANK_BANKINCITY">
				<iLabel :label="$t('YINHANGSUOZAICHENGSHI')" slot="label"></iLabel>
				<iSelect v-model="supplierData.settlementBankDTO.cityCode" @change="changeCity($event)">
					<el-option :value="item.cityIdStr" :label="item.cityNameCn" v-for="(item, index) in bankCity" :key="index"></el-option>
				</iSelect>
			</iFormItem>
			<!-- 银行名称 -->
			<iFormItem prop="settlementBankDTO.bankName" v-permission="SUPPLIER_BASEINFO_BANK_BANKNAME">
				<iLabel :label="$t('YINGHANGMINCHENG')" slot="label" icons="iconxinxitishi" :tip="$t('QDLYBJHJRXKZCXY_YINGHANGMINCHEN')"></iLabel>
				<iInput v-model="supplierData.settlementBankDTO.bankName" :placeholder="$t('LK_QINGSHURU')+$t('YINGHANGMINCHENG')"></iInput>
			</iFormItem>
			<!-- 银行代码 -->
			<iFormItem prop="settlementBankDTO.bankCode" v-permission="SUPPLIER_BASEINFO_BANK_BANKCODE">
				<iLabel :label="$t('YINHANGDAIMA')" slot="label" icons="iconxinxitishi" :tip="$t('QDLYBJHJRXKZCXY_YINGHANGDAIMA')"></iLabel>
				<iInput v-model="supplierData.settlementBankDTO.bankCode" :placeholder="$t('LK_QINGSHURU')+$t('YINHANGDAIMA')"></iInput>
			</iFormItem>
			<!-- 银行账号 -->
			<iFormItem prop="settlementBankDTO.bankAccount" v-permission="SUPPLIER_BASEINFO_BANK_ACCOUNTS">
				<iLabel :label="$t('YINHANGZHANGHAO')" slot="label"></iLabel>
				<iInput v-model="supplierData.settlementBankDTO.bankAccount" :placeholder="$t('LK_QINGSHURU')+$t('YINHANGZHANGHAO')"></iInput>
			</iFormItem>
			<!-- 税务代码 -->
			<iFormItem prop="settlementBankDTO.bankTaxCode" v-permission="SUPPLIER_BASEINFO_BANK_TAXCODE">
				<iLabel :label="$t('SHUIWUDAIMA')" slot="label"></iLabel>
				<iInput  :placeholder="$t('LK_QINGSHURU')+$t('SHUIWUDAIMA')" v-model="supplierData.settlementBankDTO.bankTaxCode"></iInput>
			</iFormItem>


			<!-- 电子银票账户银行名称 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPZHYHMC')" 
						slot="label"></iLabel>
				<iInput :placeholder="$t('LK_QINGSHURU')"
						v-model="supplierData.gpSupplierBankNoteDTO.bankNoteName"
						></iInput>
			</iFormItem>
			<!-- 电子银票银行账户行号 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHZHHH')" 
						slot="label"></iLabel>
				<iInput :placeholder="$t('LK_QINGSHURU')"
						v-model="supplierData.gpSupplierBankNoteDTO.bankNoteAccount"
						></iInput>
			</iFormItem>
			<!-- 电子银票银行所在国家 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHSZGJ')" 
						slot="label"></iLabel>
				<iSelect v-model="supplierData.gpSupplierBankNoteDTO.country"
						@change="changeCountryDC()">
				<el-option :value="item.cityIdStr"
							:label="item.cityNameCn"
							v-for="(item, index) in country"
							:key="index"></el-option>
				</iSelect>
			</iFormItem>
			<!-- 电子银票银行所在省份 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHSZSF')" 
						slot="label"></iLabel>
				<iSelect v-model="supplierData.gpSupplierBankNoteDTO.province"
						@change="changeProvinceDC()">
				<el-option :value="item.cityIdStr"
							:label="item.cityNameCn"
							v-for="(item, index) in bankProvinceDC"
							:key="index"></el-option>
				</iSelect>
			</iFormItem>
			<!-- 电子银票银行所在城市 -->
			<iFormItem v-if="$route.query.subSupplierType == 'GP'">
				<iLabel :label="$t('DZYPYHSZCS')" 
						slot="label"></iLabel>
				<iSelect v-model="supplierData.gpSupplierBankNoteDTO.city"
						>
				<el-option :value="item.cityIdStr"
							:label="item.cityNameCn"
							v-for="(item, index) in bankCityDC"
							:key="index"></el-option>
				</iSelect>
			</iFormItem>
		</iFormGroup>

		<!-- 修改 -->
		<div v-for="(item, index) in supplierData.subBankList" :key="index" class="smallbank">
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
					<!-- 银行所在国家 -->
					<iFormItem 
								v-permission="SUPPLIER_BASEINFO_BANK_BANKINCOUNTRY">
						<iLabel :label="$t('YINHANGSUOZAIGUOJIA')"  
								slot="label"></iLabel>
						<iSelect v-model="item.country"
								@change="changeGJ($event,index)">
						<el-option :value="item.cityIdStr"
									:label="item.cityNameCn"
									v-for="(item, index) in country"
									:key="index"></el-option>
						</iSelect>
					</iFormItem>
					<!-- 银行所在省份 -->
					<iFormItem 
								v-permission="SUPPLIER_BASEINFO_BANK_BANKINPROVINCES">
						<iLabel :label="$t('YINGHANSUOZAISHENGFEN')" 
								slot="label"></iLabel>
						<iSelect v-model="item.province"
								@change="changeSF($event,index)">
						<el-option :value="ite.cityIdStr"
									:label="ite.cityNameCn"
									v-for="(ite, index) in item.bankProvince"
									:key="index"></el-option>
						</iSelect>
					</iFormItem>
					<!-- 银行所在城市/区 -->
					<iFormItem :prop="item.city"
								v-permission="SUPPLIER_BASEINFO_BANK_BANKINCITY">
						<iLabel :label="$t('YINHANGSUOZAICHENGSHI')"
								slot="label"></iLabel>
						<iSelect v-model="item.city"
								>
						<el-option :value="item.cityIdStr"
									:label="item.cityNameCn"
									v-for="(item, index) in item.bankCity"
									:key="index"></el-option>
						</iSelect>
					</iFormItem>
					<!-- 银行名称 -->
					<iFormItem :prop="item.bankName"
								v-permission="SUPPLIER_BASEINFO_BANK_BANKNAME">
						<iLabel :label="$t('YINGHANGMINCHENG')"
								slot="label"
								icons="iconxinxitishi"
								:tip="$t('QDLYBJHJRXKZCXY_YINGHANGMINCHEN')"></iLabel>
						<iInput v-model="item.bankName"
								:placeholder="$t('LK_QINGSHURU') + $t('YINGHANGMINCHENG')"></iInput>
					</iFormItem>
					<!-- 银行代码 -->
					<iFormItem :prop="item.bankCode"
								v-permission="SUPPLIER_BASEINFO_BANK_BANKCODE">
						<iLabel :label="$t('YINHANGDAIMA')"
								slot="label"
								icons="iconxinxitishi"
								:tip="$t('QDLYBJHJRXKZCXY_YINGHANGDAIMA')"></iLabel>
						<iInput v-model="item.bankCode"
								:placeholder="$t('LK_QINGSHURU') + $t('YINHANGDAIMA')"></iInput>
					</iFormItem>
					<!-- 银行账号 -->
					<iFormItem :prop="item.bankAccount"
								v-permission="SUPPLIER_BASEINFO_BANK_ACCOUNTS">
						<iLabel :label="$t('YINHANGZHANGHAO')"
								slot="label"></iLabel>
						<iInput v-model="item.bankAccount"
								:placeholder="$t('LK_QINGSHURU')"></iInput>
					</iFormItem>
					<!-- 农民工工资专用账户名称 -->
					<iFormItem :prop="item.salaryAccount">
						<iLabel :label="$t('NONGMINGGONGGONGZIZHUANYONG')"
								slot="label"></iLabel>
						<iInput v-model="item.salaryAccount"
								:placeholder="$t('LK_QINGSHURU')"></iInput>
					</iFormItem>
				</iFormGroup>
				<iFormGroup row="1"
							:model="item"
							ref="bankRules2">
					<!-- 备注 -->
					<iFormItem :prop="item.remark">
						<iLabel :label="$t('BEIZHU')"
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
			getYP(){
				if(this.supplierData.gpSupplierBankNoteDTO.country){
					// 获取银行省市
					let  data = {
						parentCityId: this.supplierData.gpSupplierBankNoteDTO.country
					}
					getCityInfo(data).then(res=>{
						this.bankProvinceDC=res.data
					})
				}
				if(this.supplierData.gpSupplierBankNoteDTO.province){
					let data = {
						parentCityId: this.supplierData.gpSupplierBankNoteDTO.province
					}
					getCityInfo(data).then(res=>{
						this.bankCityDC=res.data
					})
				}
			},
			getSubBank(){
				if(this.supplierData.subBankList){
					this.supplierData.subBankList.forEach((ele,index) => {
						if(ele.country){
							let data = {parentCityId: ele.country}
							getCityInfo(data).then(res=>{
								this.$set(this.supplierData.subBankList[index],"bankProvince",res.data)
							})
						}
						if(ele.province){
							let data1 = {parentCityId: ele.province}
							getCityInfo(data1).then(res=>{
								this.$set(this.supplierData.subBankList[index],"bankCity",res.data)
							})
						}
					});
				}
			},
			addBank(){
				this.supplierData.subBankList.push(_.cloneDeep(this.subBank))
			},
			removeBank(val){
				this.supplierData.subBankList.splice(val,1);
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
			changeCountry(val){
				for(let i=0;i<this.country.length;i++){
					if(this.country[i].sapLocationCode == val){
						this.supplierData.settlementBankDTO.country = this.country[i].cityNameCn
						break;
					}
				}

				this.supplierData.settlementBankDTO.provinceCode=""
				this.supplierData.settlementBankDTO.cityCode=""
				this.bankProvince=[]
				this.bankCity=[]
				this.getBankProvince()
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
			// 省市切换 获取市级信息
			changeProvince(val){
				for(let i=0;i<this.bankProvince.length;i++){
					if(this.bankProvince[i].sapLocationCode == val){
						this.supplierData.settlementBankDTO.province = this.bankProvince[i].cityNameCn
						break;
					}
				}

				this.supplierData.settlementBankDTO.cityCode=""
				this.bankCity=[]
				this.getBankCity()
			},

			changeCity(val){
				for(let i=0;i<this.bankCity.length;i++){
					if(this.bankCity[i].cityIdStr == val){
						this.supplierData.settlementBankDTO.city = this.bankCity[i].cityNameCn
						break;
					}
				}
			},




			changeProvinceDC(){
				this.supplierData.gpSupplierBankNoteDTO.city=""
				this.bankCityDC=[]
				let data = {
					parentCityId: this.supplierData.gpSupplierBankNoteDTO.province
				}
				getCityInfo(data).then(res=>{
					this.bankCityDC=res.data
				})
			},
			changeCountryDC(){// 国家切换 获取省信息
				this.supplierData.gpSupplierBankNoteDTO.province=""
				this.supplierData.gpSupplierBankNoteDTO.city=""
				this.bankProvinceDC=[]
				this.bankCityDC=[]
				// 获取银行省市
				let  data = {
					parentCityId: this.supplierData.gpSupplierBankNoteDTO.country
				}
				getCityInfo(data).then(res=>{
					this.bankProvinceDC=res.data
				})
			},


			changeGJ(val,index){
				console.log(index);
				this.supplierData.subBankList[index].province=""
				this.supplierData.subBankList[index].city=""
				this.supplierData.subBankList[index].bankProvince=[]
				this.supplierData.subBankList[index].bankCity=[]

				let data = {parentCityId: val}
				getCityInfo(data).then(res=>{
					this.$set(this.supplierData.subBankList[index],"bankProvince",res.data)

					console.log(this.supplierData.subBankList)
				})
			},
			changeSF(val,index){
				this.supplierData.subBankList[index].city=""
				this.supplierData.subBankList[index].bankCity=[]
				let data1 = {parentCityId: val}
				getCityInfo(data1).then(res=>{
					this.$set(this.supplierData.subBankList[index],"bankCity",res.data)
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
