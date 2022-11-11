<!--
 * @Author: your name
 * @Date: 2021-10-27 19:18:05
 * @LastEditTime: 2021-11-23 15:43:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\index.vue
-->
<template>
  <div>
    <formInformation
      ref="formInformation"
      :canEdit="canEdit"
      :formData="formData"
      :baseDetail="baseDetail"
      :statusList="statusList"
      @getDetail="getDetail"
    ></formInformation>
    <enclosureList
      ref="enclosureList"
      :canEdit="canEdit"
      :detailList="detailList"
      class="margin-top20"
      @getDetail="getDetail"
    ></enclosureList>
    <dosageDetails
      ref="dosageDetails"
      :detailList="detailList"
      :baseDetail="baseDetail"
      :canEdit="canEdit"
      class="margin-top20"
      @getDetail="getDetail"
    ></dosageDetails>
  </div>
</template>

<script>
import { iPage } from 'rise'
import dosageDetails from './components/dosageDetails'
import enclosureList from './components/enclosureList'
import formInformation from './components/formInformation'
import { getLocationApplyStatus } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import {
  getDetailById,
  addRule
} from '@/api/mtz/annualGeneralBudget/chipChange'

export default {
  data() {
    return {
      baseDetail: {},
      formData: {},
      detailList: [],
      statusList: [],
      chipAttachmentBaseList: [],
      changeId: ''
    }
  },
  components: {
    formInformation,
    enclosureList,
    dosageDetails,
    iPage
  },

  computed: {
    canEdit() {
      return ['NEW', 'NOPASS', ''].includes(
        this.baseDetail?.chipChangeBase?.status
      )
    }
  },
  created() {
    this.changeId = this.$route.query.changeId
    this.getLocationApplyStatus()
    this.getDetail()
  },
  methods: {
    getLocationApplyStatus() {
      getLocationApplyStatus({}).then((res) => {
        this.statusList = JSON.parse(JSON.stringify(res.data))
      })
    },
    getDetail() {
      getDetailById(this.changeId).then((res) => {
        if (res?.code === '200') {
          this.baseDetail = res.data
          this.formData = res.data.chipChangeBase
          this.detailList = res.data.detailList.map((item) => {
            return {
              ...item,
              supplier: item.sapCode + '-' + item.supplierName
            }
          })
          this.chipAttachmentBaseList = res.data.chipAttachmentBaseList
        }
      })
    },
    addRule(val) {
      let params = {
        chipId: this.changeId,
        supplierId: 0,
        ...val
      }
      addRule(params).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>