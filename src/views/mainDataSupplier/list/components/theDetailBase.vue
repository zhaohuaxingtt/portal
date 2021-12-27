<template>
  <iCard :title="language('基本信息')" collapse>
    <div slot="header-control">
      <iButton v-show="!editable" @click="editable = true">
        {{ language('编辑') }}
      </iButton>
      <iButton v-show="editable" @click="editable = false">
        {{ language('取消') }}
      </iButton>
      <iButton v-show="editable" :loading="loading" @click="handleSave">
        {{ language('保存') }}
      </iButton>
    </div>
    <el-form
      label-position="left"
      label-width="130px"
      :rules="rules"
      :model="detail"
      ref="ruleForm"
      class="validate-required-form"
    >
      <el-row :gutter="20">
        <!-- 1 -->
        <el-col :span="6" prop="nameZh">
          <iFormItem :label="language('供应商中文名')" required>
            <iInput v-model="detail.nameZh" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('供应商简称(中)')" required>
            <iInput v-model="detail.shortNameZh" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('供应商英文名')" required>
            <iInput v-model="detail.nameEn" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('供应商简称(英)')" required>
            <iInput v-model="detail.shortNameEn" disabled />
          </iFormItem>
        </el-col>
        <!-- 2 -->
        <el-col :span="6">
          <iFormItem :label="language('临时号')">
            <iInput v-model="detail.svwTempCode" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('SVW号')">
            <iInput v-model="detail.svwCode" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('SAP号')">
            <iInput v-model="detail.sapCode" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('VW号')">
            <iInput v-model="detail.vmCode" :disabled="!editable" />
          </iFormItem>
        </el-col>
        <!-- 3 -->
        <el-col :span="6">
          <iFormItem :label="language('统一社会信用代码')" required>
            <iInput v-model="detail.socialcreditNo" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('DUNS')">
            <iInput v-model="detail.duns" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('供应商类型')" prop="supplierType">
            <iSelect v-model="detail.supplierType" disabled>
              <el-option
                v-for="item in supplierTypes"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('供应商状态')">
            <iInput
              :value="detail.isActive === '1' ? '正常' : '冻结'"
              disabled
            />
          </iFormItem>
        </el-col>
        <!-- 4 -->
        <el-col :span="6">
          <iFormItem :label="language('采购员邮箱')" required>
            <iInput v-model="detail.purchaserEmail" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('采购员名称')">
            <iInput v-model="detail.purchaserNameZh" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('采购员科室')">
            <iInput v-model="detail.purchaserDeptNameZh" disabled />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('采购员工号')">
            <iInput v-model="detail.purchaserUserNum" disabled />
          </iFormItem>
        </el-col>
        <!-- 5 -->
        <el-col :span="6">
          <iFormItem :label="language('注册日期')" prop="registeredDate">
            <iDatePicker
              v-model="detail.registeredDate"
              :disabled="!editable"
              style="width: 100%"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('注册资本')" prop="registeredCapital">
            <iInput v-model="detail.registeredCapital" :disabled="!editable" />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('公司网址')">
            <iInput v-model="detail.companyWebPage" :disabled="!editable" />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('是否国外厂商')">
            <!-- <iInput v-model="detail.isForeign" :disabled="!editable" /> -->
            <iSelect
              v-model="detail.isForeignManufacture"
              :disabled="!editable"
            >
              <el-option
                v-for="item in dicts.TURE_FALSE"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <!-- 6 -->
        <el-col :span="6">
          <iFormItem :label="language('国家-省份-城市')" prop="addressInfoVo">
            <areaSelect
              v-if="
                detail.addressInfoVo && Object.keys(detail.addressInfoVo).length
              "
              :countryCode.sync="detail.addressInfoVo.countryCode"
              :provinceCode.sync="detail.addressInfoVo.provinceCode"
              :cityCode.sync="detail.addressInfoVo.cityCode"
              :disabled="!editable"
              @change="areaChange"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('地址')" prop="companyAddress">
            <iInput v-model="detail.companyAddress" :disabled="!editable" />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('是否上市')" prop="isListing">
            <iSelect v-model="detail.isListing" :disabled="!editable">
              <el-option
                v-for="item in dicts.TURE_FALSE"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('上市地点')">
            <iSelect v-model="detail.listingAddress" :disabled="!editable">
              <el-option
                v-for="item in dicts.MARKADDRESS"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <!-- 7 -->
        <el-col :span="6">
          <iFormItem :label="language('股票代码')">
            <iInput v-model="detail.stockCode" :disabled="!editable" />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('法定代表人')">
            <iInput v-model="detail.legalPerson" :disabled="!editable" />
          </iFormItem>
        </el-col>
        <!-- <el-col :span="6">
          <iFormItem :label="language('税务代码')">
            <iInput v-model="detail.taxCode" :disabled="!editable" />
          </iFormItem>
        </el-col> -->
        <el-col :span="6">
          <iFormItem
            :label="language('QIANDINGCAIGOUTIAOKUAN', '签订采购条款')"
          >
            <!-- <iSelect :disabled="!editable" >
              <el-option
                v-for="item in supplierStatus"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </iSelect> -->
            <iInput disabled v-model="detail.purchaseTerm"></iInput>
          </iFormItem>
        </el-col>

        <el-col :span="6">
          <iFormItem :label="language('企业类型')" prop="enterpriseType">
            <iSelect v-model="detail.enterpriseType" :disabled="!editable">
              <el-option
                v-for="item in dicts.LEGALSTATUS"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <!-- 8 -->
        <el-col :span="6">
          <iFormItem
            :label="language('企业性质(大类)')"
            prop="epNatureCategory"
          >
            <iSelect v-model="detail.epNatureCategory" :disabled="!editable">
              <el-option
                v-for="item in dicts.ENTERPRISE_PROPERTY"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem
            :label="language('企业性质(小类)')"
            prop="epNatureSubcategory"
          >
            <iSelect v-model="detail.epNatureSubcategory" :disabled="!editable">
              <el-option
                v-for="item in smallEnterpriseProperty"
                :key="item.code"
                :value="item.code"
                :label="item.name"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <!-- 9 -->
        <!-- <el-col :span="6">
          <iFormItem :label="language('集团公司全称?')">
            <iInput v-model="detail.nameZh" :disabled="!editable" />
          </iFormItem>
        </el-col> -->
        <el-col :span="6" v-if="['GP', 'PD'].includes(supplierType)">
          <iFormItem :label="language('供应商等级')">
            <iInput v-model="detail.supplierGrade" :disabled="!editable" />
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
    <div class="clearfix"></div>
    <div class="base-divider"></div>
    <theDetailBaseTabs
      :assCompanyVos="detail.assCompanyVos"
      :supplierProductVos="detail.supplierProductVos"
      :supplierCorpVo="detail.supplierCorpVo"
    />
  </iCard>
