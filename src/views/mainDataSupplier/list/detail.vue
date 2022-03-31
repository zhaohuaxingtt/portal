<template>
  <iPage class="main-data-supplier-detail" v-loading="loading">
    <theDetailHeader @scroll-to="scrollTo" class="margin-bottom20" />

    <theDetailBase
      class="margin-bottom20"
      id="targetBase"
      :detail="baseInfo"
      :supplier-type="supplierType"
      :supplierId="supplierId"
      :dicts="dicts"
      @the-detail-base-query="query"
      v-if="$route.query.supplierType!=='GP'"
    />
    <theDetailBaseGP
      class="margin-bottom20"
      id="targetBaseGP"
      :detail="baseInfo"
      :supplier-type="supplierType"
      :supplierId="supplierId"
      :dicts="dicts"
      @the-detail-base-query="query"
      v-if="$route.query.supplierType=='GP'"
    />
    <linie
      class="margin-bottom20"
      id="linie"
      :detail="baseInfo"
      :supplier-type="supplierType"
      :supplierId="supplierId"
      :dicts="dicts"
      @the-detail-base-query="query"
      v-if="$route.query.supplierType=='GP'"
    />
    <theDetailSupplierState
      class="margin-bottom20"
      id="targetState"
      :detail="baseInfo"
      :supplier-type="supplierType"
      :supplierId="supplierId"
      :dicts="dicts"
      @detail-supplier-state="query"
    />
    <theDetailFactory
      class="margin-bottom20"
      v-if="$route.query.supplierType!=='GP'"
      id="targetFactory"
      :supplierId="supplierId"
      :supplierPlantVo="supplierPlantVo"
      :dicts="dicts"
    />
    <theDetailBank
      :bank-form="bankForm"
      class="margin-bottom20"
      id="targetBank"
      :supplierId="supplierId"
      :supplier-type="supplierType"
      :dicts="dicts"
      v-if="$route.query.supplierType!=='GP'"
    />
    <theDetailBankGp
      :bank-form="bankForm"
      :subBankVos="subBankVos"
      class="margin-bottom20"
      id="targetBank"
      @delete-bank-success="query"
      :supplierId="supplierId"
      :supplier-type="supplierType"
      :dicts="dicts"
      v-if="$route.query.supplierType=='GP'"
    />
    <theDetailSupplierUser
      :supplierId="supplierId"
      :supplier-type="supplierType"
      class="margin-bottom20"
      id="targetUser"
      :ruleCode="baseInfo.ruleCode"
      :baseInfo="baseInfo"
    />
    <theDetailSupplierContact
      v-if="dicts.SUPPLIER_CODE_TYPE"
      :contacts="contacts"
      :supplierId="supplierId"
      :dicts="dicts"
      class="margin-bottom20"
      id="targetContact"
      @delete-contact-success="deleteContactSuccess"
    />
  </iPage>
</template>

