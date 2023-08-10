<template>
  <iCard tabCard collapse :title="$t('KAIHUYINHANG')" class="margin-top20">
    <iButton class="btn_class" :disabled="canNotEdit" v-permission="SUPPLIER_INDIRECT_BASEINFO_COMPANY_ADDBANK" @click="addBank">新增子银行账户</iButton>
    <iFormGroup
      row="3"
      :rules="bankRules"
      :model="supplierData"
      ref="bankRules1"
    >
      <!-- 银行信息：正式 -->
      <template v-if="bingoType">
        <iFormItem prop="settlementBankDTO.countryCode">
          <iLabel
            :label="$t('YINHANGSUOZAIGUOJIA')"
            required
            slot="label"
          ></iLabel>
          <iSelect :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.countryCode"
            @change="changeCountry($event)"
            v-show="
              !supplierData.settlementBankDTO.countryCode ||
              supplierData.settlementBankDTO.countryCode.length >= 6
            "
          >
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in country"
              :key="index"
            ></el-option>
          </iSelect>
          <iSelect :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.countryCode"
            @change="changeCountry($event, true)"
            v-show="
              !(
                !supplierData.settlementBankDTO.countryCode ||
                supplierData.settlementBankDTO.countryCode.length >= 6
              )
            "
          >
            <el-option
              :value="item.sapLocationCode"
              :label="item.cityNameCn"
              v-for="(item, index) in country"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
        <!-- 银行所在省份 -->
        <iFormItem prop="settlementBankDTO.provinceCode">
          <iLabel
            :label="$t('YINGHANSUOZAISHENGFEN')"
            required
            slot="label"
          ></iLabel>
          <iSelect :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.provinceCode"
            @change="changeProvince($event)"
            v-show="
              !supplierData.settlementBankDTO.provinceCode ||
              supplierData.settlementBankDTO.provinceCode.length >= 6
            "
          >
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in bankProvince"
              :key="index"
            ></el-option>
          </iSelect>
          <iSelect :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.provinceCode"
            @change="changeProvince($event, true)"
            v-show="
              !(
                !supplierData.settlementBankDTO.provinceCode ||
                supplierData.settlementBankDTO.provinceCode.length >= 6
              )
            "
          >
            <el-option
              :value="item.sapLocationCode"
              :label="item.cityNameCn"
              v-for="(item, index) in bankProvince"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
        <!-- 银行所在城市/区 -->
        <iFormItem prop="settlementBankDTO.cityCode">
          <iLabel
            :label="$t('YINHANGSUOZAICHENGSHI')"
            required
            slot="label"
          ></iLabel>
          <iSelect :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.cityCode"
            @change="changeCity($event)"
          >
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in bankCity"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
        <!-- 银行名称 -->
        <iFormItem prop="settlementBankDTO.bankName">
          <iLabel
            :label="$t('YINGHANGMINCHENG')"
            required
            slot="label"
            icons="iconxinxitishi"
            :tip="$t('QDLYBJHJRXKZCXY_YINGHANGMINCHEN')"
          ></iLabel>
          <iInput :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.bankName"
            :placeholder="$t('LK_QINGSHURU') + $t('YINGHANGMINCHENG')"
          ></iInput>
        </iFormItem>
        <!-- 银行机构编码 -->
        <iFormItem prop="settlementBankDTO.bankCode">
          <iLabel
            :label="$t('YINHANGDAIMA')"
            required
            slot="label"
            icons="iconxinxitishi"
            :tip="$t('QDLYBJHJRXKZCXY_YINGHANGDAIMA')"
          ></iLabel>
          <iInput :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.bankCode"
            :placeholder="$t('LK_QINGSHURU') + $t('YINHANGDAIMA')"
          ></iInput>
        </iFormItem>
        <!-- 银行账号 -->
        <iFormItem prop="settlementBankDTO.bankAccount">
          <iLabel
            :label="$t('YINHANGZHANGHAO')"
            required
            slot="label"
          ></iLabel>
          <iInput :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.bankAccount"
            :placeholder="$t('LK_QINGSHURU') + $t('YINHANGZHANGHAO')"
          ></iInput>
        </iFormItem>
        <!-- 税务代码 -->
        <iFormItem>
          <iLabel :label="$t('SHUIWUDAIMA')" slot="label"></iLabel>
          <iInput
            :disabled="true"
            :placeholder="$t('LK_QINGSHURU') + $t('SHUIWUDAIMA')"
            v-model="supplierData.settlementBankDTO.bankTaxCode"
          ></iInput>
        </iFormItem>
      </template>
      <!-- 银行信息：非正式 -->
      <template v-else>
        <iFormItem>
          <iLabel :label="$t('YINHANGSUOZAIGUOJIA')" slot="label"></iLabel>
          <iSelect :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.countryCode"
            @change="changeCountry($event)"
            v-show="
              !supplierData.settlementBankDTO.countryCode ||
              supplierData.settlementBankDTO.countryCode.length >= 6
            "
          >
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in country"
              :key="index"
            ></el-option>
          </iSelect>
          <iSelect :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.countryCode"
            @change="changeCountry($event, true)"
            v-show="
              !(
                !supplierData.settlementBankDTO.countryCode ||
                supplierData.settlementBankDTO.countryCode.length >= 6
              )
            "
          >
            <el-option
              :value="item.sapLocationCode"
              :label="item.cityNameCn"
              v-for="(item, index) in country"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
        <!-- 银行所在省份 -->
        <iFormItem>
          <iLabel :label="$t('YINGHANSUOZAISHENGFEN')" slot="label"></iLabel>
          <iSelect :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.provinceCode"
            @change="changeProvince($event)"
            v-show="
              !supplierData.settlementBankDTO.provinceCode ||
              supplierData.settlementBankDTO.provinceCode.length >= 6
            "
          >
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in bankProvince"
              :key="index"
            ></el-option>
          </iSelect>
          <iSelect :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.provinceCode"
            @change="changeProvince($event, true)"
            v-show="
              !(
                !supplierData.settlementBankDTO.provinceCode ||
                supplierData.settlementBankDTO.provinceCode.length >= 6
              )
            "
          >
            <el-option
              :value="item.sapLocationCode"
              :label="item.cityNameCn"
              v-for="(item, index) in bankProvince"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
        <!-- 银行所在城市/区 -->
        <iFormItem>
          <iLabel :label="$t('YINHANGSUOZAICHENGSHI')" slot="label"></iLabel>
          <iSelect :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.cityCode"
            @change="changeCity($event)"
          >
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in bankCity"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
        <!-- 银行名称 -->
        <iFormItem>
          <iLabel
            :label="$t('YINGHANGMINCHENG')"
            slot="label"
            icons="iconxinxitishi"
            :tip="$t('QDLYBJHJRXKZCXY_YINGHANGMINCHEN')"
          ></iLabel>
          <iInput :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.bankName"
            :placeholder="$t('LK_QINGSHURU') + $t('YINGHANGMINCHENG')"
          ></iInput>
        </iFormItem>
        <!-- 银行机构编码 -->
        <iFormItem>
          <iLabel
            :label="$t('YINHANGDAIMA')"
            slot="label"
            icons="iconxinxitishi"
            :tip="$t('QDLYBJHJRXKZCXY_YINGHANGDAIMA')"
          ></iLabel>
          <iInput :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.bankCode"
            :placeholder="$t('LK_QINGSHURU') + $t('YINHANGDAIMA')"
          ></iInput>
        </iFormItem>
        <!-- 银行账号 -->
        <iFormItem>
          <iLabel :label="$t('YINHANGZHANGHAO')" slot="label"></iLabel>
          <iInput :disabled="canNotEdit"
            v-model="supplierData.settlementBankDTO.bankAccount"
            :placeholder="$t('LK_QINGSHURU') + $t('YINHANGZHANGHAO')"
          ></iInput>
        </iFormItem>
        <!-- 税务代码 -->
        <iFormItem>
          <iLabel :label="$t('SHUIWUDAIMA')" slot="label"></iLabel>
          <iInput
            :disabled="true"
            :placeholder="$t('LK_QINGSHURU') + $t('SHUIWUDAIMA')"
            v-model="supplierData.settlementBankDTO.bankTaxCode"
          ></iInput>
        </iFormItem>
      </template>
      <!-- 电子银票信息：正式 -->
      <template v-if="bingoType">
        <!-- 电子银票账户银行名称 -->
        <iFormItem prop="gpSupplierBankNoteDTO.bankNoteName">
          <iLabel :label="$t('DZYPZHYHMC')" required slot="label"></iLabel>
          <iInput :disabled="!canEdit"
            :placeholder="$t('LK_QINGSHURU')"
            v-model="supplierData.gpSupplierBankNoteDTO.bankNoteName"
          ></iInput>
        </iFormItem>
        <!-- 电子银票银行账户行号 -->
        <iFormItem prop="gpSupplierBankNoteDTO.bankNoteAccount" :rules="hanghaoRules(1)">
          <iLabel :label="$t('DZYPYHZHHH')" required slot="label"></iLabel>
          <iInput :disabled="!canEdit"
            :placeholder="$t('LK_QINGSHURU')"
            v-model="supplierData.gpSupplierBankNoteDTO.bankNoteAccount"
          ></iInput>
        </iFormItem>
        <!-- 电子银票银行所在国家 -->
        <iFormItem prop="gpSupplierBankNoteDTO.country">
          <iLabel :label="$t('DZYPYHSZGJ')" required slot="label"></iLabel>
          <iSelect :disabled="!canEdit"
            v-model="supplierData.gpSupplierBankNoteDTO.country"
            @change="changeCountryDC()"
          >
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in country"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
        <!-- 电子银票银行所在省份 -->
        <iFormItem prop="gpSupplierBankNoteDTO.province">
          <iLabel :label="$t('DZYPYHSZSF')" required slot="label"></iLabel>
          <iSelect :disabled="!canEdit"
            v-model="supplierData.gpSupplierBankNoteDTO.province"
            @change="changeProvinceDC()"
          >
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in bankProvinceDC"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
        <!-- 电子银票银行所在城市 -->
        <iFormItem prop="gpSupplierBankNoteDTO.city">
          <iLabel :label="$t('DZYPYHSZCS')" required slot="label"></iLabel>
          <iSelect v-model="supplierData.gpSupplierBankNoteDTO.city" :disabled="!canEdit">
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in bankCityDC"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
      </template>
      <!-- 电子银票信息：非正式 -->
      <template v-else>
        <!-- 电子银票账户银行名称 -->
        <iFormItem>
          <iLabel :label="$t('DZYPZHYHMC')" slot="label"></iLabel>
          <iInput :disabled="!canEdit"
            :placeholder="$t('LK_QINGSHURU')"
            v-model="supplierData.gpSupplierBankNoteDTO.bankNoteName"
          ></iInput>
        </iFormItem>
        <!-- 电子银票银行账户行号 -->
        <iFormItem prop="gpSupplierBankNoteDTO.bankNoteAccount" :rules="hanghaoRules(2)">
          <iLabel :label="$t('DZYPYHZHHH')" slot="label"></iLabel>
          <iInput :disabled="!canEdit"
            :placeholder="$t('LK_QINGSHURU')"
            v-model="supplierData.gpSupplierBankNoteDTO.bankNoteAccount"
          ></iInput>
        </iFormItem>
        <!-- 电子银票银行所在国家 -->
        <iFormItem>
          <iLabel :label="$t('DZYPYHSZGJ')" slot="label"></iLabel>
          <iSelect :disabled="!canEdit"
            v-model="supplierData.gpSupplierBankNoteDTO.country"
            @change="changeCountryDC()"
          >
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in country"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
        <!-- 电子银票银行所在省份 -->
        <iFormItem>
          <iLabel :label="$t('DZYPYHSZSF')" slot="label"></iLabel>
          <iSelect :disabled="!canEdit"
            v-model="supplierData.gpSupplierBankNoteDTO.province"
            @change="changeProvinceDC()"
          >
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in bankProvinceDC"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
        <!-- 电子银票银行所在城市 -->
        <iFormItem>
          <iLabel :label="$t('DZYPYHSZCS')" slot="label"></iLabel>
          <iSelect v-model="supplierData.gpSupplierBankNoteDTO.city" :disabled="!canEdit">
            <el-option
              :value="item.cityIdStr"
              :label="item.cityNameCn"
              v-for="(item, index) in bankCityDC"
              :key="index"
            ></el-option>
          </iSelect>
        </iFormItem>
      </template>
    </iFormGroup>

    <!-- 修改 -->
    <div
      v-for="(item, index) in supplierData.subBankList"
      :key="index"
      class="smallbank"
    >
      <iButton
        class="btn" :disabled="canNotEdit"
        @click="removeBank(index)"
        v-permission="SUPPLIER_INDIRECT_BASEINFO_COMPANY_DELBANK"
        >删除</iButton
      >
      <el-divider></el-divider>
      <iCard
        collapse
        :title="$t('GONGYINGSHANGZIYINHANGZHANGHU') + (index + 1)"
        class="margin-top20 ziyinhang"
      >
        <iFormGroup
          row="3"
          :rules="bankRulesBank"
          :model="item"
          :ref="'bankRulesDTO' + index"
        >
          <!-- 银行所在国家 -->
          <iFormItem prop="country">
            <iLabel
              :label="$t('YINHANGSUOZAIGUOJIA')"
              required
              slot="label"
            ></iLabel>
            <iSelect v-model="item.country" @change="changeGJ($event, index)" :disabled="canNotEdit">
              <el-option
                :value="item.cityIdStr"
                :label="item.cityNameCn"
                v-for="(item, index) in country"
                :key="index"
              ></el-option>
            </iSelect>
          </iFormItem>
          <!-- 银行所在省份 -->
          <iFormItem prop="province">
            <iLabel
              :label="$t('YINGHANSUOZAISHENGFEN')"
              required
              slot="label"
            ></iLabel>
            <iSelect :disabled="canNotEdit"
              v-model="item.province"
              @change="changeSF($event, index)"
            >
              <el-option
                :value="ite.cityIdStr"
                :label="ite.cityNameCn"
                v-for="(ite, index) in item.bankProvince"
                :key="index"
              ></el-option>
            </iSelect>
          </iFormItem>
          <!-- 银行所在城市/区 -->
          <iFormItem prop="city">
            <iLabel
              :label="$t('YINHANGSUOZAICHENGSHI')"
              required
              slot="label"
            ></iLabel>
            <iSelect v-model="item.city" :disabled="canNotEdit">
              <el-option
                :value="item.cityIdStr"
                :label="item.cityNameCn"
                v-for="(item, index) in item.bankCity"
                :key="index"
              ></el-option>
            </iSelect>
          </iFormItem>
          <!-- 银行名称 -->
          <iFormItem prop="bankName">
            <iLabel
              :label="$t('YINGHANGMINCHENG')"
              required
              slot="label"
              icons="iconxinxitishi"
              :tip="$t('QDLYBJHJRXKZCXY_YINGHANGMINCHEN')"
            ></iLabel>
            <iInput :disabled="canNotEdit"
              v-model="item.bankName"
              :placeholder="$t('LK_QINGSHURU') + $t('YINGHANGMINCHENG')"
            ></iInput>
          </iFormItem>
          <!-- 银行机构编码 -->
          <iFormItem prop="bankCode">
            <iLabel
              :label="$t('YINHANGDAIMA')"
              required
              slot="label"
              icons="iconxinxitishi"
              :tip="$t('QDLYBJHJRXKZCXY_YINGHANGDAIMA')"
            ></iLabel>
            <iInput :disabled="canNotEdit"
              v-model="item.bankCode"
              :placeholder="$t('LK_QINGSHURU') + $t('YINHANGDAIMA')"
            ></iInput>
          </iFormItem>
          <!-- 银行账号 -->
          <iFormItem prop="bankAccount">
            <iLabel
              :label="$t('YINHANGZHANGHAO')"
              required
              slot="label"
            ></iLabel>
            <iInput :disabled="canNotEdit"
              v-model="item.bankAccount"
              :placeholder="$t('LK_QINGSHURU')"
            ></iInput>
          </iFormItem>
          <!-- 农民工工资专用账户名称 -->
          <iFormItem prop="salaryAccount">
            <iLabel
              :label="$t('NONGMINGGONGGONGZIZHUANYONG')"
              required
              slot="label"
            ></iLabel>
            <iInput :disabled="canNotEdit"
              v-model="item.salaryAccount"
              :placeholder="$t('LK_QINGSHURU')"
            ></iInput>
          </iFormItem>
        </iFormGroup>
        <iFormGroup row="1" :model="item" ref="bankRules3">
          <!-- 备注 -->
          <iFormItem :prop="item.remark">
            <iLabel :label="$t('BEIZHU')" slot="label"></iLabel>
            <iInput :disabled="canNotEdit"
              v-model="item.remark"
              type="textarea"
              rows="3"
              :placeholder="$t('LK_QINGSHURU')"
            ></iInput>
          </iFormItem>
        </iFormGroup>
      </iCard>
    </div>
  </iCard>
