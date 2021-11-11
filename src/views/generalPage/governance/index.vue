<!--
* @author:shujie
* @Date: 2021-4-14 17:00:43
* @Description: 
 -->
<template>
  <div class="frm">
    <base-info-card v-if="this.supplierType > 3"/>
    <iCard class="margin-top20">
      <formItem :title="staffTitle" :data="staffData"></formItem>
    </iCard>
    <staffTable class="margin-top20"></staffTable>
  </div>
</template>

<script>
import {iCard} from "rise";
import formItem from "./components/formItem";
import {staffTitle} from "./components/data";
import staffTable from "./components/staffDetailTable"
import {getGovernConditionListView} from '../../../api/supplier360/governance'
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    formItem,
    staffTable,
    baseInfoCard
  },
  data() {
    return {
      staffTitle,
      staffData: {
        totalEmployees: '',
        managerNum: '',
        technicistNum: '',
        salesmanNum: '',
        daytalerNum: '',
        isLaborunion: ''
      }
    }
  },
  created() {
    this.getGovernConditionList()
  },
  methods: {
    async getGovernConditionList() {
      const req = {
        pageNo: 1,
        pageSize: 9999
      }
      const res = await getGovernConditionListView(req)
      this.staffData = res.data[0]
    }
  }
}
</script>