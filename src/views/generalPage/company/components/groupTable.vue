<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button v-permission="SUPPLIER_COMPANY_GROUP_EXPORT" @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
    <table-list
        v-permission="SUPPLIER_COMPANY_GROUP"
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
import {groupTitle} from './data';
import {generalPageMixins} from '@/views/generalPage/commonFunMixins';
import {getSupplierCorp} from '@/api/supplier360/company'
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
      tableTitle: groupTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created() {
  	this.getDetail()
  },
  methods: {
    getDetail(){
  		getSupplierCorp().then(res=>{
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