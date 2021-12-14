<!--
 * @Date: 2021-11-22 16:16:26
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-13 16:38:54
 * @FilePath: \德勤项目\front-site\src\views\register\ntier\index.vue
-->
<template>
  <iPage>
    <pageHeader>N-Tier供应商信息</pageHeader>
    <div class="save margin-bottom20">
      <iButton v-loading="isloading" @click="saveInfos()">
        {{ language('BAOCUN', '保存') }}
      </iButton>
    </div>
    <baseInfo :supplierData="supplierData" ref="Baseinfo"></baseInfo>
    <companyProfile
      style="margin-top: 20px"
      ref="companyProfile"
      :country="country"
      :supplierData="supplierData"
      :fromGroup="fromGroup"
    ></companyProfile>
    <factory
      :countryList="country"
      :tableListData="supplierDirectoryTable"
      ref="factory"
      style="margin-top: 20px"
    ></factory>
    <supplierDirectoryTable
      :tableListData="contactUser"
      ref="userTable"
      style="margin-top: 20px"
    ></supplierDirectoryTable>
  </iPage>
</template>

<script>
import { iPage, iButton, iMessage } from 'rise'
import factory from './components/factory'
import baseInfo from './components/baseinfo'
import { selectDictByKeys, getCityInfo } from '@/api/dictionary'
import {
  saveNtierSupplier,
  getNtierSupplier,
  updateBatch
} from '@/api/mainDataSupplier/ntier'
import supplierDirectoryTable from './components/supplierDirectoryTable'
import companyProfile from './components/companyProfile'
import { cloneDeep } from 'lodash'
import pageHeader from '@/components/pageHeader'

export default {
  components: {
    baseInfo,
    iPage,
    companyProfile,
    supplierDirectoryTable,
    factory,
    iButton,
    pageHeader
  },
  data() {
    return {
      isloading: false,
      supplierData: {
        address: {
          provinceCode: '',
          province: '',
          cityCode: '',
          city: ''
        },
        plantList: []
      },
      contactUser: [],
      supplierDirectoryTable: [],
      country: [],
      fromGroup: {},
      isEdit: false
    }
  },
  created() {
    this.$nextTick(() => {
      this.getAllSelect()
    })
    this.getCityInfo()
  },
  methods: {
    // 获取下拉框数据
    getAllSelect() {
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
        'SUPPLY_OF_METERIAL_TYPE'
      ]
      let url = 'keys='
      url = url + data.join('&keys=')
      console.log(url, 'url')
      selectDictByKeys(url).then((res) => {
        if (res.data) {
          this.fromGroup = res.data
          this.supplierDetail(this.$route.query.id)
        }
      })
    },
    supplierDetail(val) {
      // 1464129746521894912
      getNtierSupplier(val).then((res) => {
        if (res && res.code == 200) {
          this.supplierData = res.data
          this.isEdit = true
          this.$nextTick(() => {
            if (this.supplierData.address.provinceCode)
              this.$refs.companyProfile.getProvince()
            if (this.supplierData.address.countryCode)
              this.$refs.companyProfile.getCity()
            // this.contactUser = this.supplierData.contactUser
            this.$set(this.contactUser, 0, this.supplierData.contactUser)
            this.supplierDirectoryTable = this.supplierData.plantList.map(
              (item) => {
                item.countryList = this.country
                return item
              }
            )
          })
        } else iMessage.error(res.desZh)
      })
    },
    //获取国家
    getCityInfo() {
      let data = {
        parentCityId: -1,
        cityName: ''
      }
      getCityInfo(data).then((res) => {
        if (res.data) {
          this.country = res.data
        }
      })
    },
    // 保存基本信息
    saveInfos(step = '') {
      if (this.supplierDirectoryTable.length === 0) {
        iMessage.warn(
          this.language(
            'QINGTIANXIESHENGCHANGONGCHANGXINXI',
            '请填写生产工厂信息'
          )
        )
        return false
      }
      if (this.contactUser.length === 0) {
        iMessage.warn(
          this.language('QINGTIANXIELIANXIRENXINXI', '请填写联系人信息')
        )
        return false
      }
      return new Promise((resolve, reject) => {
        Promise.all([
          this.isUserfoRules(),

          this.isBaseInfoRules(),
          this.isCompanyRules(),
          this.isFactoryRules()
        ]).then((res) => {
          let dunsCode = this.$refs.Baseinfo.getDunsCode()
          if (dunsCode === 1) {
            return false
          }
          this.isloading = true
          this.supplierData.duns = dunsCode
          const reqTableList = cloneDeep(this.supplierDirectoryTable)
          reqTableList.map((item) => {
            item['countryCode'] = item.country.cityId
              ? item.country.cityId
              : item.countryId
            item['provinceCode'] = item.province.cityId
              ? item.province.cityId
              : item.provinceId
            item['cityCode'] = item.city.cityId ? item.city.cityId : item.cityId
            item['country'] = item.country.cityNameCn
              ? item.country.cityNameCn
              : item.country
            item['province'] = item.province.cityNameCn
              ? item.province.cityNameCn
              : item.province
            item['city'] = item.city.cityNameCn
              ? item.city.cityNameCn
              : item.city
            return item
          })
          this.supplierData.contactUser = this.contactUser[0]
          this.supplierData.plantList = reqTableList
          console.log(this.isEdit)
          if (this.isEdit == true) {
            let id = this.supplierData.id
            updateBatch([this.supplierData]).then((res) => {
              if (res && res.code == 200) {
                this.isloading = false
                iMessage.success(this.language('GENGXINCHENGGONG', '更新成功'))
                this.supplierDetail(id)
              } else {
                this.isloading = false
                iMessage.error(res.desZh)
              }
            })
          } else {
            saveNtierSupplier(this.supplierData).then((res) => {
              if (res && res.code == 200) {
                this.isloading = false
                iMessage.success(this.language('BAOCUNCHENGGONG', '保存成功'))
                this.supplierDetail(res.data)
              } else {
                this.isloading = false
                iMessage.error(res.desZh)
              }
            })
          }
        })
        //   .catch(() => {
        //     iMessage.warn(
        //       this.language('QINGTIANXIEBITIANXIANG', '请填写必填项')
        //     )
        //   })
      })
    },
    // 基础信息校验
    isBaseInfoRules() {
      return new Promise((resolve, reject) => {
        this.$refs.Baseinfo.$refs.baseRules.validate((valid) => {
          if (valid) {
            resolve(valid)
          } else {
            return false
          }
        })
      })
    },
    // 联系人
    isUserfoRules() {
      return new Promise((resolve, reject) => {
        this.$refs.userTable.$refs.commonTable.$refs.commonTableForm.validate(
          (valid) => {
            if (valid) {
              console.log(valid)
              resolve(valid)
            } else {
              return false
            }
          }
        )
      })
    },
    // 工厂信息
    isFactoryRules() {
      return new Promise((resolve, reject) => {
        this.$refs.factory.$refs.commonTable.$refs.commonTableForm.validate(
          (valid) => {
            if (valid) {
              resolve(valid)
            } else {
              return false
            }
          }
        )
      })
    },
    // 企业信息
    isCompanyRules() {
      return new Promise((resolve, reject) => {
        this.$refs.companyProfile.$refs.companyProfileRules.validate(
          (valid) => {
            if (valid) {
              resolve(valid)
            } else {
              return false
            }
          }
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.save {
  text-align: right;
}
</style>
