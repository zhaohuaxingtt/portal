<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{$t('SUPPLIER_GONGYINGSHANGTONGXUNLU')}}</span>
      <div class="floatright">
        <i-button v-permission="SUPPLIER_SUPPLIERCONTACT_MAILLIST_SAVE"
                  v-if="this.supplierType === 4"
                  @click="saveInfos('submit')">{{$t('LK_BAOCUN')}}</i-button>
        <!-- <i-button v-permission="SUPPLIER_SUPPLIERCONTACT_MAILLIST_ADD" @click="addTableItem">新增</i-button> -->
        <i-button v-permission="SUPPLIER_SUPPLIERCONTACT_MAILLIST_DELETE"
                  @click="deleteItem('ids',deleteContacts)">{{$t('LK_SHANCHU')}}</i-button>
        <i-button v-permission="SUPPLIER_SUPPLIERCONTACT_MAILLIST_EXPORT"
                  @click="exportsTable"
                  v-if="showExportsButton">{{ $t('LK_DAOCHU') }}</i-button>
      </div>
    </div>
    <table-list v-permission="SUPPLIER_SUPPLIERCONTACT_MAILLIST"
                ref="commonTable"
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :input-props="['nameZh','designation', 'dept','telephoneAreaCode', 'telephone', 'phoneF','email','remark']"
                :index="true">
      <template #contactType="scope">
        <div v-if="scope.row.contactType==='商务联系人'">{{scope.row.contactType}} <span style="color:red">*</span></div>
        <div v-else>{{scope.row.contactType}}</div>
      </template>
    </table-list>
  </i-card>
</template>

<script>
import { iCard, iButton, iMessage, iMessageBox } from "rise";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import tableList from '@/components/commonTable'
import { supplierDirectoryTableTitle } from './data'
import { selectContacts, deleteContacts, saveContacts } from "../../../../api/register/contactsAndUsers";
import { getDictByCode } from "../../../../api/dictionary/index";
export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList
  },
  data () {
    return {
      tableListData: [],
      tableTitle: supplierDirectoryTableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  async created () {
    await this.getDictByCode()
    await this.getTableList()
  },
  methods: {
    async getDictByCode () {
      const res = await getDictByCode('SUPPLIER_CODE_TYPE')
      res.data[0].subDictResultVo.forEach((item) => {
        this.tableListData.push({
          nameType: item.name,
          code: item.code
        })
      })
    },
    async getTableList () {
      this.tableLoading = true
      const pms = {
        "step": "register",
        pageNo: 1,
        pageSize: 999
      }
      //  根据token 
      if (this.supplierType > 3) {
        pms.step = 'submit'
      }
      const res = await selectContacts(pms, this.supplierType)
      this.tableLoading = false
      let cust = [...this.tableListData]
      res.data.forEach((item, x) => {
        this.tableListData.map((val, index) => {
          if (item.contactType === val.code) {
            cust[index] = { ...item, ...val }
          }
        })
      })
      this.tableListData = cust
      console.log(this.tableListData)
    },
    handleSelectionChange (e) {
      this.selectTableData = e
    },
    deleteItem (idName, fun) {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t("LK_NINDANGQIANHAIWEIXUANZE"));
      }
      iMessageBox(
        this.$t('LK_SHIFOUQUERENSHANCHU'),
        this.$t('LK_WENXINTISHI'),
        { confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') }
      ).then(async () => {
        this.tableLoading = true
        let ids = []
        this.selectTableData.map(item => {
          if (item.id && item.id !== 'null') {
            ids.push(item.id)
          }
          if (item.id === 'null') {
            this.tableListData = this.tableListData.filter(val => {
              if (item.contactType !== val.contactType) {
                return item
              }
            })
            this.saveInfos('tempStore')
          }
        })
        if (ids.length !== 0) {
          const req = {
            [idName]: ids
          }
          const res = await fun(req, this.supplierType)
          this.resultMessage(res, async () => {
            this.tableListData = []
            await this.getDictByCode()
            await this.getTableList()
          })
        } else {
          this.tableListData = []
          await this.getDictByCode()
          await this.getTableList()
        }
        this.tableLoading = false
      })
    },
    async saveInfos (step = '') {
      let p = 0
      this.tableListData.map(item => {
        if (item.contactType === '商务联系人') {
          if (!(item.nameZh && item.telephone && item.email)) {
            iMessage.warn(this.$t('SUPPLIER_SWLXRLXRXMLXRDHBT'))
            p = 1
            return
          }
        }
      })
      if (p) {
        return false
      }
      return new Promise((resolve, reject) => {
        this.$refs.commonTable.$refs.commonTableForm.validate(async (vaild) => {
          if (vaild) {
            this.tableLoading = true
            this.tableListData.some(res => {
              if (res.email == '') {
                return false
              }
            })
            const pms = {
              list: this.tableListData,
              "step": "register"
            }
            if (this.supplierType > 3) {
              pms.step = 'submit'
            }
            if (step !== '') {
              pms.step = step
            }
            const res = await saveContacts(pms, this.supplierType)
            res.moduleName = this.$t('SUPPLIER_GONGYINGSHANGTONGXUNLU')
            this.resultMessage(res, async () => {
              this.nextStep = true
              this.tableListData = []
              await this.getDictByCode()
              await this.getTableList()
              resolve(true)
            }, () => {
              this.tableLoading = false
              reject(false)
            })
          }
        })
      })
    },
    async handleNextStep () {
      await this.saveInfos()
      return this.nextStep
    },
    deleteContacts
  }
}
</script>

<style scoped>
</style>