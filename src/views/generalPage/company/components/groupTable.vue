<!--
 * @Author: YoHo
 * @Date: 2022-02-16 17:36:57
 * @LastEditTime: 2022-03-03 17:02:24
 * @LastEditors: YoHo
 * @Description: 
-->
<!-- 集团 -->
<template>
  <iCard :title="$t('JITUANXINXI')" tabCard>
    <template slot="header-control" v-if="$route.query.subSupplierType!=='GP'">
      <i-button v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_SAVE"
                @click="saveInfos">{{$t('LK_BAOCUN')}}</i-button>
      <i-button v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_ADD"
                @click="addTableItem">{{$t('LK_XINZENG')}}</i-button>
      <i-button v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_DELETE"
                @click="deleteItem('ids', delSupplierCorp)">{{$t('delete')}}</i-button>
      <i-button v-permission="SUPPLIER_COMPANY_GROUP_EXPORT" @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
    </template>

    <template slot="header-control" v-if="$route.query.subSupplierType=='GP'">
      <i-button v-permission="SUPPLIER_COMPANY_GROUP_EXPORT_GP" @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
    </template>
    
    <!-- v-permission="SUPPLIER_COMPANY_GROUP" -->
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
import {groupTitle} from './data';
import {generalPageMixins} from '@/views/generalPage/commonFunMixins';
import {getSupplierCorp,supplierCorpInfos,delSupplierCorp} from '@/api/supplier360/company'

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
    delSupplierCorp,
    setInputProps () {
      this.inputProps = []
      this.tableTitle.map(item => {
        if (!this.selectProps.includes(item.props)) {
          this.inputProps.push(item.props)
        }
      })
    },
    getDetail(){
  		getSupplierCorp().then(res=>{
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
      })
      if (flag) {
        this.tableLoading = true
        const req = {
          saveSupplierCorpDTOList: this.tableListData,
          step: 'submit'
        }
        const res = await supplierCorpInfos(req, this.supplierType)
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