</template>

<script>
import {
  iCard,
  iFormGroup,
  iFormItem,
  iLabel,
  iInput,
  iSelect,
  iButton,
  iMessageBox
} from 'rise'
import { getCityInfo } from '@/api/dictionary'
import { bankRules, bankRulesBank } from './data'
export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iLabel,
    iInput,
    iSelect,
    iButton
  },
  props: {
    supplierData: {
      type: Object,
      default: () => {}
    },
    country: {
      type: Array,
      default: () => []
    },
    canNotEdit: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      bankRulesBank,
      bankRules,
      bankProvince: [],
      bankCity: [],

      bankProvinceDC: [],
      bankCityDC: [],
      subBank: {
        country: '',
        province: '',
        city: '',
        bankName: '',
        bankCode: '',
        bankAccount: '',
        salaryAccount: '',
        remark: '',
        bankProvince: [],
        bankCity: []
      },
      bingoType: true,
      supplierIDCardType: true
    }
  },
  computed:{
    // 注册时可以编辑
    canEdit(){
      // 注册状态，不是gp供应商时，可以编辑电子银票
      let hasGpDetails = this.supplierData.gpSupplierDetails && this.supplierData.gpSupplierDetails.length==1
      if(this.$route.query.supplierToken){
        let isPD = this.supplierData.supplierDTO.supplierType == 'PD'
        if(isPD && hasGpDetails && this.supplierData.gpSupplierDetails[0].businessType==4){
          return true
        }
        return !this.canNotEdit
      }else{
        let isGP = this.supplierData.supplierDTO.supplierType == 'GP'
        if(isGP && hasGpDetails){
          return false
        }else{
          return true
        }
      }
    }
  },
  methods: {
    hanghaoRules(val) {
      var rules = []
      if (val == 1) {
        rules = [
          {
            required: true,
            message: '请输入电子银票银行账户行号',
            trigger: 'blur'
          },
          { pattern: /^\d{12,12}$/, message: '请输入12位数字', trigger: 'blur' }
        ]
      } else if (val == 2) {
        rules = [
          { pattern: /^\d{12,12}$/, message: '请输入12位数字', trigger: 'blur' }
        ]
      }
      return rules
    },
    getType() {
      if (
        this.supplierData.ppSupplierDTO &&
        this.supplierData.ppSupplierDTO.formalStatus
      ) {
        if (this.supplierData.ppSupplierDTO.formalStatus == 1) {
          this.supplierIDCardType = true
        } else if (this.supplierData.ppSupplierDTO.formalStatus == 0) {
          this.supplierIDCardType = false
        } else {
          this.supplierIDCardType = false
        }
      }

      if (
        this.supplierData.gpSupplierDTO &&
        this.supplierData.gpSupplierDTO.businessType
      ) {
        if (this.supplierData.gpSupplierDTO.businessType.indexOf('3') != -1) {
          this.bingoType = true
        } else {
          this.bingoType = false
        }
      }
    },
    getYP() {
      if (this.supplierData.gpSupplierBankNoteDTO.country) {
        // 获取银行省市
        let data = {
          parentCityId: this.supplierData.gpSupplierBankNoteDTO.country
        }
        getCityInfo(data).then((res) => {
          this.bankProvinceDC = res.data
        })
      }
      if (this.supplierData.gpSupplierBankNoteDTO.province) {
        let data = {
          parentCityId: this.supplierData.gpSupplierBankNoteDTO.province
        }
        getCityInfo(data).then((res) => {
          this.bankCityDC = res.data
        })
      }
    },
    getSubBank() {
      if (this.supplierData.subBankList) {
        this.supplierData.subBankList.forEach((ele, index) => {
          if (ele.country) {
            let data = { parentCityId: ele.country }
            getCityInfo(data).then((res) => {
              this.$set(
                this.supplierData.subBankList[index],
                'bankProvince',
                res.data
              )
            })
          }
          if (ele.province) {
            let data1 = { parentCityId: ele.province }
            getCityInfo(data1).then((res) => {
              this.$set(
                this.supplierData.subBankList[index],
                'bankCity',
                res.data
              )
            })
          }
        })
      }
    },
    addBank() {
      this.supplierData.subBankList.push(_.cloneDeep(this.subBank))
    },
    removeBank(val) {
      iMessageBox('是否删除？', '温馨提示', {
        confirmButtonText: this.language('QUEREN', '确认'),
        cancelButtonText: this.language('QUXIAO', '取消')
      }).then((red) => {
        this.supplierData.subBankList.splice(val, 1)
      })
    },

    // 获取城市 国家 省市对应中文名
    getCityName() {
      if (this.supplierData.settlementBankDTO.countryCode) {
        if (this.supplierData.settlementBankDTO.countryCode.length >= 6) {
          if (
            this.country.find(
              (item) =>
                item.cityIdStr ==
                this.supplierData.settlementBankDTO.countryCode
            )
          ) {
            this.supplierData.settlementBankDTO.country = this.country.find(
              (item) =>
                item.cityIdStr ==
                this.supplierData.settlementBankDTO.countryCode
            ).cityNameCn
          }
        } else {
          if (
            this.country.find(
              (item) =>
                item.sapLocationCode ==
                this.supplierData.settlementBankDTO.countryCode
            )
          ) {
            this.supplierData.settlementBankDTO.country = this.country.find(
              (item) =>
                item.sapLocationCode ==
                this.supplierData.settlementBankDTO.countryCode
            ).cityNameCn
          }
        }
      }
      if (this.supplierData.settlementBankDTO.provinceCode) {
        if (this.supplierData.settlementBankDTO.provinceCode.length >= 6) {
          if (
            this.bankProvince.find(
              (item) =>
                item.cityIdStr ==
                this.supplierData.settlementBankDTO.provinceCode
            )
          ) {
            this.supplierData.settlementBankDTO.province =
              this.bankProvince.find(
                (item) =>
                  item.cityIdStr ==
                  this.supplierData.settlementBankDTO.provinceCode
              ).cityNameCn
          }
        } else {
          if (
            this.bankProvince.find(
              (item) =>
                item.sapLocationCode ==
                this.supplierData.settlementBankDTO.provinceCode
            )
          ) {
            this.supplierData.settlementBankDTO.province =
              this.bankProvince.find(
                (item) =>
                  item.sapLocationCode ==
                  this.supplierData.settlementBankDTO.provinceCode
              ).cityNameCn
          }
        }
      }
      if (this.supplierData.settlementBankDTO.cityCode) {
        if (
          this.bankCity.find(
            (item) =>
              item.cityIdStr == this.supplierData.settlementBankDTO.cityCode
          )
        ) {
          this.supplierData.settlementBankDTO.city = this.bankCity.find(
            (item) =>
              item.cityIdStr == this.supplierData.settlementBankDTO.cityCode
          ).cityNameCn
        }
      }
    },
    // 国家切换 获取省信息
    changeCountry(val, type) {
      if (type) {
        for (let i = 0; i < this.country.length; i++) {
          if (this.country[i].sapLocationCode == val) {
            this.supplierData.settlementBankDTO.country =
              this.country[i].cityNameCn
            break
          }
        }
      } else {
        for (let i = 0; i < this.country.length; i++) {
          if (this.country[i].cityIdStr == val) {
            this.supplierData.settlementBankDTO.country =
              this.country[i].cityNameCn
            break
          }
        }
      }
      this.supplierData.settlementBankDTO.provinceCode = ''
      this.supplierData.settlementBankDTO.cityCode = ''
      this.bankProvince = []
      this.bankCity = []
      this.getCityName()
      this.getBankProvince(type)
    },
    // 获取银行省市
    getBankProvince(type) {
      if (type) {
        let data = {
          sapLocationCode: this.supplierData.settlementBankDTO.countryCode
        }
        getCityInfo(data).then((res) => {
          if (res.data) {
            let req = {
              parentCityId: res.data[0].cityIdStr
            }
            getCityInfo(req).then((result) => {
              this.bankProvince = result.data
            })
          }
        })
      } else {
        let data = {
          parentCityId: this.supplierData.settlementBankDTO.countryCode
        }
        getCityInfo(data).then((res) => {
          this.bankProvince = res.data
        })
      }
    },
    // 省市切换 获取市级信息
    changeProvince(val, type) {
      if (type) {
        for (let i = 0; i < this.bankProvince.length; i++) {
          if (this.bankProvince[i].sapLocationCode == val) {
            this.supplierData.settlementBankDTO.province =
              this.bankProvince[i].cityNameCn
            break
          }
        }
      } else {
        for (let i = 0; i < this.bankProvince.length; i++) {
          if (this.bankProvince[i].cityIdStr == val) {
            this.supplierData.settlementBankDTO.province =
              this.bankProvince[i].cityNameCn
            break
          }
        }
      }

      this.supplierData.settlementBankDTO.cityCode = ''
      this.bankCity = []
      this.getBankCity(type)
    },
    // 获取银行城市
    getBankCity(type) {
      if (type) {
        let data = {
          sapLocationCode: this.supplierData.settlementBankDTO.provinceCode
        }
        getCityInfo(data).then((res) => {
          if (res.data) {
            let req = {
              parentCityId: res.data[0].cityIdStr
            }
            getCityInfo(req).then((result) => {
              this.bankCity = result.data
            })
          }
        })
      } else {
        let data = {
          parentCityId: this.supplierData.settlementBankDTO.provinceCode
        }
        getCityInfo(data).then((res) => {
          this.bankCity = res.data
        })
      }
    },
    changeCity(val) {
      for (let i = 0; i < this.bankCity.length; i++) {
        if (this.bankCity[i].cityIdStr == val) {
          this.supplierData.settlementBankDTO.city = this.bankCity[i].cityNameCn
          break
        }
      }
    },

    changeProvinceDC() {
      this.supplierData.gpSupplierBankNoteDTO.city = ''
      this.bankCityDC = []
      let data = {
        parentCityId: this.supplierData.gpSupplierBankNoteDTO.province
      }
      getCityInfo(data).then((res) => {
        this.bankCityDC = res.data
      })
    },
    changeCountryDC() {
      // 国家切换 获取省信息
      this.supplierData.gpSupplierBankNoteDTO.province = ''
      this.supplierData.gpSupplierBankNoteDTO.city = ''
      this.bankProvinceDC = []
      this.bankCityDC = []
      // 获取银行省市
      let data = {
        parentCityId: this.supplierData.gpSupplierBankNoteDTO.country
      }
      getCityInfo(data).then((res) => {
        this.bankProvinceDC = res.data
      })
    },

    changeGJ(val, index) {
      console.log(index)
      this.supplierData.subBankList[index].province = ''
      this.supplierData.subBankList[index].city = ''
      this.supplierData.subBankList[index].bankProvince = []
      this.supplierData.subBankList[index].bankCity = []

      let data = { parentCityId: val }
      getCityInfo(data).then((res) => {
        this.$set(
          this.supplierData.subBankList[index],
          'bankProvince',
          res.data
        )

        console.log(this.supplierData.subBankList)
      })
    },
    changeSF(val, index) {
      this.supplierData.subBankList[index].city = ''
      this.supplierData.subBankList[index].bankCity = []
      let data1 = { parentCityId: val }
      getCityInfo(data1).then((res) => {
        this.$set(this.supplierData.subBankList[index], 'bankCity', res.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn_class {
  position: absolute;
  top: -60px;
  right: 90px;
}
::v-deep .cardBody {
  position: relative;
}
::v-deep .el-form-item__label {
  width: 14.8rem !important;
}
.ziyinhang {
  box-shadow: none !important;

  ::v-deep .cardHeader {
    padding: 0 0 20px 0 !important;
  }

  ::v-deep .cardBody {
    padding: 0 !important;
  }
}
.smallbank {
  position: relative;

  .btn {
    position: absolute;
    top: 20px;
    right: 50px;
  }
}
</style>
