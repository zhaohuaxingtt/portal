<!-- 股东 -->
<template>
  <iCard :title="$t('SPR_FRM_XGYSPJ_GDXX')" tabCard>
    <template slot="header-control">
      <i-button v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_SAVE"
                @click="saveInfos">{{$t('LK_BAOCUN')}}</i-button>
      <i-button v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_ADD"
                @click="addTableItem">{{$t('LK_XINZENG')}}</i-button>
      <i-button v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_DELETE"
                @click="deleteItem('ids', delSupplierInvestor)">{{$t('delete')}}</i-button>
      <i-button v-permission="SUPPLIER_COMPANY_EXPORT" @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
    </template>
    <!-- v-permission="SUPPLIER_COMPANY_SHAREHOLDER" -->
    <table-list
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :input-props="inputProps"
        :index="true"
        border
    />
  </iCard>
</template>

<script>
import {iCard, iButton, iMessage} from "rise";
import tableList from '@/components/commonTable';
import {shareholderTitle} from './data';
import {generalPageMixins} from '@/views/generalPage/commonFunMixins';
import {getSupplierInvestor,supplierInvestorInfos,delSupplierInvestor} from '@/api/supplier360/company'
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
      selectTableData: [],
      inputProps: [],
      selectProps:[],
      
    }
  },
  created() {
    this.setInputProps();
  	this.getDetail()
  },
  methods: {
    delSupplierInvestor,
    setInputProps () {
      this.inputProps = []
      this.tableTitle.map(item => {
        if (!this.selectProps.includes(item.props)) {
          this.inputProps.push(item.props)
        }
      })
    },
    getDetail(){
      getSupplierInvestor().then(res=>{
        if (res.data) {
          this.tableListData=res.data
        }
      })
	  },
    // 保存
    async saveInfos () {
      const flag = this.checkTableRequiredProps(this.tableListData, this.tableTitle)
      this.tableListData.forEach(e=>{
        e.supplierId = this.$route.query.supplierId||""
        e.proportion = Number(e.proportion)
        e.shareholderContribution = Number(e.shareholderContribution)
      })
      if (flag) {
        this.tableLoading = true
        const req = {
          supplierInvestorDTOList: this.tableListData,
          step: 'submit'
        }
        const res = await supplierInvestorInfos(req, this.supplierType)
        this.resultMessage(res, () => {
          this.getDetail()
          this.tableLoading = false
        }, () => {
          this.tableLoading = false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>