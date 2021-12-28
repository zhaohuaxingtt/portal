<!--
 * @Date: 2021-11-22 16:16:26
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-13 16:38:54
 * @FilePath: \德勤项目\front-site\src\views\register\ntier\index.vue
-->
<template>
  <iPage class="ntier-header">
    <pageHeader class="margin-bottom20 ntier-detail-header">
      N-Tier供应商信息
      <div slot="actions">
        <iButton v-show="!editable && supplierData.id" @click="editable = true">
          {{ language('编辑') }}
        </iButton>
        <iButton v-show="editable" :loading="isloading" @click="saveInfos()">
          {{ language('BAOCUN', '保存') }}
        </iButton>
        <iButton v-show="editable" @click="editable = false">
          {{ language('取消') }}
        </iButton>
      </div>
    </pageHeader>
    <!-- <div class="save margin-bottom20">
      <iButton v-loading="isloading" @click="saveInfos()">
        {{ language('BAOCUN', '保存') }}
      </iButton>
    </div> -->
    <div class="page-main" v-loading="isloading">
      <baseInfo
        :supplierData="supplierData"
        ref="Baseinfo"
        :loading="isloading"
        :editable="editable"
        class="margin-bottom20"
      />
      <companyProfile
        ref="companyProfile"
        :country="country"
        :supplierData="supplierData"
        :fromGroup="fromGroup"
        :editable="editable"
        class="margin-bottom20"
      />
      <factory
        :countryList="country"
        :tableListData="supplierDirectoryTable"
        :editable="editable"
        ref="factory"
        class="margin-bottom20"
        @add="handleAddFactory"
      />
      <supplierDirectoryTable
        :tableListData="contactUser"
        :editable="editable"
        ref="userTable"
        class="margin-bottom20"
      />
    </div>
  </iPage>
</template>