<script>
import { iPage, iMessage } from 'rise'
import {
  theDetailHeader,
  theDetailBase,
  theDetailSupplierState,
  theDetailFactory,
  theDetailBank,
  theDetailSupplierUser,
  theDetailSupplierContact,
} from './components'
import theDetailBaseGP from './components/theDetailBaseGP'
import theDetailBankGp from './components/theDetailBankGp'
import linie from './components/linie'
import { fetchSupplier,fetchSupplierGP } from '@/api/mainDataSupplier/list'
import { BANK_FORM } from './components/data'
import { selectDictByKeys } from '@/api/dictionary'
export default {
  name: 'MainDataSupplierDetail',
  components: {
    iPage,
    theDetailHeader,
    theDetailBase,
    theDetailSupplierState,
    theDetailFactory,
    theDetailBank,
    theDetailSupplierUser,
    theDetailSupplierContact,
    linie,
    theDetailBaseGP,
    theDetailBankGp
  },
  data() {
    return {
      dicts: {},
      detail: {},
      bankForm: {},
      subBankVos:[],
      supplierId: '',
      mainSupplierId: '',
      baseInfo: { addressInfoVo: {} },
      bankSpplierId: '',
      supplierType: '',
      supplierPlantVo: [],
      loading: false
    }
  },
  created() {
    this.query()
    this.queryDicts()
  },
  methods: {
    query() {
      const { id,supplierType } = this.$route.query
      console.log(id, '--------')
      if (id) {
        this.loading = true
        if(this.$route.query.supplierType == "GP"){
          fetchSupplierGP({ id,supplierType })
          .then((res) => {
            const { data, result } = res
            if (result) {
              this.detail = data || []
              const {
                supplierVo,
                gpSupplierVo,
                ppSupplierVo,
                gpSupplierDetails,
                settlementBankVo,
                supplierContactVos,
                subBankVos,
                addressInfoVo,
                assCompanyVos,
                supplierProductVos,
                supplierPlantVo,
                supplierCorpVo
              } = data
              const defaultAddressInfo = {
                provinceCode: '',
                countryCode: '',
                cityCode: '',
                address: '',
                province: '',
                country: '',
                city: ''
              }
              this.supplierPlantVo = supplierPlantVo || []

              this.bankForm = settlementBankVo || { ...BANK_FORM }
              this.subBankVos = subBankVos;
              // console.log(subBankVos)
              this.mainSupplierId = supplierVo.id
              /* this.supplierId = supplierVo.id
              this.baseInfo = {
                ...supplierVo,
                isListing: supplierVo.isListing && supplierVo.isListing + '',
                isForeignManufacture:
                  supplierVo.isForeignManufacture &&
                  supplierVo.isForeignManufacture + '',
                addressInfoVo: addressInfoVo || defaultAddressInfo,
                assCompanyVos: assCompanyVos || [], // 关联产品
                supplierProductVos: supplierProductVos || [], // 关联公司
                supplierCorpVo: supplierCorpVo || [] // 关联集团
              }
              this.supplierType = 'PD' // 公用 */
              this.contacts = supplierContactVos || []

              if (supplierVo.supplierType === 'GP' && gpSupplierVo) {
                let isForeignManufacture
                if (
                  supplierVo.isForeignManufacture == 1 ||
                  supplierVo.isForeignManufacture == 0
                ) {
                  isForeignManufacture =
                    supplierVo.isForeignManufacture.toString()
                }
                this.supplierId = gpSupplierVo.id
                console.log(gpSupplierDetails);
                this.baseInfo = {
                  ...supplierVo,
                  ...gpSupplierVo,
                  gpSupplierDetails:gpSupplierDetails,
                  assCompanyVos: assCompanyVos || [], // 关联产品
                  supplierProductVos: supplierProductVos || [], // 关联公司
                  isListing: supplierVo.isListing + '',
                  isForeignManufacture,
                  // :
                  //   supplierVo.isForeignManufacture &&
                  //   supplierVo.isForeignManufacture + ''
                  // ,
                  addressInfoVo: addressInfoVo || defaultAddressInfo,
                  supplierCorpVo: supplierCorpVo || [], // 关联集团
                  enterpriseType: supplierVo.enterpriseType
                }
                this.supplierType = 'GP' // 一般
                console.log(this.baseInfo)
              }
              if (supplierVo.supplierType === 'PP' && ppSupplierVo) {
                let isForeignManufacture
                if (
                  supplierVo.isForeignManufacture == 0 ||
                  supplierVo.isForeignManufacture == 1
                ) {
                  isForeignManufacture =
                    supplierVo.isForeignManufacture.toString()
                }
                this.supplierId = ppSupplierVo.id
                this.baseInfo = {
                  ...supplierVo,
                  ...ppSupplierVo,
                  assCompanyVos: assCompanyVos || [], // 关联产品
                  supplierProductVos: supplierProductVos || [], // 关联公司
                  isListing: supplierVo.isListing + '',
                  isForeignManufacture,
                  // isForeignManufacture:
                  //   supplierVo.isForeignManufacture &&
                  //   supplierVo.isForeignManufacture + '',
                  addressInfoVo: addressInfoVo || defaultAddressInfo,
                  supplierCorpVo: supplierCorpVo || [], // 关联集团
                  enterpriseType: supplierVo.enterpriseType
                }
                this.supplierType = 'PP' // 生产
              }
              // CRW-4378[供应商主数据管理]供应商信息详情页，用户列表为空
              if (supplierVo.supplierType === 'PD') {
                const vo = ppSupplierVo || gpSupplierVo
                let isForeignManufacture
                if (
                  vo.isForeignManufacture == 0 ||
                  vo.isForeignManufacture == 1
                ) {
                  isForeignManufacture = vo.isForeignManufacture.toString()
                }
                this.supplierId = vo.id
                this.baseInfo = {
                  ...supplierVo,
                  ...vo,
                  isListing: vo.isListing && vo.isListing + '',
                  isForeignManufacture,
                  // isForeignManufacture:
                  //   vo.isForeignManufacture && vo.isForeignManufacture + '',
                  addressInfoVo: addressInfoVo || defaultAddressInfo,
                  assCompanyVos: assCompanyVos || [], // 关联产品
                  supplierProductVos: supplierProductVos || [], // 关联公司
                  supplierCorpVo: supplierCorpVo || [], // 关联集团
                  enterpriseType: supplierVo.enterpriseType
                }
                this.supplierType = 'PD'
              }
            } else {
              iMessage.error(res.desZh || '获取数据失败')
            }
          })
          .catch((err) => {
            iMessage.error(err.desZh || '获取数据失败')
          })
          .finally(() => (this.loading = false))
        }else{
          fetchSupplier({ id })
          .then((res) => {
            const { data, result } = res
            if (result) {
              this.detail = data || []
              const {
                supplierVo,
                gpSupplierVo,
                ppSupplierVo,
                settlementBankVo,
                supplierContactVos,
                subBankVos,
                addressInfoVo,
                assCompanyVos,
                supplierProductVos,
                supplierPlantVo,
                supplierCorpVo
              } = data
              const defaultAddressInfo = {
                provinceCode: '',
                countryCode: '',
                cityCode: '',
                address: '',
                province: '',
                country: '',
                city: ''
              }
              this.supplierPlantVo = supplierPlantVo || []

              this.bankForm = settlementBankVo || { ...BANK_FORM }
              this.subBankVos = subBankVos;
              console.log(subBankVos)
              this.mainSupplierId = supplierVo.id
              /* this.supplierId = supplierVo.id
              this.baseInfo = {
                ...supplierVo,
                isListing: supplierVo.isListing && supplierVo.isListing + '',
                isForeignManufacture:
                  supplierVo.isForeignManufacture &&
                  supplierVo.isForeignManufacture + '',
                addressInfoVo: addressInfoVo || defaultAddressInfo,
                assCompanyVos: assCompanyVos || [], // 关联产品
                supplierProductVos: supplierProductVos || [], // 关联公司
                supplierCorpVo: supplierCorpVo || [] // 关联集团
              }
              this.supplierType = 'PD' // 公用 */
              this.contacts = supplierContactVos || []

              if (supplierVo.supplierType === 'GP' && gpSupplierVo) {
                let isForeignManufacture
                if (
                  supplierVo.isForeignManufacture == 1 ||
                  supplierVo.isForeignManufacture == 0
                ) {
                  isForeignManufacture =
                    supplierVo.isForeignManufacture.toString()
                }
                this.supplierId = gpSupplierVo.id
                this.baseInfo = {
                  ...supplierVo,
                  ...gpSupplierVo,
                  assCompanyVos: assCompanyVos || [], // 关联产品
                  supplierProductVos: supplierProductVos || [], // 关联公司
                  isListing: supplierVo.isListing + '',
                  isForeignManufacture,
                  // :
                  //   supplierVo.isForeignManufacture &&
                  //   supplierVo.isForeignManufacture + ''
                  // ,
                  addressInfoVo: addressInfoVo || defaultAddressInfo,
                  supplierCorpVo: supplierCorpVo || [], // 关联集团
                  enterpriseType: supplierVo.enterpriseType
                }
                this.supplierType = 'GP' // 一般
                console.log(this.baseInfo)
              }
              if (supplierVo.supplierType === 'PP' && ppSupplierVo) {
                let isForeignManufacture
                if (
                  supplierVo.isForeignManufacture == 0 ||
                  supplierVo.isForeignManufacture == 1
                ) {
                  isForeignManufacture =
                    supplierVo.isForeignManufacture.toString()
                }
                this.supplierId = ppSupplierVo.id
                this.baseInfo = {
                  ...supplierVo,
                  ...ppSupplierVo,
                  assCompanyVos: assCompanyVos || [], // 关联产品
                  supplierProductVos: supplierProductVos || [], // 关联公司
                  isListing: supplierVo.isListing + '',
                  isForeignManufacture,
                  // isForeignManufacture:
                  //   supplierVo.isForeignManufacture &&
                  //   supplierVo.isForeignManufacture + '',
                  addressInfoVo: addressInfoVo || defaultAddressInfo,
                  supplierCorpVo: supplierCorpVo || [], // 关联集团
                  enterpriseType: supplierVo.enterpriseType
                }
                this.supplierType = 'PP' // 生产
              }
              // CRW-4378[供应商主数据管理]供应商信息详情页，用户列表为空
              if (supplierVo.supplierType === 'PD') {
                const vo = ppSupplierVo || gpSupplierVo
                let isForeignManufacture
                if (
                  vo.isForeignManufacture == 0 ||
                  vo.isForeignManufacture == 1
                ) {
                  isForeignManufacture = vo.isForeignManufacture.toString()
                }
                this.supplierId = vo.id
                this.baseInfo = {
                  ...supplierVo,
                  ...vo,
                  isListing: vo.isListing && vo.isListing + '',
                  isForeignManufacture,
                  // isForeignManufacture:
                  //   vo.isForeignManufacture && vo.isForeignManufacture + '',
                  addressInfoVo: addressInfoVo || defaultAddressInfo,
                  assCompanyVos: assCompanyVos || [], // 关联产品
                  supplierProductVos: supplierProductVos || [], // 关联公司
                  supplierCorpVo: supplierCorpVo || [], // 关联集团
                  enterpriseType: supplierVo.enterpriseType
                }
                this.supplierType = 'PD'
              }
            } else {
              iMessage.error(res.desZh || '获取数据失败')
            }
          })
          .catch((err) => {
            iMessage.error(err.desZh || '获取数据失败')
          })
          .finally(() => (this.loading = false))
        }
      }
    },
    scrollTo(refId) {
      const element = document.getElementById(refId)
      if (element) {
        document.querySelector('.main-data-supplier-detail').scrollTo({
          top: element.offsetTop - 60,
          behavior: 'smooth'
        })
      }
    },
    queryDicts() {
      let data = [
        'FINANCIAL',
        'TREND',
        'PAYMENT',
        'OWNMODE',
        'ENTERPRISESIZE',
        'FINANCIAL',
        'SUPPLIER_TRADECODE',
        'ORGANIZATION_BUSINESS_SCOPE',
        'MARKADDRESS',
        'PROPERTIES_SUPPLY',
        'ENTERPRISE_PROPERTY',
        'TURE_FALSE',
        'LEGALSTATUS',
        'SUPPLY_OF_METERIAL_TYPE',
        'SUPPLIER_CODE_TYPE'
      ]
      let url = 'keys='
      url = url + data.join('&keys=')
      selectDictByKeys(url).then((res) => {
        if (res.data) {
          this.dicts = res.data
        }
      })
    },
    deleteContactSuccess() {
      this.query()
    },
    deleteFactorySuccess() {
      this.query()
    },
  }
}
</script>

<style lang="scss" scoped>
.main-data-supplier-detail {
  position: relative;
  padding-top: 80px;
}
</style>
