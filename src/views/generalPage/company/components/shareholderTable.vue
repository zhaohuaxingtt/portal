<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button v-permission="SUPPLIER_COMPANY_EXPORT" @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
    <!-- v-permission="SUPPLIER_COMPANY_SHAREHOLDER" -->
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
    />
  </iCard>
</template>

<script>
import {iCard, iButton, iMessage} from "rise";
import tableList from '@/components/commonTable';
import {shareholderTitle} from './data';
import {generalPageMixins} from '@/views/generalPage/commonFunMixins';
import {getSupplierInvestor} from '@/api/supplier360/company'
export default {
	mixins: [generalPageMixins],
	components: {
		iCard,
		iButton,
		tableList
  },
  data() {
    return {
      tableListData: [],
      tableTitle: shareholderTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created() {
  	this.getDetail()
  },
  methods: {
    getDetail(){
		getSupplierInvestor().then(res=>{
			if (res.data) {
				this.tableListData=res.data
			}
		})
	}
  }
}
</script>

<style scoped>

</style>