<script>
import { iPage, iButton, iMessage } from 'rise'
import factory from './components/factory'
import baseInfo from './components/baseinfo'
import { selectDictByKeys, getCityInfo } from '@/api/dictionary'
import { getNtierSupplier, updateBatch } from '@/api/mainDataSupplier/ntier'
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
          countryCode: '',
          country: '',
          provinceCode: '',
          province: '',
          cityCode: '',
          city: ''
        },
        plantList: [],
        contactUser: []
      },
      contactUser: [],
      supplierDirectoryTable: [],
      country: [],
      fromGroup: {},
      editable: false
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
      selectDictByKeys(url).then((res) => {
        if (res.data) {
          this.fromGroup = res.data
          this.supplierDetail()
        }
      })
    },
    supplierDetail() {
      // 1464129746521894912
      this.isloading = true
      const params = { supplierId: this.$route.query.id }
      getNtierSupplier(params)
        .then((res) => {
          if (res && res.code == 200) {
            this.supplierData = {
              ...res.data,
              address: res.data.address || {
                countryCode: '',
                country: '',
                provinceCode: '',
                province: '',
                cityCode: '',
                city: ''
              },
              plantList: res.data.plantList || []
            }
            this.supplierDirectoryTable = this.supplierData.plantList
            this.contactUser = res.data.contactUser
              ? [res.data.contactUser]
              : [
                  {
                    dept: '',
                    email: '',
                    id: 0,
                    name: '',
                    position: '',
                    telephoneAreaCode: '',
                    telephoneM: '',
                    userName: ''
                  }
                ]
          } else {
            iMessage.error(res.desZh)
          }
        })
        .finally(() => (this.isloading = false))
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
    saveInfos() {
      if (this.supplierDirectoryTable.length === 0) {
        iMessage.warn(this.language('请填写生产工厂信息'))
        return false
      }
      if (this.contactUser.length === 0) {
        iMessage.warn(this.language('请填写联系人信息'))
        return false
      }

      Promise.all([
        this.isBaseInfoRules(),
        this.isCompanyRules(),
        this.isFactoryRules(),
        this.isUserfoRules()
      ])
        .then(() => {
          this.updateSupplier()
        })
        .catch((err) => {
          console.log('validate err', err)
          if (err) {
            const keys = Object.keys(err)
            if (keys.length > 0) {
              console.log('err', keys[0], err[keys[0]])
              iMessage.warn(err[keys[0]][0].message)
            }
          }
        })
    },
    updateSupplier() {
      const dunsCode = this.$refs.Baseinfo.getDunsCode()
      if (dunsCode === 1) {
        return false
      }
      this.isloading = true
      this.supplierData.duns = dunsCode
      const reqTableList = cloneDeep(this.supplierDirectoryTable)
      for (const iten of reqTableList) {
        if (iten.country === '中国') {
          if (!iten.province || !iten.city) {
            iMessage.error(
              this.language(
                'SHENGFENCHENGSHIBUNENGWEIKONG',
                '省份、城市不能为空！'
              )
            )
            this.tableLoading = false
            return
          }
        }
      }
      const plantList = reqTableList.map((e) => {
        const item = {
          address: e.address,
          areaCovered: e.areaCovered,
          city: e.city,
          cityCode: e.cityCode,
          country: e.country,
          countryCode: e.countryCode,
          factoryName: e.factoryName,
          postCode: e.postCode,
          province: e.province,
          provinceCode: e.provinceCode
        }
        if (e.id) {
          item.id = e.id
        }
        if (e.addressId) {
          item.addressId = e.addressId
        }
        return item
      })
      const requestData = {
        ...this.supplierData,
        contactUser: this.contactUser[0],
        plantList
      }
      /* this.supplierData.contactUser = this.contactUser[0]
      this.supplierData.plantList = reqTableList.map((e) => {
        const item = {
          address: e.address,
          areaCovered: e.areaCovered,
          city: e.city,
          cityCode: e.cityCode,
          country: e.country,
          countryCode: e.countryCode,
          factoryName: e.factoryName,
          postCode: e.postCode,
          province: e.province,
          provinceCode: e.provinceCode
        }
        if (e.id) {
          item.id = e.id
        }
        if (e.addressId) {
          item.addressId = e.addressId
        }
        return item
      }) */
      console.log('this.supplierData---this.supplierData:', this.supplierData)

      updateBatch([requestData]).then((res) => {
        if (res && res.code == 200) {
          this.isloading = false
          this.editable = false
          iMessage.success(res.desZh || this.language('更新成功'))
        } else {
          this.isloading = false
          iMessage.error(res.desZh || this.language('更新失败'))
        }
      })
    },
    // 基础信息校验
    isBaseInfoRules() {
      return new Promise((resolve, reject) => {
        this.$refs.Baseinfo.$refs.baseRules.validate((valid, message) => {
          if (valid) {
            resolve(valid)
          } else {
            reject(message)
          }
        })
      })
    },
    // 联系人
    isUserfoRules() {
      return new Promise((resolve, reject) => {
        this.$refs.userTable.$refs.commonTable.$refs.commonTableForm.validate(
          (valid, message) => {
            if (valid) {
              console.log(valid)
              resolve(valid)
            } else {
              reject(message)
            }
          }
        )
      })
    },
    // 工厂信息
    isFactoryRules() {
      return new Promise((resolve, reject) => {
        this.$refs.factory.$refs.ruleForm.validate((valid, message) => {
          console.log('isFactoryRules message', message)
          if (valid) {
            resolve(valid)
          } else {
            reject(message)
          }
        })
      })
    },
    // 企业信息
    isCompanyRules() {
      return new Promise((resolve, reject) => {
        this.$refs.companyProfile.$refs.companyProfileRules.validate(
          (valid, message) => {
            if (valid) {
              resolve(valid)
            } else {
              reject(message)
            }
          }
        )
      })
    },
    handleAddFactory() {
      console.log('add factory')
      /* Vue.set(this.supplierData, 'platList', [
        ...this.supplierData.plantList,
        {
          address: '',
          areaCovered: 0,
          city: '',
          cityCode: '',
          country: '',
          countryCode: '',
          factoryName: '',
          postCode: '',
          province: '',
          provinceCode: ''
        }
      ]) */
      this.supplierDirectoryTable.push({
        address: '',
        areaCovered: '',
        city: '',
        cityCode: '',
        country: '',
        countryCode: '',
        factoryName: '',
        postCode: '',
        province: '',
        provinceCode: '',
        cityOptions: [],
        provinceOptions: []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ntier-header {
  padding-top: 80px;
}
.ntier-detail-header {
  position: fixed;
  width: calc(100% - 160px);
  top: 60px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: $color-background;
  padding-right: 30px;
  z-index: 9;
}
</style>
