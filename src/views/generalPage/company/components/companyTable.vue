<!--
 * @Author: your name
 * @Date: 2021-11-09 15:26:24
 * @LastEditTime: 2021-12-06 17:54:21
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\generalPage\company\components\companyTable.vue
-->
<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_SAVE"
                  @click="saveInfos">{{$t('LK_BAOCUN')}}</i-button>
        <i-button v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_ADD"
                  @click="addTableItem">{{$t('LK_XINZENG')}}</i-button>
        <i-button v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_DELETE"
                  @click="deleteItem('ids', delCompany)">{{$t('delete')}}</i-button>
        <i-button v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY_EXPORT"
                  @click="exportsTable">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
     <!-- v-permission="SUPPLIER_COMPANY_RELATEDCOMPANY" -->
    <table-list
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :input-props="inputProps"
                :index="true" />
  </iCard>
</template>

<script>
import { iCard, iButton } from "rise";
import tableList from '@/components/commonTable';
import { companyTitle } from "./data";
import { getCompanyList, saveCompany, delCompany, getCompany } from '@/api/supplier360/company';
import { generalPageMixins } from '@/views/generalPage/commonFunMixins';
export default {
  mixins: [generalPageMixins],
  components: { iCard, iButton, tableList },
  data () {
    return {
      tableListData: [],
      tableTitle: companyTitle,
      tableLoading: false,
      selectTableData: [],
      inputProps: [],
      selectProps: []
    }
  },
  created () {
    this.setInputProps()
    this.getTableList()
  },
  methods: {
    delCompany,
    setInputProps () {
      this.inputProps = []
      this.tableTitle.map(item => {
        if (!this.selectProps.includes(item.props)) {
          this.inputProps.push(item.props)
        }
      })
    },
    getTableList () {
      getCompanyList().then(res => {
        if (res.data) {
          this.tableListData = res.data
        }
      })
    },
    // 保存
    async saveInfos () {
      const flag = this.checkTableRequiredProps(this.tableListData, this.tableTitle)
      if (flag) {
        this.tableLoading = true
        const req = {
          assCompanyDTOList: this.tableListData,
          step: 'submit'
        }
        const res = await saveCompany(req, this.supplierType)
        this.resultMessage(res, () => {
          this.getTableList()
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