</template>

<script>
import {
  iCard,
  iButton,
  iFormItem,
  iInput,
  iSelect,
  iDatePicker,
  iMessage
} from 'rise'
import { SUPPLIER_TYPES, SUPPLIER_STATUS } from './data'

import theDetailBaseTabs from './theDetailBaseTabs'
import { areaSelect } from '@/components/remoteSelect'
import { saveSupplier } from '@/api/mainDataSupplier/list'
export default {
  name: 'therDetailBalse',
  components: {
    iCard,
    iButton,
    iFormItem,
    iInput,
    iSelect,
    iDatePicker,
    theDetailBaseTabs,
    areaSelect
  },
  props: {
    detail: {
      type: Object,
      default: () => {
        return {
          addressInfoVo: {}
        }
      }
    },
    supplierType: {
      type: String,
      default: 'PD'
    },
    supplierId: {
      type: String,
      default: ''
    },
    dicts: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      editable: false,
      supplierTypes: SUPPLIER_TYPES,
      supplierStatus: SUPPLIER_STATUS,
      rules: {},
      loading: false
    }
  },
  computed: {
    smallEnterpriseProperty() {
      if (!this.dicts.ENTERPRISE_PROPERTY) {
        return []
      }
      if (!this.detail.epNatureCategory) {
        return []
      }
      const enterpriseProperties = this.dicts.ENTERPRISE_PROPERTY.filter(
        (e) => e.code === this.detail.epNatureCategory
      )
      if (enterpriseProperties.length) {
        return enterpriseProperties[0].subSelectVos
      }
      return ''
    }
  },
  created() {
    this.setRules()
  },
  methods: {
    setRules() {
      const requiredFields = {
        supplierType: '供应商类型',
        purchaserEmail: '采购员邮箱',
        registeredDate: '注册日期',
        registeredCapital: '注册资本',
        companyAddress: '地址',
        isListing: '是否上市',
        enterpriseType: '企业类型',
        epNatureCategory: '企业性质(大类)',
        epNatureSubcategory: '企业性质(小类)',
        addressInfoVo: '国家-省份-城市'
      }
      const rules = {}
      for (const key in requiredFields) {
        if (Object.hasOwnProperty.call(requiredFields, key)) {
          const element = requiredFields[key]
          rules[key] = [
            {
              required: true,
              message: element + '必填',
              trigger: 'blur'
            }
          ]
          if (requiredFields[key] == '采购员邮箱') {
            rules[key].required = ''
          }
        }
      }
      this.rules = rules
    },
    handleSave() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.save()
        }
      })
    },
    save() {
      const params = { id: this.$route.query.id }
      const data = {
        addressInfoUpdateVo: this.detail.addressInfoVo,
        addressId: this.detail.addressInfoVo.addressId,
        companyAddress: this.detail.companyAddress,
        companyWebPage: this.detail.companyWebPage,
        dunsCode: this.detail.duns,
        enterpriseType: this.detail.enterpriseType,
        epNatureCategory: this.detail.epNatureCategory,
        epNatureSubcategory: this.detail.epNatureSubcategory,
        isActive: this.detail.isActive,
        isForeignManufacture: this.detail.isForeignManufacture,
        isListing: this.detail.isListing,
        legalPerson: this.detail.legalPerson,
        listingAddress: this.detail.listingAddress,
        nameEn: this.detail.nameEn,
        nameZh: this.detail.nameZh,
        purchaserEmail: this.detail.purchaserEmail,
        registeredCapital: this.detail.registeredCapital,
        registeredDate: this.detail.registeredDate,
        sapCode: this.detail.sapCode,
        shortNameEn: this.detail.shortNameEn,
        shortNameZh: this.detail.shortNameZh,
        socialcreditNo: this.detail.socialcreditNo,
        stockCode: this.detail.stockCode,
        supplierGrade: this.detail.supplierGrade,
        supplierId: this.detail.supplierId,
        supplierType: this.detail.supplierType,
        svwCode: this.detail.svwCode,
        svwTempCode: this.detail.svwTempCode,
        taxCode: this.detail.taxCode,
        vwCode: this.detail.vmCode,
        isForeign: this.detail.isForeign
      }
      this.loading = true
      saveSupplier(params, data)
        .then((res) => {
          if (res.result) {
            iMessage.success(res.desZh || '保存成功')
            this.editable = false
          } else {
            iMessage.error(res.desZh || '保存失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '保存失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    areaChange(val, valStrs) {
      console.log('areaChange', valStrs)
      if (valStrs.length > 2) {
        this.detail.addressInfoVo.country = valStrs[0]
        this.detail.addressInfoVo.province = valStrs[1]
        this.detail.addressInfoVo.city = valStrs[2]
        console.log('areaChange', this.detail.addressInfoVo)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-divider {
  border-bottom: dotted 1px #707070;
  margin: 30px 0px;
}
</style>
